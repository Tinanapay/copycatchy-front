export function initApp(){

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible')
    }
  })
},{threshold:.12});

document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

document.querySelectorAll('.card').forEach((c,i)=>{
  c.style.transitionDelay=`${i*0.1}s`;
});

document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click',function(e){
    const r=document.createElement('span');
    const rect=this.getBoundingClientRect();
    r.style.cssText=`position:absolute;border-radius:50%;background:rgba(255,255,255,.45);width:10px;height:10px;top:${e.clientY-rect.top-5}px;left:${e.clientX-rect.left-5}px;animation:ripple .5s ease-out forwards;pointer-events:none`;
    this.style.position='relative';this.style.overflow='hidden';
    this.appendChild(r);setTimeout(()=>r.remove(),500);
  });
});

const style=document.createElement('style');
style.textContent=`@keyframes ripple{to{transform:scale(30);opacity:0}}`;
document.head.appendChild(style);

window.addEventListener('scroll',()=>{
  const nav=document.querySelector('nav');
  nav.style.boxShadow=window.scrollY>40?'0 4px 20px rgba(0,0,0,.1)':'none';
});

}