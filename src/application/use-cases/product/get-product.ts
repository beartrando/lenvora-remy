import ProductEntity from "../../../domain/product/product.entity";
import ProductId from "../../../domain/product/value-objects/product-id.vo";
import ProductRepository from "../../../domain/product/product.repository";

export class GetProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
    ) {
    }

    async execute(id: ProductId): Promise<ProductEntity> {
        return this.productRepository.findById(id);
    }
}

export default GetProductUseCase;
