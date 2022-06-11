import { DislinktPosition } from "./dislinkt-position";

export class DislinktJobOffer {
    id: string;
    companyId: string;
    position: DislinktPosition = new DislinktPosition;
    jobDescription!: string;
    dailyActivities!: string;
    preconditions!: string;
}
