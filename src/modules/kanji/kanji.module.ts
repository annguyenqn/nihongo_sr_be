import { Module } from '@nestjs/common';
import { KanjiService } from './kanji.service';
import { KanjiController } from './kanji.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Example } from './entities/example.entity';
import { Kanji } from './entities/kanji.entity';
import { LearningHistory } from './entities/learning_history.entity';
import { QuizGame } from './entities/quiz_game.entity';
import { UserKanjiRelation } from './entities/user_kanji_relation.entity';
import { UserVocabRelation } from './entities/user_vocab_relation.entity';
import { UserProgress } from './entities/user_progress.entity';
import { Vocab } from './entities/vocab.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Vocab,
      Example,
      Kanji,
      LearningHistory,
      QuizGame,
      UserKanjiRelation,
      UserVocabRelation,
      UserProgress,
    ]),
  ],
  controllers: [KanjiController],
  providers: [KanjiService],
})
export class KanjiModule {}
