import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({
          envFilePath: 'env/test.env',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Request Validation
    // ValidationPipe 是 Nest.js 中的一个内置管道之一，主要用于验证客户端请求的数据。它基于 class-validator 库来实现，并支持声明式验证装饰器。
    /**
        skipMissingProperties: 是否跳过缺失的属性，默认为 false。
        transform: 是否在验证前将输入数据转换为一个类实例，默认为 true。
        whitelist: 是否仅验证 DTO 声明中定义的属性，默认为 true。
        forbidNonWhitelisted: 如果设置为 true，则不允许验证 DTO 声明以外的任何属性，默认为 true。
        groups: 指定要使用的分组，仅验证与指定分组相关联的验证装饰器，默认为 null。
        disableErrorMessages: 是否禁用错误消息的生成，默认为 false。
        transformOptions: 一个可选的对象，其中包含需要发送到 class-transformer 的转换选项。
        exceptionFactory: 可选的函数，用于自定义异常的实例化过程。
     */
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => request(app.getHttpServer()).get('/').expect(200));
});
