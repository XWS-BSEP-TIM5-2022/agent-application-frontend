import { JobOffer } from "./job-offer";

export class DislinktPost {
    id: string;
    text: string = "";
    jobOffer: JobOffer = new JobOffer;
    apiToken: string;
   // user: UserClass = new UserClass;
}
