"""One comment-first PickVela video. Reuses licensed photos and original music.

Run with Python 3 + Pillow + FFmpeg; no paid or generated-media API is used.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import shutil
import subprocess
import tempfile

P = Path(__file__).resolve().parent
OUT = P.parent
W, H, FPS, SECONDS = 1080, 1920, 30, 12
REG = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
GREEN, INK, PAPER, MUTED = '#155840', '#18342a', '#faf7ef', '#66786d'
ASSETS = P if (P / 'crossbody.jpg').exists() else P.parent.parent / 'batch-2026-11-13' / 'source'
A = Image.open(ASSETS / 'crossbody.jpg').convert('RGB')
B = Image.open(ASSETS / 'tote.jpg').convert('RGB')


def text(im, label, xy, size, color=INK, bold=False, anchor='la'):
    ImageDraw.Draw(im).text(xy, label, font=ImageFont.truetype(BOLD if bold else REG, size),
                           fill=color, anchor=anchor)


def fit_text(im, label, xy, size, max_width, color=INK, bold=False, anchor='la'):
    while size > 18:
        font = ImageFont.truetype(BOLD if bold else REG, size)
        if font.getbbox(label)[2] <= max_width:
            break
        size -= 1
    text(im, label, xy, size, color, bold, anchor)


def rounded_photo(im, img, box, progress, centre):
    x, y, width, height = box
    scale = 1.0 + .035 * progress
    pic = ImageOps.fit(img, (round(width * scale), round(height * scale)),
                       Image.Resampling.LANCZOS, centering=centre)
    ox = (pic.width - width) // 2
    oy = round((pic.height - height) * (.35 + .3 * progress))
    pic = pic.crop((ox, oy, ox + width, oy + height))
    mask = Image.new('L', (width, height), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, width - 1, height - 1), 27, fill=255)
    im.paste(pic, (x, y), mask)


def frame(t):
    im = Image.new('RGB', (W, H), PAPER)
    d = ImageDraw.Draw(im)
    # All essential labels remain left of x=930 and above y=1600.
    d.ellipse((73, 185, 89, 201), fill=GREEN)
    text(im, 'PickVela', (104, 176), 33, GREEN, True)
    text(im, 'EVERYDAY CHOICES · NIGERIA', (73, 241), 20, MUTED, True)
    text(im, 'One quick errand.', (70, 306), 65, INK, True)
    text(im, 'What comes with you?', (70, 391), 58, INK, True)

    boxes = [(72, 520, 414, 670), (510, 520, 414, 670)]
    p = t / SECONDS
    rounded_photo(im, A, boxes[0], p, (.61, .54))
    rounded_photo(im, B, boxes[1], p, (.5, .53))
    for i, (x, y, width, height) in enumerate(boxes):
        d.rounded_rectangle((x + 17, y + 17, x + 77, y + 78), 14, fill=PAPER)
        text(im, 'A' if i == 0 else 'B', (x + 47, y + 48), 37, GREEN, True, 'mm')
    text(im, 'CROSSBODY', (73, 1224), 25, GREEN, True)
    text(im, 'TOTE', (511, 1224), 25, GREEN, True)
    fit_text(im, 'Keep it light', (72, 1268), 37, 414, INK, True)
    fit_text(im, 'Bring the extras', (510, 1268), 37, 414, INK, True)

    # Same visual scene throughout; the question develops rather than sending
    # viewers through multiple branded slides or out to an unavailable bio link.
    d.line((72, 1366, 924, 1366), fill='#d6dfd3', width=2)
    if t < 2.8:
        text(im, 'Quick stop, or a full day out?', (72, 1430), 38, GREEN, True)
        text(im, 'Start with the kind of day you have planned.', (72, 1494), 25, MUTED)
    elif t < 5.5:
        d.rounded_rectangle((67, 515, 491, 1195), 31, outline=GREEN, width=7)
        text(im, 'Just popping out?', (72, 1430), 42, GREEN, True)
        text(im, 'A · Keep it light.', (72, 1494), 30, INK, True)
    elif t < 8.2:
        d.rounded_rectangle((505, 515, 929, 1195), 31, outline=GREEN, width=7)
        text(im, 'Plans might change?', (72, 1430), 42, GREEN, True)
        text(im, 'B · Bring the extras.', (72, 1494), 30, INK, True)
    else:
        text(im, 'A or B?', (72, 1417), 61, GREEN, True)
        fit_text(im, "What's always in your bag?", (72, 1507), 37, 850, INK, True)

    text(im, 'Style references · Pexels', (72, 1594), 20, MUTED)
    # Quiet, linear progress marker, with no countdown or urgency claim.
    d.rounded_rectangle((72, 1650, 924, 1656), 3, fill='#e4e9df')
    d.rounded_rectangle((72, 1650, max(78, round(72 + 852 * min(1, p))), 1656), 3, fill=GREEN)
    return im


if __name__ == '__main__':
    tmp = OUT / 'bags-comment-test-silent.mp4'
    final = OUT / 'bags-comment-test.mp4'
    command = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
               '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-', '-an',
               '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p',
               '-movflags', '+faststart', str(tmp)]
    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    for n in range(FPS * SECONDS):
        process.stdin.write(frame(n / FPS).tobytes())
    process.stdin.close()
    if process.wait():
        raise RuntimeError('Video render failed')
    with tempfile.TemporaryDirectory(prefix='audio-', dir=OUT) as audio_tmp:
        music = P / 'original-beat.wav'
        if not music.exists():
            # Regenerate the exact existing, seeded composition without writing
            # to or replacing any file in the original batch folder.
            music_script = P / 'music.py' if (P / 'music.py').exists() else ASSETS / 'music.py'
            copied_script = Path(audio_tmp) / 'music.py'
            shutil.copyfile(music_script, copied_script)
            subprocess.run(['python3', str(copied_script)], check=True)
            music = Path(audio_tmp) / 'original-beat.wav'
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(tmp),
                        '-i', str(music), '-t', str(SECONDS),
                        '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy',
                        '-af', 'volume=0.8,afade=t=in:st=0:d=0.2,afade=t=out:st=11.2:d=0.8',
                        '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', str(final)], check=True)
    # Cover is subsequently extracted from the encoded MP4 for exact consistency.
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', '0.5', '-i', str(final),
                    '-frames:v', '1', '-q:v', '2', str(OUT / 'bags-comment-cover.jpg')], check=True)
    times = [.5, 3.8, 6.8, 11.5]
    sheet = Image.new('RGB', (432 * 4, 768), PAPER)
    with tempfile.TemporaryDirectory(prefix='frames-', dir=OUT) as frame_tmp:
        for i, sample in enumerate(times):
            extracted = Path(frame_tmp) / f'{i}.png'
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(sample), '-i', str(final),
                            '-frames:v', '1', str(extracted)], check=True)
            sheet.paste(Image.open(extracted).convert('RGB').resize((432, 768), Image.Resampling.LANCZOS),
                        (i * 432, 0))
    sheet.save(OUT / 'contact-sheet.jpg', quality=90)
    print(final)
