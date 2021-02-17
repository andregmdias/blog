import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import jwt from '../config/auth';

import User from '../models/Users';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersReposository = getRepository(User);

    if (!email) {
      throw new AppError('"email" is required');
    }
    if (email.trim() === '') {
      throw new AppError('"email" is not allowed to be empty');
    }
    if (!password) {
      throw new AppError('"password" is required');
    }
    if (password.trim() === '') {
      throw new AppError('"password" is not allowed to be empty');
    }
    const user = await usersReposository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Campos inválidos.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Campos inválidos.');
    }

    const token = sign({}, jwt.jwt.secret, {
      subject: user.id.toString(),
      expiresIn: jwt.jwt.expiresIn,
    });

    return {
      token,
    };
  }
}

export default AuthenticateUserService;
