import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class BanUserDto {
    @ApiProperty({example: '51595776-ed46-4b48-b57a-85e7648ca14e', description: 'id пользователя'})
    @IsString({message: 'Должно быть строкой(UUID)'})
    readonly userId: string;
    @ApiProperty({example: 'Нарушение', description: 'Причина блокировки'})
    @IsString({message: 'Должно быть строкой'})
    readonly banReason: string;
}