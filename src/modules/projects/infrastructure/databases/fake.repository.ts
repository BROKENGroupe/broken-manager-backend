import { ProjectEntity } from "../../domain/entities/project.entity";
import { ProjectRepository } from "../../domain/repositories/project.repository";
import { ProjectCreateHttpDto } from "../../presentation/http-dtos/project-create-http-dto";

export class FakeRespository extends ProjectRepository {

    projects: ProjectEntity[] = []

    save(project: ProjectCreateHttpDto): ProjectEntity {
        const prj = new ProjectEntity(project)
        return prj
    }

    update(project: ProjectCreateHttpDto) {
        
    }

    findById(id: string): ProjectEntity {

        const nw: ProjectEntity = {
            id: '123',
            name: 'ddf',
            description: "fdf",
            status: "infdf",
            createdAt: new Date(),
            updatedAt: new Date
        }

        const project = new ProjectEntity(nw)

        return project
    }

}