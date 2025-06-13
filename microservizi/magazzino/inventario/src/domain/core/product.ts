export interface Product {
    addQuantity(qta: number): void;
    removeQuantity(qta: number): void;
    editMinQuantity(qtaMin: number): void;
    editMaxQuantity(qtaMax: number): void;
    
    getId(): string;
    getName(): string;
    getUnitPrice(): number;
    getQuantity(): number;
    getMinQuantity(): number;
    getMaxQuantity(): number;
    }