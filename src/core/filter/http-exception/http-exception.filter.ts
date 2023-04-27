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
    // 这里response是私有的，只能这样

    const exceptionStr = JSON.stringify(exception)
    const exceptionJSON = JSON.parse(exceptionStr);
    Logger.error(exceptionStr);
    /**
      // 还可以继承ValidationPipe管道，对handleError方法重写，整理message的信息
       handleError(errors: ValidationError[]) {
      const updatedErrors = errors.map((error) => {
        const constraints = error.constraints;
        // 添加 ID 信息
        return {
          ...error,
          property: `${error.property}[${error.value.id}]`,
          constraints: Object.keys(constraints).reduce((prev, key) => {
            return {
              ...prev,
              [key]: `${constraints[key]} [ID:${error.value.id}]`,
            };
          }, {}),
        };
      });
      return super.handleError(updatedErrors);
    }

    buildMessage(errors: ValidationError[]) {
      const messages = errors.map((error) => {
        const constraints = error.constraints;
        // 在错误信息中包含 ID 信息
        return Object.keys(constraints)
          .map((key) => constraints[key])
          .join('; ');
      });
      return messages.join('; ');
    }
     */

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
