import { successResponseDto } from '@common/handler/http/http-response.dto';
import { BoardEntity } from '@boards/domain';
import { CreateBoardDto, UpdateBoardDto } from '@boards/presentation';


export abstract class BoardRepository {
  abstract save(project: CreateBoardDto): Promise<BoardEntity>;
  abstract update(id: string, project: UpdateBoardDto): Promise<BoardEntity | null>;
  abstract findById(id: string): Promise<BoardEntity | []>;
  abstract findAll(): Promise<BoardEntity[]>;
  abstract delete(id: string): Promise<successResponseDto>;
}