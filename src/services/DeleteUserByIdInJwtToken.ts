import { getRepository } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import User from '../models/Users';

class DeleteUserByIdInJwtToken {
  public async execute(id: number): Promise<any> {
    const userRepository = getRepository(User);
    const result: DeleteResult = await userRepository.delete(id);
    return result.affected;
  }
}

export default DeleteUserByIdInJwtToken;
