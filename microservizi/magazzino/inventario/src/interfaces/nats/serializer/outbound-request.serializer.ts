// src/common/serializers/outbound-response-external.serializer.ts
import { Serializer, OutgoingResponse } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export class OutboundRequestSerializer implements Serializer {
  private readonly logger = new Logger('OutboundRequestSerializer');
  serialize(value: any) {
    this.logger.debug(
      `-->> Serializing outbound request: \n${JSON.stringify(value)}`,
    );

    /**
     * Here, we are merely "unpacking" the response payload from the Nest
     * message structure, and returning it as a "plain" top-level object.
     */

    value = {data: JSON.stringify(value.data)}; // Change here
    console.log('Serialized value:', JSON.stringify(value));
    return value;
  }
}