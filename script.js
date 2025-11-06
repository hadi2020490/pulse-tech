document.addEventListener('DOMContentLoaded', function(){
  if(window.AOS) AOS.init({duration:700,once:true,easing:'ease-out-cubic'});

  const years = ['year','year2','year3','year4','year5','yearServices','yearPortfolio','yearAbout','yearContact'];
  years.forEach(id => { const el=document.getElementById(id); if(el) el.textContent=new Date().getFullYear(); });

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const status = document.getElementById('form-status');
      status.textContent = 'Sending…';
      const templateParams = {
        from_name: form.from_name.value,
        reply_to: form.reply_to.value,
        company: form.company.value || '',
        message: form.message.value
      };
      emailjs.send('YOUR_SERVICE_ID','YOUR_TEMPLATE_ID', templateParams)
        .then(function(){ status.textContent = 'Message sent — thanks!'; form.reset(); })
        .catch(function(err){ status.textContent = 'Could not send message. Try again later.'; console.error(err); });
    });
  }

  document.querySelectorAll('video.hero-video').forEach(v=>{
    v.muted = true;
    v.play().catch(()=>{ });
  });

  const navLinks = document.querySelectorAll('.navbar .nav-link');
  navLinks.forEach(link => {
    if(link.href === location.href || (link.href.endsWith('index.html') && location.pathname.endsWith('/'))){
      link.classList.add('active');
    }
  });
});
