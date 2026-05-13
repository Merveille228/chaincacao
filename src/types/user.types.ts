export type UserRole = 'agriculteur' | 'cooperative' | 'exportateur' | 'verificateur';

export interface UserProfile {
  uid: string;
  id: string;                   // AGR-90123456
  role: UserRole;
  firstName: string;
  lastName: string;
  phone: string;                // +228XXXXXXXX
  locality?: string;            // Kpalimé... (sauf vérificateur)
  age?: number;
  password?: never;             // Ne jamais stocker

  // Agriculteur uniquement
  cooperativeId?: string;       // COOP-KPALIME

  // Coopérative uniquement
  cooperativeName?: string;
  cooperativeRegion?: string;

  createdAt: Date;
  lastLogin: Date;
}
