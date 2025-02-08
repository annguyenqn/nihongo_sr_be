import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Example } from './example.entity';
import { UserVocabRelation } from './user_vocab_relation.entity';
import { QuizGame } from './quiz_game.entity';
import { LearningHistory } from './learning_history.entity';

@Entity()
export class Vocab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vocab: string;

  @Column()
  hiragana: string;

  @Column({ nullable: true })
  meaningVi?: string;

  @Column({ nullable: true })
  meaningEn?: string;

  @Column({ nullable: true })
  lesson?: number;

  @Column({ nullable: true })
  level?: string;

  @Column({ nullable: true })
  wordType?: string;

  @OneToMany(() => Example, (example) => example.vocab)
  examples: Example[];

  @OneToMany(
    () => UserVocabRelation,
    (userVocabRelation) => userVocabRelation.vocab,
  )
  progress: UserVocabRelation[];

  @OneToMany(() => QuizGame, (quizGame) => quizGame.vocab)
  quiz: QuizGame[];

  @OneToMany(() => LearningHistory, (learningHistory) => learningHistory.vocab)
  learningHistory: LearningHistory[];
}
