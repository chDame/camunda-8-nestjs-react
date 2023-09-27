import { Injectable } from '@nestjs/common';
import { Settings } from '../settings';
import { DOMParser } from 'xmldom'
import axios from 'axios';

@Injectable()
export class OperateService {
  settings: Settings = new Settings();
  api = axios.create({
    baseURL: 'https://'+this.settings.clusterRegion+'.operate.camunda.io/'+this.settings.clusterId
  });
  constructor() {
    axios.post('https://login.cloud.camunda.io/oauth/token', 
	  {'grant_type':'client_credentials', 'audience':'operate.camunda.io', 'client_id': this.settings.clientId, 'client_secret':this.settings.clientSecret})
	.then((response) => {
	  console.log(response);
	  this.api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
	});
  }
        
  processDefinitions= async ():Promise<any[]> => {
    let search={"filter":{},"size":1000,"sort":[{"field":"name","order":"ASC"},{"field":"version","order":"DESC"}]}
    const { data } = await this.api.post('/v1/process-definitions/search', search);
    let definitions = data.items;
    let result = [];
    result.push(definitions[0])
    let lastDefId=definitions[0].bpmnProcessId;
    for (let index = 0; index < definitions.length; ++index) {
		const definition = definitions[index];
		if (lastDefId!=definition.bpmnProcessId) {
          result.push(definition);
          lastDefId=definition.bpmnProcessId;
		}
	}
      
    return result;
  }
  embeddedForm = async (processDefinitionId:string, formId:string):Promise<any> => {
    let { data } =  await this.api.get('/v1/process-definitions/'+processDefinitionId+'/xml');
 console.log(data);
 console.log(formId);
	let document = new DOMParser().parseFromString(data);

    let nodeById = document.getElementById(formId);
    return JSON.parse(nodeById.textContent);
  }
}
