export interface CurrentUser {
    _id: string;
    email:string;
    lastname: string;
    firstname: string;
    role:string;
    //photo: string;
}


export class UserToAdd {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    //photo = 'user-avatar.png';
    role: string;
    //date
    password = '';
    confirm_password:'';
}
