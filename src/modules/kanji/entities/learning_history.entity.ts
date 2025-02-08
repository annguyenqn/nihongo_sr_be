import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vocab } from './vocab.entity';
import { Kanji } from './kanji.entity';

@Entity()
export class LearningHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  vocabId: number;

  @Column({ nullable: true })
  kanjiId: number;

  @Column()
  reviewDate: Date;

  @Column()
  result: string;

  @Column()
  score: number;

  @ManyToOne(() => User, (user) => user.learningHistory)
  user: User;

  @ManyToOne(() => Vocab, (vocab) => vocab.learningHistory, { nullable: true })
  vocab?: Vocab;

  @ManyToOne(() => Kanji, (kanji) => kanji.learningHistory, { nullable: true })
  kanji?: Kanji;
}
