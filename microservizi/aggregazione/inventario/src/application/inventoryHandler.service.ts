//import { Injectable, Inject } from '@nestjs/common';
import { ConcreteProduct } from "src/domain/core/concreteProduct";
import { AddProductDto } from "src/interfaces/http/dto/addProduct.dto";
import { IdDto } from "src/interfaces/http/dto/id.dto";
import { EditProductDto } from "src/interfaces/http/dto/editProduct.dto";
import { InventoryRepository } from "src/domain/ports/inventory.repository";

import { Injectable, Inject, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { NatsJetStreamClientProxy } from '@nestjs-plugins/nestjs-nats-jetstream-transport';

import { connect, JSONCodec, JetStreamClient, NatsConnection } from 'nats';

interface newProductEvent {
  id: number;
  product: string;
  quantity: number;
}

@Injectable()
export class InventoryHandlerService { /*implements OnModuleInit, OnModuleDestroy {
  private nc: NatsConnection;
  private js: JetStreamClient;
  private codec = JSONCodec();
*/
    constructor(
    @Inject('InventoryRepository')
    private readonly inventoryRepository: InventoryRepository,
    @Inject('NATS_CLIENT')
    private readonly client: NatsJetStreamClientProxy,
  ) {}
/*
  async onModuleInit() {
    this.nc = await connect({ servers: 'nats://nats:4222' });
    this.js = this.nc.jetstream();
  }

  async onModuleDestroy() {
    await this.nc.close();
  }
*/
  async addProduct(dto: AddProductDto): Promise<void> {
    const product = await this.inventoryRepository.findById(dto.id);

    if (product) {
      throw new Error('Product already exists');
    }

    const newProduct = new ConcreteProduct(
      dto.id,
      dto.name,
      dto.unitPrice,
      dto.quantity !== undefined || null || "" ? dto.quantity : 0,
      dto.minQuantity !== undefined || null || "" ? dto.minQuantity : 0,
      dto.maxQuantity !== undefined || null || "" ? dto.maxQuantity : 0
    );

    console.log('New product created:', newProduct);

    await this.inventoryRepository.addProduct(newProduct);
  }

  async findProductById(id: IdDto): Promise<ConcreteProduct | null> {
    return this.inventoryRepository.findById(id.id);
  }

  async getInventory(): Promise<ConcreteProduct[]> {
    return this.inventoryRepository.findAll();
  }

  async removeProduct(id: IdDto): Promise<void> {
    const res = await this.inventoryRepository.removeById(id.id);
    if (!res) {
      throw new Error('Product not found');
    }
    else {
      return;
    }
  }

  async editProduct(id: IdDto, body: EditProductDto): Promise<void> {
    const product = await this.inventoryRepository.findById(id.id);

    if (!product) {
      throw new Error('Product not found');
    }

    const updatedProduct = new ConcreteProduct(
      id.id,
      product.getName(),
      product.getUnitPrice(),
      body.quantity !== undefined || null || "" ? body.quantity : product.getQuantity(),
      body.minQuantity !== undefined || null || "" ? body.minQuantity : product.getMinQuantity(),
      body.maxQuantity !== undefined || null || "" ? body.maxQuantity : product.getMaxQuantity()
    );

    await this.inventoryRepository.updateProduct(id.id, updatedProduct);
  }

  async getTotal(): Promise<number> {
    const products = await this.inventoryRepository.findAll();
    return products.reduce((total, product) => total + product.getQuantity(), 0);
  }



  async publishEvent<T>(subject: string, data: T) {
    this.client.emit(subject, 'prova'/*this.codec.encode(data)*/);
    return subject;
  }
  
  async aggiungiProdotto(nuovoProdotto: AddProductDto) {
    // Pubblicazione evento prima dell'effettiva aggiunta
    await this.publishEvent<newProductEvent>('prodotto.inserito', {
      id: nuovoProdotto.id,
      product: nuovoProdotto.name,
      quantity: nuovoProdotto.quantity,
    });
  }
}
