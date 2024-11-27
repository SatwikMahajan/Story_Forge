import os
import torch
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = os.getenv('OPENAI_API_KEY')
if not openai.api_key:
    raise ValueError("OpenAI API key not set. Please set the 'OPENAI_API_KEY' environment variable.")

class StoryGenerator:
    def __init__(self):

        self.blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        self.blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

        self.genre_prompts = [
            "Adventure","Romance","Mystery","Science Fiction","Fantasy","Horror","Comedy","Historical Fiction","Thriller","Magical Realism"
        ]

    def generate_caption(self, image):
        #Using BLIP to generate the perfect caption
        inputs = self.blip_processor(images=image, return_tensors="pt")
        with torch.no_grad():
            output = self.blip_model.generate(**inputs, max_new_tokens=100)
        caption = self.blip_processor.decode(output[0], skip_special_tokens=True)
        return caption

    def generate_story(self, caption, genre="Adventure"):
        #Generating the story using Gpt4o
        try:
            prompt = (
                f"Write a compelling {genre} story inspired by this scene: '{caption}'. "
                "The story should vividly describe the characters, setting, and events. "
                "Ensure the narrative is engaging and fits the chosen genre and scene. "
                "Keep the story 250 words long."
            )

            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "You are a creative storyteller who generates engaging short stories based on image descriptions."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=350,
                temperature=0.7
            )

            # Extracting the story from the API response
            story = response.choices[0].message.content.strip()

            # Fallback for very short stories
            if not story or len(story) < 150:
                story = (
                    f"In the realm of {genre}, a story unfolds from a captivating scene: {caption}. "
                    "The landscape breathes with untold possibilities, each detail weaving "
                    "into a narrative both unexpected and profound. Characters emerge, "
                    "their journeys intertwining with the very essence of the scene."
                )

            return story

        except Exception as e:
            print(f"Story generation error: {e}")
            return (
                f"Apologies, but a story could not be generated for the {genre} genre "
                f"based on the scene: {caption}. Please try again."
            )

generator = StoryGenerator()

@app.route('/generate-story', methods=['POST'])
def generate_story_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    # Genre selected by the user from the frontend
    genre = request.form.get('genre', 'Adventure')
    image_file = request.files['image']
    
    try:
        image = Image.open(image_file)
        caption = generator.generate_caption(image)
        
        # Pass genre to story generation
        story = generator.generate_story(caption, genre)

        return jsonify({
            'caption': caption, 
            'genre': genre,
            'story': story
        })

    except Exception as e:
        return jsonify({'error': 'Failed to process request. Please try again later.'}), 500

@app.route('/get-genres', methods=['GET'])
def get_available_genres():
    """Endpoint to return available story genres"""
    return jsonify({
        'genres': list(generator.genre_prompts)
    })

if __name__ == '__main__':
    app.run(debug=True)