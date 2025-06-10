import { Categoria, CategoriaSchema } from './schemas/categoria.schema';
import { Inventario, InventarioSchema } from './schemas/inventario.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://mongo:27017/inventario'),
    MongooseModule.forFeature([
      { name: 'categorie', schema: CategoriaSchema },
      { name: 'inventario', schema: InventarioSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
