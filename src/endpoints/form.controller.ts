import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FormService } from '../services/form.service';
import { OperateService } from '../services/operate.service';

@Controller('/api/forms')
export class FormController {
  constructor(private readonly formService: FormService, private readonly operateService: OperateService) {}

  @Get(':processDefinitionId/:formKey')
  formSchema(@Param('processDefinitionId') processDefinitionId: string, @Param('formKey') formKey: string): any {
    return this.formSchema2("test", processDefinitionId, formKey);
  }
  @Get(":processName/:processDefinitionId/:formKey")
  formSchema2(@Param('processName') processName: string, @Param('processDefinitionId') processDefinitionId: string, @Param('formKey') formKey: string): any {
    return this.localizedFormSchema(processName, processDefinitionId, formKey, "en");
  }
  
  @Get(":processName/:processDefinitionId/:formKey/:locale")
  localizedFormSchema(@Param('processName') processName: string, @Param('processDefinitionId') processDefinitionId: string, @Param('formKey') formKey: string, @Param('locale') locale: string): any {

    if (formKey.indexOf("camunda-forms:bpmn:")==0) {
      let formId = formKey.substring("camunda-forms:bpmn:".length, formKey.length);
      return this.operateService.embeddedForm(processDefinitionId, formId);
	}


    let form = this.formService.findByName(formKey);
    form.schema.generator = form.generator;
    
    return form.schema;
  }
  
  @Get("/api/forms/instanciation/:bpmnProcessId")
  getInstanciationFormSchema(@Param('bpmnProcessId') bpmnProcessId:string): any {
    let form = this.formService.findByName(bpmnProcessId);
    form.schema.generator = form.generator;
    return form.schema;
  }
}
