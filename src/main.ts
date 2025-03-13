import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser';
import * as express from "express";
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/winston-logger';
import { AllExceptionsFilter } from './logger/error.handling';

async function start() {
  try {
    const PORT = process.env.PORT ?? 3003;
    const app = await NestFactory.create<NestExpressApplication>(AppModule,{
      logger: WinstonModule.createLogger(winstonConfig)
      
    });

    // Statik fayllar uchun `public/` papkasini belgilash
    app.useStaticAssets(join(__dirname, "..", "public"));

    // Handlebars konfiguratsiyasi
    app.setBaseViewsDir(join(__dirname, "..", "views")); // `views/` papkasi asosiy katalog bo‘ladi
    app.setViewEngine("hbs"); 

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter())
    // app.setGlobalPrefix('api');
    app.enableCors({
      origin: (origin, callback) => {
        const allowedOrigins = [
          'http://localhost:8000',
          'http://localhost:3000',
          'http://skidkachi.uz',
          'http://api.skidkachi.uz',
          'http://skidkachi.vercel.app',
        ];
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle("Easy Travel project")
      .setDescription("Easy Travel Project REST API")
      .setVersion("1.0")
      .addTag("nestjs")
      .addBearerAuth()
      .build();
    const document = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
