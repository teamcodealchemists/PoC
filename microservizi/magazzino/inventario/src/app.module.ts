import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './interfaces/http/app.controller';
import { AppService } from './application/app.service';

import { InventarioMongo, InventarioSchema } from './infrastructure/schemas/inventario.schema';
import { InventarioRepositoryMongo } from './infrastructure/adapters/mongodb/inventario.repository.impl';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/inventario'),
    MongooseModule.forFeature([
      { name: InventarioMongo.name, schema: InventarioSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'InventarioRepository', useClass: InventarioRepositoryMongo }
  ],
})
export class AppModule {}
