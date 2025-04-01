import fitz  # PyMuPDF
from PIL import Image, ImageOps
import os

def invert_color_pdf(input_pdf_path, output_folder, filter_level=100, resolution=2):
    pdf_document = fitz.open(input_pdf_path)
    pdf_name = os.path.splitext(os.path.basename(input_pdf_path))[0]

    output_folder = os.path.join(output_folder, pdf_name)

    num_pages = len(pdf_document)

    for page_number in range(num_pages):
        page = pdf_document.load_page(page_number)
        page_width, page_height = page.rect.width, page.rect.height

        mat = fitz.Matrix(resolution, resolution)
        pix = page.get_pixmap(matrix=mat)
        image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

        inverted_image = ImageOps.invert(image)

        if filter_level == 50:
            filter_level = 60

        blend_factor = filter_level / 100
        final_image = Image.blend(image, inverted_image, blend_factor)

        output_image_path = os.path.join(output_folder, f"{pdf_name}_pag{page_number + 1}.png")
        final_image.save(output_image_path, format="PNG", optimize=True, quality=95)

# Esempio di utilizzo

input_folder = os.getcwd()
output_folder = "C:\\Users\\Utente\\Downloads"
new_path = "C:\Users\Utente\OneDrive\L-8 Terzo Anno\NEW"


if not os.path.exists(output_folder):
    os.makedirs(output_folder)

print("Start processing PDF files")

for filename in os.listdir(input_folder):
    if filename.endswith(".pdf"):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)
        
        # Crea la cartella di output per il file PDF se non esiste
        output_pdf_folder = os.path.splitext(output_path)[0]
        if not os.path.exists(output_pdf_folder):
            os.makedirs(output_pdf_folder)

        # Applica la funzione invert_color_pdf
        print(f"Processing {filename}")
        invert_color_pdf(input_path, output_folder, filter_level=100, resolution=2)
        
        print(f"\t\tMoving {filename}")
        
        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        os.rename(input_path, new_path)

input("Done!")

        