import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './roles.model';

@Controller('roles')
@ApiTags('Работа с ролями')
export class RolesController {
    constructor(private roleService : RolesService ) {}

    @Post()
    @ApiOperation({summary: 'Создание роли'})
    @ApiResponse({status: 200, type: [Role]})
    create(@Body() dto : CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    @ApiOperation({summary: 'Получение роли по названию'})
    @ApiResponse({status: 200, type: [Role]})
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }
} 
