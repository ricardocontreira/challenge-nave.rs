import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const UsersRepository = getRepository(User);

    const CheckUserExists = await UsersRepository.findOne({
      where: { email },
    });

    if (CheckUserExists) {
      throw new AppError('Email address already used', 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = UsersRepository.create({
      email,
      password: hashedPassword,
    });

    await UsersRepository.save(user);

    return user;
  }
}
export default CreateUserService;
