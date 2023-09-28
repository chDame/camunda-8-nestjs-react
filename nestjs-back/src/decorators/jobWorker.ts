import { Inject } from '@nestjs/common';
import { ZBWorkerOptions, ZBClientOptions, Job, JobCompletionInterface, IOutputVariables, IInputVariables, ICustomHeaders } from "zeebe-node";

import { ZeebeService } from '../services/zeebe.service';

/*
export const JobWorker =  (type: string, options?: ZBWorkerOptions) : MethodDecorator => {
  const injectZeebeService = Inject(ZeebeService);

  return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {

    injectZeebeService(target, 'zeebeService');

    // this is equivalent to have a constructor like constructor(yourservice: YourServiceClass)
    // note that this will injected to the instance, while your decorator runs for the class constructor
	//get original method
    const originalMethod = propertyDescriptor.value;
	console.log(originalMethod.name);
    //redefine descriptor value within own function block
    propertyDescriptor.value = async function(...args: any[]) {
	  this.zeebeService.initWorker(type, originalMethod);
	}
	originalMethod.eval();
  };
}*/

export interface ZeebeJob extends Job<IInputVariables, ICustomHeaders>, JobCompletionInterface<IOutputVariables>
{}
