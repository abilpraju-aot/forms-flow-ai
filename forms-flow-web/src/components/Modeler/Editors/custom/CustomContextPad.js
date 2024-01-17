const SUITABILITY_SCORE_HIGH = 100;
 // SUITABILITY_SCORE_AVERAGE = 50, // Corrected variable name
 // SUITABILITY_SCORE_LOW = 25;

export default class CustomContextPad {
  constructor(
    bpmnFactory,
    config,
    contextPad,
    create,
    elementFactory,
    injector,
    translate
  ) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const { autoPlace, bpmnFactory, create, elementFactory, translate } = this;

    function assign(target, ...others) {
      for (const source of others) {
        Object.assign(target, source);
      }
      return target;
    }

    function appendServiceTask(suitabilityScore) {
      return function (event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create("bpmn:Task");

          businessObject.suitable = suitabilityScore;

          const shape = elementFactory.createShape({
            type: "bpmn:Task",
          });

          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(event, element);
        }
      };
    }

    function appendServiceTaskStart(suitabilityScore) {
      return function (event) {
        const businessObject = bpmnFactory.create("bpmn:Task");

        businessObject.suitable = suitabilityScore;

        const shape = elementFactory.createShape({
          type: "bpmn:Task",
        });

        create.start(event, shape, element);
      };
    }

    var actions = {};

    assign(actions, {
      "append.mattoncino-custom": {
        group: "mattoncini-custom",
        className: "fas fa-cogs",
        title: translate("mattoncino custom"),
        action: {
          click: appendServiceTask(SUITABILITY_SCORE_HIGH),
          dragstart: appendServiceTaskStart(SUITABILITY_SCORE_HIGH),
        },
      },
    });

    return actions; // Uncommented the return statement
  }
}

CustomContextPad.$inject = [
  "bpmnFactory",
  "config",
  "contextPad",
  "create",
  "elementFactory",
  "injector",
  "translate",
];
