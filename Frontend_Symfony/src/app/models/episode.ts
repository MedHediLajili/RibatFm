import { Podcast } from './podcast';

export class Episode {
  id: string;
  nom: string;
  invites: string;
  sequence: string;
  dateCreation: Date ;
  podcast: Podcast;
}
