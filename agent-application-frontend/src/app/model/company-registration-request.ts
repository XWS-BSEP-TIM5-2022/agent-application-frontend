import { Company } from "./company";
import { UserClass } from "./user-class";

export class CompanyRegistrationRequest {
    id: number;
    companyDTO: Company = new Company;
    userId: number = 0;
    approved: boolean;
    owner: UserClass = new UserClass;
}
