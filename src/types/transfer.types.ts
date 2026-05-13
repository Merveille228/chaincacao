export interface Transfer {
  id: string;
  lotId: string;
  actorId: string;
  actorRole: 'FARMER' | 'COOPERATIVE' | 'EXPORTER' | 'VERIFIER';
  action: 'CREATED' | 'COLLECTED' | 'VALIDATED' | 'EXPORTED' | 'REJECTED';
  weight?: number;
  grade?: string;
  notes?: string;
  blockchainTxHash?: string;
  dataHash: string;
  timestamp: Date;
}
