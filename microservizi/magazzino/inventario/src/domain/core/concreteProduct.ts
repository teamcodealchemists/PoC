import { Product } from './product';

export class ConcreteProduct implements Product {
  constructor(
    private id: number,
    private name: string,
    private unitPrice: number,
    private quantity: number,
    private minQuantity: number,
    private maxQuantity: number
  ) {}

  addQuantity(quantity: number): void {
    if (this.quantity + quantity > this.maxQuantity) throw new Error('Exceeds maximum limit');
    this.quantity += quantity;
  }

  removeQuantity(quantity: number): void {
    if (this.quantity - quantity < this.minQuantity) throw new Error('Below minimum limit');
    this.quantity -= quantity;
  }

  editMinQuantity(minQuantity: number): void {
    if (minQuantity < 0) throw new Error('Minimum quantity cannot be negative');
    this.minQuantity = minQuantity;
  }

  editMaxQuantity(maxQuantity: number): void {
    if (maxQuantity < 0) throw new Error('Maximum quantity cannot be negative');
    else if (maxQuantity < this.quantity) throw new Error('Maximum quantity cannot be less than current quantity');
    else if (maxQuantity < this.minQuantity) throw new Error('Maximum quantity cannot be less than minimum quantity');
    this.maxQuantity = maxQuantity;
  }

  getId(): string {
    return this.id.toString();
  }

  getName(): string {
    return this.name;
  }

  getUnitPrice(): number {
    return this.unitPrice;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getMinQuantity(): number {
    return this.minQuantity;
  }

  getMaxQuantity(): number {
    return this.maxQuantity;
  }
}
