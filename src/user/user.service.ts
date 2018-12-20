import * as crypto from 'crypto';
import { Injectable, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserFillableFields, User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './interfaces';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsersRepository)
    private readonly userRepository: UsersRepository,
  ) { }

  async showAll() {
    return this.userRepository.find();
  }
  
  async get(id: number) {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string) {
    return await this.userRepository.createQueryBuilder('users')
      .where('users.email = :email')
      .setParameter('email', email)
      .getOne();
  }

  async getByEmailAndPass(email: string, password: string) {
    const passHash = crypto.createHmac('sha256', password.toString()).digest('hex');
    return await this.userRepository.createQueryBuilder('users')
      .where('users.email = :email and users.password = :password')
      .setParameter('email', email)
      .setParameter('password', passHash)
      .getOne();
  }

  async create(payload: UserFillableFields) {
    const user = await this.getByEmail(payload.email);
    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }
    return await this.userRepository.save(
      this.userRepository.create(payload),
    );
  }

  async update(user: User, newUser: UpdateUserDto) {
    let data: any = {};
    newUser.email && (data.email = newUser.email);
    newUser.firstName && (data.firstName = newUser.firstName);
    newUser.lastName && (data.lastName = newUser.lastName);
    newUser.password && (data.password = newUser.password);
    newUser.currentPassword && (data.currentPassword = newUser.currentPassword);

    if (data.password){
      const dataPassHash = crypto.createHmac('sha256', data.currentPassword.toString()).digest('hex');
      if (user.password === dataPassHash ) {

        await this.userRepository.update(user.id, data);
        return this.get(user.id);
        
      } else {
        throw new HttpException('Current Password does not match.', HttpStatus.BAD_REQUEST);
      }
      
    }

    await this.userRepository.update(user.id, data);
    return this.get(user.id);
  }
}
