import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ProductDto } from './dtos/product.dto';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('product')
// @UseGuards(JwtGuard)

export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createPost(@Body() data: ProductDto) {
    console.log(data);
    return this.productService.create(data);
  }

  @Get()
  findProducts() {
    return this.productService.findAll();
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.find(id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() data: ProductDto) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
