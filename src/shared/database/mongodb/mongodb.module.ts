// import { Module, Global } from '@nestjs/common';
// import { ConfigType } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { MongoClient } from 'mongodb';

// import config from '../config';

// const API_KEY = '12345634';
// const API_KEY_PROD = 'PROD1212121SA';

// // const taskCollection = database.collection('tasks');
// // const tasks = await taskCollection.find().toArray();

// @Global()
// @Module({
//   imports: [
//     // MongooseModule.forRoot('mongodb://localhost:27017', {
//     //   user: 'root',
//     //   pass: 'root',
//     //   dbName: 'platzi-store',
//     // }),
//     MongooseModule.forRootAsync({
//       useFactory: (configService: ConfigType<typeof config>) => {
//         const {
//           connection,
//           user,
//           password,
//           host,
//           port,
//           dbName,
//         } = configService.mongo;
//         return {
//           uri: `mongodb+srv://davidvel2020:9QU7VusdQTvGvLkZ@cluster0.m8ulacw.mongodb.net/`,
//           //uri: `${connection}://${host}:${port}`,
//           user,
//           pass: password,
//           dbName,
//         };
//       },
//       inject: [config.KEY],
//     }),
//   ],
//   providers: [
//     {
//       provide: 'API_KEY',
//       useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
//     },
//     {
//       provide: 'MONGO',
//       useFactory: async (configService: ConfigType<typeof config>) => {
//         const {
//           connection,
//           user,
//           password,
//           host,
//           port,
//           dbName,
//         } = configService.mongo;
//         //const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
//         const uri = `mongodb+srv://davidvel2020:9QU7VusdQTvGvLkZ@cluster0.m8ulacw.mongodb.net/`;
//         const client = new MongoClient(uri);
//         await client.connect();
//         //const database = client.db(dbName);
//         const database = client.db('manager_broken_projects');
//         return database;
//       },
//       inject: [config.KEY],
//     },
//   ],
//   exports: ['API_KEY', 'MONGO', MongooseModule],
// })
// export class MongodbModule { }

import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    // Usamos MongooseModule para manejar la conexión
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { user, password, host, dbName } = configService.mongo;

        // Componemos la URI de conexión de MongoDB desde las variables de entorno o configuración
        const uri = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;

        return {
          uri,  // La URI dinámica para la conexión
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY', MongooseModule],  // Exponemos MongooseModule para ser utilizado en otros módulos
})
export class MongodbModule {}
