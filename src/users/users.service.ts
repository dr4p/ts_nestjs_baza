import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { GiveRoleDto } from 'src/roles/dto/giveRole.dto';
import { BanUserDto } from 'src/users/dto/ban-user.dto';


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

    async giveRole(roleDto : GiveRoleDto) {
        try {
            const user = await this.userRepository.findByPk(roleDto.userId)
            const role = await this.roleService.getRoleByValue(roleDto.value)
            if (user && role) {
                await user.$add('role', role.id)
                return roleDto;
            }
            throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
        } catch (error) {
            throw error;
        }
    }

    async banUser(banDto : BanUserDto) {
        try {
            const user = await this.userRepository.findByPk(banDto.userId)
            if (!user) {
                throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
            }   
            user.banned = true;
            user.banReason = banDto.banReason
            await user.save()
            return user;
        } catch (error) {
            throw error;
        }
    }



}
