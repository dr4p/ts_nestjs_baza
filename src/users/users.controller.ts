import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { GiveRoleDto } from 'src/roles/dto/giveRole.dto';
import { BanUserDto } from 'src/users/dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Работа с пользователями')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService ) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Выдача роли пользователю'})
    @ApiResponse({status: 200, type: [User]})
    @Post('role')
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    giveRole(@Body() roleDto : GiveRoleDto) {
        return this.usersService.giveRole(roleDto);
    }

    @ApiOperation({summary: 'Выдача блокировки пользователю'})
    @ApiResponse({status: 200, type: [User]})
    @Post('ban')
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    banUser(@Body() banDto : BanUserDto) {
        return this.usersService.banUser(banDto);
    }
}
