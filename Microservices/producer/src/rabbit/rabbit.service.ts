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
    this.userConsumer = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: 'user_queue',
      },
    });

    this.reportConsumer = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
        queue: 'report_queue',
      },
    });
  }

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
