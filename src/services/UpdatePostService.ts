import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Posts from '../models/Posts';
import User from '../models/Users';

interface Request {
  id: any;
  userId: string;
  title: string;
  content: string;
}

class UpdatePostService {
  public async execute({
    id,
    userId,
    title,
    content,
  }: Request): Promise<Posts> {
    if (!title) {
      throw new AppError('"title" is required');
    }

    if (!content) {
      throw new AppError('"content" is required');
    }
    const postBlogRepository = getRepository(Posts);
    const post = await postBlogRepository.findOne({
      where: { id },
    });

    if (!post) {
      throw new AppError('Post não existe', 404);
    }

    if (userId !== post.userId.toString()) {
      throw new AppError('Usuário não autorizado', 401);
    }

    post.title = title;
    post.content = content;

    const userRepository = getRepository(User);
    const { userId: authorId } = post;
    const user = await userRepository.findOne({
      where: { id: authorId },
    });

    await postBlogRepository.save(post);

    delete post.userId;
    post.updated = new Date(Date.now());
    post.user = user;

    return post;
  }
}

export default UpdatePostService;
