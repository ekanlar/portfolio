// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth"
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7A7Fwnm5IVsxCddvlYSKr8yEfogAPIn4",
  authDomain: "personal-portfolio-853a7.firebaseapp.com",
  projectId: "personal-portfolio-853a7",
  storageBucket: "personal-portfolio-853a7.appspot.com",
  messagingSenderId: "1033617456715",
  appId: "1:1033617456715:web:5c4a26243a8725e09057ce",
  measurementId: "G-28TEF6R9V1"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics
// const analytics = getAnalytics(app);

// Initialize Authorization
const auth = getAuth(app)

// Set Persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Persistence set to session");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });


export { auth } // Export Auth 


// Initialize Storage
const storage = getStorage(app)

export { storage }; // Export Storage


// Initialize Firestore
export const db = getFirestore(app)



// Collection Reference
const colRef = collection(db, 'projects')

// Get Collection Data

export const fetchData = async() =>{
  try{
    const snapshot = await getDocs(colRef);
    // console.log(snapshot.docs)

    const projectsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data()["project-title"],
      description: doc.data()["project-description"],
      imageLink: doc.data()["project-image-link"]
    }))
    return projectsData;
  }

  catch(error){
    console.log("Error fetching documents: ", error);
    return[]; // Return an empty array in case of error
  }
}
