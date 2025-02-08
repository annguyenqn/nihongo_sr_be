import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserVocabRelation } from './user_vocab_relation.entity';
import { UserKanjiRelation } from './user_kanji_relation.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  reviewDate: Date;

  @Column()
  lastReviewDate: Date;

  @Column('float')
  easeFactor: number;

  @Column('int')
  interval: number;

  @Column('int')
  repetitions: number;

  @Column('int', { default: 0 })
  memoryScore: number;

  @Column('varchar', { default: 'new' })
  status: string;

  // Quan hệ với bảng User
  @ManyToOne(() => User, (user) => user.progress)
  user: User;

  // Quan hệ với bảng UserVocabRelation
  @OneToMany(
    () => UserVocabRelation,
    (userVocabRelation) => userVocabRelation.progress,
  )
  vocabRelations: UserVocabRelation[];

  // Quan hệ với bảng UserKanjiRelation
  @OneToMany(
    () => UserKanjiRelation,
    (userKanjiRelation) => userKanjiRelation.progress,
  )
  kanjiRelations: UserKanjiRelation[];
}
