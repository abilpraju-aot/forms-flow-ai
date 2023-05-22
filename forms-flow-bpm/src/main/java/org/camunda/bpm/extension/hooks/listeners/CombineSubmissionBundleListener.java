package org.camunda.bpm.extension.hooks.listeners;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang3.StringUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.DelegateTask;
import org.camunda.bpm.engine.delegate.ExecutionListener;
import org.camunda.bpm.engine.delegate.TaskListener;
import org.camunda.bpm.extension.hooks.services.FormSubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.logging.Logger;

import static org.camunda.bpm.extension.commons.utils.VariableConstants.*;

/**
 * Combine Submission Bundle Listener.
 * This class creates a new submission from the bundle submission data and form connector submission data.
 */
@Component
public class CombineSubmissionBundleListener extends BaseListener implements ExecutionListener, TaskListener {


    @Autowired
    private FormSubmissionService formSubmissionService;

    @Resource(name = "bpmObjectMapper")
    private ObjectMapper bpmObjectMapper;

    private final Logger LOGGER = Logger.getLogger(FormSubmissionService.class.getName());

    @Override
    public void notify(DelegateExecution execution) {
        try {
            createRevision(execution);
        } catch (IOException e) {
            handleException(execution, ExceptionSource.EXECUTION, e);
        }
    }

    @Override
    public void notify(DelegateTask delegateTask) {
        try {
            createRevision(delegateTask.getExecution());
        } catch (IOException e) {
            handleException(delegateTask.getExecution(), ExceptionSource.TASK, e);
        }

    }

    private void createRevision(DelegateExecution execution) throws IOException {
        String formType = String.valueOf(execution.getVariable(FORM_TYPE));
        String formData = formSubmissionService.readSubmission(String.valueOf(execution.getVariables().get(FORM_URL)));
        JsonNode formDataNode = bpmObjectMapper.readValue(formData, JsonNode.class).get("data");
        String bundleData = formSubmissionService.readSubmission(String.valueOf(execution.getVariables().get(BUNDLE_FORM_URL)));
        JsonNode bundleNode = bpmObjectMapper.readValue(bundleData, JsonNode.class);
        JsonNode combinedData = bpmObjectMapper.readerForUpdating(bundleNode.get("data")).readValue(formDataNode);
        ((ObjectNode) bundleNode).set("data", combinedData);
        String updatedBundleData = bpmObjectMapper.writeValueAsString(bundleNode);
        String submissionId = formSubmissionService.createSubmission(
                                                    String.valueOf(execution.getVariables().get(BUNDLE_FORM_URL)),
                                                    formType, updatedBundleData);
        String webFormUrl = String.valueOf(execution.getVariables().get(WEB_FORM_URL));
        execution.setVariable(FORM_URL, getUrl(execution) + "/" + submissionId);
        if (!webFormUrl.isBlank()) {
            execution.setVariable(WEB_FORM_URL, getWebUrl(execution) + "/" + submissionId);
        } else {
            execution.setVariable(WEB_FORM_URL, "");
        }
    }

    private String getUrl(DelegateExecution execution){
        return StringUtils.substringBeforeLast(String.valueOf(execution.getVariables().get(BUNDLE_FORM_URL)),"/");
    }

    private String getWebUrl(DelegateExecution execution){
        return StringUtils.substringBeforeLast(String.valueOf(execution.getVariables().get(WEB_FORM_URL)),"/");
    }
}
