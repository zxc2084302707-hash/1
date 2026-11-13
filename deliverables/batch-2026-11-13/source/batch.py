from PIL import Image,ImageOps,ImageDraw,ImageFont
from pathlib import Path
import subprocess,json
P=Path(__file__).resolve().parent
W,H=720,1280
FONT='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';REG='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
PACKS=[
 {'id':'hair','a':'scrunchies','b':'clips','hook':'SCRUNCHIES OR CLAW CLIPS?','a_label':'SCRUNCHIES','b_label':'CLAW CLIPS','a_pivot':'SOFT SATIN LOOK?','b_pivot':'CLIP AND GO?','mid':'WHAT WOULD YOU USE TODAY?','close':'YOUR HAIR PICK?','accent':'#6E43C7','accent2':'#FF729D','slug':'scrunchies-or-clips','caption':'For everyday hair, would you reach for a satin scrunchie or a claw clip? Pick one on PickVela. It is a quick style poll, with no checkout. https://buylink-ng.onrender.com/p/scrunchies-or-clips/?src=tiktok #Nigeria #HairAccessories #PickVela'},
 {'id':'bags','a':'crossbody','b':'tote','hook':'WHICH BAG FOR ERRANDS?','a_label':'CROSSBODY','b_label':'CANVAS TOTE','a_pivot':'JUST THE ESSENTIALS?','b_pivot':'ROOM FOR EXTRAS?','mid':'WHICH WOULD YOU GRAB?','close':'YOUR EVERYDAY BAG?','accent':'#52B6A4','accent2':'#F5AF61','slug':'crossbody-or-tote','caption':'Quick errand: are you grabbing the crossbody or bringing the tote? Pick the bag you would use on PickVela. These are style references, not items for sale. https://buylink-ng.onrender.com/p/crossbody-or-tote/?src=tiktok #Nigeria #BagStyle #PickVela'},
 {'id':'carry','a':'organiser','b':'pouch','hook':'BOX OR POUCH FOR SMALL THINGS?','a_label':'JEWELLERY BOX','b_label':'ZIP POUCH','a_pivot':'EVERYTHING IN ITS PLACE?','b_pivot':'EASY TO PACK?','mid':'HOW WOULD YOU STORE THEM?','close':'BOX OR POUCH?','accent':'#9674C5','accent2':'#F27797','slug':'organiser-or-pouch','caption':'Little things are easy to lose. Would you keep them in a jewellery box or a zip pouch? Vote on PickVela. The photos show style ideas, not stock. https://buylink-ng.onrender.com/p/organiser-or-pouch/?src=tiktok #Nigeria #EverydayStyle #PickVela'},
 {'id':'hair_details','a':'pins','b':'headbands','hook':'PEARL PINS OR A HEADBAND?','a_label':'PEARL PINS','b_label':'HEADBAND','a_pivot':'A LITTLE SHINE?','b_pivot':'A POP OF COLOUR?','mid':'WHICH WOULD YOU WEAR?','close':'YOUR HAIR DETAIL?','accent':'#BD875D','accent2':'#6DAF9A','slug':'pins-or-headbands','caption':'A small detail can change the whole look. Pearl pins or a colourful headband: which would you wear? Pick one on PickVela. No checkout. https://buylink-ng.onrender.com/p/pins-or-headbands/?src=tiktok #Nigeria #HairAccessories #PickVela'}
]
def draw_text(im,s,x,y,size,color='#18252B',anchor='mm',bold=True,maxw=640):
 d=ImageDraw.Draw(im)
 while True:
  f=ImageFont.truetype(FONT if bold else REG,size)
  if d.textbbox((0,0),s,font=f)[2]<=maxw or size<=20:break
  size-=1
 d.text((x,y),s,font=f,fill=color,anchor=anchor)
def rr(im,b,r,c):ImageDraw.Draw(im).rounded_rectangle(b,r,fill=c)
def photo(im,img,b,p):
 x0,y0,x1,y1=b;w=x1-x0;h=y1-y0;sc=1.01+.065*p
 pic=ImageOps.fit(img,(int(w*sc),int(h*sc)),Image.Resampling.LANCZOS)
 ox=(pic.width-w)//2;oy=(pic.height-h)//2
 im.paste(pic.crop((ox,oy,ox+w,oy+h)),(x0,y0))
