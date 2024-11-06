import { HttpException, Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
require('dotenv').config();

@Injectable()
export class RabbitService {
  //Setting up proxies for our consumer microservices
  private userConsumer: ClientProxy;
  private reportConsumer: ClientProxy;

  constructor() {
    /**
     * Initializes the RabbitMQ client proxies for the User Consumer and Report Consumer microservices.
     * The proxies are configured with the RabbitMQ connection details and the respective queue names.
     */
    this.userConsumer = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: 'user_queue',
      },
    });

    this.reportConsumer = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: 'report_queue',
      },
    });
  }

  /**
   * Sends a message to the User Consumer microservice.
   *
   * @param pattern - The message pattern to send to the User Consumer.
   * @param data - The data to include in the message.
   * @returns A promise that resolves when the message has been sent successfully.
   * @throws {HttpException} If there is an error sending the message to the User Consumer.
   */
  async sendToUserConsumer(pattern: any, data: any) {
    // console.log(`Sending to User Consumer: Pattern: ${pattern} Data: ${data}`);
    return await firstValueFrom(
      this.userConsumer.send(pattern, data).pipe(
        catchError((err) => {
          // console.log(`Error from User Consumer: ${err}`);
          // console.log(err);
          throw new HttpException(err.message, err.status);
        }),
      ),
    );
  }

  /**
   * Sends a message to the Report Consumer microservice.
   *
   * @param pattern - The message pattern to send to the Report Consumer.
   * @param data - The data to include in the message.
   * @returns A promise that resolves when the message has been sent successfully.
   * @throws {HttpException} If there is an error sending the message to the Report Consumer.
   */
  async sendToReportConsumer(pattern: any, data: any) {
    // console.log(`Sending to Report Consumer: Pattern: ${pattern} Data: ${data}`);
    return await firstValueFrom(
      this.reportConsumer.send(pattern, data).pipe(
        catchError((err) => {
          // console.log(`Error from Report Consumer: ${err}`);
          // console.log(err);
          throw new HttpException(err.message, err.status);
        }),
      ),
    );
  }
}
