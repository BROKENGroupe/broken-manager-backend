import { InjectModel } from "@nestjs/mongoose";
import { isValidObjectId, Model, Types, ObjectId } from "mongoose";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TaskRepository, TaskEntity } from "@tasks/domain";
import { CreateTaskDto, TaskOrderDto, UpdateTaskDto } from "@tasks/presentation";
import { HttpErrors, HttpSuccess, successResponseDto } from "@common/handlers";
import { Task, TaskOrder } from "./schemas";
import { TaskOrderEntity } from "@tasks/domain/entities/task-order.entity";

@Injectable()
export class MongoDBRespositoryImpl extends TaskRepository {

    constructor(
        @InjectModel(Task.name) private readonly taskModel?: Model<Task>,
        @InjectModel(TaskOrder.name) private readonly taskOrderModel?: Model<TaskOrder>
    ) {
        super();
    }

    async findAll(): Promise<TaskEntity[]> {
        const result = await this.taskModel.find({ projection: { arrayField: 1 } }).exec()

        if (!result) {
            throw new HttpException('No se encontraron registros', 404)
        }

        return result ?? []
    }

    async findById(id: string): Promise<TaskEntity | []> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const taskId = new Types.ObjectId(id);

        const task = await this.taskModel.findById(taskId, { projection: { arrayField: 1 } });
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.taskModel.findById(id)
        return result ?? []
    }

    async save(task: CreateTaskDto): Promise<TaskEntity> {

        const newTask = new this.taskModel(task);
        const taskadd: TaskEntity = await newTask.save();

        const taskId = newTask._id.toString();

        const taskOrderCollection = await this.taskOrderModel.findOne({
            boardId: newTask.boardId,
        }).exec();

        if (!taskOrderCollection) {

            const orderTask = {
                boardId: newTask.boardId,
                projectId: task.projectId,
                tasks: [taskId],
            };

            const newTaskOrder = new this.taskOrderModel(orderTask);
            await newTaskOrder.save();
        } else {

            if (!isValidObjectId(task.boardId)) {
                throw new HttpException(HttpErrors.BAD_REQUEST, 400)
            }


            // Si existe, agrega el `taskId` al array `tasks` (evitando duplicados)
            await this.taskOrderModel.findOneAndUpdate(
                { boardId: newTask.boardId },
                {
                    $addToSet: {
                        tasks: [taskId],
                    }
                },
                {
                    new: true, // Retorna el documento actualizado
                    runValidators: true, // Asegura que las validaciones del esquema se ejecuten
                }
            );
        }

        return taskadd;


    }

    async update(id: string, taskDto: UpdateTaskDto): Promise<TaskEntity | null> {

        if (!isValidObjectId(id)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const taskId = new Types.ObjectId(id);

        const task = await this.taskModel.findById(taskId);
        if (!task) {
            throw new HttpException(HttpErrors.NOT_FOUND, 400)
        }

        const result = await this.taskModel.findByIdAndUpdate(id,
            {
                $addToSet: {
                    assign: taskDto.assign,
                    list: taskDto.list,
                    tags: taskDto.tags
                },
                $set: {
                    title: taskDto.title,
                    desc: taskDto.desc,
                    status: taskDto.status,
                    updatedAt: new Date().toISOString(),
                    date: taskDto.date,
                    priority: taskDto.priority,
                    percentage: taskDto.percentage
                }
            },
            {
                new: true,
                runValidators: true
            })
        return result ?? null
    }

    async delete(boardId: string, taskId: string): Promise<successResponseDto> {

        // Validar que ambos IDs son válidos
        if (!isValidObjectId(boardId) || !isValidObjectId(taskId)) {
            throw new HttpException(
                { statusCode: 400, message: 'Invalid boardId or taskId' },
                HttpStatus.BAD_REQUEST,
            );
        }

        const mBoardId = new Types.ObjectId(boardId);
        const mTaskId = new Types.ObjectId(taskId);

        // Verificar si el board existe
        const updatedBoard = await this.taskOrderModel
            .findOneAndUpdate({ boardId: boardId },
                { $pull: { tasks: taskId } },
                { new: true }
            ).exec();
        if (!updatedBoard) {
            throw new HttpException(
                { statusCode: 404, message: 'Board not found' },
                HttpStatus.NOT_FOUND,
            );
        }

        // // Verificar si la tarea existe
        const task = await this.taskModel.findById(taskId);
        if (!task) {
            throw new HttpException(
                { statusCode: 404, message: 'Task not found' },
                HttpStatus.NOT_FOUND,
            );
        }

        // Eliminar la tarea
        const result = await this.taskModel.findByIdAndDelete(mTaskId);
        if (!result) {
            throw new HttpException(
                { statusCode: 404, message: 'Task deletion failed' },
                HttpStatus.NOT_FOUND,
            );
        }

        // Responder con un mensaje de éxito
        const respo: successResponseDto = {
            success: true,
            message: 'Task successfully deleted',
            statusCode: HttpStatus.OK,
            timestamp: new Date().toISOString(),
            path: `/task/delete/${mTaskId}`,
        };

        return respo;

    }

    async findTaskOrderByBoard(boardId: string): Promise<TaskEntity[] | []> {
        const taskOrder = await this.taskOrderModel
            .findOne({ boardId: boardId })
            .populate({
                path: 'tasks',
                select: '_id boardId title status tags date priority percentage createdAt updatedAt assign list',
            })
            .exec();

        return taskOrder.tasks


    }

    async orderTaskMove(tasks: TaskOrderDto): Promise<TaskOrderEntity | successResponseDto> {
        if (!isValidObjectId(tasks.boardId)) {
            throw new HttpException(HttpErrors.BAD_REQUEST, 400)
        }

        const task = await this.taskOrderModel.find({
            boardId: { $in: [tasks.boardId] }
        }).exec();

        if (task.length === 0) {
            const newtask = new this.taskOrderModel(tasks)
            return await newtask.save()

        }

        await this.taskOrderModel.findOneAndUpdate(
            { boardId: tasks.boardId },
            {
                $set: {
                    tasks: tasks.tasks,
                }
            },
            {
                new: true,
                runValidators: true,
            }
        );

        const respo: successResponseDto = {
            success: true,
            message: HttpSuccess.DELETE.message,
            statusCode: 201,
            timestamp: new Date().toISOString(),
            path: `/task/order/`,
        }

        return respo
    }

    async saveTasksMove(tasks: any): Promise<any> {
        try {
            const newtask = new this.taskOrderModel(tasks)
            return await newtask.save()
        } catch (error) {
            throw new Error(error)
        }

    }


}