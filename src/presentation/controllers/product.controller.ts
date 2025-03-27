import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateProductDto } from 'src/application/dtos/create-product.dto';
import { CreateProductUseCase } from 'src/application/use-cases/create-product.usecase';
import { GetProductUseCase } from 'src/application/use-cases/get-product.usecase';
import { AuthGuard } from '@nestjs/passport';
import { GetProductsUseCase } from 'src/application/use-cases/get-products.usecase';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/application/services/s3.service';
import 'multer';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly s3Service: S3Service,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const imageUrl = await this.s3Service.uploadFile(file);
    createProductDto.picture_url = imageUrl;
    return await this.createProductUseCase.execute(createProductDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async get(@Param('id') id: string) {
    return await this.getProductUseCase.execute(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll() {
    return await this.getProductsUseCase.execute();
  }
}
