import { createHash } from 'crypto';
import authRepository from '../repositories/auth';
import { User } from '../types/users';
import { generateToken } from '../utils/auth';

const authService = {
    authenticateUser({ name, password }: User) {
        const user = authRepository.findUser(name);
        if (!user) {
            return false;
        }
        // hash the received password and compare with user's stored password
        const compareHash = createHash('sha256');
        compareHash.update(password);
        const hashedPassword = compareHash.digest('hex');
        return hashedPassword === user.password;
    },
    getToken(userName: string) {
        const payload = { preferred_username: userName };
        const token = generateToken(payload);
        return token;
    },
};

export default authService;
