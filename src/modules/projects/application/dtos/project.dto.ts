import { StaticImageData } from "../../infrastructure/databases/schemas/projects.schema";

export interface ProjectDto{
    id?: string;
    title: string;
    subtitle: string;
    status?: string;
    label?: string;
    priority?: string;
    description?: string;
    percentage?: number;
    assign?: { image: StaticImageData; label: string; value: string }[];
    assignDate?: string;
    dueDate?: string;
    createAt?: string;
    updateAt?: string;
    isFavorite?: boolean;
}