import { Injectable } from '@nestjs/common';
import { Settings } from '../settings';
import axios from 'axios';

@Injectable()
export class TasklistService {
  settings: Settings = new Settings();
  api = axios.create({
    baseURL: 'https://'+this.settings.clusterRegion+'.tasklist.camunda.io/'+this.settings.clusterId
  });
  constructor() {
    axios.post('https://login.cloud.camunda.io/oauth/token', 
	  {'grant_type':'client_credentials', 'audience':'tasklist.camunda.io', 'client_id': this.settings.clientId, 'client_secret':this.settings.clientSecret})
	.then((response) => {
	  console.log(response);
	  this.api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
	});
  }
        
  readTasks= async (search:any):Promise<any[]> => {
    const { data } = await this.api.post('/v1/tasks/search', search);
    return data;
  }
  claim = async (taskId:number, assignee:string):Promise<any> => {
    let { data } =  await this.api.patch('/v1/tasks/'+taskId+'/assign', {"assignee": assignee, "allowOverrideAssignment": true});

	return data;
  }
  unclaim = async (taskId:number):Promise<any> => {
    let { data } =  await this.api.patch('/v1/tasks/'+taskId+'/unassign');

	return data;
  }
  complete = async (taskId:number, variables:any):Promise<any> => {
    let { data } =  await this.api.patch('/v1/tasks/'+taskId+'/complete',{"variables":variables});

	return data;
  }
}
