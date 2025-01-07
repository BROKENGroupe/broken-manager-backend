import { AvatarEntity } from "@storages/domain";

export abstract class S3AmazonRepository {
  abstract upload(file: File): Promise<AvatarEntity>;
  abstract delete(id: string): Promise<void>;
}