import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { concatMap ,map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(22)
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          const newData = {};
          for (const key in data) {
            if (data[key] === null) {
              newData[key] = "";
            } else {
              newData[key] = data[key];
            }
          }
          return newData;
        } else {
          return data;
        }
      }),
      map ((data: any) => {
        return {
          data,
          code: 0,
          msg: '请求成功',
        };
      })
    );
  }
}
