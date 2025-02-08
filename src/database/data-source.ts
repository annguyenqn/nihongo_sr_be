import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { User } from '../modules/users/entities/user.entity';
import { MainSeeder } from './seeds/seeder';
import { KanjiSeeder } from './seeds/kanji.seeder';
import { Example } from '../modules/kanji/entities/example.entity';
import { Kanji } from '../modules/kanji/entities/kanji.entity';
import { LearningHistory } from '../modules/kanji/entities/learning_history.entity';
import { QuizGame } from '../modules/kanji/entities/quiz_game.entity';
import { UserKanjiRelation } from '../modules/kanji/entities/user_kanji_relation.entity';
import { UserVocabRelation } from '../modules/kanji/entities/user_vocab_relation.entity';
import { UserProgress } from '../modules/kanji/entities/user_progress.entity';
import { Vocab } from '../modules/kanji/entities/vocab.entity';
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
  entities: [
    User,
    Example,
    Kanji,
    LearningHistory,
    QuizGame,
    UserKanjiRelation,
    UserVocabRelation,
    UserProgress,
    Vocab,
  ],
  factories: [
    // ApartmentFactory,
    // ItemsFactory,
    // ServicePricingFactory,
  ],
  seeds: [MainSeeder, KanjiSeeder],
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
