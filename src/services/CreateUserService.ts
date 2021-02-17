import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/Users';
import AppError from '../errors/AppError';
import jwt from '../config/auth';

interface Request {
  displayName: string;
  email: string;
  password: string;
  image: string;
}

class CreateUserService {
  public async execute({
    displayName,
    email,
    password,
    image,
  }: Request): Promise<any> {
    const userRepository = getRepository(User);
    const regex = new RegExp('[\\w\\d.]@[\\w\\d]');

    if (!displayName) {
      throw new AppError('"displayName" is required');
    }
    if (displayName.length < 8) {
      throw new AppError(
        '"displayName" length must be at least 8 characters long',
      );
    }
    if (!email) {
      throw new AppError('"email" is required');
    }
    if (!regex.test(email)) {
      throw new AppError('"email" must be a valid email');
    }
    if (!password) {
      throw new AppError('"password" is required');
    }
    if (password.length < 6) {
      throw new AppError('"email" length must be at least 6 characters long');
    }

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Usuário já existe.', 409);
    }

    const hashedPassowrd = await hash(password, 8);

    const user = userRepository.create({
      displayName,
      email,
      password: hashedPassowrd,
      image,
    });

    await userRepository.save(user);

    const token = sign({}, jwt.jwt.secret, {
      subject: user.id.toString(),
      expiresIn: jwt.jwt.expiresIn,
    });

    return {
      token,
    };
  }
}

export default CreateUserService;
