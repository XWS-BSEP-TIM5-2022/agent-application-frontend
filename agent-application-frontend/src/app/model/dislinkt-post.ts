import { Company } from "./company";
import { DislinktCompany } from "./dislinkt-company";
import { DislinktJobOffer } from "./dislinkt-job-offer";
import { JobOffer } from "./job-offer";

export class DislinktPost {
    id: string;
    text: string = "";
    jobOffer: DislinktJobOffer = new DislinktJobOffer;
    company: DislinktCompany = new DislinktCompany;
    apiToken: string;
   // user: UserClass = new UserClass;
}
