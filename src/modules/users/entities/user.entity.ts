import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserProgress } from '../../kanji/entities/user_progress.entity';
import { UserVocabRelation } from '../../kanji/entities/user_vocab_relation.entity';
import { UserKanjiRelation } from '../../kanji/entities/user_kanji_relation.entity';
import { QuizGame } from '../../kanji/entities/quiz_game.entity';
import { LearningHistory } from '../../kanji/entities/learning_history.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  // Quan hệ với UserProgress (OneToMany)
  @OneToMany(() => UserProgress, (userProgress) => userProgress.user)
  progress: UserProgress[];

  // Quan hệ với UserVocabRelation (OneToMany)
  @OneToMany(
    () => UserVocabRelation,
    (userVocabRelation) => userVocabRelation.user,
  )
  vocabRelations: UserVocabRelation[];

  // Quan hệ với UserKanjiRelation (OneToMany)
  @OneToMany(
    () => UserKanjiRelation,
    (userKanjiRelation) => userKanjiRelation.user,
  )
  kanjiRelations: UserKanjiRelation[];

  // Quan hệ với QuizGame (OneToMany)
  @OneToMany(() => QuizGame, (quizGame) => quizGame.user)
  quizGames: QuizGame[];

  // Quan hệ với LearningHistory (OneToMany)
  @OneToMany(() => LearningHistory, (learningHistory) => learningHistory.user)
  learningHistory: LearningHistory[];
}
