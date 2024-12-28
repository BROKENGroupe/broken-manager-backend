import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types } from "mongoose";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "./databases/schemas/user.schema";
import { UserEntity } from "../domain/entities/user.entity";
import { CreateUserDto } from "../presentation/dtos/create-user.http.dto";
import { hash } from 'bcrypt'
import { UpdateUserDto } from "../presentation/dtos/update-user.http.dto";
import { HttpErrors, HttpSuccess } from "@/src/common/handler/http/http-errors-constants";
import { HttpException } from "@nestjs/common";
import { successResponseDto } from "@/src/common/handler/http/http-response.dto";

export class MongoDBRespositoryImpl implements UserRepository {

    constructor(@InjectModel(User.name)
    private readonly userModel: Model<User>) {
    }

    async delete(id: string): Promise<successResponseDto> {
        if (!isValidObjectId(id)) {
                    throw new HttpException(HttpErrors.BAD_REQUEST, 400)
                }
        
                const projectId = new Types.ObjectId(id);
        
                const project = await this.userModel.findById(projectId);
                if (!project) {
                    throw new HttpException(HttpErrors.NOT_FOUND, 400)
                }
        
                const result = await this.userModel.findByIdAndDelete(id)
        
                if (!result) {
                    throw new HttpException(HttpErrors.NOT_FOUND, 400)
                }
        
                const respo:successResponseDto  = {
                    success: true,
                    message: HttpSuccess.DELETE.message,
                    statusCode: 201,
                    timestamp: new Date().toISOString(),
                    path: `/users/delete/${id}`,
                }
        
                return respo
    }

    async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const projectId = new Types.ObjectId(id);

        const project = await this.userModel.findById(projectId);
        if (!project) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const newUser = { ...user, updatedAt: new Date().toISOString() }

        const result = await this.userModel.findByIdAndUpdate(id, newUser, {
            new: true,
            runValidators: true
        })

        return result ?? null
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