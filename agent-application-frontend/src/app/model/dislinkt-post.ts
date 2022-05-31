import { Company } from "./company";
import { JobOffer } from "./job-offer";

export class DislinktPost {
    id: string;
    text: string = "";
    jobOffer: JobOffer = new JobOffer;
    company: Company = new Company;
    apiToken: string;
   // user: UserClass = new UserClass;
}
