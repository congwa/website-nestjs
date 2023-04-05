import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取请求上下文中的 response对象
    const status = exception.getStatus(); // 获取异常状态码
    
    // TODO 这里response是私有的，不知道该咋写了
    const exceptionStr = JSON.stringify(exception)
    const exceptionJSON = JSON.parse(exceptionStr);
    Logger.error(exceptionStr);

    console.log(exception,'------------------------------------', exception.message)
    // 设置错误信息
    const message = exceptionJSON?.response?.message
      ? exceptionJSON?.response?.message
      : `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = {
      data: {},
      message: message,
      code: -1,
    };

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
