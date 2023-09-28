import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class MailService {
  
  path = "workspace/mails/";

  resolve(name:string):string {
    return this.path+name;
  }

  findNames():string[] {
    if (!fs.existsSync(this.path)){
      fs.mkdirSync(this.path, { recursive: true });
    }
    return fs.readdirSync(this.path);
  }

  findByName(formKey:string):any {
    let f = fs.readFileSync(this.resolve(formKey), 'utf8');
    let data = JSON.parse(f);
    if (!data.generator) {
      data.generator="formJs";
	}
    return data;
  }

  save(mail:any):any {
    mail.modified = new Date().toString();
    let jsonObject = JSON.stringify(mail, null, 2);
	fs.writeFileSync(this.resolve(mail.name), jsonObject, 'utf8');
    
    return mail;
  }

  delete(name:string) {
    fs.unlink(this.resolve(name), (err => {
	  if (err) console.log(err);
	  else {
		console.log("\nDeleted file: "+name);
	  }
	  }));
  }
}
