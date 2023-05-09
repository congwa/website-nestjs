import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { QiniuService, util } from 'nest-qiniu-sdk';
import qiniu from 'qiniu';

import { compressAndConvertToWebP } from 'image-lossless-compressor';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
// import config from '@/config';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly QiniuService: QiniuService,
  ) {}

  @ApiOperation({ summary: '上传相册图片' })
  @ApiResponse({ status: 200, description: '文件上传成功' })
  @ApiResponse({ status: 400, description: '文件上传失败' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传文件',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('album')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file): Promise<any> {
    console.log(JSON.stringify(file));

    const uuid = uuidv4(); // 生成唯一的uuid作为文件名
    // const ext = path.extname(file.originalname); // 获取文件扩展名
    const filename = `${uuid}.webp`; // 拼接文件名

    // 定义文件保存路径
    // const savePath = path.join(__dirname, '..', 'public', 'uploads', filename);

    // 将文件保存到指定路径
    // await this.uploadService.saveFile(file, savePath);

    // 返回上传结果，包含文件路径等相关信息
    Logger.log('upload: ' + JSON.stringify(file));

    const outputFilePath = `${file.destination}/${filename}`;
    // 调用图片处理函数处理并压缩图片
    try {
      await compressAndConvertToWebP(file.path, outputFilePath);
    } catch (error) {
      console.log(error);
    }

    const localFile = outputFilePath;
    const options = this.QiniuService.getOptions(),
      access_key = this.QiniuService.getOptions('access_key'),
      secret_key = this.QiniuService.getOptions('secret_key'),
      zone = this.QiniuService.getZone(),
      bucket = this.QiniuService.getBucket(),
      domain = this.QiniuService.getDomain();

    const formUploader = this.QiniuService.formUploader();

    const key = filename,
      // 过期时间 60秒
      expires = 60;

    /**
     * 获取上传 token
     * https://developer.qiniu.com/kodo/1206/put-policy
     */
    const uploadToken = this.QiniuService.getUploadToken({
      scope: bucket,
      insertOnly: 1,
      expires,
      // ...
    });

    const putFile = () => {
      return new Promise((resolve, reject) => {
        const putExtra = new qiniu.form_up.PutExtra();
        formUploader.putFile(
          uploadToken,
          key,
          localFile,
          putExtra,
          function (respErr, respBody, respInfo) {
            if (respErr) {
              throw respErr;
            }
            if (respInfo.statusCode == 200) {
              console.log(respInfo);
              resolve(respInfo);
            } else {
              console.log(respInfo.statusCode);
              console.log(respInfo);
              reject(respInfo);
            }
          },
        );
      });
    };

    const obj = await putFile();
    console.log(obj);
    // 返回上传成功信息及处理好的图片 URL
    return {
      url: `/uploads/${filename}`, // 文件路径
      notCompress: file.filename, // 未压缩图盘路径
      originalname: file.originalname, // 文件原名
      // size: file.size, // 文件大小
      // mimetype: file.mimetype, // 文件MIME类型
    };
  }
}
