import ProductEntity from "../../../domain/product/product.entity";
import PrismaProductRepository from "../../../infrastructure/db/repositories/prisma-product.repository";

export class CreateProductUseCase {
    constructor(
        private readonly productRepository: PrismaProductRepository,
    ) {
    }

    async execute(product: ProductEntity): Promise<ProductEntity> {
        return this.productRepository.save(product);
    }
}

export default CreateProductUseCase;
