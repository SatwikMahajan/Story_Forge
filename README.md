# STORY FORGE AI

**An interactive application that generates stories based on user uploaded images and selected genres. This app utilizes advanced models like BLIP and GPT-4o-mini to generate captivating stories and displays them with an interactive interface.**

<p align='center'>
<img width="500" alt="home_page" src="https://github.com/user-attachments/assets/2f864309-715a-4173-bdd9-f7d0b137f106">
</p>

## Features

- **Image Upload**: Upload an image, and the app generates a caption based on the image content.
- **Genre Selection**: Choose a genre for the story [ Adventure, Romance, Mystery, Science Fiction, Fantasy, Horror, Comedy, Historical Fiction, Thriller, Magical Realism ], enhancing the relevance and creativity of the output.
- **Story Generation**: The app generates a unique story based on the caption and genre selected.
- **Copy Button**: Easily copy the generated story or caption with a click of a button, making it convenient for users to share or save their results.
- **Responsive Design**: Optimized for various screen sizes with a flexible, user-friendly interface.

  
## Tech Stack

- **Frontend**: 
  - HTML, CSS, JavaScript
  - React (for handling dynamic UI)
  - FileReader API (for image upload functionality)
  - Axios (for making API requests)

- **Backend**:
  - Python (Flask API)
  - Hugging Face Transformers & Tokenizers
  - OpenAI GPT-4o-mini (for story generation)
  - BLIP blip-image-captioning-base (for image captioning)

## For Example - 
when uploading an image as follows - 
<p align='center'>
<img width="350" alt="img_test1" src="https://github.com/user-attachments/assets/5b602276-e738-49c4-8b61-f64a1f433710">
</p>

we get - 
    
<p align='center'>
  <img width="300" alt="st_test1" src="https://github.com/user-attachments/assets/cd65fd04-37bf-4c7a-857c-a525ce111660">
</p>
 <p align='center'>
   <img width="385" alt="st_test" src="https://github.com/user-attachments/assets/a71ebd19-f819-44b3-ab34-7a5a6069f86b">
</p>


## Setup & Installation

1. Clone the repository
2. Navigate into the project directory
3. Install dependencies (for backend) 
   ## Dependencies -
   - Flask
   - Flask-CORS
   - OpenAI
   - Torch
   - Pillow
   - Transformers
   - Axios
     
4. Set up environment variables (OPENAI_API_KEY=your-api-key)
5. Run the Flask Backend
6. Open the frontend (index.html) in your browser

## Usage
- Upload Image: Click on the "Choose File" button to upload an image.
- Select Genre: Use the dropdown menu to select a genre for your story.
- Generate Story: Hit the "Generate Story" button to get your AI-generated story based on the uploaded image and selected genre.
- Copy Button: Once the story is generated, use the "Copy" button to copy the story or caption to your clipboard.

## License
This project is licensed under the MIT License - see the LICENSE file for details.





