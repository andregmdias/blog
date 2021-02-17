import { getRepository } from 'typeorm';
import Posts from '../models/Posts';
import AppError from '../errors/AppError';

class DeletePostByIdService {
  public async execute(id: string, userId: string): Promise<void> {
    const postRespository = getRepository(Posts);

    const post = await postRespository.findOne({
      where: { id },
    });

    if (!post) {
      throw new AppError('Post não existe', 404);
    }

    if (post.userId.toString() !== userId) {
      throw new AppError('Usuário não autorizado', 404);
    }

    await postRespository.delete(post);
  }
}

export default DeletePostByIdService;
