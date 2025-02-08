import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1738999766871 implements MigrationInterface {
  name = 'SchemaUpdate1738999766871';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_kanji_relation" ("userId" integer NOT NULL, "kanjiId" integer NOT NULL, "progressId" integer NOT NULL, CONSTRAINT "PK_2f018756cc38760f8635657e4ae" PRIMARY KEY ("userId", "kanjiId", "progressId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "quiz_game" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "vocabId" integer, "kanjiId" integer, "question" character varying NOT NULL, "type" character varying NOT NULL, "correctAnswer" character varying NOT NULL, "options" text array NOT NULL, "userAnswer" character varying, "isCorrect" boolean, "score" integer NOT NULL DEFAULT '0', "timestamp" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dd15fda9924eaca7bf9159b766b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "learning_history" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "vocabId" integer, "kanjiId" integer, "reviewDate" TIMESTAMP NOT NULL, "result" character varying NOT NULL, "score" integer NOT NULL, CONSTRAINT "PK_6a044d787de4fcf11dd655f9b40" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "kanji" ("id" SERIAL NOT NULL, "kanji" character varying NOT NULL, "kunReading" text array NOT NULL, "onReading" text array NOT NULL, "hanViet" character varying, "meaningVi" character varying, "meaningEn" character varying, "radicals" character varying, "strokes" integer, "level" character varying, CONSTRAINT "PK_86badca2d76e3280d4314bdc664" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "example" ("id" SERIAL NOT NULL, "sentence" character varying NOT NULL, "reading" character varying NOT NULL, "meaningVi" character varying, "meaningEn" character varying, "vocabId" integer, "kanjiId" integer, CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vocab" ("id" SERIAL NOT NULL, "vocab" character varying NOT NULL, "hiragana" character varying NOT NULL, "meaningVi" character varying, "meaningEn" character varying, "lesson" integer, "level" character varying, "wordType" character varying, CONSTRAINT "PK_d1197630794f83a321d18352e43" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_vocab_relation" ("userId" integer NOT NULL, "vocabId" integer NOT NULL, "progressId" integer NOT NULL, CONSTRAINT "PK_08400680f3e5a1f8604d844e67c" PRIMARY KEY ("userId", "vocabId", "progressId"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_progress" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "reviewDate" TIMESTAMP NOT NULL, "lastReviewDate" TIMESTAMP NOT NULL, "easeFactor" double precision NOT NULL, "interval" integer NOT NULL, "repetitions" integer NOT NULL, "memoryScore" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'new', CONSTRAINT "PK_7b5eb2436efb0051fdf05cbe839" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_kanji_relation" ADD CONSTRAINT "FK_4361c390f1291337802d3fb672d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_kanji_relation" ADD CONSTRAINT "FK_9ea01b6198dbcb7fa47cea876d7" FOREIGN KEY ("kanjiId") REFERENCES "kanji"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_kanji_relation" ADD CONSTRAINT "FK_b92d1acf79183d52b5d91a2da65" FOREIGN KEY ("progressId") REFERENCES "user_progress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz_game" ADD CONSTRAINT "FK_767b9f38333d2c42b74b0685960" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz_game" ADD CONSTRAINT "FK_5420b82c6d9c47ffbb18ee87bda" FOREIGN KEY ("vocabId") REFERENCES "vocab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz_game" ADD CONSTRAINT "FK_37a61c768ff5db91cb72d8069f6" FOREIGN KEY ("kanjiId") REFERENCES "kanji"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "learning_history" ADD CONSTRAINT "FK_7e21ca9ffc79a56324d5e0ddc39" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "learning_history" ADD CONSTRAINT "FK_aeb3960533061e277cdf49bf913" FOREIGN KEY ("vocabId") REFERENCES "vocab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "learning_history" ADD CONSTRAINT "FK_fff3baee0ee490d02c0d46fff45" FOREIGN KEY ("kanjiId") REFERENCES "kanji"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ADD CONSTRAINT "FK_e388a418b07f223f18b80aa2f7e" FOREIGN KEY ("vocabId") REFERENCES "vocab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" ADD CONSTRAINT "FK_6da1006f4a2951f43cbbf29dc5c" FOREIGN KEY ("kanjiId") REFERENCES "kanji"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vocab_relation" ADD CONSTRAINT "FK_3058554a2d83c155dd8df321e0e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vocab_relation" ADD CONSTRAINT "FK_3d02d6c42471536b82fd7de3a07" FOREIGN KEY ("vocabId") REFERENCES "vocab"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vocab_relation" ADD CONSTRAINT "FK_2fdbe83bc66c7f75a082ec3f8fe" FOREIGN KEY ("progressId") REFERENCES "user_progress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_progress" ADD CONSTRAINT "FK_b5d0e1b57bc6c761fb49e79bf89" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_progress" DROP CONSTRAINT "FK_b5d0e1b57bc6c761fb49e79bf89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vocab_relation" DROP CONSTRAINT "FK_2fdbe83bc66c7f75a082ec3f8fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vocab_relation" DROP CONSTRAINT "FK_3d02d6c42471536b82fd7de3a07"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_vocab_relation" DROP CONSTRAINT "FK_3058554a2d83c155dd8df321e0e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" DROP CONSTRAINT "FK_6da1006f4a2951f43cbbf29dc5c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "example" DROP CONSTRAINT "FK_e388a418b07f223f18b80aa2f7e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "learning_history" DROP CONSTRAINT "FK_fff3baee0ee490d02c0d46fff45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "learning_history" DROP CONSTRAINT "FK_aeb3960533061e277cdf49bf913"`,
    );
    await queryRunner.query(
      `ALTER TABLE "learning_history" DROP CONSTRAINT "FK_7e21ca9ffc79a56324d5e0ddc39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz_game" DROP CONSTRAINT "FK_37a61c768ff5db91cb72d8069f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz_game" DROP CONSTRAINT "FK_5420b82c6d9c47ffbb18ee87bda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "quiz_game" DROP CONSTRAINT "FK_767b9f38333d2c42b74b0685960"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_kanji_relation" DROP CONSTRAINT "FK_b92d1acf79183d52b5d91a2da65"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_kanji_relation" DROP CONSTRAINT "FK_9ea01b6198dbcb7fa47cea876d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_kanji_relation" DROP CONSTRAINT "FK_4361c390f1291337802d3fb672d"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "user_progress"`);
    await queryRunner.query(`DROP TABLE "user_vocab_relation"`);
    await queryRunner.query(`DROP TABLE "vocab"`);
    await queryRunner.query(`DROP TABLE "example"`);
    await queryRunner.query(`DROP TABLE "kanji"`);
    await queryRunner.query(`DROP TABLE "learning_history"`);
    await queryRunner.query(`DROP TABLE "quiz_game"`);
    await queryRunner.query(`DROP TABLE "user_kanji_relation"`);
  }
}
