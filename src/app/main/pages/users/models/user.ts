export interface CurrentUser {
    id: string;
    email:string;
    lastName: string;
    firstName: string;
    role:string;
    //photo: string;
}


export class UserToAdd {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    //photo = 'user-avatar.png';
    role: string;
    //date
    password = '';
    confirm_password:'';
}


export class UserToEdit {
    firstname: string;
    lastname: string;
    email: string;
}
export class UserToEditRole {
    id:string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}
export class UserToEditPassword {
    old_password = '';
    password = '';
    confirm_password:'';
}

export class CurrentUserClass {
    id: string;
    email:string;
    lastname: string;
    firstname: string;
    role:string;
    //photo: string;
}
