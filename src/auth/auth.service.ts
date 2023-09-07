import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService : UsersService,
                private jwtService : JwtService) {}

    async login(userDto : CreateUserDto) {

    };

    async registration(userDto : CreateUserDto) {
        try {
            const checkUser = await this.userService.getUserByEmail(userDto.email);
            if (checkUser) {
                throw new HttpException('Ошибка. Пользователь уже существует',HttpStatus.BAD_REQUEST)
            }
            const hashPass = await bcrypt.hash(userDto.password, 5)
        } catch (error) {
            throw error;
        }
    }
}
