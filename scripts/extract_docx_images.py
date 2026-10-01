import zipfile
import os
from PIL import Image
import io

docx_path = 'Sanity Articles_2.docx'
out_dir = 'public/images/blog'
os.makedirs(out_dir, exist_ok=True)

extracted_count = 0
converted_count = 0

with zipfile.ZipFile(docx_path) as z:
    for name in z.namelist():
        if name.startswith('word/media/'):
            basename = os.path.basename(name)
            data = z.read(name)
            
            # Save original
            orig_path = os.path.join(out_dir, basename)
            if not os.path.exists(orig_path):
                with open(orig_path, 'wb') as f:
                    f.write(data)
                extracted_count += 1
                
            # Also convert to webp if not already webp
            name_no_ext, ext = os.path.splitext(basename)
            webp_name = f"{name_no_ext}.webp"
            webp_path = os.path.join(out_dir, webp_name)
            if not os.path.exists(webp_path):
                try:
                    img = Image.open(io.BytesIO(data))
                    img.save(webp_path, 'WEBP', quality=85)
                    converted_count += 1
                except Exception as e:
                    print(f"Error converting {basename} to webp: {e}")

print(f"Extraction complete:")
print(f"  Extracted original files: {extracted_count}")
print(f"  Converted to WebP: {converted_count}")
