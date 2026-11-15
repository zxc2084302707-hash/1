"""PickVela buying-check draft: licensed reference + original explanatory animation.
Python3, Pillow, NumPy and FFmpeg; no external paid APIs. Source files remain unchanged.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import math, subprocess, tempfile, shutil
P = Path(__file__).resolve().parent
OUT = P.parent
W,H,FPS,DURATION = 1080,1920,30,24
REG='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
BOLD='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
PAPER='#f8f4eb'; GREEN='#113f32'; INK='#15392e'; MUTED='#647366'; GOLD='#e6a86a'; LIGHT='#dce9df'
PHOTO=Image.open(P/'crossbody.jpg').convert('RGB')

def ease(x):
 x=min(1,max(0,x));return 1-(1-x)**3

def tx(im,s,x,y,size=48,color=INK,bold=False,anchor='la'):
 ImageDraw.Draw(im).text((x,y),s,font=ImageFont.truetype(BOLD if bold else REG,size),fill=color,anchor=anchor)

def lines(im,rows,x,y,size=66,color=INK,gap=84,bold=True):
 for n,row in enumerate(rows):tx(im,row,x,y+n*gap,size,color,bold)

def base(dark=False,step=None):
 im=Image.new('RGB',(W,H),GREEN if dark else PAPER);d=ImageDraw.Draw(im);c=PAPER if dark else GREEN
 d.ellipse((80,192,96,208),fill=GOLD if dark else GREEN)
 tx(im,'PickVela',112,180,31,c,True)
 if step:
  tx(im,step,80,255,26,GOLD if dark else MUTED,True)
 return im

def arrow(d,a,b,color=GREEN,width=5,head=14):
 d.line([a,b],fill=color,width=width)
 ang=math.atan2(b[1]-a[1],b[0]-a[0])
 for p,theta in [(a,ang+math.pi),(b,ang)]:
  d.polygon([p,(p[0]-head*math.cos(theta-.55),p[1]-head*math.sin(theta-.55)),(p[0]-head*math.cos(theta+.55),p[1]-head*math.sin(theta+.55))],fill=color)

def label(im,caption='Original illustration · not a product test',dark=False):
 tx(im,caption,80,1592,22,LIGHT if dark else MUTED)

def rounded_photo(im,box,t):
 x,y,w,h=box;scale=1.02+.08*ease(t/3)
 p=ImageOps.fit(PHOTO,(round(w*scale),round(h*scale)),Image.Resampling.LANCZOS,centering=(.58,.55))
 ox=(p.width-w)//2;oy=(p.height-h)//2;p=p.crop((ox,oy,ox+w,oy+h));m=Image.new('L',(w,h),0)
 ImageDraw.Draw(m).rounded_rectangle((0,0,w-1,h-1),35,fill=255);im.paste(p,(x,y),m)

def hook(t):
 im=base();lines(im,['Buying a bag','online?'],80,300,72,gap=91)
 rounded_photo(im,(60,550,880,760),t)
 tx(im,'Check more than the photo.',80,1390,46,GREEN,True)
 label(im,'Reference photo · Pexels')
 return im

def measure(t):
 im=base(step='BEFORE YOU PAY · FIT');d=ImageDraw.Draw(im)
 lines(im,['Will your','essentials fit?'],80,330,70,gap=89)
 # An original conceptual bag with no product-specific numeric measurements.
 shift=round((1-ease(t/1))*75)
 d.arc((350,575+shift,680,940+shift),180,360,fill=GOLD,width=28)
 d.rounded_rectangle((270,750+shift,770,1175+shift),38,fill='#e8c39b',outline=GREEN,width=7)
 d.polygon([(770,780+shift),(838,735+shift),(838,1120+shift),(770,1175+shift)],fill='#ca9d73',outline=GREEN)
 d.line([(300,775+shift),(735,775+shift)],fill=GREEN,width=10)
 # Animated measuring lines demonstrate what to ask for, not a measured item.
 p=ease((t-.4)/1.3)
 arrow(d,(280,1250),(280+int(480*p),1250),GREEN)
 tx(im,'width',520,1280,32,GREEN,True,anchor='ma')
 if t>.8:
  arrow(d,(210,760+shift),(210,760+shift+round(400*ease((t-.8)/1.2))),GREEN)
  tx(im,'height',70,960+shift,30,GREEN,True)
 if t>1.6:
  arrow(d,(784,1218),(842,1168),GREEN,width=4,head=11)
  tx(im,'depth',765,1263,30,GREEN,True)
 if t>2.4:
  d.rounded_rectangle((292,748+shift,747,794+shift),20,outline='#bc6937',width=7)
  tx(im,'usable opening',360,690+shift,30,'#9a512c',True)
 lines(im,['Ask for measurements,','including the opening.'],80,1420,43,gap=61,bold=False)
 label(im)
 return im

def closure(t):
 im=base(step='BEFORE YOU PAY · CLOSURE');d=ImageDraw.Draw(im)
 lines(im,['How does','it close?'],80,330,70,gap=89)
 # Original enlarged zipper illustration; not a claimed feature of the reference bag.
 d.rounded_rectangle((140,720,865,1190),55,fill='#e8c39b',outline=GREEN,width=8)
 d.arc((300,590,700,955),180,360,fill=GOLD,width=28)
 d.line((195,785,810,785),fill='#fff9ec',width=30)
 for x in range(200,810,20):
  d.line((x,772,x+6,797),fill=GREEN,width=5)
 pos=230+round(510*(.5-.5*math.cos(min(t,4.8)/4.8*math.pi)))
 d.rounded_rectangle((pos-18,757,pos+18,810),10,fill=GREEN)
 d.rounded_rectangle((pos-11,803,pos+11,869),8,fill=GOLD,outline=GREEN,width=4)
 # Question styling avoids a false pass/fail verdict.
 tx(im,'See it open. See it close.',185,1005,37,GREEN,True)
 lines(im,['Ask to see the opening','and the closure.'],80,1410,44,gap=62,bold=False)
 label(im)
 return im

def total(t):
 im=base(True,'BEFORE YOU PAY · TOTAL');d=ImageDraw.Draw(im)
 lines(im,['What will you','actually pay?'],80,330,69,PAPER,gap=89)
 rows=[('BAG PRICE',700,PAPER,GREEN),('+ DELIVERY TO YOUR CITY',920,PAPER,GREEN),('= YOUR TOTAL',1140,GOLD,GREEN)]
 for n,(s,y,bg,fg) in enumerate(rows):
  p=ease((t-n*.65)/.7);x=80+round((1-p)*950)
  if x>1000:continue
  d.rounded_rectangle((x,y,x+820,y+155),26,fill=bg)
  tx(im,s,x+32,y+49,41 if n==1 else 50,fg,True)
 lines(im,['Confirm delivery to your city','before you pay.'],80,1440,41,PAPER,gap=59,bold=False)
 label(im,'Original illustration · no quoted offer',True)
 return im

def recap(t):
 im=base();d=ImageDraw.Draw(im)
 lines(im,['Photo saved?','Now check these.'],80,330,65,gap=89)
 for n,s in enumerate(['Measurements','Opening & closure','Total with delivery']):
  y=750+n*180;p=ease((t-n*.3)/.45)
  d.rounded_rectangle((80,y,142,y+62),16,fill=GREEN)
  if p>.25:
   d.line([(95,y+31),(108,y+44),(129,y+17)],fill=PAPER,width=7)
  tx(im,s,170,y+7,47,GREEN,True)
 lines(im,['Which do you check first?'],80,1428,43,gap=60,bold=True)
 label(im,'PickVela · practical shopping checks')
 return im

def frame(t):
 if t<3:return hook(t)
 if t<9:return measure(t-3)
 if t<14:return closure(t-9)
 if t<20:return total(t-14)
 return recap(t-20)

if __name__=='__main__':
 OUT.mkdir(exist_ok=True)
 final=OUT/'buying-check-draft.mp4'
 with tempfile.TemporaryDirectory(prefix='render-',dir=OUT) as td:
  td=Path(td);silent=td/'silent.mp4'
  cmd=['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-an','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(silent)]
  proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
  for n in range(FPS*DURATION):proc.stdin.write(frame(n/FPS).tobytes())
  proc.stdin.close()
  if proc.wait():raise RuntimeError('Render failed')
  shutil.copy(P/'music.py',td/'music.py');subprocess.run(['python3',str(td/'music.py')],check=True,stdout=subprocess.DEVNULL)
  subprocess.run(['ffmpeg','-v','error','-y','-i',str(silent),'-stream_loop','-1','-i',str(td/'original-beat.wav'),'-t',str(DURATION),'-map','0:v:0','-map','1:a:0','-c:v','copy','-af','volume=0.75,afade=t=in:st=0:d=0.3,afade=t=out:st=22.5:d=1.5','-c:a','aac','-b:a','192k','-movflags','+faststart',str(final)],check=True)
  times=[1.5,5.8,11.2,17.0,22.5]
  sheet=Image.new('RGB',(432*len(times),768),PAPER)
  for i,t in enumerate(times):
   path=td/f'{i}.png';subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(final),'-frames:v','1',str(path)],check=True)
   shot=Image.open(path).convert('RGB')
   if i==0:shot.save(OUT/'cover.jpg',quality=93)
   sheet.paste(shot.resize((432,768),Image.Resampling.LANCZOS),(i*432,0))
  sheet.save(OUT/'contact-sheet.jpg',quality=91)
 print(final)
