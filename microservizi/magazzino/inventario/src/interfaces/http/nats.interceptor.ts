import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class NatsPayloadInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    let payload = ctx.getData();

    // Costruisci una struttura JSON valida con data e id
    const newPayload = {
      data: typeof payload?.data === 'string' ? payload.data : '',
      id: typeof payload?.id === 'string' ? payload.id : Math.floor(Math.random() * 1000000).toString(),
    };

    // Sovrascrivi il payload nel context
    (context as any).args[0] = newPayload;

    return next.handle();
  }
}