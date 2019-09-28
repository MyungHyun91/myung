/* javascript */
window.addEventListener('scroll', function() 
{
  var el = document.querySelector('.show-on-scroll');
  if(window.scrollY >= 400) el.classList.add('shown');
  else el.classList.remove('shown');
});