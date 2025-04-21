from PIL import Image
import os

def optimize_image(input_path, output_path=None, quality=85):
    if output_path is None:
        output_path = input_path
    
    try:
        # Open the image
        img = Image.open(input_path)
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            img = img.convert('RGB')
        
        # Save with optimization
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        print(f"Optimized {input_path} -> {output_path}")
        
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")

# Optimize main images
optimize_image('candle_test.jpeg')
optimize_image('LuizM.jpeg')
optimize_image('weatherApp.png')
optimize_image('projects/ArticleLuizM.png')

# Optimize images in projects directory
for root, dirs, files in os.walk('projects'):
    for file in files:
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            file_path = os.path.join(root, file)
            optimize_image(file_path) 