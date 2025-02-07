import {
  Controller,
  Post,
  Body,
  // UseGuards,
  // Param,
  Patch,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { Public } from 'src/common/decorator/public.decorator';
import { SignUpDto } from './dto/signup.dto';
// import { RolesGuard } from './guard/role.guard';
// import { Roles } from 'src/common/decorator/Roles.decorator';
// import { RoleName } from '../../common/enums/role-name.enum';
// import { CodeAuthDto } from './dto/code-auth';
import { ResetPasswordDto } from './dto/reset-password';
import { Request } from 'express';
import { UserService } from '../users/user.service';
@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: SignUpDto })
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string' },
      },
      required: ['refreshToken'],
    },
  })
  refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  // @UseGuards(RolesGuard)
  // @Roles(RoleName.ADMIN)
  // @Post('assign-role/:userId')
  // async assignRole(
  //   @Param('userId') userId: number,
  //   @Body('role') role: RoleName,
  // ) {
  //   return this.authService.assignRole(userId, role);
  // }

  // @Public()
  // @ApiOperation({ summary: 'Verify otp' })
  // @ApiBody({ type: SignUpDto })
  // @Post('verify-otp')
  // async verifyOtp(@Body() data: CodeAuthDto) {
  //   return await this.authService.verifyOtp(data);
  // }

  @Get('me')
  async getMe(@Req() request: Request) {
    const userID = request.user?.['userId'];
    const userIf = await this.userService.findUserById(userID);
    return userIf;
  }

  // @Post('resend-code')
  // @ApiBody({ type: String, description: 'User ID' })
  // @Public()
  // async resendCode(@Body('id') id: string) {
  //   return await this.authService.resendCode(+id);
  // }

  @Post('forgot-password')
  @ApiBody({ type: String, description: 'Email' })
  @Public()
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Patch('reset-password')
  @ApiBody({ type: String, description: 'password' })
  @Public()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}
