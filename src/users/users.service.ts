import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUpDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import * as dotenv from 'dotenv';
import { sign, SignOptions } from 'jsonwebtoken';
dotenv.config();

@Injectable()
export class UsersService {
  logger: any;
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async signup(userSignUpDto: UserSignUpDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email)
    if (userExists) throw new BadRequestException('Email is not available')
    userSignUpDto.password = await hash(userSignUpDto.password, 10)
    let user = this.usersRepository.create(userSignUpDto)
    user = await this.usersRepository.save(user)
    delete user.password
    return user;
  }

  async signin(userSignInDto: UserSigninDto): Promise<UserEntity> {
    const userExists = await this.usersRepository.createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email: userSignInDto.email })
      .getOne();

    if (!userExists) {
      throw new BadRequestException('Bad credentials');
    }

    const matchPassword = await compare(userSignInDto.password, userExists.password);
    if (!matchPassword) {
      throw new BadRequestException('Bad credentials');
    }
    delete userExists.password;
    return userExists;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll():Promise<UserEntity[]> {
    return await this.usersRepository.find()  ;
  }

  async findOne(id: number): Promise<UserEntity>{
    const user = await this.usersRepository.findOneBy({id});
    if(!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email })
  }
  async accessToken(user: UserEntity): Promise<string> {
    const secret = process.env.ACCESS_TOKEN_SECRET_KEY as string;
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRE_TIME as string;
  
    return new Promise<string>((resolve, reject) => {
      const options = { expiresIn } as SignOptions;
      sign(
        { id: user.id, email: user.email },
        secret,
        options,
        (err, token) => {
          if (err) {
            return reject(err);
          }
          if (!token) {
            return reject(new Error("Token generation failed"));
          }
          resolve(token);
        }
      );
    });
  }
}
