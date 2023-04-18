import {
  Injectable,
  ExceptionFilter,
  ArgumentsHost,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class MenuWhiteFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();

    const id = parseInt(request.params.id);
    if (id === 1 || id === 2) {
      throw new ForbiddenException('不能修改产品分类和新闻分类');
    }

    return undefined;
  }
}
