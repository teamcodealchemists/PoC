import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';


import { Categoria, CategoriaSchema } from './schemas/categoria.schema';
import { Inventario, InventarioSchema } from './schemas/inventario.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/inventario'),
    MongooseModule.forFeature([
  { name: Categoria.name, schema: CategoriaSchema, collection: 'categorie' },
  { name: Inventario.name, schema: InventarioSchema, collection: 'inventario' },
])

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
