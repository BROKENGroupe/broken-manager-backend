import { Project } from '@projects/infrastructure';
import { ArgumentMetadata, BadRequestException, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';

@Injectable()
export class ValidationDbPipe implements PipeTransform {

  constructor(@InjectModel(Project.name)
  private readonly projectModel: Model<Project>) { }

  async transform(value: any, metadata: ArgumentMetadata) {

    let id: string;

    if (value && value.id) {
      id = value.id;
    } else {
      id = value as string;
    }

    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID proporcionado (${id}) no es válido.`);
    }

    const projectId = new Types.ObjectId(id);

    const project = await this.projectModel.findById(projectId);
    if (!project) {
      throw new NotFoundException(`No se encontró un registro con ID ${projectId}.`);
    }

    return value;
  }
}
