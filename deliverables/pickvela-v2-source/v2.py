from PIL import Image,ImageOps,ImageDraw,ImageFont,ImageFilter
from pathlib import Path
import subprocess,math
P=Path(__file__).resolve().parent
W,H=720,1280
A=Image.open(P/'scrunchies.jpg').convert('RGB');B=Image.open(P/'clips.jpg').convert('RGB')
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
REG='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
colors={'ink':'#17232A','cream':'#F8F5E9','purple':'#6E43C7','pink':'#FF729D','mint':'#BAE7D4'}
def txt(im,s,x,y,size,fill,anchor='mm',bold=True):
 d=ImageDraw.Draw(im); f=ImageFont.truetype(FONT if bold else REG,size)
 d.text((x,y),s,font=f,fill=fill,anchor=anchor,stroke_width=0)
def rounded(im,box,r,fill): ImageDraw.Draw(im).rounded_rectangle(box,r,fill=fill)
def photo(img,box,source,t=0,cover=True):
 x0,y0,x1,y1=box;w=x1-x0;h=y1-y0
 scale=1.01+0.075*t
 ww=int(w*scale);hh=int(h*scale)
 pic=ImageOps.fit(source,(ww,hh),Image.Resampling.LANCZOS,centering=(.5,.5)) if cover else ImageOps.pad(source,(ww,hh),color='#E8DECE')
 crop=pic.crop(((ww-w)//2,(hh-h)//2,(ww+w)//2,(hh+h)//2))
 img.paste(crop,(x0,y0))
def base(bg):
 im=Image.new('RGB',(W,H),bg);return im
def badge(im,letter,x,y,fill):
 rounded(im,(x-48,y-48,x+48,y+48),25,fill);txt(im,letter,x,y+1,48,'#FFFFFF')
def brand(im,light=False):
 txt(im,'PickVela',58,72,29,'#FFFFFF' if light else colors['ink'],anchor='lm')
def scene(t):
 # 15 s, 5 punchy beats. Video remains silent by owner choice.
 if t<2.4:
  q=t/2.4;im=base(colors['ink']);brand(im,True)
  photo(im,(0,220,356,1090),A,q)
  photo(im,(364,220,720,1090),B,q)
  rounded(im,(32,254,688,410),30,colors['cream'])
  txt(im,'A OR B?',360,333,100,colors['ink'])
  badge(im,'A',132,780,colors['purple']);badge(im,'B',588,780,colors['pink'])
  txt(im,'YOUR EVERYDAY HAIR PICK',360,875,31,'#FFFFFF')
 elif t<5:
  q=(t-2.4)/2.6;im=base(colors['purple']);brand(im,True)
  photo(im,(26,185,694,880),A,q,False)
  rounded(im,(30,720,485,865),30,colors['cream']);txt(im,'A  SCRUNCHIES',57,792,49,colors['ink'],anchor='lm')
  txt(im,'SOFT STYLE?',52,975,55,'#FFFFFF',anchor='lm')
 elif t<7.6:
  q=(t-5)/2.6;im=base(colors['pink']);brand(im)
  photo(im,(26,185,694,880),B,q,True)
  rounded(im,(30,720,526,865),30,colors['cream']);txt(im,'B  CLAW CLIPS',57,792,49,colors['ink'],anchor='lm')
  txt(im,'QUICK PICK?',52,975,55,colors['ink'],anchor='lm')
 elif t<11.2:
  q=(t-7.6)/3.6;im=base(colors['cream']);brand(im)
  txt(im,'WHICH ONE IS YOU?',360,210,57,colors['ink'])
  photo(im,(35,285,345,690),A,q)
  photo(im,(375,285,685,690),B,q)
  badge(im,'A',115,665,colors['purple']);badge(im,'B',605,665,colors['pink'])
  txt(im,'SCRUNCHIES',190,735,35,colors['ink']);txt(im,'CLAW CLIPS',530,735,35,colors['ink'])
  txt(im,'COMMENT A OR B',360,817,55,colors['purple'])
  txt(im,'Then vote on PickVela',360,885,31,colors['ink'],bold=False)
 else:
  q=(t-11.2)/3.8;im=base(colors['ink']);brand(im,True)
  photo(im,(40,230,345,620),A,q)
  photo(im,(375,230,680,620),B,q)
  txt(im,'PICK A OR B',360,690,72,'#FFFFFF')
  rounded(im,(68,735,652,825),30,colors['mint']);txt(im,'VOTE FOR FREE',360,780,48,colors['ink'])
  txt(im,'buylink-ng.onrender.com',360,885,27,'#FFFFFF')
  txt(im,'Style reference photos  |  Pexels',360,1230,20,'#C9CCD0',bold=False)
 return im

def main():
 out=P/'pickvela-poll-v2.mp4'
 cmd=['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-','-vf','scale=1080:1920:flags=lanczos,format=yuv420p','-c:v','libx264','-preset','veryfast','-crf','19','-movflags','+faststart',str(out)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for n in range(450):
  proc.stdin.write(scene(n/30).tobytes())
 proc.stdin.close()
 if proc.wait():raise RuntimeError('ffmpeg failed')
 contact=Image.new('RGB',(W*5,H),(255,255,255))
 for j,t in enumerate([1,3.6,6.3,9.3,13.1]):contact.paste(scene(t),(j*W,0))
 contact.resize((1440,512)).save(P/'v2-contact.jpg',quality=90)
 print(out)
if __name__=='__main__':main()