def make(pack,t,A,B):
 ink='#17232A';cream='#F8F5E9';accent=pack['accent'];accent2=pack['accent2']
 def brand(im,light=False):draw_text(im,'PickVela',50,76,31,'white' if light else ink,anchor='lm')
 def badge(im,s,x,y,c):rr(im,(x-45,y-45,x+45,y+45),23,c);draw_text(im,s,x,y+2,48,'white')
 if t<2.4:
  p=t/2.4;im=Image.new('RGB',(W,H),ink);brand(im,True)
  photo(im,A,(0,210,356,1090),p);photo(im,B,(364,210,720,1090),p)
  rr(im,(28,245,692,410),28,cream);draw_text(im,pack['hook'],360,327,68,ink)
  badge(im,'A',125,780,accent);badge(im,'B',595,780,accent2)
  rr(im,(152,837,568,910),22,ink)
  draw_text(im,'YOU PICK. WE LISTEN.',360,875,34,'white')
 elif t<5:
  p=(t-2.4)/2.6;im=Image.new('RGB',(W,H),accent);brand(im,True)
  photo(im,A,(24,170,696,880),p)
  rr(im,(26,715,610,860),27,cream);draw_text(im,'A  '+pack['a_label'],52,785,51,ink,anchor='lm',maxw=540)
  draw_text(im,pack['a_pivot'],52,975,56,'white',anchor='lm',maxw=610)
 elif t<7.6:
  p=(t-5)/2.6;im=Image.new('RGB',(W,H),accent2);brand(im)
  photo(im,B,(24,170,696,880),p)
  rr(im,(26,715,610,860),27,cream);draw_text(im,'B  '+pack['b_label'],52,785,51,ink,anchor='lm',maxw=540)
  draw_text(im,pack['b_pivot'],52,975,56,ink,anchor='lm',maxw=610)
 elif t<11.2:
  p=(t-7.6)/3.6;im=Image.new('RGB',(W,H),cream);brand(im)
  draw_text(im,pack['mid'],360,214,57,ink)
  photo(im,A,(35,285,345,690),p);photo(im,B,(375,285,685,690),p)
  badge(im,'A',112,665,accent);badge(im,'B',608,665,accent2)
  draw_text(im,pack['a_label'],190,735,34,ink,maxw=270);draw_text(im,pack['b_label'],530,735,34,ink,maxw=270)
  draw_text(im,'VOTE ON PICKVELA',360,817,50,accent)
  draw_text(im,'Free style poll · no checkout',360,884,30,ink,bold=False)
 else:
  p=(t-11.2)/3.8;im=Image.new('RGB',(W,H),'#174F3D');brand(im,True)
  photo(im,A,(40,225,345,620),p);photo(im,B,(375,225,680,620),p)
  draw_text(im,pack['close'],360,685,70,'white')
  rr(im,(65,735,655,825),30,cream);draw_text(im,'VOTE ON PICKVELA',360,780,43,'#174F3D')
  draw_text(im,'buylink-ng.onrender.com',360,887,30,'white')
  draw_text(im,'Style reference photos  |  Pexels',360,1220,20,'#C9CCD0',bold=False)
 return im

def render(pack):
 A=Image.open(P/(pack['a']+('.png' if pack['a']=='organiser' else '.jpg'))).convert('RGB')
 B=Image.open(P/(pack['b']+'.jpg')).convert('RGB')
 tmp=P/(pack['id']+'-silent.mp4');final=P/(pack['id']+'-final.mp4')
 cmd=['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r','30','-i','-','-vf','scale=1080:1920:flags=lanczos,format=yuv420p','-c:v','libx264','-preset','veryfast','-crf','19','-movflags','+faststart',str(tmp)]
 proc=subprocess.Popen(cmd,stdin=subprocess.PIPE)
 for n in range(450):proc.stdin.write(make(pack,n/30,A,B).tobytes())
 proc.stdin.close()
 if proc.wait():raise RuntimeError(pack['id']+' render failed')
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(tmp),'-i',str(P/'original-beat.wav'),'-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','192k','-movflags','+faststart',str(final)],check=True)
 cover=make(pack,1,A,B);cover.save(P/(pack['id']+'-cover.jpg'),quality=92)
 print(pack['id'],final)
if __name__=='__main__':
 for pack in PACKS:render(pack)
 (P/'batch-manifest.json').write_text(json.dumps(PACKS,indent=2,ensure_ascii=False))
