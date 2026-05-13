import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// L'initialisation se fait automatiquement si le google-services.json / GoogleService-Info.plist est bien configuré.
// Vous pouvez exporter les modules pour un accès centralisé.

export const firebaseAuth = auth();
export const firebaseFirestore = firestore();
export const firebaseStorage = storage();

export default app;