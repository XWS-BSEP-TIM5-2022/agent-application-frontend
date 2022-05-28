import { Company } from "./company";
import { Position } from "./position";

export class JobOffer {
    id: number;
    companyId : number;
    position: Position;
    jobDescription: string;
    dailyActivities: string;
    preconditions: string;
    company: Company;
}
