import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { ThrottlerBehindProxyGuard } from './common/guards/throttler-behind-proxy.guard';
import { AppController } from './app.controller';
import { LoggerModule } from 'nestjs-pino';
import config from '@/config';
// import { RedisModule } from '@liaoliaots/nestjs-redis';
// import { RedisConfigService } from './common/services/redis-config.service';
// import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      ...config.pino,
    }),
    // RedisModule.forRootAsync({
    //   useClass: RedisConfigService,
    // }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 50,
    }),
    UserModule,
    AuthModule,
    BannerModule,
    MailSenderModule,
    // SocketModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
