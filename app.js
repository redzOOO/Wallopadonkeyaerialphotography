// Import the necessary Firebase functions from the SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";

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

// Upload Image Function
window.uploadImage = function(event) { // Make the function globally accessible
    const file = event.target.files[0]; // Get the selected file
    const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage

    // Upload the file to Firebase Storage
    uploadBytes(storageRef, file).then((snapshot) => {
        alert('File uploaded successfully!');
        displayImages(); // Refresh the gallery after upload
    }).catch((error) => {
        console.error('Error uploading the file:', error);
    });
};

// Function to display images from Firebase Storage
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
                // Create a container for each image
                const container = document.createElement('div');
                container.className = 'image-container';

                // Create the image element
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Aerial Photo';
                img.style.width = '200px';
                img.style.height = '200px';
                img.style.objectFit = 'cover';

                // Create a delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.onclick = () => deleteImage(imageRef);

                // Append image and delete button to container
                container.appendChild(img);
                container.appendChild(deleteButton);

                // Append container to the gallery
                gallery.appendChild(container);
            });
        });
    }).catch((error) => {
        console.error('Error fetching images:', error);
    });
}

// Function to delete an image from Firebase Storage
function deleteImage(imageRef) {
    if (confirm('Are you sure you want to delete this image?')) {
        deleteObject(imageRef).then(() => {
            alert('Image deleted successfully!');
            displayImages(); // Refresh the gallery after deletion
        }).catch((error) => {
            console.error('Error deleting the image:', error);
        });
    }
}

// Call displayImages when the page loads
window.onload = displayImages;
