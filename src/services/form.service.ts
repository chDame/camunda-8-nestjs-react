import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class FormService {
  
  path = "workspace/forms/";

  resolveForm(name:string):string {
    return this.path+name;
  }

  findNames():string[] {
    if (!fs.existsSync(this.path)){
      fs.mkdirSync(this.path, { recursive: true });
    }
    return fs.readdirSync(this.path);
  }

  findByName(formKey:string):any {
    let f = fs.readFileSync(this.resolveForm(formKey), 'utf8');
    let data = JSON.parse(f);
    if (!data.generator) {
      data.generator="formJs";
	}
    return data;
  }

  saveForm(form:any):any {
    form.modified = new Date().toString();
    let jsonObject = JSON.stringify(form, null, 2);
	fs.writeFileSync(this.resolveForm(form.name), jsonObject, 'utf8');
    
    return form;
  }

  delete(name:string) {
    fs.unlink(this.resolveForm(name), (err => {
	  if (err) console.log(err);
	  else {
		console.log("\nDeleted file: "+name);
	  }
	  }));
  }
}
