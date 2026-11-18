const screens = [...document.querySelectorAll(".screen")];
function showScreen(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="final") toast("Keep shining, Riya. Your dreams are waiting ♡");
}
document.querySelectorAll("[data-next]").forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.next)));
const gift=document.getElementById("giftButton");
gift.addEventListener("click",()=>{gift.classList.add("opened");toast("Surprise! A whole lot of good wishes ♡");setTimeout(()=>showScreen("memories"),650)});
document.getElementById("restart").addEventListener("click",()=>showScreen("welcome"));
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2400)}
// Tiny floating hearts and stars
const sparkleBox=document.getElementById("sparkles");
for(let i=0;i<18;i++){const e=document.createElement("span");e.className="sparkle";e.textContent=["♡","✦","✧","·"][i%4];e.style.left=(Math.random()*100)+"%";e.style.animationDelay=(-Math.random()*9)+"s";e.style.animationDuration=(7+Math.random()*8)+"s";e.style.fontSize=(12+Math.random()*14)+"px";sparkleBox.appendChild(e)}
// Original, gentle ambient tones generated in-browser; no external music file or copyright track.
let audioCtx=null, oscillators=[], playing=false;
const musicButton=document.getElementById("musicToggle");
function startMusic(){
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC){toast("Audio isn't supported in this browser");return}
  audioCtx=audioCtx||new AC();audioCtx.resume();
  const master=audioCtx.createGain();master.gain.value=.035;master.connect(audioCtx.destination);
  [261.63,329.63,392,493.88].forEach((freq,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=freq;g.gain.value=[.32,.2,.16,.08][i];o.connect(g);g.connect(master);o.start();oscillators.push(o)});
  playing=true;musicButton.innerHTML="♫ <span>music on</span>";
}
function stopMusic(){oscillators.forEach(o=>{try{o.stop()}catch(e){}});oscillators=[];if(audioCtx){audioCtx.close();audioCtx=null}playing=false;musicButton.innerHTML="♫ <span>calm vibes</span>"}
musicButton.addEventListener("click",()=>playing?stopMusic():startMusic());