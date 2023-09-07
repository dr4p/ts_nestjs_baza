import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: {
                expiresIn: '12h'
            }
        })
    ]
})
export class AuthModule {}
