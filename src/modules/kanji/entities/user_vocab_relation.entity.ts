import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Vocab } from './vocab.entity';
import { UserProgress } from './user_progress.entity';

@Entity()
export class UserVocabRelation {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  vocabId: number;

  @PrimaryColumn()
  progressId: number;

  @ManyToOne(() => User, (user) => user.vocabRelations)
  user: User;

  @ManyToOne(() => Vocab, (vocab) => vocab.progress)
  vocab: Vocab;

  @ManyToOne(() => UserProgress, (userProgress) => userProgress.vocabRelations)
  progress: UserProgress;
}
