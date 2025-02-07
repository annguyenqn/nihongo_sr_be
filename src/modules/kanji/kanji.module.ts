import { Module } from '@nestjs/common';
import { KanjiService } from './kanji.service';
import { KanjiController } from './kanji.controller';

@Module({
  controllers: [KanjiController],
  providers: [KanjiService],
})
export class KanjiModule {}
