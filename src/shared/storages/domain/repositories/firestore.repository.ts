import { AvatarEntity } from "@storages/domain";

export abstract class FirestoreRepository {
  abstract upload(file: File): Promise<AvatarEntity>;
  abstract delete(id: string): Promise<void>;
}