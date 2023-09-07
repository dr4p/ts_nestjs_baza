import { ApiProperty } from "@nestjs/swagger";
import { Model, Table, Column, DataType, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles', createdAt:false, updatedAt:false})
export class Role extends Model<Role, RoleCreationAttrs> {

    @ApiProperty({example: '1', description: 'id роли'})
    @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
    id: number;
    
    @ApiProperty({example: 'ADMIN', description: 'Название роли'})
    @Column({type: DataType.STRING, unique:true, allowNull: false})
    value: string;
    
    @ApiProperty({example: 'Администратор', description: 'Описание роли'})
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, ()=> UserRoles)
    users: User[]
}