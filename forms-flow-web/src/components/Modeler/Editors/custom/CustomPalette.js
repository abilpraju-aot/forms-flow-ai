export default class CustomPalette {
  constructor(bpmnFactory, create, elementFactory, palette, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries() {
    const { bpmnFactory, create, elementFactory, translate } = this;

    function assign(target, ...others) {
      for (const source of others) {
        Object.assign(target, source);
      }
      return target;
    }

    function createCustomTask() {
      return function (event) {
        const businessObject = bpmnFactory.create("elmi:CustomTask");
        const shape = elementFactory.createShape({
          type: "elmi:CustomTask",
          businessObject: businessObject,
        });
        create.start(event, shape);
      };
    }

    const actions = assign({}, {
      "create.separato-mattoncini-custom": {
        group: "mattoncini-custom",
        separator: true,
      },
    });

    // Make API call to retrieve mattoncini

    // Create object with mattoncini to add to the editor (to be mapped with the API response)
    const newActions = {
      "create.customTask": {
        group: "mattoncini-custom",
        className: "fas fa-cogs",
        title: translate("mattoncino custom"),
        action: {
          dragstart: createCustomTask(),
          click: createCustomTask(),
        },
      },
    };

    // Loop through each property of newActions and add them to the actions object
    for (const key in newActions) {
      if (Object.prototype.hasOwnProperty.call(newActions, key)) {
        actions[key] = newActions[key];
      }
    }

    return actions;
  }
}

CustomPalette.$inject = [
  "bpmnFactory",
  "create",
  "elementFactory",
  "palette",
  "translate",
];
