import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login-dto';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'src/types/jwtPayload.type';
import { SignUpDto } from './dto/signup.dto';
import { MailService } from '../mail/mail.service';
// import { CodeAuthDto } from './dto/code-auth';
import * as dayjs from 'dayjs';
// import { hashPassword } from 'src/utils/helper';
import { ResetPasswordDto } from './dto/reset-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}
  createAccessToken(userId: number, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  createRefreshToken(userId: number, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_EXPIRES_REFRESH_IN,
    });
  }
  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { email, password, firstName, lastName } = signUpDto;
    const otp = this.generateOtp();
    const existingUser = await this.usersService.findEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const user = await this.usersService.createUser({
      email,
      password,
      firstName,
      lastName,
      codeId: otp,
      codeExpired: dayjs().add(30, 'seconds').toDate(),
    });

    // send confirmation mail
    await this.mailService.sendUserConfirmation(email, otp);
    return { _id: user.id };
  }

  async login(loginDto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    expireTime: string;
  }> {
    const { email, password } = loginDto;
    const user = await this.usersService.findEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email ');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = this.createAccessToken(user.id, user.email);
    const refreshToken = this.createRefreshToken(user.id, user.email);
    const expireTime = process.env.JWT_EXPIRES_IN;
    return { accessToken, refreshToken, expireTime };
  }

  async refreshTokens(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expireTime: string;
  }> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
      ) as string | JwtPayload;
      const user = await this.usersService.findEmail(
        (decoded as JwtPayload).email,
      );
      const newAccessToken = this.createAccessToken(user.id, user.email);
      const newRefreshToken = this.createRefreshToken(user.id, user.email);
      const expireTime = process.env.JWT_EXPIRES_REFRESH_IN;
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expireTime,
      };
    } catch (error) {
      throw new UnauthorizedException(
        'Refresh token is invalid or expired',
        error,
      );
    }
  }
  // async assignRole(userId: number, roleName: RoleName): Promise<void> {
  //   await this.usersService.addRole(userId, roleName);
  // }

  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // async verifyOtp(data: CodeAuthDto): Promise<any> {
  //   return this.usersService.handleActive(data);
  // }

  // async resendCode(id: number): Promise<any> {
  //   const user = await this.usersService.findUserById(+id);
  //   const otp = this.generateOtp();
  //   const codeExpired = dayjs().add(5, 'minutes').toDate();
  //   await this.usersService.updateUser(user.id, {
  //     ...user,
  //     codeId: otp,
  //     codeExpired: codeExpired,
  //   });
  //   await this.mailService.sendUserConfirmation(user.email, otp);
  // }

  async forgotPassword(email: string): Promise<any> {
    const user = await this.usersService.findEmail(email);
    if (user) {
      throw new ConflictException('User already exists');
    }
    const token = this.createAccessToken(user.id, user.email);

    // send confirmation mail
    await this.mailService.sendMailResetPassword({
      email: user.email,
      name: user.firstName,
      token,
    });
    return { message: 'Password reset email sent.' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
    const { password, token } = resetPasswordDto;

    const userId = await this.jwtService.verifyAsync(token); // Kiểm tra token và lấy userId

    if (!userId) {
      throw new BadRequestException('Invalid or expired token');
    }

    // const hashPw = await hashPassword(password);

    // const updatedUser = await this.usersService.updateUser(userId.id, hashPw);

    // if (!updatedUser) {
    //   throw new NotFoundException('User not found');
    // }

    return 'Password reset successfully';
  }
}
