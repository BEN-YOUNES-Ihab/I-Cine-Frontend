import { SessionToEdit } from "../../sessions/models/session";

export class MovieToEdit {
    id:string;
    title: string;
    durationTile:number;
    description: string;
    releaseDate: Date;
    onDisplay: boolean;
    category: string;
    imageUrl: string;
    imageCloudinaryPublicId: string;
    baniereImageUrl: string;
    baniereImageCloudinaryPublicId: string;
}

export class MovieToDisplay {
    id:string;
    title: string;
    durationTile:number;
    description: string;
    releaseDate: Date;
    onDisplay: boolean;
    category: string;
    imageUrl: string;
    imageCloudinaryPublicId: string;
    baniereImageUrl: string;
    baniereImageCloudinaryPublicId: string;
    sessions : SessionToEdit[]
}