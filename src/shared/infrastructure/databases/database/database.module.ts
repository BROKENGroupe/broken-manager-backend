import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from '../config';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [DatabaseModule.getDatabaseModule()],
    };
  }

  private static async getDatabaseModule(): Promise<DynamicModule> {
    const configService = new ConfigService();
    const databaseType = configService.get<string>('database.type', 'mongodb'); // Usa la configuración cargada

    switch (databaseType) {
      case 'mongodb':
        return {
          module: DatabaseModule,
          imports: [
            MongooseModule.forRootAsync({
                useFactory: (configService: ConfigType<typeof config>) => {
                  const {
                    connection,
                    user,
                    password,
                    host,
                    dbName,
                  } = configService.mongo;
                  return {
                    uri: `${connection}://${user}:${password}@${host}`,
                    user,
                    pass: password,
                    dbName,
                  };
                },
                inject: [config.KEY],
              }),
          ],
          exports: [MongooseModule],
        };
      default:
        throw new Error(`Unsupported DATABASE_TYPE: ${databaseType}`);
    }
  }
}
