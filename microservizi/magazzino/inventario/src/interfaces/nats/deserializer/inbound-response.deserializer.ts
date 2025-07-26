// src/common/deserializers/inbound-message-external.deserializer.ts
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ConsumerDeserializer } from '@nestjs/microservices';

export class InboundRequestDeserializer
  implements ConsumerDeserializer {
  private readonly logger = new Logger('InboundRequestDeserializer');
  deserialize(value: any, options?: Record<string, any>) {
    this.logger.verbose(
      `<<-- deserializing inbound request message:\n${JSON.stringify(
        value,
      )}\n\twith options: ${JSON.stringify(options)}`,
    );
    /**
     * Here, we merely wrap our inbound message payload in the standard Nest
     * message structure.
     */
    return {
      pattern: undefined,
      data: value,
      id: uuidv4(),
    };
  }
}