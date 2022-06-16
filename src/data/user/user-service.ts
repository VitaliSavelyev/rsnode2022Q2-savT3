import { UserInt } from '../../interfaces/interfaces';
import User from './user-model'

let usersList: UserInt[] = [
    // {id: '5f576cd3-9b97-44a0-ad3a-b883fa20036f', age: 10, username: 'Fedya', hobbies: ['run']},
    // {id: '1f576cd3-9b97-44a0-ad3a-b883fa20036f', age: 18, username: 'Katya', hobbies: ['read']}
];

const createUser = async (user: UserInt): Promise<UserInt> => {
    const newUser: UserInt = new User(user);
    usersList.push(newUser);
    return newUser;
}

const updateUser = async (user: UserInt, id: string): Promise<UserInt | null> => {
    if (!usersList.some((user: UserInt) => user.id === id)) {
        return null
    }
    usersList = usersList.filter((user: UserInt) => user.id !== id);
    const newUser: UserInt = {...user, id}
    usersList.push(newUser)
    return newUser;
}

const deleteUser = async (id: string): Promise<UserInt | null> => {
    let deletedUser: UserInt | null = null;
    usersList = usersList.filter((user:UserInt) => {
        if(user.id === id) {
            deletedUser = user;
        }
       return user.id !== id
    });
    return deletedUser
}

const getAllUsers = async (): Promise<UserInt[]> => usersList;

const getUserById = async (id: string): Promise<UserInt | null> => {
    const user: UserInt | undefined =usersList.find((user:UserInt) => user.id === id);
    return user || null;
}

export {getAllUsers, getUserById, createUser, updateUser, deleteUser}




