import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface UserDTO {
  id: number;
  displayName: string;
  email: string;
  image: string;
}

class FindUserByIdService {
  public async execute(id: number): Promise<UserDTO> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    const userDTO: UserDTO = {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      image: user.image,
    };

    return userDTO;
  }
}

export default FindUserByIdService;
