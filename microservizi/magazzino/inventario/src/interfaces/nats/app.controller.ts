import {
  Controller,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
  Request,
  Body,
  Inject
} from '@nestjs/common';
import { MessagePattern, Payload, EventPattern, Ctx, NatsContext, ClientsModule, ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { InventoryHandlerService } from 'src/application/inventoryHandler.service';
import { AddProductDto } from './dto/addProduct.dto';
import { IdDto } from './dto/id.dto';
import { EditProductDto } from './dto/editProduct.dto';
import * as jwt from 'jsonwebtoken';


const conf = new ConfigService();

@Controller()
export class AppController {
  constructor(
    private readonly inventoryHandler: InventoryHandlerService,
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) { }

  // PROBLEMA: NestJS is aspetta un campo data e id nell'oggetto di richiesta message pattern NATS, ma il bro resgate non lo invia.

  // POSSIBILE SOLUZIONE: Usare un interceptor ed infilarlo manualmente prima che arrivi al controller in locale.

  // SI USANO I SERIALIZZATORI E DESERIALIZZATORI PER TRASFORMARE I DATI INVIATI E RICEVUTI DA NATS.

  // curl http://localhost:8081/api/example/model


  // ==========================================
  // TEST RESGATE FUNCTIONS
  // ==========================================

  /**
   * Handles get request for the example model.
   * Uses @MessagePattern for request-response communication.
   */

  @MessagePattern('get.example.model')
  async getExampleModel(@Payload() data: any): Promise<{ result: { model: { message: any } } }> {
    console.log('Received NATS message for: get.example.model');
    console.log('Data:', data);

    const response = {
      result: {
        model: {
          message: 'Hello, World!',
        },
      },
    };

    console.log('Sending response:', response);
    return Promise.resolve(response);
  }

  /** 
   * Handles test post request to add item
   */

  @MessagePattern(`call.warehouse.${process.env.WAREHOUSE_ID}.items.new`)
  async addItem(@Body() data: any): Promise<any> {
    try {
      console.log('Received NATS message for: call.warehouse.1.item.new');
      const parsedData = JSON.parse(data);
      console.log("Data: ", parsedData.params);

      // Qui puoi aggiungere la logica per aggiungere l'item usando inventoryHandler se necessario
      let newProduct: AddProductDto = parsedData.params;
      await this.inventoryHandler.addProduct(newProduct);

      return ({
        resource:
        {
          rid: `warehouse.${process.env.WAREHOUSE_ID}.item.${parsedData.params.id}`
        }
      });
    } catch (error) {
      return {
        error: {
          code: "system.error",
          message: error.message
        }
      };
    }
  }

  @MessagePattern(`get.warehouse.${process.env.WAREHOUSE_ID}.item.*`)
  async getItem(@Ctx() context: NatsContext): Promise<any> {
    const itemIdStr = context.getSubject().split('.').pop() ?? null;
    console.log('ID received from NATS:', itemIdStr);

    const itemIdDto: IdDto = {
      id: Number(itemIdStr)
    };

    const model = await this.inventoryHandler.findProductById(itemIdDto);

    return Promise.resolve({
      result: {
        model
      }
    });

  }

  /**
   * Handles access request for the example model.
   * Uses @MessagePattern for request-response communication.
   */
  @MessagePattern('access.warehouse.>')
  async accessExampleModel(@Body() data ): Promise<{ result: { get: boolean, call: string } }> {
    // The data is already a parsed object, no need for JSON.parse
    const { token } = JSON.parse(data);
    if (token && token.isLoggedIn) {
      return Promise.resolve({ result: { get: true, call: "*" } });
    }
    return Promise.resolve({ result: { get: false, call: "" } });
  }

  // @MessagePattern('auth.jwt.HeaderAuth')
  // async jwtHeaderAuth(@Body() data: any): Promise<any> {
  //   try {
  //     console.log('Received NATS message for: auth.jwt.HeaderAuth: ', JSON.parse(data));
  //     const { cid } = JSON.parse(data);
  //     console.log('Received NATS message for: auth.jwt.HeaderAuth with cid:', cid);
      
  //     // Prepare the payload in the format resgate expects

  //     this.natsClient.emit(`conn.${cid}.token`, { token: { isLoggedIn: true } });

  //     return Promise.resolve({ result: null });

  //   } catch (error) {
  //     return { result: { token: null } };
  //   }
  // }


  //@MessagePattern('access.auth.>')
  //async accessAuth(@Body() data: any): Promise<{ result: { get: boolean, call: string } }> {
  //  return Promise.resolve({ result: { get: true, call: "*" } });
  //}

  @MessagePattern('access.jwt')
  async accessJwt(@Body() data: any): Promise<{ result: { get: boolean, call: string } }> {
    return Promise.resolve({ result: { get: true, call: "*" } });
  }


  @MessagePattern('call.jwt.login')
  async authJwtLogin(@Body() data: any): Promise<any> {
    try {
      const { params } = JSON.parse(data);

      // Sostituisci questa logica con la tua reale autenticazione
      if (params && params.username === 'admin' && params.password === 'pass') {
        const { cid } = JSON.parse(data);
        
        // Prepare the payload in the format resgate expects
        
        this.natsClient.emit(`conn.${cid}.token`, { token: { isLoggedIn: true } });

        // Restituisce il token direttamente nel corpo della risposta
        return Promise.resolve({
          result: "Login Successful"
        });
      } else {
        return Promise.resolve({
          error: {
            code: 'auth.invalidCredentials',
            message: 'Invalid username or password',
          },
        });
      }
    } catch (error) {
      return {
        error: {
          code: 'auth.error',
          message: error.message,
        },
      };
    }
  }


  // ==========================================
  // DIAGNOSTIC & READ FUNCTIONS
  // ==========================================

  /**
   * Diagnostic info for the warehouse.
   * Returns a string with the warehouse ID and total product count.
   */
  @MessagePattern({ cmd: `getInventoryStatus.${process.env.WAREHOUSE_ID}` })
  async getInfo(): Promise<string> {
    const totalQuantity = await this.inventoryHandler.getTotal();
    return `Hello, I am warehouse '${process.env.WAREHOUSE_ID}' and I have ${totalQuantity} products`;
  }


  /**
   * Get a product by its ID.
   * Throws 404 if not found.
   */
  @MessagePattern(`get.warehouses.${process.env.WAREHOUSE_ID}`)
  async getProductById(@Payload("productsId") id: IdDto): Promise<any> {
    console.log(`Searching for product with ID: ${id.id} in warehouse ${process.env.WAREHOUSE_ID}`);
    const productString = await this.inventoryHandler.findProductById(id);
    console.log('Product found:', productString);
    try {
      return {
        "result": {
          "model": { data: productString }
        }
      }
    } catch (error) {
      return {
        "error": {
          "code": "system.notFound",
          "message": error.message
        }
      }
    }
  }

  /**
   * Get the full inventory for the warehouse.
   */
  @MessagePattern(`get.warehouse.inventory.${process.env.WAREHOUSE_ID}`)
  async getInventory() {
    try {
      const items = await this.inventoryHandler.getInventory();
      return {
        "result": {
          "model": { data: items }
        }
      };

    } catch (error) {
      return { error: error.message, status: 'failed' };
    }
  }

  //// ==========================================
  //// WRITE FUNCTIONS
  //// ==========================================
  //
  ///**
  // * Add a new product to the warehouse.
  // * Returns error if the product already exists.
  // */
  //@MessagePattern({ cmd: `addProduct.${process.env.WAREHOUSE_ID}` })
  //async addProduct(@Payload() newProduct: AddProductDto) {
  //  console.log(`Adding product to warehouse ${process.env.WAREHOUSE_ID}:`, newProduct);
  //  try {
  //    await this.inventoryHandler.addProduct(newProduct);
  //    return { success: true, message: `Product added to warehouse ${process.env.WAREHOUSE_ID}` };
  //  } catch (error) {
  //    return { error: error.message, status: 'failed' };
  //  }
  //}
  //
  ///**
  // * Remove a product from the warehouse by ID.
  // */
  //@MessagePattern({ cmd: `removeProduct.${process.env.WAREHOUSE_ID}`})
  //async removeProduct(@Payload() idDto: IdDto) {
  //  console.log(`Removing product from warehouse ${process.env.WAREHOUSE_ID}:`, idDto.id);
  //  
  //  try {
  //    await this.inventoryHandler.removeProduct(idDto);
  //    return { 
  //      success: true, 
  //      message: `Product ${idDto.id} removed from warehouse ${process.env.WAREHOUSE_ID}` 
  //    };
  //  } catch (error) {
  //    return { message: error.message, success:false, code:400};
  //  }
  //}
  //
  ///**
  // * Edit an existing product in the warehouse.
  // */
  //@MessagePattern({ cmd: `editProduct.${process.env.WAREHOUSE_ID}` })
  //async editProduct(@Payload() body: EditProductDto) {
  //  try {
  //    await this.inventoryHandler.editProduct(body);
  //    return {
  //      success: true,
  //      message: `Product ${body.id} edited in warehouse ${process.env.WAREHOUSE_ID}`,
  //    };
  //  } catch (error) {
  //    return { error: error.message, status: 'failed' };
  //  }
  //}
}
