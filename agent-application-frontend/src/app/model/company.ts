import { User } from "./user";

export class Company {
    id: number;
    name!: string;
    description: string;
    phoneNumber: string;
    isActive: boolean;
    owner: User;
}
