import os
from PIL import Image
import numpy as np
from PIL import ImageFont, ImageDraw

# Function to convert image to ASCII
def image_to_ascii(image, width=100):
    ascii_chars = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."]
    # Convert image to grayscale
    image = image.convert("L")
    # Resize image while keeping aspect ratio
    aspect_ratio = image.height / image.width
    new_height = int(aspect_ratio * width)
    image = image.resize((width, new_height))
    
    pixels = np.array(image)
    ascii_str = ""
    
    for row in pixels:
        for pixel in row:
            ascii_str += ascii_chars[pixel // 25]  # Mapping pixel values to ASCII characters
        ascii_str += "\n"  # Newline after each row
    
    return ascii_str

# Function to save ASCII art as PNG
def save_ascii_as_png(ascii_art, filename='ascii_art.png'):
    width, height = 600, 800  # Customize width and height as needed
    img = Image.new('RGB', (width, height), color=(219, 200, 183))  # Set background to #dbc8b7
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("arial.ttf", 12)  # Adjust font size
    except IOError:
        font = ImageFont.load_default()

    margin = 0
    x = margin
    y = margin
    lines = ascii_art.split('\n')
    
    for line in lines:
        # Calculate the bounding box of the text using font.getbbox()
        bbox = font.getbbox(line)
        text_width = bbox[2] - bbox[0]  # bbox[2] is the right x, bbox[0] is the left x
        text_height = bbox[3] - bbox[1]  # bbox[3] is the bottom y, bbox[1] is the top y
        draw.text((x, y), line, font=font, fill=(0, 0, 0))  # Set text color to black (optional)
        y += text_height
    
    img.save(filename)

# Function to process all PNG files in a folder
def process_folder(input_folder, output_folder):
    # Make sure the output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Loop through all PNG files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith('.png'):  # Check if the file is a PNG
            file_path = os.path.join(input_folder, filename)

            # Open the image
            img = Image.open(file_path)

            # Convert the image to ASCII art
            ascii_image = image_to_ascii(img, width=100)  # You can adjust the width here
            
            # Save the ASCII art as PNG
            output_name = os.path.splitext(filename)[0]  # Remove file extension from the filename
            save_ascii_as_png(ascii_image, os.path.join(output_folder, f"{output_name}_ascii.png"))
            
            print(f"Processed {filename}")

# Run the function
input_folder = '/Users/katemiller/Du-Bois-Challenge-2025/08-Figma/Files/input-emojis'  # Replace with your folder path
output_folder = '/Users/katemiller/Du-Bois-Challenge-2025/08-Figma/Files/output-ascii-art'  # Replace with your desired output folder
process_folder(input_folder, output_folder)