import { UserToEdit } from "../../users/models/user";

export class OrderToDisplay {
    id:string;
    places:number;
    amount :number;
    user:UserToEdit
    updatedAt: Date;
    createdAt:Date;;
}