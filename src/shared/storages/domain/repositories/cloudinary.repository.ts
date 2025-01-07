import { AvatarEntity } from "@storages/domain";

export abstract class CloudinaryRepository {
  abstract upload(file: File): Promise<AvatarEntity>;
  abstract delete(id: string): Promise<void>;
}