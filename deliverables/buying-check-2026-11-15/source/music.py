from pathlib import Path
import numpy as np,wave
P=Path(__file__).resolve().parent
sr=48000;dur=15
rng=np.random.default_rng(214)
a=np.zeros(sr*dur,dtype=np.float64)
def add(t,s):
 pos=int(t*sr)
 if pos>=len(a):return
 n=min(len(s),len(a)-pos)
 a[pos:pos+n]+=s[:n]
def pluck(t,f):
 x=np.arange(int(.38*sr))/sr
 tone=(np.sin(2*np.pi*f*x)+.25*np.sin(4*np.pi*f*x))*.10*np.exp(-x*9)
 add(t,tone)
def kick(t):
 x=np.arange(int(.22*sr))/sr
 phase=2*np.pi*(62*x+110*(1-np.exp(-x*35))/35)
 add(t,.30*np.sin(phase)*np.exp(-x*22))
def hat(t):
 x=np.arange(int(.075*sr))/sr
 add(t,rng.standard_normal(len(x))*.025*np.exp(-x*68))
def clap(t):
 x=np.arange(int(.13*sr))/sr
 noise=rng.standard_normal(len(x))
 noise=np.concatenate([[0],np.diff(noise)])
 add(t,.05*noise*np.exp(-x*33))
beat=60/112
for i in range(int(dur/beat)+1):
 t=i*beat
 if i%4 in (0,2):kick(t)
 if i%4 in (1,3):clap(t)
 hat(t)
 hat(t+beat/2)
notes=[261.63,329.63,392.0,329.63,293.66,349.23,440.0,349.23]
for i in range(int(dur/(beat/2))):
 pluck(i*beat/2,notes[i%len(notes)])
a=np.tanh(a*1.2)
fade=np.minimum(1,np.arange(len(a))/(sr*.15))*np.minimum(1,(len(a)-np.arange(len(a)))/(sr*.45))
a*=fade
stereo=np.stack((a,a),axis=1)
with wave.open(str(P/'original-beat.wav'),'wb') as w:
 w.setnchannels(2);w.setsampwidth(2);w.setframerate(sr);w.writeframes((stereo*32767).astype('<i2').tobytes())
