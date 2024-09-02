import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

export const RabbitMQConfig = RabbitMQModule.forRoot(RabbitMQModule, {
  exchanges: [
    {
      name: 'owner-exchange',
      type: 'topic',
    },
  ],
  uri: 'amqp://rabbitmq:5672',
  connectionInitOptions: { wait: true },
});
