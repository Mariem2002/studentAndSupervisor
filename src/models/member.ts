import { Evenement } from './evenement';
import { Outil } from './outil';
import { Publication } from './publication';

export interface Member {
  id: number;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  dateInscription: Date;
  dateNaissance: Date;
  etablissement: string;  
  photo?: string;
  sujet?: string;
  grade?: string;
  diplome?: string;
  typeMbr: string;
  encadrantId?: number;
  encadrant?: Member;
  outils: Outil[];
  evenements: Evenement[];  
  publications?: Publication[];
  cv?: string;

}
