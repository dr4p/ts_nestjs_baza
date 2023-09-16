import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'test@gmail.com', description: 'e-mail пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @IsEmail({}, {message: 'Почта некорректна'})
    readonly email: string;
    @ApiProperty({example: 'testPassword', description: 'Пароль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    @Length(6, 16, {message: 'Пароль должен быть от 6 до 16 символов'})
    readonly password: string;
}