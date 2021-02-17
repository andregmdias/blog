import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Posts from '../models/Posts';
import User from '../models/Users';

interface Request {
  id: any;
}

class FindPostById {
  public async execute({ id }: Request): Promise<Posts> {
    const postBlogRepository = getRepository(Posts);

    const post = await postBlogRepository.findOne({
      where: { userId: id },
    });

    if (!post) {
      throw new AppError('Post não existe', 404);
    }
    const userRepository = getRepository(User);

    const { userId } = post;
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    delete post.userId;
    post.user = user;

    return post;
  }
}

export default FindPostById;
