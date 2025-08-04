import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

  describe('NATS Connection Only', () => {
    let app: INestApplication;
    let client: ClientProxy;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({}).compile();

      app = moduleFixture.createNestApplication();
      app.connectMicroservice({
        transport: Transport.NATS,
        options: { servers: ['nats://localhost:4222'] },
      });

      await app.startAllMicroservices();
      await app.init();

      client = ClientProxyFactory.create({
        transport: Transport.NATS,
        options: { servers: ['nats://localhost:4222'] },
      });

      await client.connect();
    });

    afterAll(async () => {
      await client.close();
      await app.close();
    });

    it('dovrebbe connettersi correttamente a NATS', () => {
      expect(client).toBeDefined();
    });
  });
