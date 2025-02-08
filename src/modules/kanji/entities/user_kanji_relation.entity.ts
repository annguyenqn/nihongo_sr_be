import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Kanji } from './kanji.entity';
import { UserProgress } from './user_progress.entity';

@Entity()
export class UserKanjiRelation {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  kanjiId: number;

  @PrimaryColumn()
  progressId: number;

  @ManyToOne(() => User, (user) => user.kanjiRelations)
  user: User;

  @ManyToOne(() => Kanji, (kanji) => kanji.progress)
  kanji: Kanji;

  @ManyToOne(() => UserProgress, (userProgress) => userProgress.kanjiRelations)
  progress: UserProgress;
}
