import { InventoryHandlerService } from './inventoryHandler.service';
import { AddProductDto } from 'src/interfaces/http/dto/addProduct.dto';
import { EditProductDto } from 'src/interfaces/http/dto/editProduct.dto';
import { ConcreteProduct } from 'src/domain/core/concreteProduct';

// Mock del repository per isolare il servizio
const mockRepository = (): any => ({
  findById: jest.fn(),
  findAll: jest.fn(),
  addProduct: jest.fn(),
  removeById: jest.fn(),
  updateProduct: jest.fn(),
});

// Mock del client NATS
const mockNatsClient = {
  emit: jest.fn(),
};

//è una funzione fornita da Jest per raggruppare dei test correlati dove
//'InventoryHandlerService' è una stringa descrittiva, usata nei log di output per capire cosa si sta testando
//()=> è una funzione call back che si apre dopo {, e dentro andrai a scrivere tutti i singoli test
describe('InventoryHandlerService', () => {
  let service: InventoryHandlerService;
  let repo: any;

  //è una funzione speciale in Jest che esegue un blocco prima di ogni test individuale, all'interno di describe)
  //dato che non colleghiamo un vero database nella fase test, qui andremo a creare una versione finta del repository
  //con Jest per verificare il comportamento del servizio
  beforeEach(() => {
    repo = mockRepository();
    service = new InventoryHandlerService(repo, mockNatsClient as any);
  });

  //addProduct
  //Dentro al describe precedente, qui ora andiamo a organizzare i test legati ad una singola funzione
  describe('addProduct()', () => {

    //questo è il blocco che definisce un singolo test
    it('dovrebbe aggiungere un nuovo prodotto se non esiste', async () => {
      const dto: AddProductDto = {
        id: 1, name: 'Prova', unitPrice: 10, quantity: 0, minQuantity: 0, maxQuantity: 0
      };
      //simuliamo il mock e il comportamento del metodo findById del repo
      repo.findById.mockResolvedValue(null);

      //Semplicemente chiama il metodo reale addProduct() che abbiamo scritto passandoli oggetto dto creato
      await service.addProduct(dto);
      //Questo controlla se effettivamente addproduct() della repo sia stato chiamato
      //e fa la verifica finale del test in caso della mancanza della chiamata
      expect(repo.addProduct).toHaveBeenCalled();
    });

    //La teoria è sempre scritta sopra fa solo controlli diversi
    it('dovrebbe lanciare errore se il prodotto esiste già', async () => {
      repo.findById.mockResolvedValue({} as ConcreteProduct);
      const dto: AddProductDto = {
        id: 1, name: 'X', unitPrice: 5, quantity: 10, minQuantity: 1, maxQuantity: 100
      };
      await expect(service.addProduct(dto)).rejects.toThrow('Product already exists');
    });
  });

  // ✅ removeProduct
  describe('removeProduct()', () => {
    it('dovrebbe rimuovere il prodotto se esiste e quantità è 0', async () => {
      const product = {
        getQuantity: () => 0,
        getId: () => 1
      } as unknown as ConcreteProduct;

      repo.findById.mockResolvedValue(product);
      repo.removeById.mockResolvedValue(true);

      await expect(service.removeProduct({ id: 1 })).resolves.toBeUndefined();
      expect(mockNatsClient.emit).toHaveBeenCalledWith('stockRemoved', expect.any(Object));
    });

    it('dovrebbe lanciare errore se il prodotto non esiste', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.removeProduct({ id: 1 })).rejects.toThrow('Product not found');
    });

    it('dovrebbe lanciare errore se la quantità è maggiore di 0', async () => {
      //as unknown as ConcreteProduct è un doppio cast per far sì che TypeScript accetti che quell'oggetto sia di tipo
      //ConcreteProduct, perchè non vogliamo creare un oggetto ConcreteProduct vero perchè sono tanti parametri, quindi
      //usiamo questo trucco che a quanto pare viene spesso usato nei test, dove ci bastasono solo alcuni metodi fittizi
      const product = {
        getQuantity: () => 5,
        getId: () => 1
      } as unknown as ConcreteProduct;

      repo.findById.mockResolvedValue(product);
      //rejects è  perchè mi aspetto che questa chiamata asincrona fallisca
      //toThrow ci manda errore che sarebbe Quantity must be 0
      await expect(service.removeProduct({ id: 1 })).rejects.toThrow(/Quantity must be 0/);
    });

    it('dovrebbe rimuovere il prodotto se esiste e quantità è 0', async () => {
        const product = {
            getQuantity: () => 0,
            getId: () => 1
        } as unknown as ConcreteProduct;

        repo.findById.mockResolvedValue(product);
        repo.removeById.mockResolvedValue(true);

        //resolves è quando tutto va a buon fine
        await expect(service.removeProduct({ id: 1 })).resolves.toBeUndefined();
    });

    it('dovrebbe lanciare errore se removeById fallisce', async () => {
      const product = {
        getQuantity: () => 0,
        getId: () => 1
      } as unknown as ConcreteProduct;

      repo.findById.mockResolvedValue(product);
      repo.removeById.mockResolvedValue(false);

      await expect(service.removeProduct({ id: 1 })).rejects.toThrow('Failed to remove product from repository');
    });
  });

  // ✅ findProductById
  describe('findProductById()', () => {
    it('dovrebbe restituire il prodotto se esistente', async () => {
      const product = new ConcreteProduct(1, 'Prodotto', 10, 5, 1, 10);

      //simulo il comportamento del metodo findById della repo
      repo.findById.mockResolvedValue(product);
      //chiamo il metodo findProductById del service passando oggetto con id:1
      const result = await service.findProductById({ id: 1 });
      //Controlliamo che il risultato della funzione sia esattamente uguale all'oggetto product
      //il .toBe() perchè è un oggetto e vuoi che sia lo stesso oggetto in memoria
      expect(result).toBe(product);
    });
  });

  // ✅ getInventory
  describe('getInventory()', () => {
    it('dovrebbe restituire tutti i prodotti', async () => {
      const list = [
        new ConcreteProduct(1, 'Prodotto 1', 10, 5, 1, 10),
        new ConcreteProduct(2, 'Prodotto 2', 15, 3, 2, 8),
      ];
      repo.findAll.mockResolvedValue(list);
      const result = await service.getInventory();
      expect(result).toBe(list);
    });
  });

  // ✅ getTotal
  describe('getTotal()', () => {
    it('dovrebbe sommare le quantità di tutti i prodotti', async () => {
      const list = [
        { getQuantity: () => 3 },
        { getQuantity: () => 7 },
      ] as ConcreteProduct[];
      repo.findAll.mockResolvedValue(list);
      const total = await service.getTotal();
      expect(total).toBe(10);
    });
  });

  // ✅ editProduct
  describe('editProduct()', () => {
    it('dovrebbe aggiornare il prodotto se esiste', async () => {
      const existing = {
        getName: () => 'A',
        getUnitPrice: () => 1,
        getQuantity: () => 5,
        getMinQuantity: () => 0,
        getMaxQuantity: () => 10,
        getId: () => 1
      } as ConcreteProduct; //qui dato che stiamo creando un oggetto intero non ha senso doppio casting

      repo.findById.mockResolvedValue(existing);
      repo.updateProduct.mockResolvedValue(existing);

      await expect(service.editProduct({
        id: 1, quantity: 3, minQuantity: 1, maxQuantity: 10
      })).resolves.toBeUndefined();

      expect(mockNatsClient.emit).toHaveBeenCalledWith('stockEdited', expect.any(Object));
    });

    it('dovrebbe lanciare errore se il prodotto non esiste', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.editProduct({ id: 1 } as EditProductDto)).rejects.toThrow('Product not found');
    });
  });
});
