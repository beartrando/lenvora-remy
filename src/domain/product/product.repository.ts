import ProductEntity from "./product.entity";
import ProductId from "./value-objects/product-id.vo";

export interface ProductRepository {
    save(product: ProductEntity): Promise<ProductEntity>;
    findById(id: ProductId): Promise<ProductEntity>;
}

export default ProductRepository;
