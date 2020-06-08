import { Actualite } from './actualite';


export class Admin {
    id: string;
    nom: string;
    prenom: string ;
    motdepasse: string;
    role: string;
    email: string;
    actualites: Actualite[];
}
