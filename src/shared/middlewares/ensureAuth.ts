import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import JWTAuthProvider from '@modules/users/providers/AuthProvider/useCases/JWTAuthProvider';
import UsersRepository from '@modules/users/typeorm/repositories/UsersRepository';
import User from '@modules/users/typeorm/entities/User';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function decoder(request: Request): Promise<User | undefined> {
  const usersRepositoryClass = new UsersRepository();
  const jwtAuthProvider = new JWTAuthProvider();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Falha na Autenticação, JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decode = await jwtAuthProvider.verify(token);

    const { sub } = decode as ITokenPayload;

    request.user = {
      id: sub,
    };

    const user = await usersRepositoryClass.findById(Number(sub));

    return user;
  } catch (error) {
    return undefined;
  }
}

function ensureAuth(role: string[]) {
  const roleAuthorized = async (
    request: Request,
    _response: Response,
    next: NextFunction,
  ) => {
    const user = await decoder(request);

    const userRoles = user?.roles.map(roles => roles.name);

    const existsRoles = userRoles?.some(r => role.includes(r));

    if (!existsRoles) {
      throw new AppError('Não autorizado ', 401);
    }

    return next();
  };
  return roleAuthorized;
}

export default ensureAuth;
