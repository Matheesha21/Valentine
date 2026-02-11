// Canvas setup
const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min,max){return Math.random()*(max-min)+min;}

// Floating Hearts
let particles = [];
class Heart{
  constructor(){
    this.x=random(0,canvas.width);
    this.y=canvas.height+20;
    this.size=random(10,25);
    this.speed=random(1,3);
    this.opacity=random(0.5,1);
    this.drift=random(-1,1);
    this.angle=random(0,Math.PI*2);
  }
  draw(){
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
    ctx.scale(this.size/30,this.size/30);
    ctx.beginPath();
    ctx.globalAlpha=this.opacity;
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(-15,-15,-30,10,0,30);
    ctx.bezierCurveTo(30,10,15,-15,0,0);
    ctx.fillStyle="#ff2e63";
    ctx.fill();
    ctx.restore();
  }
  update(){
    this.y-=this.speed;
    this.x+=this.drift;
    this.angle+=0.02;
    this.opacity-=0.002;
  }
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(particles.length<100) particles.push(new Heart());
  particles.forEach((p,i)=>{
    p.update(); p.draw();
    if(p.opacity<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize",()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});

// Buttons
const noBtn=document.getElementById("noBtn");
const yesBtn=document.getElementById("yesBtn");
const questionBox=document.getElementById("questionBox");
const surprisePage=document.getElementById("surprisePage");
const music=document.getElementById("bgMusic");

// NO button moves away
function moveNoButton(){
  const padding=80;
  const maxX=window.innerWidth-noBtn.offsetWidth-padding;
  const maxY=window.innerHeight-noBtn.offsetHeight-padding;
  noBtn.style.left=`${random(padding/2,maxX)}px`;
  noBtn.style.top=`${random(padding/2,maxY)}px`;
}
moveNoButton();
document.addEventListener("mousemove",(e)=>{
  const rect=noBtn.getBoundingClientRect();
  const dist=Math.hypot(e.clientX-(rect.left+rect.width/2), e.clientY-(rect.top+rect.height/2));
  if(dist<120) moveNoButton();
});

// YES button click
const titleText=document.getElementById("titleText");
yesBtn.addEventListener("click",()=>{
  music.play();
  questionBox.classList.add("hidden");
  surprisePage.classList.remove("hidden");
  for(let i=0;i<50;i++) particles.push(new Heart());
  typeWriter(titleText,"Happy Valentine’s Day 💖",120);
});

// Letter Icon click
const letterIcon = document.getElementById("letterIcon");
const romanticText = document.getElementById("romanticText");

// Save full text
romanticText.dataset.fullText = romanticText.textContent;
romanticText.textContent = "";

letterIcon.addEventListener("click", () => {
  letterIcon.style.display = "none";
  romanticText.classList.remove("hidden");
  romanticText.classList.add("show");
  typeWriter(romanticText, romanticText.dataset.fullText, 40);
  for(let i=0;i<30;i++) particles.push(new Heart());
});

// Typewriter function
function typeWriter(element,text,speed=100){
  let i=0; element.textContent="";
  const interval=setInterval(()=>{
    element.textContent+=text.charAt(i);
    i++;
    if(i>=text.length) clearInterval(interval);
  },speed);
}

// Falling petals
const petalContainer=document.getElementById("petalContainer");
function createPetal(){
  const petal=document.createElement("div");
  petal.classList.add("rosePetal");
  petal.style.left=Math.random()*window.innerWidth+"px";
  petal.style.animationDuration=(4+Math.random()*3)+"s";
  petal.style.width=(20+Math.random()*20)+"px";
  petal.style.height=petal.style.width;
  petalContainer.appendChild(petal);
  setTimeout(()=>petal.remove(),7000);
}
setInterval(()=>{createPetal();},300);

// Sparkles on YES button hover
document.addEventListener("mousemove", e=>{
  const rect=yesBtn.getBoundingClientRect();
  const dx=e.clientX-(rect.left+rect.width/2);
  const dy=e.clientY-(rect.top+rect.height/2);
  if(Math.hypot(dx,dy)<100){
    const sparkle=document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left=e.clientX+"px";
    sparkle.style.top=e.clientY+"px";
    document.body.appendChild(sparkle);
    setTimeout(()=>sparkle.remove(),500);
  }
});
