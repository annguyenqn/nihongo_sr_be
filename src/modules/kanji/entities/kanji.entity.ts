import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Example } from './example.entity';
import { UserKanjiRelation } from './user_kanji_relation.entity';
import { QuizGame } from './quiz_game.entity';
import { LearningHistory } from './learning_history.entity';

@Entity()
export class Kanji {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kanji: string;

  @Column('text', { array: true })
  kunReading: string[];

  @Column('text', { array: true })
  onReading: string[];

  @Column({ nullable: true })
  hanViet?: string;

  @Column({ nullable: true })
  meaningVi?: string;

  @Column({ nullable: true })
  meaningEn?: string;

  @Column({ nullable: true })
  radicals?: string;

  @Column({ nullable: true })
  strokes?: number;

  @Column({ nullable: true })
  level?: string;

  @OneToMany(() => Example, (example) => example.kanji)
  examples: Example[];

  @OneToMany(
    () => UserKanjiRelation,
    (userKanjiRelation) => userKanjiRelation.kanji,
  )
  progress: UserKanjiRelation[];

  @OneToMany(() => QuizGame, (quizGame) => quizGame.kanji)
  quiz: QuizGame[];

  @OneToMany(() => LearningHistory, (learningHistory) => learningHistory.kanji)
  learningHistory: LearningHistory[];
}
