import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsToMany } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '51595776-ed46-4b48-b57a-85e7648ca14e', description: 'id пользователя'})
    @Column({type: DataType.UUID, unique:true, defaultValue: DataType.UUIDV4, primaryKey: true})
    id: number;

    @ApiProperty({example: 'test@gmail.com', description: 'e-mail пользователя'})
    @Column({type: DataType.STRING, unique:true, allowNull: false})
    email: string;

    @ApiProperty({example: 'testPassword', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'False', description: 'В бане ли пользователь'})
    @Column({type: DataType.STRING, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'Нарушение правил', description: 'Причина бана'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, ()=> UserRoles)
    roles: Role[]
}