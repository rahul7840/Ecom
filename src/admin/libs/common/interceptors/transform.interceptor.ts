// import { IGNORE_TRANSFORM_INTERCEPTOR } from '@common/decorators/ignore-transform-interceptor.decorator';
import {
  CallHandler,
  ExecutionContext,
  // HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonResponse } from '../types/response.types';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CommonResponse> {
    const ctx = context.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const request = ctx.getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = ctx.getResponse<Response>();

    // if (request.method === 'POST') {
    //   if (response.status === HttpStatus.CREATED) {
    //     response.status(HttpStatus.OK);
    //   }
    // }

    // if (request.method === 'POST') {
    //   if (response.status === 201) {
    //     ctx.getResponse().status(HttpStatus.OK);
    //   }
    // }

    return next.handle().pipe(
      map((responseValue) => {
        let data: any,
          message = '';

        if (responseValue?.data) {
          data = responseValue.data;
        }

        if (responseValue?.message) {
          message = responseValue.message;

          if (responseValue?.data) {
            data = responseValue.data;
          } else {
            data = {};
          }
        }

        return {
          success: true,
          status: 200,
          error: '',
          data: data ? data : responseValue,
          message: message || 'success',
        };
      }),
    );
  }
}
