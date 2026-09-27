(function(){
  const order=[0,1,8,2,3,9,4,5,6,7]; window.tenCaseOrder=order;
  const labels=['一','二','三','四','五','六','七','八','九','十'];
  const books={
    8:{
      id:8,kind:'qin',edition:'qin-v4',era:'秦朝·某县',title:'一纸重令',sub:'重刑威慑、军期与长期治理',role:'秦朝某县令',
      intro:'前线余粮只够七日。一支粮队逾期未至，郡府军令催到县署。今夜颁布的命令，会影响粮队赶路，也会影响他们下一次遇险时愿不愿意如实报告。',
      facts:[['军情与军期','前线粮食只够七日，补给延误会影响军中供给。'],['秦的治理','秦以统一法令、户籍、官吏考核和赏罚体系组织基层治理；法律执行与国家动员紧密相连。'],['道路与信息','暴雨造成山道落石。县署若迟迟收不到报告，就无法及时判断改道、调粮或救援。'],['人物处境','领队蒙渠怕因误期受责，车夫阿梁受伤，粮夫石父私藏一袋粮，里正担心整队连带受责。']],
      cast:[['蒙渠','粮队领队','熟悉路线，须对调度和报险决策负责；他知道山道受阻，却担心上报后先被按误期追责。','我只想再等半日，等路通了再说。'],['阿梁','受伤车夫','亲历落石和车辆受困，伤势使他无法驾车；他曾建议派人步行报信。','车不能走，人未必不能走。'],['石父','粮夫','参与搬运，曾劝队长不要报县，后来又私藏一袋军粮；他的个人行为不能代表全队。','若全队都要受责，我总得先保住家里。'],['里正','基层见证人','熟悉所属里伍与粮队关系，能提供基层信息，也提醒县令互保可能夹带私怨。','共同具结能让消息来得快，也会让人怕被邻里牵连。']],
      opening:[['严刑催运令','“粮队逾期者，先按误军登记；同队里伍连带受责，不得以风雨为辞。”','短期内明确军期并加强威慑；若灾情也先受罚，人们可能选择隐瞒。'],['先报险、后核验令','“山道遇阻者，先遣一人持木牌报县；县署验明后另定期限，虚报仍究。”','让县署更早知道险情并决定改道；核验需要人手，粮运也可能晚到。'],['领队分责令','“先查领队调度与报险行为，再按知情、协助及实际行为分别登记，不先累及全队。”','把责任与实际行为相连；命令更细，执行和调查也更费时。']],
      outcome:{'严刑催运令':'其余粮队冒雨赶路，粮仓暂时得到补给。账册上的误期记录减少；失期粮队却没有及时报县，县署仍不知道山道是否断绝。','先报险、后核验令':'一名信使带回断桥消息，县署及时改道调车。另一支失期粮队仍留下未送出的报险木牌：报险渠道存在，不代表恐惧马上消失。','领队分责令':'粮队开始分别登记受伤、灾阻、迟报与缺粮。情况更清楚，但仓吏提醒县令，逐项核验需要时间。'},
      evidence:[['落石与伤布','阿梁左腿受伤，伤布沾有新鲜石屑。','支持山道附近发生落石、阿梁受伤。','不能证明所有粮车都无法通行，也不能证明任何人都无法步行报信。'],['陷泥车轮','粮车深陷泥中，岔路留有一串浅而连续的脚印。','支持粮车一度受困，且附近有人曾沿岔路步行。','不能证明脚印属于哪位粮夫，也不能单独证明领队何时知道道路情况。'],['未送木牌','蒙渠写好“山道崩阻”的木牌，却留在车辕夹层；木牌边缘已被雨水浸软。','支持领队知道险情，并曾考虑向县署报告但没有送出。','不能单独证明他故意隐瞒；也不能替代对“为何等待、能否派人”的追问。'],['石洞粮袋','石洞里找到一袋拆封军粮，粮袋印记与军粮册相符；袋口有单人搬运留下的拖痕。','支持有人接触并私藏了与军粮册相符的一袋粮。','不能仅凭粮袋认定具体行为人，更不能推定整队共同侵吞；仍要结合供述和接触机会核实。']],
      inquiry:[['为何没有报险','追问木牌为何未送、是谁提出等待、报险后会受到什么处置。','蒙渠担心先被登记误军；阿梁曾建议步行报信；石父是否劝阻仍须单独核实。'],['道路是否全断','勘验主路、岔路和伤者行动能力，区分车辆受困与人员无法报信。','主路确被落石阻断，粮车无法继续；岔路可供步行，阿梁的伤势也已确认。'],['谁私藏军粮','核对军粮册、封记与石洞粮袋，分别询问每个人接触粮袋的时间。','石父承认藏了一袋，其他三人否认知情；私藏事实成立，不能用集体连坐替代个别查明。']],
      confrontations:[
        {question:'木牌已经写好，为什么没有送回县署？',lines:[['蒙渠','“令上先记误军。我怕一报险，先问的还是谁逾期。”'],['阿梁','“我劝他派人回县。腿伤了车不能走，人能走。”'],['石父','“我说过别报。我以为报了，全队都要受责。”'],['里正','“互保能让人彼此监督，也可能让人因为害怕牵连而闭口。”']]},
        {question:'主路断了，岔路还能不能报信？',lines:[['阿梁','“车过不去，人能走。我伤了腿，仍能指路。”'],['蒙渠','“我担心派走一个人，剩下的人更赶不上军期。”'],['传令吏','“县署若早知道断桥，或许能调车改道。”'],['里正','“灾阻是真的，迟报也是真的；两件事可以同时查。”']]},
        {question:'石洞里的粮袋是谁藏的？',lines:[['石父','“是我拿的，只有一袋。别人没有帮我。”'],['蒙渠','“我知道缺粮，却不知道他把粮藏在石洞。”'],['阿梁','“别把我受伤、他迟报和石父私藏写成同一件事。”'],['里正','“若整队一同受责，个人行为反而更难从人群里分清。”']]}
      ],
      reports:[['一律重责，强调军期','“先守军期，以严令催运；灾阻及个人行为留待后核。”','命令整齐、执行迅速，但恐惧可能让人不敢及时报告。','令严而讯息塞','其余粮队冒雨赶路，眼前补给较快。下一次断桥时，粮队先担心如何免责，县署在粮车失联后才得知险情。账册看似整齐，治理者却失去真实消息。'],['灾阻、失职、侵吞分别处理','“道路受阻和伤病据实登记；领队知险未报依职责究责；私藏军粮者按其个人行为处理，其余人不因未审事实连带。”','维持军期，同时区分灾害、失职与侵吞；需要核验，也要求官府保留报险渠道。','分责而令行','呈报稍晚，军粮改道后一日抵达。县署据实记录山道中断、领队迟报和石父私藏，未把受伤者与全队一并归责。后来粮队遇险先派人报县，官府得以及时改道调粮。'],['一概宽宥，优先安抚粮队','“暴雨山崩，粮队皆免追问；藏粮也以饥困为由不再核验。”','短期安抚了粮队，但事实和责任被一并放下，难以建立下一次可遵循的规则。','宽宥而纲失','粮队情绪暂缓，石父把粮袋交回。可县署没有查清迟报原因，也没有说明下次遇险应如何报告。后来类似问题仍要临时处置，灾害、失职和侵吞容易混为一谈。']],
      knowledge:['秦以统一法令和严密行政体系提高动员、执行能力。','赏罚和责任制度可以带来短期服从，但不能自动换来真实信息与长期合作。','灾阻、未报险、受伤和个人侵吞是不同事实，应分别调查、说明责任。','有法律制度不等于治理效果必然最好；评价秦制要同时看到其组织能力与重刑峻法的代价。'],
      boundary:'秦朝行政动员、统一法令、户籍和赏罚制度属于历史背景。粮队、县令、暴雨、人物与对话均为课堂教学重构，不对应一宗真实秦代案件或一条可直接引用的秦律条文。'
    },
    9:{
      id:9,kind:'tang',era:'唐·长安',title:'夜半药铺案',sub:'律疏结合、首从与少年责任',role:'长安县法曹参军',
      intro:'晨钟刚响，少年携两包药材被带到县署。店主账册记有三包待交药材，巷口还出现过一名成年男子。第一眼像是简单盗案，但案卷必须把行为、年龄、损失与情理背景分别写清。',
      facts:[['坊市秩序','长安坊市有夜间出入与商铺经营秩序，县署须查清后门被撬和人员行动。'],['律疏结合','唐律以律文规定边界，又以疏议说明条文含义和适用方法。'],['案件难题','少年携药包、成年人在巷口、第三包药材受潮，这些事实不能直接合成同一结论。'],['你的职责','你须为县令整理首从、年龄、药材返还和损失核定的处理意见。']],
      opening:[['核药账文书','“先清点药材、核对账册和交货木牌，确定店主究竟失去什么。”','先固定药材数量和病家交药事项。'],['分讯文书','“少年与成年人分开讯问，各自说明谁进后门、谁拿药、谁在巷口。”','先让两份供述不能互相影响。'],['巷证文书','“先核查巷口证人看见了什么，又没有看见什么。”','先划清证言能够支持的事实范围。'],['访关系文书','“先核查少年与成年人的雇佣、往来和钱物关系。”','先理解二人为什么会在同一条巷口出现。']],
      outcome:{'核药账文书':'药秤显示两包药材完好，账册原记三包。店主当日要向病家交药，第三包的去向和延误损失仍待查明。','分讯文书':'少年承认进入后门，成年人承认在巷口等待。两人对“谁先提出此事”的说法彼此矛盾。','巷证文书':'证人看见少年抱药包走出巷口，也看见成年人招手接应。雨声盖住对话，证人没有听见谁提出计划。','访关系文书':'少年曾替成年人做杂役，成年人成年曾给他少量钱财。二人有往来，但往来本身不能证明造意。'},
      evidence:[['药铺账册与药秤','两包药材尚可使用，第三包去向不明，店主原定当日交药。','药材数量和待核实的损失。','不能证明谁先起意。'],['分讯记录','少年承认进入药铺；成年人承认在巷口等待，但双方对造意说法不同。','部分行动经过。','不能单独解决谁先造意。'],['巷口证言','证人看见少年携药包、成年人接应；没有听清二人对话。','缩小调查范围。','不能把“在场”直接写成“主谋”。'],['夜巡簿与受潮药包','更夫听见成年人说“按先前说的，仍走后门”；第三包在排水沟旁受潮。','成年人参与的线索与部分损失。','仍需结合整体证据判断首从。']],
      inquiry:[['补核病家损失','核实病家是否因药材受潮和延误发生可证明损失。','店主的药材返还与损失事项更清楚，但不能替代行为责任认定。'],['复讯造意经过','围绕“先前说的”分别追问两人，核对夜巡簿与此前往来。','成年人参与和可能造意的线索加强，仍须避免把线索当作一句话定罪。'],['验明药包去向','查第三包如何落入排水沟，以及逃离途中谁接触过药材。','损坏过程更清楚，但不当然决定谁先提出盗窃。'],['访查杂役往来','核对少年是否因杂役、钱物关系受到成年人影响。','能理解二人关系，也不能把受影响直接等同于没有责任。']],
      legalCards:[['少年进入药铺搬运药材','共同犯罪与实际参与'],['成年人巷口接应及“先前说的”','共同犯罪与首从待查'],['少年十四岁','老小及疾有犯'],['两包返还、第三包受潮','赃物与损失']],
      shelves:['名例律·共犯罪','名例律·老小及疾有犯','赃物与损失','律文与疏议解释'],
      expected:['名例律·共犯罪','名例律·共犯罪','名例律·老小及疾有犯','赃物与损失'],
      rulings:[['分别成卷','“先将造意、实际行为、年龄和药材损失分列，逐项查明后合成处理意见。”','每个问题都有对应事实和规则，案卷更复杂，结案也较慢。','四栏成卷','两包完好药材返还店主，受潮药材列入损失清册。少年和成年人面对不同卷宗，县令在“续查造意”卷上盖印。'],['以入铺行为为中心','“先以进入药铺、搬运药材的行为立卷，其余事实另作补查。”','少年实际行为明确，案件可以迅速启动；成年人参与可能被置于补充位置。','先入之见','少年卷宗先被封缄。县令翻到巷口证言与夜巡簿后重新展开卷页：药包提供调查起点，却没有提供全案结论。'],['以共同谋议为中心','“先按两人共同谋议方向组织案卷，待确认造意者后再分首从。”','重视接应和此前往来，但“共同谋议”不能先于足够证据写成结论。','同谋未明','案卷写满“共同”二字，县令用朱笔圈出“谁先造意”。二人同行与接应并未自动解答首从。'],['先返还再续审','“先返还完好药材、登记受潮损失，刑事责任另待证据查明。”','迅速回应店主和病家；若止于返还，会把损失处理与行为责任混在一起。','未完的药账','店主收回两包药材，第三包仍受潮放在案桌。返还药材只是案卷的一部分，责任认定尚未结束。']],
      knowledge:['《唐律疏议》以律文和疏议共同构成法典解释结构。','共同犯罪需要区分造意者、随从者与实际参与者。','少年年龄是依法审查的重要事实，不等于当然免责。','返还赃物、核定损失与刑罚裁断属于不同问题。','礼法结合让身份、年龄和伦理关系进入制度化审查，不以人情替代规则。'],
      boundary:'《唐律疏议》的首从规则、老小特别规定和律疏结合均有史实基础。药铺、人物、药材和经过为虚构教学情境，游戏不据此推算具体刑期或赎额。'
    }
  };
  let current=null,book=null;
  const storage=i=>'lvmai-ten-case-v1-'+i;
  const blank=i=>({id:i,edition:i===8?'qin-v4':'ten-v1',phase:'brief',seen:[],initial:null,inquiry:null,assign:{},activeCard:null,ruling:null,logs:[],talked:[],followed:[],selectedNpc:null,confrontTalked:[],confrontFollowed:[],selectedWitness:null});
  const load=i=>{try{const saved=JSON.parse(localStorage.getItem(storage(i))||'null');if(!saved||(i===8&&saved.edition!=='qin-v4'))return blank(i);return Object.assign(blank(i),saved)}catch(e){return blank(i)}};
  const save=()=>localStorage.setItem(storage(book.id),JSON.stringify(current));
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const letter=i=>String.fromCharCode(65+i);
  function shell(){
    document.getElementById('newCaseGame')?.remove();
    const root=document.createElement('section');root.id='newCaseGame';
    root.innerHTML=`<div class="nc-bg ${book.kind==='tang'?'tang':''}"></div><header class="nc-top"><div><small>第${labels[order.indexOf(book.id)]}卷 · ${book.era}</small><b>${book.title}</b></div><div><button onclick="ncNotes()">法脉札记</button><button onclick="ncRestart()">重开本卷</button><button onclick="ncExit()">返回十案图</button></div></header><main id="ncMain" class="nc-shell"></main><div id="ncModal" class="nc-modal hidden"></div>`;
    document.body.appendChild(root);
  }
  function modal(html){const m=document.getElementById('ncModal');m.innerHTML=`<div>${html}</div>`;m.classList.remove('hidden')}
  function close(){document.getElementById('ncModal').classList.add('hidden')}
  function progress(n){return `<div class="nc-progress">${[0,1,2,3,4].map(i=>`<span class="${i<=n?'on':''}"></span>`).join('')}</div>`}
  function stage(html){
    const bg=document.querySelector('#newCaseGame .nc-bg');
    if(book.kind==='qin'&&bg){const scenes={brief:'qin-county-night.png',open:'qin-county-night.png',outcome:'qin-county-night.png',investigate:'qin-rain-road.png',confront:'qin-court.png',legal:'qin-court.png',ending:'qin-dawn-convoy.png'};bg.style.background=`linear-gradient(90deg,#080604dc,#08060455),url('./assets/${scenes[current.phase]||scenes.brief}') center/cover`}
    document.getElementById('ncMain').innerHTML=html;window.scrollTo(0,0)
  }
  function option(text,detail,call,i){return `<button class="nc-option" onclick="${call}"><b>${letter(i)}</b>${esc(text)}<small>${esc(detail)}</small></button>`}
  function start(id){document.querySelectorAll('.screen').forEach(el=>el.classList.add('hidden'));state.current=id;state.view="custom";localStorage.setItem("lvmai-full-v4",JSON.stringify(state));book=books[id];current=load(id);shell();render()}
  function render(){if(current.phase==='brief')return brief();if(current.phase==='open')return openOrder();if(current.phase==='outcome')return outcome();if(current.phase==='investigate')return investigate();if(current.phase==='confront')return qinConfront();if(current.phase==='legal')return legal();if(current.phase==='ruling')return ruling();return ending()}
  function brief(){stage(`<section class="nc-panel"><div class="nc-kicker">时代入局 · ${book.role}</div>${progress(0)}<h1>${book.title}</h1><p class="nc-lead">${book.intro}</p><div class="nc-facts">${book.facts.map((f,i)=>`<button class="nc-fact ${current.seen.includes('f'+i)?'seen':''}" onclick="ncFact(${i})"><b>${f[0]}</b><span>${current.seen.includes('f'+i)?f[1]:'点击查阅案前背景'}</span></button>`).join('')}</div><div class="nc-actions">${current.seen.length===book.facts.length?'<button class="nc-primary" onclick="ncOpenOrder()">进入县署议事</button>':'<button class="nc-secondary" disabled>请先查阅四份案前背景</button>'}</div></section>`)}
  function openOrder(){
    if(book.kind!=='qin'){current.phase='open';save();stage(`<section class="nc-scene"><div class="nc-scene-label"><div class="nc-kicker">第一幕 · 县署议事</div><h1>第一份调查文书</h1><p>少年、店主和案卷都在县署等待。你只能先展开一条调查路线，其余问题会留在后续案卷。</p></div><div class="nc-dialogue"><div class="nc-speaker">法曹案房</div><p>店主想先找回药材，书吏想先分讯两人，县令要求证人说清看见与未看见的部分，坊正则提醒二人此前有杂役往来。</p><div class="nc-options">${book.opening.map((x,i)=>option(x[0],x[2],`ncChooseInitial(${i})`,i)).join('')}</div></div></section>`);return}
    current.phase='open';save();const selected=current.selectedNpc;const person=selected===null?null:book.cast[selected];const intro='夜雨打在县署檐瓦上。郡府传令吏把军期木牌放到案前：前线余粮只够七日。县令尚未发令，粮队相关人都在堂下等候。你可以先听不同人的处境，再决定命令如何写。';
    const replies=['“若先报县，令上写的是误期先罚。我想等路通了再补呈。”','“车陷住了，我的腿也伤了；但岔路能走，我建议派人回县。”','“我怕一报险，全队都被算作误军。我还藏了一袋粮，不敢让他们知道。”','“连坐能让邻里互相监督，也会让人怕牵连而不敢报真话。”'];
    const chars=book.cast.map((p,i)=>`<button class="nc-scene-person ${selected===i?'active':''} ${current.followed.includes(i)?'heard':''}" onclick="ncTalkOpening(${i})"><i>${p[0][0]}</i><span><b>${p[0]}</b><small>${p[1]} · ${current.followed.includes(i)?'已追问':'与他交谈'}</small></span></button>`).join('');
    const dialogue=person?`<div class="nc-speaker">${person[0]} · ${person[1]}</div><p>${person[3]}</p>${current.followed.includes(selected)?`<div class="nc-response"><b>你的追问：</b>${replies[selected]}</div>`:`<div class="nc-replies"><button onclick="ncFollowOpening(${selected})">追问：你最担心命令中的哪一处？</button></div>`}`:`<div class="nc-speaker">郡府传令吏</div><p>${intro}</p><div class="nc-response">“军期将到。县署要的不只是粮车按时抵达，还要知道山路一旦出事，消息能不能回来。”</div>`;
    const decisions=current.followed.length>=2?`<div class="nc-decision-lead"><b>已有${current.followed.length}人说明处境。</b>县令转向你：“你听到了军期、伤情和报险的顾虑。命令如何落笔，才既催运又能让县署听到真话？”</div><div class="nc-qin-decisions">${book.opening.map((x,i)=>`<button class="nc-qin-choice" onclick="ncChooseInitial(${i})"><b>${letter(i)} · ${x[0]}</b><span>你向郡府传令吏提出：${x[1]}</span><small>${x[2]}</small></button>`).join('')}</div>`:`<div class="nc-waiting">请至少与两位在场人物交谈并追问，再提出第一道命令。已听取 ${current.followed.length}/2 人。</div>`;
    stage(`<section class="nc-qin-scene"><div class="nc-scene-label"><div class="nc-kicker">第一幕 · 县署夜议 / 军期木牌在案</div><h1>先听人，再落令</h1><p>选择堂下人物交谈。不同身份会把同一道命令看成不同的风险。</p></div><div class="nc-scene-roster">${chars}</div><div class="nc-dialogue nc-live-dialogue">${dialogue}${decisions}</div></section>`)
  }
  function talkOpening(i){current.selectedNpc=i;if(!current.talked.includes(i))current.talked.push(i);save();render()}
  function followOpening(i){if(!current.followed.includes(i))current.followed.push(i);current.logs.push({stage:'县署问话',choice:`追问${book.cast[i][0]}`,note:['领队担心先被按误期追责。','车夫确认人可以从岔路步行报信。','粮夫担心全队受责，也承认个人藏粮。','里正指出连坐既能互保，也可能封住报险渠道。'][i]});save();render()}
  function chooseInitial(i){current.initial=i;current.logs.push({stage:'案前决定',choice:book.opening[i][0],note:book.opening[i][2]});current.phase='outcome';save();render()}
  function outcome(){const choice=book.opening[current.initial],text=book.outcome[choice[0]];stage(`<section class="nc-scene"><div class="nc-scene-label"><div class="nc-kicker">第二幕 · 新消息</div><h1>${book.kind==='qin'?'三日后的粮仓':'案卷初核'}</h1><p>${book.kind==='qin'?'你发布的命令已经传遍粮队。粮仓的变化先告诉你它带来的收益，失期粮队的记录仍没有展开。':'第一份调查文书带来一部分事实，也让另一些问题更突出。案卷还没有足够材料确定谁承担何种责任。'}</p></div><div class="nc-dialogue"><div class="nc-speaker">案卷旁白</div><p>${text}</p><div class="nc-outcome">现在出现的新问题是：${book.kind==='qin'?'失期粮队没有及时报县，山道旁还发现翻车和藏粮痕迹。':'另外三类材料正在送往县署。案件需要从“第一眼看见什么”转向“每条材料能支持什么”。'}</div><div class="nc-actions"><button class="nc-primary" onclick="ncNextInvestigation()">${book.kind==='qin'?'前往雨后山路':'查阅后续案卷'}</button></div></div></section>`)}
  function investigate(){const complete=current.seen.filter(x=>x.startsWith('e')).length===book.evidence.length;if(book.kind==='qin'){const clues=book.evidence.map((e,i)=>`<button class="nc-qin-clue clue-${i+1} ${current.seen.includes('e'+i)?'seen':''}" onclick="ncEvidence(${i})"><i>现场线索 0${i+1}</i><b>${e[0]}</b><small>${current.seen.includes('e'+i)?'已验看 · 可复查':'靠近查看'}</small></button>`).join('');const inquiry=complete?`<div class="nc-dialogue nc-live-dialogue"><div class="nc-speaker">县令 · 现场勘验后</div><p>你已经看过四处线索。接下来先找谁核对？不同的追问顺序会让粮队讲出不同的重点，但每一条陈述都还需要相互印证。</p><div class="nc-qin-decisions">${book.inquiry.map((x,i)=>`<button class="nc-qin-choice" onclick="ncChooseInquiry(${i})"><b>${letter(i)} · 先问：${x[0]}</b><span>${x[1]}</span><small>优先核对后：${x[2]}</small></button>`).join('')}</div></div>`:`<div class="nc-waiting">雨还没停。点击现场的四处线索，逐一查看它们能证明什么、又不能替你证明什么。</div>`;stage(`<section class="nc-qin-scene nc-investigation"><div class="nc-scene-label"><div class="nc-kicker">第二幕 · 雨后山道 / 现场勘验</div><h1>车停在泥里，消息为何没回来？</h1><p>山路、伤者、木牌和藏粮痕迹同时出现在眼前。点击现场线索，再决定先向谁问话。</p></div><div class="nc-clue-field">${clues}</div>${inquiry}</section>`);return}stage(`<section class="nc-panel"><div class="nc-kicker">第三幕 · 证据逐渐清楚</div>${progress(2)}<h1>药包、巷灯与后门</h1><p class="nc-lead">少年携药包、成年人接应、第三包受潮和二人此前往来，分别指向不同的问题。请先查看每件材料的证明范围。</p><div class="nc-evidence">${book.evidence.map((e,i)=>`<button class="${current.seen.includes('e'+i)?'seen':''}" onclick="ncEvidence(${i})"><i>${i+1}</i><b>${e[0]}</b><span>${current.seen.includes('e'+i)?'已收入案卷':'点击查看材料与证明边界'}</span></button>`).join('')}</div>${complete?`<div class="nc-note"><b>调查取舍：</b>所有材料都已进入案卷。现在选择一份优先调查文书，它会决定县署首先追问的问题。</div><div class="nc-options">${book.inquiry.map((x,i)=>option(x[0],x[1],`ncChooseInquiry(${i})`,i)).join('')}</div>`:'<div class="nc-note">请依次查看四份材料。每件材料只能回答一部分问题。</div>'}</section>`)}
  function evidence(i){const e=book.evidence[i];modal(`<small>第 ${i+1} 件材料</small><h2>${e[0]}</h2><p>${e[1]}</p><div class="fact"><b>可以支持：</b>${e[2]}</div><div class="limit"><b>不能直接证明：</b>${e[3]}</div><button class="nc-primary" onclick="ncTakeEvidence(${i})">收入案卷</button><button class="nc-secondary" onclick="ncClose()">暂不收录</button>`)}
  function person(i){const p=book.cast[i];modal(`<small>人物档案 · ${p[1]}</small><h2>${p[0]}</h2><p>${p[2]}</p><div class="fact"><b>此刻他说：</b>“${p[3]}”</div><button class="nc-primary" onclick="ncClose()">回到县署</button>`)}
  function chooseInquiry(i){current.inquiry=i;current.logs.push({stage:'优先调查',choice:book.inquiry[i][0],note:book.inquiry[i][2]});current.phase=book.kind==='qin'?'confront':'legal';save();render()}
  function qinConfront(){
    const q=book.confrontations[current.inquiry];
    const policy=['你先颁布了严刑催运令。蒙渠解释，最先让他害怕的是“误军登记”，所以他迟迟没有派人报险。','你先开通报险木牌。其他粮队已有信使送回断桥消息；但这支粮队仍留下未送出的木牌，说明有报险办法也不代表恐惧立刻消失。','你先发布领队分责令。县署将分别核对领队调度、车夫伤情和粮夫行为，不把整队当作一个人。'][current.initial];
    const extra=[
      ['“令文先写误军，我怕一报险就先受罚，没机会解释山路。”','“我腿受伤但还能指路；我劝他派人回县，也没看见是谁把木牌留下。”','“我担心连坐，所以劝他别报；那袋粮是我自己藏的，与旁人无关。”','“互保能催人办事，也能让邻里互相掩护。县署应核具体行动，不能只听一方指认。”'],
      ['“落石挡住车路，但我没亲自试岔路。脚印是谁的，我不能说。”','“我腿伤后仍能指路；我看到岔路有人走过，却没看清是谁先走。”','“路断以后大家都急，我只知道车过不去；这不能解释粮袋是谁拿的。”','“车道不通和人不能报信是两件事。若能派人，县署当时便可能改道。”'],
      ['“我负责调度，没看见谁拿粮袋；未送木牌的事我认。”','“我只看见石洞袋口的拖痕，不能凭痕迹认定是谁搬的。”','“粮袋是我藏的。县令要追我个人的事，不该把全队都写成同谋。”','“整队受罚会让人互相指责或隐瞒。请把藏粮和迟报分开查。”']
    ][current.inquiry];
    const selected=current.selectedWitness,person=selected===null?null:book.cast[selected];
    const roster=q.lines.map((line,i)=>`<button class="nc-scene-person ${selected===i?'active':''} ${current.confrontFollowed.includes(i)?'heard':''}" onclick="ncSelectWitness(${i})"><i>${line[0][0]}</i><span><b>${line[0]}</b><small>${current.confrontFollowed.includes(i)?'已追问':'听取陈述'}</small></span></button>`).join('');
    const dialogue=person?`<div class="nc-speaker">${q.lines[selected][0]} · ${book.cast[selected][1]}</div><p>${q.lines[selected][1]}</p>${current.confrontFollowed.includes(selected)?`<div class="nc-response"><b>追问“${q.question}”：</b>${extra[selected]}</div>`:`<div class="nc-replies"><button onclick="ncFollowWitness(${selected})">追问：${q.question}</button></div>`}`:`<div class="nc-speaker">县令</div><p>“你选了先查「${book.inquiry[current.inquiry][0]}」。现在请依次听当事人和见证人的陈述，并追问他们之间的矛盾。”</p><div class="nc-response">${policy}<br><br><b>本轮要查：</b>${q.question}</div>`;
    const ready=current.confrontFollowed.length>=4?`<div class="nc-decision-lead"><b>四位在场人物均已完成追问。</b>${book.inquiry[current.inquiry][2]}</div><div class="nc-actions"><button class="nc-primary" onclick="ncAdvanceRuling()">带着查明的事实写呈报</button></div>`:`<div class="nc-waiting">需要听完并追问四位在场人物，才能向县令提交呈报。已完成 ${current.confrontFollowed.length}/4 人。</div>`;
    stage(`<section class="nc-qin-scene"><div class="nc-scene-label"><div class="nc-kicker">第三幕 · 粮队到县署 / 逐人问话</div><h1>${q.question}</h1><p>${book.inquiry[current.inquiry][1]}</p></div><div class="nc-scene-roster">${roster}</div><div class="nc-dialogue nc-live-dialogue">${dialogue}${ready}</div></section>`)
  }
  function selectWitness(i){current.selectedWitness=i;save();render()}
  function followWitness(i){if(!current.confrontFollowed.includes(i))current.confrontFollowed.push(i);current.logs.push({stage:'逐人追问',choice:`追问${book.cast[i][0]}`,note:book.confrontations[current.inquiry].question});save();render()}
  function legal(){if(book.kind==='qin')return qinLegal();return tangLegal()}
  function qinLegal(){const q=book.inquiry[current.inquiry],initial=book.opening[current.initial];stage(`<section class="nc-qin-scene"><div class="nc-scene-label"><div class="nc-kicker">第四幕 · 县署呈报 / 军期将至</div><h1>事实已清，命令如何落笔？</h1><p>你先发布“${initial[0]}”，再优先调查“${q[0]}”。传令吏、里正和粮队都在等你的处理意见。</p></div><div class="nc-hearing-voices"><p><b>郡府传令吏：</b>“前线等粮，期限不能无限延后。”</p><p><b>阿梁：</b>“车被困住了，不能因此说所有人都不能报信。”</p><p><b>蒙渠：</b>“迟报是我决定的，但我也要能说明当时怕什么、做过什么。”</p><p><b>石父：</b>“藏粮是我一个人的事，不能把旁人一并写进去。”</p></div><div class="nc-dialogue nc-live-dialogue"><div class="nc-speaker">县令 · 听完各方陈述</div><p>请选择你将提交的呈报。注意区分灾害、迟报和个人侵吞；每一种处理都会改变眼前军期与基层下一次是否愿意报险。</p><div class="nc-qin-decisions">${book.reports.map((x,i)=>`<button class="nc-qin-choice" onclick="ncChooseReport(${i})"><b>${letter(i)} · ${x[0]}</b><span>${x[1]}</span><small>${x[2]}</small></button>`).join('')}</div></div></section>`)}
  function tangLegal(){const assigned=Object.keys(current.assign).length===book.legalCards.length;const card=book.legalCards[current.activeCard];stage(`<section class="nc-panel"><div class="nc-kicker">第四幕 · 律文与疏议</div>${progress(3)}<h1>同一案件，不止一个问题</h1><p class="nc-lead">唐律以律文规定制度边界，又以疏议解释条文。请选择一张事实卡，再决定它首先应进入哪一卷页。卡片可以重新归位。</p><div class="nc-legal-layout"><section class="nc-card-stack"><h3>待入卷事实</h3>${book.legalCards.map((c,i)=>`<button class="nc-law-card ${current.activeCard===i?'active':''}" ${current.assign[i]?'disabled':''} onclick="ncPickCard(${i})">${c[0]}<small>${c[1]}</small></button>`).join('')}</section><section><h3 style="margin:0 0 10px;font-family:KaiTi,serif;color:#f1dfbf">律文与疏议卷页</h3><div class="nc-shelves">${book.shelves.map(s=>`<section class="nc-shelf"><h3>${s}</h3>${Object.entries(current.assign).filter(([,v])=>v===s).map(([i])=>`<button onclick="ncUnassign(${i})">${book.legalCards[i][0]}</button>`).join('')}</section>`).join('')}</div>${card?`<div class="nc-actions">${book.shelves.map(s=>`<button class="nc-secondary" onclick="ncAssign(&#39;${s}&#39;)">送入《${s}》</button>`).join('')}</div>`:''}</section></div>${assigned?`<div class="nc-feedback">${Object.keys(current.assign).every(i=>current.assign[i]===book.expected[i])?'你已把首从、年龄、药材损失分别送入对应的法律问题。':'部分卡片仍可讨论不同位置。请查看它们是否把行为、年龄、损失和解释混在了一起。'}</div><div class="nc-actions"><button class="nc-primary" onclick="ncToRuling()">提交县令处理意见</button></div>`:''}</section>`)}
  function ruling(){stage(`<section class="nc-panel"><div class="nc-kicker">第五幕 · 县令处理意见</div>${progress(4)}<h1>裁断要写清什么</h1><p class="nc-lead">县令不要求你凭虚构案情写出具体刑期。你要提交的是一份处理意见，说明案件中哪些事实已经可以处理，哪些仍需继续查明。</p><div class="nc-dialogue"><div class="nc-speaker">县令</div><p>店主希望损失得到回应，少年希望不被简单写成主谋，成年人不能只凭“未入铺”避开审查。你准备如何组织案卷？</p><div class="nc-options">${book.rulings.map((x,i)=>option(x[0],x[2],`ncChooseRuling(${i})`,i)).join('')}</div></div></section>`)}
  function ending(){const choice=book.kind==='qin'?book.reports[current.ruling]:book.rulings[current.ruling];const title=choice[3],story=choice[4];stage(`<section class="nc-ending"><div class="nc-kicker">第${labels[order.indexOf(book.id)]}卷 · 归档结局</div><h1>${title}</h1><p class="nc-lead">${story}</p><article>${book.kind==='qin'?'<h2>课堂结论</h2><p>严厉命令可以形成短期威慑，也能服务于战争状态下的国家动员。若处罚使人认为报告、解释和合作都没有意义，官府得到的可能只剩表面的服从。评价秦朝法律，需要同时看到法制化成就与严刑峻法的代价。</p>':'<h2>县令合卷</h2><p>店主的药材返还和损失进入处理，少年的年龄和实际参与行为分别审查，成年人接应及是否造意继续依据证据核实。各方未必得到自己最期待的结果，但都能看见县令为何如此处理。</p>'}</article><div class="nc-tabs"><button class="on" onclick="ncTab(this,'learn')">法制史知识</button><button onclick="ncTab(this,'route')">我的选择</button><button onclick="ncTab(this,'boundary')">史实边界</button></div><div id="ncTabPanel" class="nc-tab-panel"></div><div class="nc-actions"><button class="nc-primary" onclick="ncExit()">归档并返回十案图</button><button class="nc-secondary" onclick="ncRestart()">重开本卷</button></div></section>`);tab(document.querySelector('.nc-tabs button'),'learn')}
  function tab(btn,type){document.querySelectorAll('.nc-tabs button').forEach(x=>x.classList.remove('on'));btn.classList.add('on');const panel=document.getElementById('ncTabPanel');if(type==='learn')panel.innerHTML=`<h2>本卷法脉札记</h2><ul>${book.knowledge.map(x=>`<li>${x}</li>`).join('')}</ul>`;if(type==='route')panel.innerHTML=`<h2>你的案卷轨迹</h2><ul>${current.logs.map(x=>`<li><b>${x.stage}</b>：${x.choice}<br><small>${x.note}</small></li>`).join('')}</ul>`;if(type==='boundary')panel.innerHTML=`<h2>史实与教学化虚构</h2><p>${book.boundary}</p>`}
  function finish(ruling){current.ruling=ruling;current.phase='ending';const choice=book.kind==='qin'?book.reports[ruling]:book.rulings[ruling];current.logs.push({stage:'最终意见',choice:choice[0],note:choice[2]});save();if(window.unlockVolume)window.unlockVolume(book.id,choice[3],current.logs);render()}
  function map(){const grid=document.getElementById('caseGrid');if(!grid)return;grid.innerHTML='';order.forEach((id,position)=>{const custom=books[id];const c=custom||cases[id];const b=document.createElement('button');b.className=`case c${id} ${state.completed[id]?'done':''}`;if(id===8){b.style.backgroundImage="url('./assets/qin-county-night.png')";b.style.backgroundSize='cover';b.style.backgroundPosition='center'}b.innerHTML=`<div class="case-copy"><i>第${labels[position]}卷 · ${c.era}</i><h3>${c.title}</h3><p>${c.sub||c.theme||''}</p><span class="tag">${state.completed[id]?'重读案卷':'进入案件'}</span></div>`;b.onclick=()=>window.startCase(id);grid.appendChild(b)})}
  window.tenCaseBooks=books;
  const legacyStart=window.startCase,legacyContinue=window.continueGame;
  window.startCase=id=>books[id]?start(id):legacyStart(id);
  window.renderMap=map;
  window.openMap=()=>{if(typeof syncExternalProgress==='function')syncExternalProgress();show('map');map()};
  window.continueGame=()=>{if(books[state.current])return start(state.current);legacyContinue()};
  window.ncFact=i=>{const id='f'+i;if(!current.seen.includes(id))current.seen.push(id);save();render()};
  window.ncOpenOrder=openOrder;
  window.ncPerson=person;
  window.ncChooseInitial=chooseInitial;
  window.ncNextInvestigation=()=>{current.phase='investigate';save();render()};
  window.ncEvidence=evidence;
  window.ncTakeEvidence=i=>{const id='e'+i;if(!current.seen.includes(id))current.seen.push(id);save();close();render()};
  window.ncClose=close;
  window.ncChooseInquiry=chooseInquiry;
  window.ncAdvanceRuling=()=>{current.phase='legal';save();render()};
  window.ncTalkOpening=talkOpening;
  window.ncFollowOpening=followOpening;
  window.ncSelectWitness=selectWitness;
  window.ncFollowWitness=followWitness;
  window.ncChooseReport=i=>finish(i);
  window.ncPickCard=i=>{current.activeCard=i;save();render()};
  window.ncAssign=s=>{if(current.activeCard===null)return;current.assign[current.activeCard]=s;current.activeCard=null;save();render()};
  window.ncUnassign=i=>{delete current.assign[i];save();render()};
  window.ncToRuling=()=>{current.phase='ruling';save();render()};
  window.ncChooseRuling=i=>finish(i);
  window.ncTab=tab;
  window.ncNotes=()=>modal(`<h2>${book.title} · 法脉札记</h2><ul>${book.knowledge.map(x=>`<li>${x}</li>`).join('')}</ul><button class="nc-primary" onclick="ncClose()">合卷</button>`);
  window.ncRestart=()=>{localStorage.removeItem(storage(book.id));current=blank(book.id);shell();render()};
  window.ncExit=()=>{document.getElementById('newCaseGame')?.remove();window.openMap()};
  map();
})();
