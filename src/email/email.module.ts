import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: "smtps://user@domain.com:pass@smtp.domain.com",
      // template: {
      //   dir: path.join(__dirname, './templates'),
      // }
  }), 
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
