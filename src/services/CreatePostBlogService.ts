import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Posts from '../models/Posts';

interface Request {
  title: string;
  content: string;
  id: any;
}
class CreateAppointmentService {
  public async execute({ title, content, id }: Request): Promise<Posts> {
    if (!title) {
      throw new AppError('"title" is required');
    }

    if (!content) {
      throw new AppError('"content" is required');
    }
    const postsRepository = getRepository(Posts);
    const post = postsRepository.create({ title, content, userId: id });
    await postsRepository.save(post);
    delete post.user;
    return post;
  }
}

export default CreateAppointmentService;
