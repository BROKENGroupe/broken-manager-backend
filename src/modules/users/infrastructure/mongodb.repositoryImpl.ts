import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "./databases/schemas/user.schema";

export class MongoDBRespositoryImpl implements UserRepository {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<User>) {
    }

    async findByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec()
    }
}