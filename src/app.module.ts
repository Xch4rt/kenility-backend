import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './infrastructure/config/database.config';
import { ProductSchema } from './infrastructure/persistence/mongoose/product.schema';
import { OrderSchema } from './infrastructure/persistence/mongoose/order.schema';
import { UserSchema } from './infrastructure/persistence/mongoose/user.schema';
import { ProductRepository } from './infrastructure/persistence/mongoose/product.repository';
import { OrderRepository } from './infrastructure/persistence/mongoose/order.repository';
import { UserRepository } from './infrastructure/persistence/mongoose/user.repository';
import { JwtStrategy } from './infrastructure/security/jwt.strategy';
import { FileStorageService } from './infrastructure/file-upload/file-storage.service';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { GetProductUseCase } from './application/use-cases/get-product.usecase';
import { CreateOrderUseCase } from './application/use-cases/create-order.usecase';
import { UpdateOrderUseCase } from './application/use-cases/update-order.usecase';
import { GetTotalSoldPriceUseCase } from './application/use-cases/get-total-sold-price.usecase';
import { GetHighestAmountOrderUseCase } from './application/use-cases/get-highest-amount-order.usecase';
import { RegisterUserUseCase } from './application/use-cases/register-use.usecase';
import { LoginUserUseCase } from './application/use-cases/login-user.usecase';
import { OrderDomainService } from './domain/services/order.service';
import { UserDomainService } from './domain/services/user.service';
import { ProductDomainService } from './domain/services/product.service';
import { ProductController } from './presentation/controllers/product.controller';
import { OrderController } from './presentation/controllers/order.controller';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri:
          config.get<string>(databaseConfig.uri!) ||
          'mongodb://localhost:27017/default-db',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ProductController, OrderController, UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UserService,
    ProductRepository,
    OrderRepository,
    UserRepository,
    JwtStrategy,
    FileStorageService,
    CreateProductUseCase,
    GetProductUseCase,
    CreateOrderUseCase,
    UpdateOrderUseCase,
    GetTotalSoldPriceUseCase,
    GetHighestAmountOrderUseCase,
    RegisterUserUseCase,
    LoginUserUseCase,
    OrderDomainService,
    UserDomainService,
    ProductDomainService,
  ],
})
export class AppModule {}
