import './style.css';

(function(){
  // Header + menu
  var header=document.getElementById('top');
  addEventListener('scroll',function(){header.classList.toggle('scrolled',scrollY>20)},{passive:true});
  var burger=document.getElementById('burger'),menu=document.getElementById('menu');
  burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
  function closeMenu(){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)}
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu()});
  document.addEventListener('click',function(e){if(!menu.contains(e.target)&&!burger.contains(e.target))closeMenu()});
  addEventListener('resize',function(){if(innerWidth>820)closeMenu()});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)})});
  document.getElementById('yr').textContent=new Date().getFullYear();

  // Reveal
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el,i){el.style.transitionDelay=(el.parentElement.classList.contains('services')||el.parentElement.classList.contains('steps')?(Array.prototype.indexOf.call(el.parentElement.children,el)*90):0)+'ms';io.observe(el)});

  // Hero checklist animation
  var items=document.querySelectorAll('#planList li'),k=0;
  function tickNext(){
    if(k<items.length){items[k].classList.add('done');k++;setTimeout(tickNext,900)}
    else{setTimeout(function(){items.forEach(function(i){i.classList.remove('done')});k=0;setTimeout(tickNext,700)},2600)}
  }
  setTimeout(tickNext,1200);

  // Areas explorer
  var icons={
    door:'<path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><circle cx="15" cy="12" r=".8"/>',
    stairs:'<path d="M3 21h4v-4h4v-4h4V9h4V5h2"/>',
    lift:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 2v20M8 9l-1.5 2h3zM16 11l-1.5-2h3z"/>',
    car:'<path d="M5 17h14M3 13l2-6h14l2 6v5H3z"/><circle cx="7.5" cy="16" r="1.5"/><circle cx="16.5" cy="16" r="1.5"/>',
    box:'<path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4"/>'
  };
  var C={blue:'#3b7fc4',green:'#3f9a5b'};
  var areas=[
    {id:'eingang',name:'Eingangsbereich',icon:'door',sub:'Der erste Eindruck Ihrer Liegenschaft.',
      tasks:['Eingangstür (Glas & Rahmen) reinigen','Türgriffe und Handläufe abwischen','Briefkästen reinigen','Lichtschalter und Interfon abwischen','Boden kehren / saugen','Boden feucht wischen'],
      notes:['Von oben nach unten arbeiten','Immer sauberes Tuch verwenden','Glasflächen zum Schluss mit Wetco Cristal nachreinigen','Boden zuletzt reinigen'],
      mat:[['Wetco Cristal',C.blue],['Wetco Surf',C.green],['Wetco Floor',C.blue]]},
    {id:'treppe',name:'Treppenhaus',icon:'stairs',sub:'Regelmässig und gründlich – Stockwerk für Stockwerk.',
      tasks:['Handläufe abwischen','Fensterbänke abwischen','Spinnweben entfernen','Boden kehren / saugen','Treppen und Podeste feucht wischen'],
      notes:['Vom obersten Stockwerk nach unten arbeiten','Handläufe und Kontaktflächen besonders gründlich reinigen','Treppenstufen gut auswischen, keine Pfützen hinterlassen'],
      mat:[['Wetco Surf',C.green],['Wetco Floor',C.blue]]},
    {id:'lift',name:'Lift',icon:'lift',sub:'Kontaktflächen, die täglich viele Hände berühren.',
      tasks:['Spiegel reinigen','Bedientasten reinigen','Handläufe abwischen','Wände abwischen (bei Bedarf)','Boden feucht wischen'],
      notes:['Tasten und Handläufe desinfizierend abwischen – mehrmals pro Woche','Keine aggressiven Mittel auf Edelstahl verwenden','Boden gut auswringen'],
      mat:[['Wetco Cristal',C.blue],['Wetco Surf',C.green],['Wetco Floor',C.blue]]},
    {id:'garage',name:'Garage',icon:'car',sub:'Sauberkeit und Sicherheit in der Einstellhalle.',
      tasks:['Grössere Abfälle entfernen','Boden kehren / saugen','Spinnweben entfernen','Eingangstüren abwischen','Lichtschalter abwischen'],
      notes:['Auf Sauberkeit und Sicherheit achten','Öl- oder Flecken nach Bedarf behandeln','Regelmässig lüften'],
      mat:[['Wetco Surf',C.green],['Wetco Floor',C.blue]]},
    {id:'keller',name:'Keller',icon:'box',sub:'Ordnung auch dort, wo man selten hinschaut.',
      tasks:['Boden kehren / saugen','Handläufe abwischen','Türen und Türgriffe abwischen','Spinnweben entfernen','Allgemeine Ordnung prüfen'],
      notes:['Feuchte Bereiche gut trocknen','Auf Sauberkeit und Ordnung achten','Bei Bedarf mit Hauswart absprechen'],
      mat:[['Wetco Surf',C.green],['Wetco Floor',C.blue]]}
  ];
  var tabs=document.getElementById('tabs'),panel=document.getElementById('panel');
  function svg(p){return '<svg viewBox="0 0 24 24">'+p+'</svg>'}
  areas.forEach(function(a,i){
    var b=document.createElement('button');
    b.className='tab';b.type='button';b.setAttribute('role','tab');b.id='tab-'+a.id;
    b.setAttribute('aria-selected',i===0);b.setAttribute('aria-controls','panel');
    b.innerHTML=svg(icons[a.icon])+'<span>'+a.name+'</span><svg class="arrow" viewBox="0 0 24 24" style="width:18px;height:18px"><path d="M9 6l6 6-6 6"/></svg>';
    b.addEventListener('click',function(){select(i)});
    b.addEventListener('keydown',function(e){
      var n=null;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%areas.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i-1+areas.length)%areas.length;
      if(n!==null){e.preventDefault();select(n);tabs.children[n].focus()}
    });
    tabs.appendChild(b);
  });
  function select(i){
    var a=areas[i];
    Array.prototype.forEach.call(tabs.children,function(t,j){t.setAttribute('aria-selected',j===i);t.tabIndex=j===i?0:-1});
    panel.setAttribute('aria-labelledby','tab-'+a.id);
    panel.innerHTML='<div><h3>'+a.name+'</h3><p class="sub">'+a.sub+'</p><ul class="tasks">'+
      a.tasks.map(function(t,k){return '<li style="animation-delay:'+(k*60)+'ms"><svg><use href="#check"/></svg>'+t+'</li>'}).join('')+
      '</ul><div class="chips">'+a.mat.map(function(m){return '<span class="chip"><i style="background:'+m[1]+'"></i>'+m[0]+'</span>'}).join('')+'</div></div>'+
      '<div class="notes"><h4>Vorgehen & Hinweise</h4><ul>'+a.notes.map(function(n){return '<li>'+n+'</li>'}).join('')+'</ul></div>';
  }
  select(0);

  // Toast + copy
  var toast=document.getElementById('toast'),tt;
  function show(m){toast.textContent=m;toast.classList.add('show');clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove('show')},2400)}
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-copy');
      try{navigator.clipboard.writeText(v).then(function(){show('E-Mail-Adresse kopiert')},function(){show(v)})}catch(e){show(v)}
    });
  });

  // Form -> mailto
  document.getElementById('form').addEventListener('submit',function(e){
    e.preventDefault();
    var f=e.target,ni=document.getElementById('name'),name=ni.value.trim();
    if(!name){ni.focus();ni.style.borderColor='#c94a43';show('Bitte Ihren Namen angeben');return}
    ni.style.borderColor='';
    var l=Array.prototype.map.call(f.querySelectorAll('input[name=leistung]:checked'),function(x){return x.value});
    var body='Guten Tag\n\nIch interessiere mich für eine Offerte.\n\n'+
      'Name: '+name+'\n'+
      (f.firma.value?'Verwaltung / Firma: '+f.firma.value+'\n':'')+
      (f.tel.value?'Telefon: '+f.tel.value+'\n':'')+
      (f.ort.value?'Objekt / Ort: '+f.ort.value+'\n':'')+
      (l.length?'Leistung: '+l.join(', ')+'\n':'')+
      (f.msg.value?'\n'+f.msg.value+'\n':'')+
      '\nFreundliche Grüsse\n'+name;
    var subj='Offertanfrage'+(l.length?' – '+l.join(', '):'');
    location.href='mailto:reinigung@markota.ch?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
    show('Ihr E-Mail-Programm wird geöffnet …');
  });
})();
