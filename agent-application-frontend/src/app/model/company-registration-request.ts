import { Company } from "./company";

export class CompanyRegistrationRequest {
    id: number;
    companyDTO: Company = new Company;
    userId: number = 0;
    isApproved: boolean;
}
