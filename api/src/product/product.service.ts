import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { ProductDto } from './dtos/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(data: ProductDto): Promise<ProductDocument> {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async find(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, data: ProductDto): Promise<ProductDocument> {
    try {
      const updatedProduct = await this.productModel
        .findOneAndUpdate(
          { _id: id },
          { $set: data },
          { new: true }, // Return the updated document
        )
        .exec();

      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }

      return updatedProduct;
    } catch (error) {
      // Handle other potential errors, e.g., database errors
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async delete(id: string) {
    return this.productModel.deleteOne({ id }).exec();
  }
}
