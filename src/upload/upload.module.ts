import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { PassportModule } from '@nestjs/passport';
import { QiniuModule, zone } from 'nest-qiniu-sdk';
import config from '@/config';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../static'),
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
    QiniuModule.register({
      // 通常不用管区域
      // zone: zone.Zone_z0,
      global: true,
      access_key: config.qiniu.accessKey,
      secret_key: config.qiniu.secretKey,
      bucket: 'biomed168',
      domain: 'http://imgs.biomed168.com',
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
