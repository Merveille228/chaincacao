import { Lot, TransferEvent } from '../types/lot.types';
// Note: Dans un environnement de production, on utiliserait le Firebase Admin SDK / ou @react-native-firebase/firestore
import { useLotStore } from '../store/lot.store';

/**
 * Ce service agit comme une couche d'abstraction (facade) entre le frontend 
 * et la base de données Firestore / les contrats intelligents Polygon.
 */
class LotService {
  
  /**
   * Crée un nouveau lot (Agriculteur)
   */
  async createLot(lotData: Partial<Lot>): Promise<Lot> {
    const lotStore = useLotStore.getState();
    
    // Génération ID temporaire hors-ligne (ex: Kpalimé-CC_8A2B9C)
    const mockId = `(Kpalimé)-CC_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newLot: Lot = {
      id: mockId,
      farmerId: lotData.farmerId || 'AGR-UNKNOWN',
      farmerName: lotData.farmerName || 'Anonyme',
      declaredWeight: lotData.declaredWeight || 0,
      species: lotData.species || 'Forastero',
      gps: lotData.gps || { lat: 0, lng: 0, accuracy: 0 },
      status: 'CREATED',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      eudrCompliant: false, // Validé plus tard par la coopérative
    };

    // Ajout local prioritaire (Offline-first approach)
    await lotStore.addLot(newLot);

    // TODO: Implémenter l'envoi Firebase via @react-native-firebase/firestore
    // await firestore().collection('lots').doc(mockId).set(newLot)

    return newLot;
  }

  /**
   * Valide un lot à la coopérative
   */
  async validateLot(
    lotId: string, 
    cooperativeId: string, 
    officialWeight: number, 
    grade: string, 
    humidity: number
  ): Promise<void> {
    const lotStore = useLotStore.getState();
    
    // TODO: Effectuer les vérifications Blockchain (Ecart > 3% etc.)
    // const gap = Math.abs((officialWeight - declaredWeight) / declaredWeight) * 100;
    // const status = gap > 3 ? 'REJECTED' : 'VALIDATED';

    const updates = {
      officialWeight,
      qualityGrade: grade,
      humidity,
      cooperativeId,
      status: 'VALIDATED' as const, // Hardcoded pour le flow nominal
      updatedAt: Date.now()
    };

    await lotStore.updateLot(lotId, updates);
  }

  /**
   * Exporter un lot sélectionné
   */
  async exportLot(lotId: string, exporterId: string, containerNumber: string, destination: string): Promise<void> {
    const lotStore = useLotStore.getState();
    
    const updates = {
      exporterId,
      containerNumber,
      destination,
      status: 'EXPORTED' as const,
      updatedAt: Date.now()
    };

    await lotStore.updateLot(lotId, updates);
  }

  /**
   * Récupérer la timeline du lot (appels Blockchain/Firestore)
   */
  async getLotHistory(lotId: string): Promise<TransferEvent[]> {
    // Mock Data pour le vérificateur
    return [
      {
        id: '1',
        lotId,
        actorId: 'AGR-1',
        actorRole: 'FARMER',
        action: 'CREATED',
        timestamp: Date.now() - 86400000 * 3, // Il y a 3 jours
        notes: 'Enregistrement initial',
      }
    ];
  }
}

export const lotService = new LotService();
