import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreatePostBlogService from '../services/CreatePostBlogService';
import DeletePostByIdService from '../services/DeletePostByIdService';
import FindAllPostsService from '../services/FindAllPostsService';
import FindPostById from '../services/FindPostById';
import UpdatePostService from '../services/UpdatePostService';
import FindPostsBySearchTermService from '../services/FindPostsBySearchTermService';

const postsRouter = Router();

postsRouter.use(ensureAuthenticated);

postsRouter.get('/search', async (request, response) => {
  const { q } = request.query;
  const findBySearchTermService = new FindPostsBySearchTermService();
  const posts = await findBySearchTermService.execute(q);
  return response.status(200).json({ q });
});

postsRouter.post('/', async (request, response) => {
  try {
    const createPostBlogService = new CreatePostBlogService();

    const { title, content } = request.body;
    const { id } = request.user;
    const post = await createPostBlogService.execute({ title, content, id });
    delete post.id;

    return response.status(201).json(post);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

postsRouter.get('/', async (request, response) => {
  const { id } = request.user;
  try {
    const findAllPostsService = new FindAllPostsService();
    const posts = await findAllPostsService.execute({ id });
    return response.status(200).json(posts);
  } catch (err) {
    return response.status(500).json({ message: err.message });
  }
});

postsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const findPostById = new FindPostById();
    const post = await findPostById.execute({ id });
    return response.status(200).json(post);
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

postsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const userId = request.user.id;
  const { title, content } = request.body;
  try {
    const updatePostService = new UpdatePostService();
    const post = await updatePostService.execute({
      id,
      userId,
      title,
      content,
    });
    return response.status(200).json(post);
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

postsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const userId = request.user.id;
  try {
    const deletePostByIdService = new DeletePostByIdService();
    const post = await deletePostByIdService.execute(id, userId);
    return response.status(204).json(post);
  } catch (err) {
    return response.status(err.statusCode).json({ message: err.message });
  }
});

export default postsRouter;
