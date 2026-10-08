"""Create web previews without cropping or changing original product photos.

Run with Python + Pillow; not required to serve this static website.
"""
import json
from pathlib import Path
import subprocess
from PIL import Image, ImageOps

root = Path(__file__).resolve().parent.parent
photos = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    "import {productDrafts} from './js/product-drafts.mjs'; console.log(JSON.stringify(productDrafts.flatMap(p=>p.photos)))"
], cwd=root))
before = after = 0
for name in photos:
    source = root / 'img' / name
    target = source.with_name(source.name + '.webp')
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        image.thumbnail((960, 960), Image.Resampling.LANCZOS)
        image.save(target, 'WEBP', quality=90, method=6)
    before += source.stat().st_size
    after += target.stat().st_size
print(json.dumps({'files': len(photos), 'original_bytes': before,
                  'preview_bytes': after, 'reduction_percent': round(100*(1-after/before), 1)}))
