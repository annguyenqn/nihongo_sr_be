// src/database/seeds/kanji.seeder.ts
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Kanji } from '../../modules/kanji/entities/kanji.entity';
import { Example } from '../../modules/kanji/entities/example.entity';
import { KanjiSeedData } from './data_kanji_seed/kanjiItems';

export class KanjiSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('🔄 Checking existing Kanji in the database...');

    // 1️⃣ Fetch existing Kanji records to avoid duplicates
    const kanjiRepository = dataSource.getRepository(Kanji);
    const existingKanji = await kanjiRepository.find({
      select: ['kanji', 'id'],
    });

    // Convert to a map for quick lookup
    const existingKanjiSet = new Map(existingKanji.map((k) => [k.kanji, k.id]));

    // 2️⃣ Filter out already existing Kanji
    const newKanjiItems = KanjiSeedData.filter(
      (item) => !existingKanjiSet.has(item.kanji)
    );

    console.log(`🔍 Found ${newKanjiItems.length} new Kanji to insert.`);

    // 3️⃣ Insert new Kanji records
    for (const kanjiItem of newKanjiItems) {
      const kanji = new Kanji();
      kanji.kanji = kanjiItem.kanji;
      kanji.kunReading = kanjiItem.kun_reading;
      kanji.onReading = kanjiItem.on_reading;
      kanji.hanViet = kanjiItem.han_viet;
      kanji.meaningVi = kanjiItem.meaning_vi;
      kanji.meaningEn = kanjiItem.meaning_en;
      kanji.radicals = kanjiItem.radicals;
      kanji.strokes = kanjiItem.strokes;
      kanji.level = kanjiItem.level;

      // Save new Kanji into the database
      const insertedKanji = await kanjiRepository.save(kanji);

      console.log(`✅ Inserted Kanji: ${kanjiItem.kanji}`);

      // Store the new ID for inserting examples
      existingKanjiSet.set(insertedKanji.kanji, insertedKanji.id);
    }

    // 4️⃣ Insert related Example records
    const exampleData = KanjiSeedData.flatMap((kanjiItem) =>
      kanjiItem.examples.map((example) => ({
        sentence: example.sentence,
        reading: example.reading,
        meaningVi: example.meaning_vi,
        meaningEn: example.meaning_en,
        kanjiId: existingKanjiSet.get(kanjiItem.kanji),
      })),
    );

    if (exampleData.length > 0) {
      const exampleRepository = dataSource.getRepository(Example);
      await exampleRepository.save(exampleData);
      console.log(`✅ Inserted ${exampleData.length} Example records.`);
    } else {
      console.log('⚠️ No new Example records to insert.');
    }
  }
}
