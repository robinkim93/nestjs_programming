import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UserInfo } from './UserInfo';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}
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

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; // 구현예정
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    return await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
