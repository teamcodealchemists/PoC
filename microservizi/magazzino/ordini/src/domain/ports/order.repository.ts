import { ConcreteInternalOrder } from "../core/concreteInternalOrder";
import { ConcreteExternalOrder } from "../core/concreteExternalOrder";
import { OrderState } from "../core/orderState.enum";

export type ConcreteOrder =
  | ConcreteInternalOrder
  | ConcreteExternalOrder;

export interface OrderRepository {
  getOrder(orderId: number): Promise<ConcreteOrder | null>;
  insertOrder(order: ConcreteOrder): Promise<ConcreteOrder>;
  cancelOrder(orderId: number): Promise<boolean>;
  setOrderState(orderId: number, newState: OrderState): Promise<boolean>;
  getAllOrders(): Promise<ConcreteOrder[]>;
}
