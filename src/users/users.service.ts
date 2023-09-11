import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService : RolesService) {}

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(dto); 
            const role = await this.roleService.getRoleByValue('USER');
            await user.$set('roles', [role.id])
            user.roles = [role]
            return user;
        } catch (error) {
            throw new HttpException (
                'Ошибка', HttpStatus.BAD_REQUEST
            )
        }
    }

    async getAllUsers() {
        try {
            const users = await this.userRepository.findAll({include: {all:true}});
                return users;
        } catch (error) {
            throw new HttpException(
                'Ошибка', HttpStatus.BAD_REQUEST
            )
        }
    }

    async getUserByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({where: {email}, include: {all:true}})
            return user
        } catch (error) {
            throw new HttpException(
                'Ошибка', HttpStatus.BAD_REQUEST
            )
        }
    }



}
