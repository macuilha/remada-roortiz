// Entrada suave ao rolar — progressive enhancement (sem JS ou sem suporte, conteúdo permanece visível).
(function(){
  if(!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('reveal-ready');
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  els.forEach(function(el){
    var rect = el.getBoundingClientRect();
    // Se a página carrega já pulando para uma âncora (ex.: link direto vindo do WhatsApp),
    // o que ficou acima do ponto de chegada nunca vai "entrar" na tela por scroll —
    // então já mostra direto, em vez de deixar invisível para sempre.
    if(rect.bottom < window.innerHeight){
      el.classList.add('is-visible');
    } else {
      io.observe(el);
    }
  });
})();
