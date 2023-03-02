import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './auth/constants';
import { JwtStrategy } from './auth/jwt.strategy';
import { ExperienceController } from './experience/experience.controller';
import { Experience } from './experience/experience.entity';
import { ExperienceService } from './experience/experience.service';
import { UserController } from './users/user.controller';
import { User } from './users/user.entity';
import { UserService } from './users/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'dbresume',
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Experience]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '1200s'}
    })
  ],
  controllers: [UserController, AuthController, ExperienceController],
  providers: [UserService, AuthService, JwtStrategy, ExperienceService],
})
export class AppModule {}
