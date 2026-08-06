(function(){
  const launch=document.createElement('button');
  launch.className='mentor-launch';
  launch.setAttribute('aria-label','打开智能法史助教');
  launch.innerHTML='<span>问</span>法史助教';
  const panel=document.createElement('aside');
  panel.className='mentor-panel';
  panel.setAttribute('aria-label','智能法史助教');
  panel.innerHTML=`<div class="mentor-head"><div><b>法史助教</b><small>结合当前案卷 · 解释制度与选择</small></div><button class="mentor-close" aria-label="关闭">×</button></div><div class="mentor-context"></div><div class="mentor-feed" aria-live="polite"></div><div class="mentor-chips"></div><form class="mentor-form"><input class="mentor-input" placeholder="例如：这个制度和现代法律有什么不同？" aria-label="向法史助教提问"><button class="mentor-send">提问</button></form>`;
  document.body.append(launch,panel);
  const feed=panel.querySelector('.mentor-feed'),chips=panel.querySelector('.mentor-chips'),context=panel.querySelector('.mentor-context'),input=panel.querySelector('.mentor-input');
  const currentCase=()=>typeof cases!=='undefined'&&state&&state.current!==null?cases[state.current]:null;
  function add(text,type='bot'){const el=document.createElement('div');el.className='mentor-msg '+type;el.innerHTML=text;feed.appendChild(el);feed.scrollTop=feed.scrollHeight}
  function refresh(){const c=currentCase();context.textContent=c?`当前案卷：${c.era}《${c.title}》｜你的身份：${c.role}`:'当前：八案总览';chips.innerHTML='';['本案学什么？','我的选择合理吗？','古今制度有何不同？'].forEach(q=>{const b=document.createElement('button');b.className='mentor-chip';b.textContent=q;b.onclick=()=>ask(q);chips.appendChild(b)})}
  function answer(q){const c=currentCase();if(!c)return '请先进入一宗案卷。我会结合当前时代、证据和你的裁断进行解释。';const last=state.logs&&state.logs[state.logs.length-1];if(/学什么|知识|考点|制度/.test(q))return `<b>本案学习目标：</b>${c.knowledge.join('；')}。<br>建议你在作答时同时考虑“规则是什么、为何形成、怎样运行、有什么边界”。`;if(/选择|合理|判|错|复盘/.test(q)){if(!last)return '你还没有作出本案选择。先进入情境完成一次判断，我会依据你的具体选择进行复盘。';return `<b>刚才的选择：</b>${last.choice}<br><b>即时评析：</b>${last.effect}<br>进一步思考：这个判断是否尊重了证据的证明边界，并符合当时而非现代的制度语境？`;}if(/现代|古今|今天|比较/.test(q))return `<b>比较提示：</b>不能直接用现代法治标准替代历史分析。先说明本案制度在当时解决了什么问题，再讨论其身份差等、权力制约或程序保障方面的局限。就本案而言，可围绕“${c.knowledge[0]}”与现代法律公开、平等适用和正当程序进行比较。`;if(/史实|真的|虚构|依据/.test(q))return `<b>史实边界：</b>${c.boundary}`;if(/证据|材料|证明/.test(q)){const names=(state.selected||[]).map(i=>c.evidence[i]&&c.evidence[i][0]).filter(Boolean);return names.length?`你带入庭审的证据是：<b>${names.join('、')}</b>。请分别判断其真实性、关联性及“不能直接证明”的部分，避免用一件材料包办全案。`:'本案有四件材料。打开证据卡时，重点比较“可以支持”与“不能直接证明”，再选择两件能够相互印证的材料。';}return `你问到了“${q.replace(/[<>]/g,'')}”。结合${c.era}《${c.title}》，建议从三层回答：先确认当时适用的制度，再用案中证据说明适用理由，最后指出制度的历史作用与局限。你也可以追问“本案学什么”“我的选择合理吗”或“史实边界”。`}
  function ask(q){if(!q.trim())return;add(q.replace(/[<>]/g,''),'user');setTimeout(()=>add(answer(q)),180)}
  launch.onclick=()=>{panel.classList.toggle('open');refresh();if(panel.classList.contains('open')&&!feed.children.length)add('我是本案的智能法史助教。我不会替你直接判案，但会结合当前案卷解释制度、证据边界和古今差异。')};
  panel.querySelector('.mentor-close').onclick=()=>panel.classList.remove('open');
  panel.querySelector('form').onsubmit=e=>{e.preventDefault();const q=input.value;input.value='';ask(q)};
})();
