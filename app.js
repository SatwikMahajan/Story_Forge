document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:5000/get-genres')
        .then(response => response.json())
        .then(data => {
            const genreSelect = document.getElementById('genreSelect');
            data.genres.forEach(genre => {
                const option = document.createElement('option');
                option.value = genre;
                option.textContent = genre;
                genreSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching genres:', error);
            alert('Failed to load genres. Please refresh the page.');
        });

    document.getElementById('imageInput').addEventListener('change', function(event) {
        const imageInput = event.target;
        const imageBox = document.querySelector('.image-input-box');
        const file = imageInput.files[0];
        
        if (file) {
                
                imageBox.innerHTML = 'Selected file: ' + file.name;
        } else {
                imageBox.innerHTML = ''; 
        }
        });
        

    // Copy Story Button 
    document.getElementById('copyStoryBtn').addEventListener('click', function() {
        const storyDisplay = document.getElementById('storyDisplay');
        const storyText = storyDisplay.textContent.replace(/^Generated Story:\s*/, '');
        const copyConfirmation = document.getElementById('copyConfirmation');
        
        navigator.clipboard.writeText(storyText).then(() => {
            copyConfirmation.classList.remove('hidden');
            setTimeout(() => {
                copyConfirmation.classList.add('hidden');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy story. Please try again.');
        });
    });

   
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const imageInput = document.getElementById('imageInput');
        const genreSelect = document.getElementById('genreSelect');
        
        
        if (!imageInput.files.length) {
            alert('Please select an image');
            return;
        }

        if (!genreSelect.value) {
            alert('Please select a genre');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageInput.files[0]);
        formData.append('genre', genreSelect.value);

        const loadingDiv = document.getElementById('loading');
        const captionDisplay = document.getElementById('captionDisplay');
        const storyDisplay = document.getElementById('storyDisplay');
        const genreDisplay = document.getElementById('genreDisplay');
        const copyStoryBtn = document.getElementById('copyStoryBtn');

        // Show loading message and reset previous results
        loadingDiv.classList.remove('hidden');
        captionDisplay.textContent = "";
        storyDisplay.textContent = "";
        genreDisplay.textContent = "";
        copyStoryBtn.classList.add('hidden');

        // Disable submit button during generation
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Generating...';

        // Send the image to the Flask backend 
        axios.post('http://127.0.0.1:5000/generate-story', formData)
        .then(response => {
            loadingDiv.classList.add('hidden');
            submitButton.disabled = false;
            submitButton.textContent = 'Generate Story';
            storyDisplay.innerHTML = `<strong>Generated Story:</strong> ${response.data.story}`;

            if (response.data.error) {
                throw new Error(response.data.error);
            } else {
                captionDisplay.innerHTML = `<strong>Caption:</strong> ${response.data.caption}`;
                genreDisplay.innerHTML = `<strong>Genre:</strong> ${response.data.genre}`;
                storyDisplay.innerHTML = `<strong>Generated Story:</strong> ${response.data.story}`;
                
                //show copy button
                const copyStoryBtn = document.getElementById('copyStoryBtn');
                copyStoryBtn.classList.remove('hidden');
            }
        })
        .catch(error => {
            loadingDiv.classList.add('hidden');
            submitButton.disabled = false;
            submitButton.textContent = 'Generate Story';

            console.error('Story Generation Error:', error.message);
            this.showErrorNotification('Failed to generate story');
            
        });
    });
});