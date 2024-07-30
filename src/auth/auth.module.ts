import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStorage } from './local.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

const jwtModule = JwtModule.register({
  secret: 'test123456',
  signOptions: { expiresIn: '4h' },
});

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
    PassportModule,
    jwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStorage],
  exports: [AuthService, jwtModule],
})
export class AuthModule {}
