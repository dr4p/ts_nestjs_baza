import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private RoleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.RoleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        console.log(value)
        const role = await this.RoleRepository.findOne({where: {value: value}})
        return role;
        
    }

}
