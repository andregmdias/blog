import { getRepository } from 'typeorm';
import Posts from '../models/Posts';
import User from '../models/Users';

interface Request {
  id: any;
}

class FindAllPostsService {
  public async execute({ id }: Request): Promise<Posts[]> {
    const postBlogRepository = getRepository(Posts);
    const userRepository = getRepository(User);

    const posts = await postBlogRepository.find();

    posts.forEach(async post => {
      const user = await userRepository.findOne({
        where: { id },
      });
      delete post.userId;
      post.user = user;
    });

    return posts;
  }
}

export default FindAllPostsService;
