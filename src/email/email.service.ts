import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {google} from "googleapis";
import { MailerService } from "@nestjs-modules/mailer"
import { Options } from 'nodemailer/lib/smtp-transport';




@Injectable()
export class EmailService {
    constructor(
        private configService: ConfigService,
        private readonly mailerService: MailerService,
    ){}
    private async setTransport() {
        const OAuth2 = google.auth.OAuth2;
        const oauth2Client = new OAuth2(
          this.configService.get('CLIENT_ID'),
          this.configService.get('CLIENT_SECRET'),
          'https://developers.google.com/oauthplayground',
        );
    
        oauth2Client.setCredentials({
          refresh_token: this.configService.get("REFRESH_TOKEN"),
        });
    
        const accessToken: string = await new Promise((resolve, reject) => {
          oauth2Client.getAccessToken((err, token) => {
            if (err) {
              reject('Failed to create access token');
            }
            resolve(token);
          });
        });
    
        const config: Options = {
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: this.configService.get('USER'),
            clientId: this.configService.get('CLIENT_ID'),
            clientSecret: this.configService.get('CLIENT_SECRET'),
            accessToken,
          },
        };
        this.mailerService.addTransporter('gmail', config);
      }


    async sendEmail(email: string, otp: string){
        await this.setTransport();

        this.mailerService
            .sendMail({
                transporterName: 'gmail',
                from: this.configService.get("EMAIL_HOST"), // sender address
                to: email,
                subject: 'OTP Verification',
                text: `this is your otp code: ${otp} it will be expired within a hour`
            })
            .then((success) => {
                console.log("success", success);
            })
            .catch((err) => {
                console.log("err", err);
            });
    }
}
