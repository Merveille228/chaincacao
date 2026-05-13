export type LotStatus =
  | 'CREATED'
  | 'AT_COOPERATIVE'
  | 'VALIDATED'
  | 'EXPORTED'
  | 'REJECTED';

export interface GPSCoords {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface Lot {
  id: string;                    // (Kpalimé)-CC_A1B2C3D4
  farmerId: string;              // AGR-90123456
  farmerName: string;
  cooperativeId?: string;
  exporterId?: string;
  declaredWeight: number;        // kg — saisi par agriculteur
  officialWeight?: number;       // kg — pesée coopérative
  species: string;
  qualityGrade?: string;
  humidity?: number;             // %
  gps: GPSCoords;
  photoUri?: string;             // URI locale
  photoHash?: string;            // Hash IPFS
  status: LotStatus;
  eudrCompliant?: boolean;
  containerNumber?: string;
  destination?: string;
  blockchainTxHash?: string;     // Hash transaction Polygon
  blockchainBlock?: number;
  createdAt: Date;
  updatedAt: Date;
}
