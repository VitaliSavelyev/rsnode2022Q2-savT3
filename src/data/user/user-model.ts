import { v4 as uuidv4 } from 'uuid';
import { UserInt } from '../../interfaces/interfaces';

export default class UserModel implements UserInt {
    id: string;

    username: string;

    age: number;

    hobbies: string[];

    constructor({
                    id = uuidv4(),
                    username = 'USER',
                    age = 10,
                    hobbies = []
                }:Partial<UserInt> = {}) {
        this.id = id;
        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }
}
