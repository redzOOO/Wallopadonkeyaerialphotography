// Import the necessary Firebase functions from the SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-storage.js";

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

// Upload Multiple Images with Progress Indicator
window.uploadImage = function(event) { 
    const files = event.target.files; // Get the selected files
    const progressContainer = document.getElementById('progress-container');
    progressContainer.innerHTML = ''; // Clear previous progress bars

    Array.from(files).forEach((file) => {
        const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage
        
        // Create a progress bar for each file
        const progressBar = document.createElement('progress');
        progressBar.value = 0;
        progressBar.max = 100;
        progressContainer.appendChild(progressBar);

        // Upload the file with progress tracking
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.value = progress; // Update the progress bar
        }, (error) => {
            console.error('Error uploading the file:', error);
            alert('Error uploading the file, please try again.');
        }, () => {
            // Upload completed
            alert('File uploaded successfully!');
            progressContainer.removeChild(progressBar); // Remove progress bar after upload
            displayImages(); // Refresh the gallery after upload
        });
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
        alert('Error loading images, please try again.');
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
            alert('Error deleting the image, please try again.');
        });
    }
}

// Call displayImages when the page loads
window.onload = displayImages;
