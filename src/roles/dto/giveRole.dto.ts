import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class GiveRoleDto {
    @ApiProperty({example: 'USER', description: 'Имя роли'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;
    @ApiProperty({example: '23', description: 'Идентификатор пользователя'})
    @IsString({message: 'Должно быть строкой(UUID)'})
    readonly userId: string;
}