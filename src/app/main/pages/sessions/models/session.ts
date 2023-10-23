import { MovieToEdit } from "../../movies/models/movie";

export class SessionToEdit {
    id:string;
    date: Date;
    places: number=0;
    remaningPlaces:number=0;
    movieId: number
}