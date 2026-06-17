// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgPSwvh6FqKz5A9cWUkconpQhhn-jQkxQ",
  authDomain: "ahmed-radwan-pharmacy-ui.firebaseapp.com",
  projectId: "ahmed-radwan-pharmacy-ui",
  storageBucket: "ahmed-radwan-pharmacy-ui.firebasestorage.app",
  messagingSenderId: "290323322930",
  appId: "1:290323322930:web:cdbe6d3138b30a7557442b",
  measurementId: "G-M2KR7VKLK0"
};

// Initialize Firebase using compat libraries
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// The single document where all our data lives
const DB_DOC = db.collection('pharmacyData').doc('main');

// ==========================================
// Database Helper Functions
// ==========================================

/**
 * Fetches the products and complaints from Firebase.
 * Returns an object: { products: [...], complaints: [...] }
 */
async function getDbData() {
  try {
    const docSnap = await DB_DOC.get();
    if (docSnap.exists) {
      return docSnap.data();
    } else {
      // Return empty structure if it doesn't exist yet
      return { products: null, complaints: [] };
    }
  } catch (error) {
    console.error("Error fetching data from Firebase:", error);
    // Fallback to empty if error (e.g. offline)
    return { products: null, complaints: [] };
  }
}

/**
 * Saves the products array to Firebase.
 * @param {Array} products 
 */
async function saveDbProducts(products) {
  try {
    await DB_DOC.set({ products: products }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving products to Firebase:", error);
    return false;
  }
}

/**
 * Saves the complaints array to Firebase.
 * @param {Array} complaints 
 */
async function saveDbComplaints(complaints) {
  try {
    await DB_DOC.set({ complaints: complaints }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving complaints to Firebase:", error);
    return false;
  }
}
