import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import * as ulid from 'ulid';
import { UserInfo } from './UserInfo';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email);

    const signupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, signupVerifyToken);
    return await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string) {
    // DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 있으면 바로 로그인 상태가 되도록 JWT를 발급
    throw new Error('개발중');
  }

  async login(email: string, password: string) {
    // DB에서 email과 password가 일치하는 유저가 없으면 에러
    // 있으면 JWT 발급

    throw new Error('개발중');
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    // userId를 가진 유저가 없으면 에러 처리
    // 있으면 UserInfo 데이터 타입으로 응답

    throw new Error('개발중');
  }

  private checkUserExists(email: string) {
    return false; // 구현예정
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = uuid.v1();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;

    await this.userRepository.save(user);
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    return await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
