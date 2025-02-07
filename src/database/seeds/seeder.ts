import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../modules/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as fs from 'fs';
import * as path from 'path';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.log('Seeder is running...');
    // const userFactory = factoryManager.get(User);
    const userRepository = dataSource.getRepository(User);
    const adminUser = new User();
    adminUser.email = 'admin@example.com';
    adminUser.firstName = 'Admin';
    adminUser.lastName = 'User';
    adminUser.password = await bcrypt.hash('adminpassword', 10); // Mã hóa mật khẩu
    adminUser.role = 'admin'; // Bạn có thể thay đổi role ở đây
    await userRepository.save(adminUser);

    // const filePath = path.join(__dirname, 'transformed-apartments.json');
  }
}
