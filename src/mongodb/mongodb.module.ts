import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      process.env.CYCLIC_DB ||
        'mongodb+srv://mrkornthiwa:Kornthiwa@cluster0.bbkm0eg.mongodb.net/Product',
    ),
  ],
})
export class MongodbModule {}
