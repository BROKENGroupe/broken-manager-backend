import { Image } from "../../domain/models/image.interface";

export interface ProjectDto{
    id?: string;
    title: string;
    subtitle: string;
    status?: string;
    label?: string;
    priority?: string;
    description?: string;
    percentage?: number;
    assign?: { image: Image; label: string; value: string }[];
    assignDate?: string;
    dueDate?: string;
    createAt?: string;
    updateAt?: string;
    isFavorite?: boolean;
}