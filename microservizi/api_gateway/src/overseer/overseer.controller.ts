import {
    Controller,
    Inject,
    Post,
    Patch,
    Body,
    Get,
    Param,
    HttpException,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';

// Import dei DTO necessari per le operazioni
import { IdDto } from './dto/productId.dto';
import { OrderStateDto } from './dto/orderState.dto';
import { AddProductDto } from './dto/addProduct.dto';
import { EditProductDto } from './dto/editProduct.dto';
import { WarehouseIdDto } from './dto/warehouseId.dto';
import { lastValueFrom } from 'rxjs';
import { AddInternalOrderDto } from './dto/addInternalOrder.dto';
import { AddExternalOrderDto } from './dto/addExternalOrder.dto';


@Controller()
export class OverseerController {
    constructor(@Inject('natsService') private natsClient: ClientProxy) { }

    //------------------------------------------
    //
    // API relative alla gestione dell'INVENTARIO dei magazzini
    //
    //------------------------------------------

    //TODO: Rimuove in quanto noi controlliamo a livello aggregato e non nel singolo magazzino (Solo test per ora)
    @Get('product/:id')
    async getProduct(@Param() idDto: IdDto): Promise<any> {

        const pattern = { cmd: 'getProduct' };
        const payload = { id: idDto.id };

        try {
            return await lastValueFrom(this.natsClient.send(pattern, payload));
        } catch (error) {
            // Se l'errore arriva da RpcException, avrà error.code e error.message
            if (error.code === 404) {
                throw new HttpException('Product not found', 404);
            } else {
                throw new HttpException('Error fetching product', 500);
            }
        }
    }

    //Andiamo a creare un nuovo prodotto in un magazzino specifico
    @Post('addProduct/:warehouseId')
    async addProduct(@Param() warehouseId: WarehouseIdDto, @Body() newProduct: AddProductDto) {
        const pattern = { cmd: `addProduct.${warehouseId.warehouseId}` };
        try {
            const response = await lastValueFrom(this.natsClient.send(pattern, newProduct));
            if (response?.success) return response;
            throw new HttpException(response?.message || 'Unknown response from warehouse service', response?.code || 500);
        } catch (error) {
            throw new HttpException(error?.message || 'Error adding product', error?.code || 500);
        }
    }

    //Andiamo a modificare un prodotto in un magazzino specifico
    @Patch('editProduct/:warehouseId')
    async editProduct(@Param() warehouseId: WarehouseIdDto, @Body() updatedProduct: EditProductDto) {
        const pattern = { cmd: `editProduct.${warehouseId.warehouseId}` };
        if (updatedProduct.quantity === undefined && updatedProduct.minQuantity === undefined && updatedProduct.maxQuantity === undefined) {
            throw new HttpException('At least one field must be provided for editing', 400);
        }
        else {
            try {
                const response = await lastValueFrom(this.natsClient.send(pattern, updatedProduct));
                if (response?.success) return response;
                throw new HttpException(response?.message || 'Unknown response from warehouse service', response?.code || 500);
            } catch (error) {
                throw new HttpException(error?.message || 'Error editing product', error?.code || 500);
            }
        }
    }

    //------------------------------------------
    //
    // API relative alla gestione degli ORDINI dei magazzini
    //
    //------------------------------------------

    //TODO: Rimuovere get per quando avremo gli ordini aggregati

    //------------------DA RIMUOVERE IN RELEASE------------------------------------------------------------------------------------------------------------------------

    @Get('getInternalOrders/:warehouseId')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getInternalOrders(@Param('warehouseId') warehouseId: string) {
        const pattern = { cmd: `getInternalOrders.${warehouseId}` };
        try {
            return await lastValueFrom(this.natsClient.send(pattern, {}));
        } catch (error) {
            throw new HttpException(error?.message || 'Error fetching internal orders', error?.code || 500);
        }
    }

    @Get('getExternalOrders/:warehouseId')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getExternalOrders(@Param('warehouseId') warehouseId: string) {
        const pattern = { cmd: `getExternalOrders.${warehouseId}` };
        try {
            return await lastValueFrom(this.natsClient.send(pattern, {}));
        } catch (error) {
            throw new HttpException(error?.message || 'Error fetching external orders', error?.code || 500);
        }
    }

    @Get('getInternalOrderById/:warehouseId/:id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getInternalOrderById(
        @Param('warehouseId') warehouseId: string,
        @Param('id') id: string
    ) {
        const idDto: IdDto = { id: Number(id) };
        const pattern = { cmd: `getInternalOrderById.${warehouseId}` };
        try {
            return await lastValueFrom(this.natsClient.send(pattern, idDto));
        } catch (error) {
            throw new HttpException(error?.message || 'Error fetching internal order', error?.code || 500);
        }
    }

    @Get('getExternalOrderById/:warehouseId/:orderId')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getExternalOrderById(
        @Param('warehouseId') warehouseId: string,
        @Param('orderId') orderId: string
    ) {
        const idDto: IdDto = { id: Number(orderId) };
        const pattern = { cmd: `getExternalOrderById.${warehouseId}` };
        try {
            return await lastValueFrom(this.natsClient.send(pattern, idDto));
        } catch (error) {
            throw new HttpException(error?.message || 'Error fetching external order', error?.code || 500);
        }
    }

    @Get('getOrderDetails/:warehouseId/:id')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async getOrderDetails(
        @Param('warehouseId') warehouseId: string,
        @Param('id') id: string
    ) {
        const idDto: IdDto = { id: Number(id) };
        const pattern = { cmd: `getOrderDetails.${warehouseId}` };
        const payload = { id: idDto.id };
        try {
            return await lastValueFrom(this.natsClient.send(pattern, payload));
        } catch (error) {
            throw new HttpException(error?.message || 'Error fetching order details', error?.code || 500);
        }
    }

    //------------------------------------------------------------------------------------------------------------------------------------------

    @Post('addInternalOrder')
    async addInternalOrder(@Body() order: AddInternalOrderDto) {
        const pattern = { cmd: `addInternalOrder.${order.warehouseDeparture}` };
        try {
            const response = await lastValueFrom(this.natsClient.send(pattern, order));
            if (response?.error) {
                throw new HttpException(response?.error || 'Error adding internal order', response?.code || 500);
            }
            return response;
        } catch (error) {
            throw new HttpException(error?.message || 'Error adding internal order', error?.code || 500);
        }
    }

    @Post('addExternalOrder')
    async addExternalOrder(@Body() order: AddExternalOrderDto) {
        const pattern = { cmd: `addExternalOrder.${order.warehouseDeparture}` };
        try {
            const response = await lastValueFrom(this.natsClient.send(pattern, order));
            return response;
        } catch (error) {
            throw new HttpException(error?.message || 'Error adding external order', error?.code || 500);
        }
    }

    @Patch('setInternalOrderState/:warehouseId')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
    async setInternalOrderState(
        @Param('warehouseId') warehouseId: string,
        @Body() body: { id: IdDto; newState: OrderStateDto}
    ) {
        const pattern = { cmd: `setInternalOrderState.${warehouseId}` };
        const payload = {
            id: body.id,
            state: body.newState
        };
        console.log('setInternalOrderState called with:', body.id, body.newState);
        
        try {
            const response = await lastValueFrom(this.natsClient.send(pattern, payload));
            return response;
        } catch (error) {
            throw new HttpException(error?.message || 'Error setting internal order state', error?.code || 500);
        }
    }

    @Patch('setExternalOrderState/:warehouseId')
    async setExternalOrderState(
        @Param('warehouseId') warehouseId: string,
        @Body() data: { idDto: IdDto; orderStateDto: OrderStateDto }
    ) {
        const pattern = { cmd: `setExternalOrderState.${warehouseId}` };
        try {
            return await lastValueFrom(this.natsClient.send(pattern, data));
        } catch (error) {
            throw new HttpException(error?.message || 'Error setting external order state', error?.code || 500);
        }
    }
}