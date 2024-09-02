<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">  Building a Microservices Architecture with <a href="http://nestjs.com" target="_blank">NestJS</a> framework. </p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Task Description

You are tasked with creating a microservices architecture using NestJS. The
architecture will consist of three services: Owner, Products, and Order. Each service will
interact with a MongoDB database, and the communication between these services will
be handled using two different protocols: RabbitMQ and gRPC. Additionally, the Order
service will implement a caching mechanism for product data.

## To develop new Project and install dependencies

```bash
# create a nestJS app - crimmit
$ nest new crimmit
```

```bash
# create the microservices
$ cd crimmit

$ nest generate app owner-service

$ nest generate app product-service

$ nest generate app order-service
```

```bash
# install all the necessary dependencies needed for the project
$ npm install @nestjs/mongoose mongoose @golevelup/nestjs-rabbitmq amqplib @nestjs/microservices @grpc/grpc-js @grpc/proto-loader cache-manager cache-manager-redis-store redis

$ npm install class-validator class-transformer 

$ npm install ioredis @nestjs/cache-manager

$ npm install @nestjs/config

$ npm install concurrently --save-dev
```

## Main Project setup

```bash 
# clone the repository to your local machine
$ git clone https://github.com/kanmitcode/crimmit.git
```

```bash
$ npm install
```

## Compile and run the project using Docker Compose

```bash
# build the microservices (owner-service, product-service, order-service)
$ docker-compose up --build

# you can press Ctrl+C to stop the services from running

# remove the microservices
$ docker-compose down
```

## Compile and run the project locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run the project

Kindly use the postman collection (Crimmit.postman_collection.json) attached to the project repo

- For owner-service: http://localhost:3001/owners
- For product-service: http://localhost:3002/products
- For order-service: http://localhost:3003/orders

## Resources

The technological resources used:

- Visit the [NestJS Documentation](https://docs.nestjs.com).
- Database: [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/).
- Queuing: [RabbitMQ](https://www.rabbitmq.com/).
- Protocol: [gRPC](https://grpc.io/).
- Caching: [Redis] (https://redis.io/).
- Containerization: [Docker] (https://docs.docker.com/compose/).


## Stay in touch

- Author - [Oyekanmi Owolabi](https://www.linkedin.com/in/oyekanmi-owolabi-45164a40/)
- StackOverflow - [oyekanmi-owolabi](https://stackoverflow.com/users/4654541/oyekanmi-owolabi)
- Email - [@kanmit](kanmitowolabi@gmail.com)

## License

The project is [GNU General Public License v3.0](https://github.com/kanmitcode/crimmit/blob/main/LICENSE).
