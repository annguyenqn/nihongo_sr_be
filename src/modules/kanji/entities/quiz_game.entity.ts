import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vocab } from './vocab.entity';
import { Kanji } from './kanji.entity';

@Entity()
export class QuizGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  vocabId: number;

  @Column({ nullable: true })
  kanjiId: number;

  @Column()
  question: string;

  @Column()
  type: string;

  @Column()
  correctAnswer: string;

  @Column('text', { array: true })
  options: string[];

  @Column({ nullable: true })
  userAnswer: string;

  @Column({ nullable: true })
  isCorrect: boolean;

  @Column({ default: 0 })
  score: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(() => User, (user) => user.quizGames)
  user: User;

  @ManyToOne(() => Vocab, (vocab) => vocab.quiz, { nullable: true })
  vocab?: Vocab;

  @ManyToOne(() => Kanji, (kanji) => kanji.quiz, { nullable: true })
  kanji?: Kanji;
}
