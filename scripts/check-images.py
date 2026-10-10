"""Optional full raster decoding check. Requires Pillow; never creates placeholders."""
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
files=[p for p in (root/'img').iterdir() if p.suffix.lower() in {'.png','.jpg','.jpeg','.webp','.avif'}]
failures=[]
for path in files:
    try:
        with Image.open(path) as image:
            image.load()
            if image.width<1 or image.height<1:
                raise ValueError('Invalid image dimensions')
    except Exception as error:
        failures.append(f'{path.name}: {error}')
if failures:
    raise SystemExit('\n'.join(failures))
print(f'Image decoding passed: {len(files)} images')
