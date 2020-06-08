import { Admin } from './admin';
import { Comment } from './comment';
import { Category } from './category';

export class Actualite {
    id: string;
    titre: string;
    contenu: string;
    image: string;
    nbvisiteurs: number;
    dateCreation: Date;
    creePar: string;
    modifiePar: string;
    admin: Admin;
    comments: Comment[];
    category: Category;
}
