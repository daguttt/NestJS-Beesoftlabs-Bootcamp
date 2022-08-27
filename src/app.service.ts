import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IResponse } from './app.controller';
import { AppConfigService } from './config/app/config.service';
import { User } from './database/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly appConfig: AppConfigService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  getHello(): IResponse {
    return {
      appName: this.appConfig.name,
      appUrl: this.appConfig.url,
      appPort: this.appConfig.port,
    };
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async getUsers(userId): Promise<User> {
    return await this.userRepo.findOne(userId);
  }

  async createUser(
    name: string,
    address: string,
    email: string,
    age: number,
  ): Promise<User> {
    return await this.userRepo.save({
      name,
      address,
      email,
      age,
    });
  }
}
