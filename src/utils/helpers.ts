import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds: number = 10;
  return await bcrypt.hash(password, saltRounds);
};
