import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from '../modules/users/entities/user.entity';
import { MainSeeder } from './seeds/seeder';
// import { ApartmentFactory } from './factories/apartment.factory';
// import { ItemsFactory } from './factories/items.factory';
// import { ServicePricingFactory } from './factories/servicePricing.factory';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  factories: [
    // ApartmentFactory,
    // ItemsFactory,
    // ServicePricingFactory,
  ],
  seeds: [MainSeeder],
  migrations: ['./src/migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(AppDataSourceOptions);

AppDataSource.initialize()
  .then(async () => {
    console.log('Connection to database established successfully!');
    await AppDataSource.synchronize(true);
    await runSeeders(AppDataSource);
    process.exit();
  })
  .catch((error) => console.log(error));
