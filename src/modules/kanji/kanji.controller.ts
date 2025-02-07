import { Controller } from '@nestjs/common';
import { KanjiService } from './kanji.service';

@Controller('kanji')
export class KanjiController {
  constructor(private readonly kanjiService: KanjiService) {}
}
