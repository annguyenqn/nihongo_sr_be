import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'The email of the user.',
    example: 'admin@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user.',
    example: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'The firstName of the user.',
    example: 'firstname',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The lastName of the user.',
    example: 'lastName',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
