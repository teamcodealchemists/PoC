import { response } from 'express';
// src/common/serializers/outbound-response-external.serializer.ts
import { Serializer, OutgoingResponse } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

export class OutboundResponseSerializer implements Serializer {
  private readonly logger = new Logger('OutboundResponseSerializer');
  serialize(value: any): OutgoingResponse {
    this.logger.debug(
      `-->> Serializing outbound response: \n${JSON.stringify(value)}`,
    );

    /**
     * Here, we are merely "unpacking" the response payload from the Nest
     * message structure, and returning it as a "plain" top-level object.
     */

    value = {data: JSON.stringify(value.response)};

    return value;
  }
}