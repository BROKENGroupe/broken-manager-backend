import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "./databases/schemas/user.schema";
import { UserEntity } from "../domain/entities/user.entity";
import { CreateUserDto } from "../presentation/dtos/create-user.http.dto";
import { hash } from 'bcrypt'

export class MongoDBRespositoryImpl implements UserRepository {

    constructor(@InjectModel(User.name)
    private readonly userModel: Model<User>) {
    }

    async findById(id: string): Promise<UserEntity> {
        return await this.userModel.findById(id).exec()
    }

    async create(user: CreateUserDto): Promise<UserEntity> {
        const newPassword = await hash(user.password, 10)
        const userAdd = { ...user, password: newPassword }
        const newUser = new this.userModel(userAdd)
        return await newUser.save()
    }

    async findAll(): Promise<UserEntity[]> {
        return await this.userModel.find().exec()
    }

    async findByEmail(email: string): Promise<UserEntity> {
        return await this.userModel.findOne({ email }).exec()
    }
}