import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'e-mail пользователя'})
    readonly email: string;
    @ApiProperty({example: 'testPassword', description: 'Пароль пользователя'})
    readonly password: string;
}