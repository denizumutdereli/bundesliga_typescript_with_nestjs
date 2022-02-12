import { Module } from '@nestjs/common';
import { MatchsModule } from './matchs/matchs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { SeasonModule } from './season/seasons.module';
import { TeamModule } from './teams/teams.module';
import { FixtureModule } from './fixtures/fixtures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      //envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    MatchsModule,
    TeamModule,
    FixtureModule,
    SeasonModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = true; //configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? {
              rejectUnauthorized: false, callbackWaitsForEmptyEventLoop: false
            } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: encodeURIComponent(configService.get('DB_PASSWORD')),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
  ],
})
export class AppModule { }
