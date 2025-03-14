import fitz  # PyMuPDF
from PIL import Image, ImageOps
import os

def invert_color_pdf(input_pdf_path, output_folder, filter_level=100, resolution=2):
    pdf_document = fitz.open(input_pdf_path)
    pdf_name = os.path.splitext(os.path.basename(input_pdf_path))[0]

    output_folder = os.path.join(output_folder, pdf_name)

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

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
invert_color_pdf("2025_03_10_Precisione a regime.pdf", "", filter_level=100, resolution=2)
input()