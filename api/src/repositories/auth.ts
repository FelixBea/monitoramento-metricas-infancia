import users from '../data/auth.json';
import { User, Users } from '../types/users';

const authRepository = {
    findUser(name: string) {
        const user: User = (users as Users)[name];
        return user;
    },
};

export default authRepository;
