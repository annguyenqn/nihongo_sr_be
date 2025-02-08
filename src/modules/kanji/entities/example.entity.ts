import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vocab } from './vocab.entity';
import { Kanji } from './kanji.entity';

@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sentence: string;

  @Column()
  reading: string;

  @Column({ nullable: true })
  meaningVi?: string;

  @Column({ nullable: true })
  meaningEn?: string;

  @Column({ nullable: true })
  vocabId?: number;

  @Column({ nullable: true })
  kanjiId?: number;

  @ManyToOne(() => Vocab, (vocab) => vocab.examples, { nullable: true })
  vocab?: Vocab;

  @ManyToOne(() => Kanji, (kanji) => kanji.examples, { nullable: true })
  kanji?: Kanji;
}
