import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: 'The code OTP of the user',
    example: '123456',
  })
  @IsOptional()
  @IsString()
  codeId?: string;

  @IsString()
  @IsOptional()
  codeExpired?: Date;
}
