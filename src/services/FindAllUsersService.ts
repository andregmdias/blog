import { getRepository } from 'typeorm';
import User from '../models/Users';

interface UserDTO {
  id: number;
  displayName: string;
  email: string;
  image: string;
}

class FindAllUsersService {
  public async execute(): Promise<UserDTO[]> {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    const usersDTO: UserDTO[] = [];
    users.forEach(user => {
      const userDTO = {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        image: user.image,
      };
      usersDTO.push(userDTO);
    });
    return usersDTO;
  }
}

export default FindAllUsersService;
