/*eslint-disable */
import { NestFactory } from '@nestjs/core';

/*aws*/
import serverlessExpress from '@vendia/serverless-express'
import { Callback, Context, Handler } from 'aws-lambda';

import { AppModule } from './app.module';

let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    /*pipes will be here*/
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback) => {
    //checkign server initialized - avoiding rerendering
    server = server ?? (await bootstrap());
    return server(event, context, callback);
}