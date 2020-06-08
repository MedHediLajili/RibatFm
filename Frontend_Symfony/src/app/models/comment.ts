import { Actualite } from './actualite';

export class Comment {
    id: string;
    contenu: string;
    dateCreation: Date;
    actualite: Actualite;
}
