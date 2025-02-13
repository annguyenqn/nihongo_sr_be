import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from 'src/utils/helper';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { GetUsersQueryDto } from './dto/get-user.dto';
import { GetUsersResponseDto } from './dto/get-user-res.dto';
// import { RoleName } from '../../common/enums/role-name.enum';
// import { CodeAuthDto } from '../auth/dto/code-auth';
// import * as dayjs from 'dayjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return false;
    }
    return true;
  }
  async findEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (user) {
      return user;
    }
    return null;
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist) {
      throw new ConflictException(`User with email ${email} already exists`);
    }
    const hashPass = await hashPassword(password);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashPass,
    });
    await this.userRepository.save(user);
    // const role = this.roleRepository.create({
    //   user,
    //   roleName: RoleName.USER,
    // });
    // await this.roleRepository.save(role);
    return user;
  }

  // async addRole(userId: number, roleName: RoleName): Promise<void> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: userId },
  //     relations: ['roles'],
  //   });
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   // const role = this.roleRepository.create({ user, roleName });
  //   // await this.roleRepository.save(role);
  // }

  async getUsers(query: GetUsersQueryDto): Promise<GetUsersResponseDto> {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    const [users, total] = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.firstName', 'user.lastName'])
      .where('user.deletedAt IS NULL')
      .skip(skip)
      .take(limit)
      .getManyAndCount();
    const totalPages = Math.ceil(total / limit);
    return {
      page,
      limit,
      total,
      totalPages,
      data: users,
    };
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id, deletedAt: null },
      select: ['id', 'email', 'firstName', 'lastName'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   Object.assign(user, updateUserDto);
  //   await this.userRepository.save(user);
  //   return user;
  // }

  async removeUser(id: number): Promise<{ message: string }> {
    const user = await this.findUserById(id);
    user.deletedAt = new Date();
    await this.userRepository.save(user);
    return { message: 'User successfully deleted' };
  }

  // async handleActive(data: CodeAuthDto): Promise<any> {
  //   const user = await this.userRepository.findOne({
  //     where: { id: data._id },
  //   });

  //   if (!user) {
  //     throw new BadGatewayException('The code is invalid or expired');
  //   }

  //   //check expire code
  //   const isBeforeCheck = dayjs().isBefore(user.codeExpired);
  //   if (isBeforeCheck) {
  //     await this.userRepository.update({ id: data._id }, { isActive: true });
  //     return { isBeforeCheck };
  //   } else {
  //     throw new BadGatewayException('The code is invalid or expired');
  //   }
  // }
}
