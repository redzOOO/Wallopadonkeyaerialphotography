// Import the necessary Firebase functions from the SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getStorage, ref, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";

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

// Initialize Firebase Storage
const storage = getStorage(app);

// Function to display all images from Firebase Storage
function displayImages() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the existing gallery

    // Create a reference to the 'images' folder in Firebase Storage
    const imagesRef = ref(storage, 'images');

    // List all the files in the 'images' folder
    listAll(imagesRef).then((result) => {
        result.items.forEach((imageRef) => {
            // Get the download URL for each image
            getDownloadURL(imageRef).then((url) => {
                const img = document.createElement('img');
                img.src = url;
                img.style.width = '200px'; // Set the image size
                img.style.height = '200px';
                img.style.objectFit = 'cover'; // Ensure the image is displayed correctly
                gallery.appendChild(img); // Append the image to the gallery
            });
        });
    }).catch((error) => {
        console.error('Error fetching images:', error);
    });
}

// Call displayImages when the page loads
window.onload = displayImages;
