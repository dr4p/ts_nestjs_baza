import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from './jwt-auth.guard';
dotenv.config();

@Module({
    providers: [AuthService],
    controllers: [AuthController],
    imports: [
        forwardRef(()=> UsersModule),
        JwtModule.register({
            secret: process.env.JWT_KEY,
            signOptions: {
                expiresIn: '12h'
            }
        })
    ],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
