import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleName } from 'src/common/enums/role-name.enum';

export class roleDto {
  @IsEnum(RoleName)
  @ApiProperty({
    enum: RoleName,
    example: RoleName.ADMIN,
  })
  role: RoleName;
}
