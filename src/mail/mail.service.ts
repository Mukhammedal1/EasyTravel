import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Customers } from "@prisma/client";

@Injectable()
export class MailService {
  constructor(private mailService: MailerService) {}

  async sendMail(customer: Customers) {
    const url = `${process.env.API_URL}/customers/activate/${customer.activation_link}`;
    console.log(url);
    await this.mailService.sendMail({
      to: customer.email,
      subject: "✈️ Easy Travelga xush kelibsiz",
      template: "./confirm",
      context: {
        name: customer.fullname,
        url,
      },
    });
  }
}

