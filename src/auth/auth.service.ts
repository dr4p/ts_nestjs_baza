import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import e from 'express';


@Injectable()
export class AuthService {
    constructor(private userService : UsersService,
                private jwtService : JwtService) {}

    async login(userDto : CreateUserDto) {
        try {
            const user = await this.validateUser(userDto);
            return this.generateToken(user);
        } catch (error) {
            throw error;
        }
    }

    async registration(userDto : CreateUserDto) {
        try {
            const checkUser = await this.userService.getUserByEmail(userDto.email);
            if (checkUser) {
                throw new HttpException('Ошибка. Пользователь уже существует',HttpStatus.BAD_REQUEST);
            }
            const hashPass = await bcrypt.hash(userDto.password, 5);
            const user = await this.userService.createUser({...userDto, password: hashPass});
            return this.generateToken(user);
        } catch (error) {
            throw error;
        }
    }

    private async generateToken(user) {
        const payload = {email: user.email, password: user.password, roles: user.roles}
        return {
            token: await this.jwtService.sign(payload, { secret: process.env.JWT_KEY })
        }
    }

    private async validateUser(userDto : CreateUserDto) {

        const user = await this.userService.getUserByEmail(userDto.email);
        const checkPassword = await bcrypt.compare(userDto.password, user.password)
        if (user && checkPassword) {
            return user;
        }
        throw new UnauthorizedException({message: "Неверный электронный адрес или пароль"})
    }
}
