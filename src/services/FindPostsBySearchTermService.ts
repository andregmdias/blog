import { createQueryBuilder, getRepository } from 'typeorm';
import Posts from '../models/Posts';

class FindPostsBySearchTermService {
  public async execute(searchTerm: string): Promise<any> {
    const posts = await getRepository(Posts)
      .createQueryBuilder('posts')
      .where(`Posts.title LIKE '%${searchTerm}%'`)
      .getMany();

    return posts;
  }
}

export default FindPostsBySearchTermService;
