import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import { Logger } from '@nestjs/common';
import bodyParser from "body-parser";

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.raw({ type: 'application/json' }));

  app.use((req, res, next) => {
    const body = req.body
    if (Buffer.isBuffer(body)) {
      req.body = JSON.parse(body.toString())
      req.originalBody = body
    } else {
      req.body = {}
      req.originalBody = Buffer.alloc(0)
    }
    next()
  })

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
