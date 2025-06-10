import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/inventario', {
    }),
    MongooseModule.forFeature([
      { name: 'categorie', schema: {} },
      { name: 'inventario', schema: {} },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
