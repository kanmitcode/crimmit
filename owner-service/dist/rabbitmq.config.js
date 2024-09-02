"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQConfig = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
exports.RabbitMQConfig = nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
    exchanges: [
        {
            name: 'owner-exchange',
            type: 'topic',
        },
    ],
    uri: 'amqp://rabbitmq:5672',
    connectionInitOptions: { wait: true },
});
//# sourceMappingURL=rabbitmq.config.js.map