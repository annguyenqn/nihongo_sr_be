import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'The reset token' })
  @IsNotEmpty()
  token: string;

  @ApiProperty({ description: 'The new password' })
  @IsNotEmpty()
  password: string;
}
