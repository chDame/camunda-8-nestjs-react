import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const path = require('path');
import {authenticate} from '@google-cloud/local-auth';
import { OAuth2Client, GoogleAuth } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
const MailComposer = require('nodemailer/lib/mail-composer');
import {google} from 'googleapis';
import * as Mustache from 'mustache';
@Injectable()
export class MailService {
  scopes = ['https://www.googleapis.com/auth/gmail.readonly','https://www.googleapis.com/auth/gmail.send']

  tokenPath = "token.json";
  credentialsPath = path.join(process.cwd(), "client_secret_google_api.json");
  mailsPath = "workspace/mails/";

  resolve(name:string):string {
    return this.mailsPath+name;
  }

  findNames():string[] {
    if (!fs.existsSync(this.mailsPath)){
      fs.mkdirSync(this.mailsPath, { recursive: true });
    }
    return fs.readdirSync(this.mailsPath);
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
  
  async loadSavedCredentialsIfExist() {
    try {
      const content = await fs.readFileSync(this.tokenPath, 'utf8');
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials);
    } catch (err) {
      return null;
    }
  }
  async saveCredentials(client) {
    const content = await fs.readFileSync(this.credentialsPath, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFileSync(this.tokenPath, payload, 'utf8');
  }
  
  async authorize() {
    let client = await this.loadSavedCredentialsIfExist();
    if (client) {
      return client;
    }
    let oauth2Client = await authenticate({
      scopes: this.scopes,
      keyfilePath: this.credentialsPath,
    });
    if (oauth2Client.credentials) {
      await this.saveCredentials(oauth2Client);
    }
    return oauth2Client;
  }
  
  async send(to:string, subject:string, htmlContent:string) {
	let callback = async (auth) => {
		const gmail = google.gmail({version: 'v1', auth});
		const mailComposer = new MailComposer({
		  to: to,
		  subject: subject,
		  html: htmlContent,
		  textEncoding: 'base64',
		});
		const message = await mailComposer.compile().build();
		const raw = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
		gmail.users.messages.send({ requestBody: { raw }, userId: 'me' });
	  }
	this.authorize().then(callback);
  }
  
  buildBody(template:string, locale:string, variables:any):string {
	let mail = this.findByName(template+'-'+locale);
	return Mustache.render(mail.htmlTemplate, variables);
  }
}
