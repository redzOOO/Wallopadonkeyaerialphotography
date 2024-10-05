// Import the necessary Firebase functions from the SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
    apiKey: "AIzaSyDIrNwHo-pCpaFJLCKKj9duxIr7a8GywDY",
    authDomain: "wallopadonkey-9e4f1.firebaseapp.com",
    projectId: "wallopadonkey-9e4f1",
    storageBucket: "wallopadonkey-9e4f1.appspot.com",
    messagingSenderId: "81679164738",
    appId: "1:81679164738:web:33ae922284a824b50454db",
    measurementId: "G-GQQSMGG0Q3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload an image to Firebase Storage
window.uploadImage = function(event) { // Make the function global
    const file = event.target.files[0]; // Get the selected file
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage

    // Upload the file to Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {
        alert('File uploaded successfully!');
    }).catch((error) => {
        console.error('Error uploading the file:', error);
    });
};
