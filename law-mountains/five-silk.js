/* Volume VI: a self-contained narrative chapter. The other nine volumes keep their own state. */
(() => {
  const VOLUME = 9;
  const SAVE_KEY = 'lvmai-five-silk-v1';
  const EDITION = 'five-silk-2026-10';
  const meta = window.tenCaseBooks?.[VOLUME];
  if (!meta) return;
  Object.assign(meta, {
    era: '唐·某州属县',
    title: '五匹绢',
    sub: '一纸首露 · 首从有别 · 绢归其主',
    role: '县署书吏',
    boundary: '窃盗、共盗并赃、共犯首从、未发自首、向财主首露及正赃追还见《唐律疏议》。人物、地点、字据和具体故事均为教学虚构。'
  });

  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const fresh = () => ({edition: EDITION, node: 'start', heardNeed: false, first: '', approach: '', followed: '', record: [], ending: ''});
  let game = fresh();
  const save = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(game)); } catch (_) {} };
  const load = () => {
    try { const stored = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); return stored?.edition === EDITION && nodes[stored.node] ? {...fresh(), ...stored} : fresh(); }
    catch (_) { return fresh(); }
  };

  const nodes = {
    start: {act:'序幕',title:'空绳扣',place:'县署',speaker:'旁白',text:'晨光照进县署。布商杜承远把一枚空绳扣放到案上：昨夜库中少了五匹绢，明日正是伙计领工钱的日子。曾在店里帮工的沈安承认开过库门。你是协助县令审案的书吏，今天要写下的每一句话，都可能改变两个人的命运。',next:'du_open'},
    du_open: {act:'序幕',title:'空绳扣',place:'县署',speaker:'杜承远',text:'“五匹绢。少一匹，工钱就少一份。沈安曾在我店里帮工，我信他，才让他认得库门。如今他一句‘我娘病了’，难道要我替他付账？”',next:'shen_open'},
    shen_open: {act:'序幕',title:'空绳扣',place:'县署',speaker:'沈安',text:'“绢是我和胡七取的。我留了一匹，尚未卖出去；另四匹在胡七手里。开门是我的错。但这事，不是我起的头。”',next:'first_choice'},
    first_choice: {act:'第一幕',title:'你先听谁',place:'县署',speaker:'县令',text:'“先把人的话听全，再写罪名。你先问谁？”',choices:[
      {label:'先听杜承远：绢没了，谁在承担损失？',to:'du_path',set:{first:'du'},note:'先听受害者的处境'},
      {label:'先听沈安：为何明知是错仍开库门？',to:'shen_path',set:{first:'shen'},note:'先听参与者的处境'}
    ]},
    du_path: {act:'第一幕',title:'不只是五匹绢',place:'布店',speaker:'杜承远',text:'“阿成和另两个伙计等着工钱。沈安的娘病了，我知道；可店里也有靠这五匹绢过日子的人。我最恼的是他不问我，却用我给他的信任开门。”',next:'du_path_2'},
    du_path_2: {act:'第一幕',title:'不只是五匹绢',place:'布店',speaker:'阿成',text:'“东家不是富得不在乎五匹绢。昨日他自己先垫了半日工钱，只盼把绢追回。您要判谁，先别忘了店里还有三个人。”',next:'first_join'},
    shen_path: {act:'第一幕',title:'没卖掉的一匹',place:'沈家',speaker:'沈母',text:'屋里药炉尚温。沈母扶着门：“我的病是真的。他想卖绢请医者也是真的。但我若知道绢是这样来的，宁可再等一日，也不会让别人为我的病受损。”',next:'shen_path_2'},
    shen_path_2: {act:'第一幕',title:'没卖掉的一匹',place:'沈家',speaker:'沈安',text:'“胡七说我熟悉库门，只要开门便能分得一匹。我当时只想着娘，没想杜掌柜要拿什么给伙计发工钱。我那匹还在家里。”',next:'first_join'},
    first_join: {act:'第一幕',title:'案卷上的数字',place:'县署',speaker:'县令',text:'“从一人手里找到一匹，不等于全案只取一匹。先说说你怎样理解五匹这个数。”',choices:[
      {label:'先按共取五匹记录，再查谁起意、谁分得。',to:'base_right',note:'数量与首从分开判断'},
      {label:'沈安只留一匹，先按一匹窃盗拟断。',to:'base_wrong',note:'容易漏掉共盗并赃'}
    ]},
    base_right: {act:'第一幕',title:'第一道法律判断',place:'县署',speaker:'书吏心声',text:'你写下“五匹共取，首从待查”。《唐律疏议》对窃盗五匹规定徒一年；共同盗窃须并赃论，不能只按个人分得的一匹算。县令点头：“这只是起点，不是最终判词。”',law:'窃盗五匹：徒一年；共盗并赃论。',next:'worker'},
    base_wrong: {act:'第一幕',title:'第一道法律判断',place:'县署',speaker:'县令',text:'县令划去“一匹”：“他们共同取了五匹。各人分到多少要查，但共盗之赃先不能拆成两件互不相干的盗案。”你改写案卷，暂记五匹、首从待查。',law:'共盗并赃论；分得一匹不等于只按一匹计。',next:'worker'},
    worker: {act:'第二幕',title:'谁出的主意',place:'布店后巷',speaker:'阿成',text:'“胡七那晚在巷口等着。我只听到一句‘你只管开门’，没听清之前说过什么。沈安从库门出来时，胡七接过了包绢。”',next:'trace_choice'},
    trace_choice: {act:'第二幕',title:'谁出的主意',place:'布店后巷',speaker:'旁白',text:'胡七称自己只是路过。沈安坚持说计划由胡七提出。你决定怎样继续问。',choices:[
      {label:'先问胡七为何认得封绳，再核对两人的说法。',to:'trace_hu',set:{approach:'hu'},note:'从他的细节破绽入手'},
      {label:'先问阿成听见了什么，再与胡七对质。',to:'trace_acheng',set:{approach:'acheng'},note:'限定证言能证明的范围'}
    ]},
    trace_hu: {act:'第二幕',title:'封绳的结',place:'县署',speaker:'胡七',text:'“我又没碰过绢，哪里知道封绳打什么结？……那种双环结，布店常用。”他话音一顿。你尚未说出结法，他却已经说了出来。',next:'trace_join'},
    trace_acheng: {act:'第二幕',title:'一句话的边界',place:'县署',speaker:'阿成',text:'“我听见胡七说‘你只管开门’，但我没听见完整谋议。我能作证他接应，不能凭半句话替大人断谁先起意。”这份谨慎让你重新追问胡七绢的去向。',next:'trace_join'},
    trace_join: {act:'第二幕',title:'四匹的下落',place:'县署',speaker:'胡七',text:'反复问话后，胡七说出藏绢处。四匹原绢被找回。他承认先提出取绢，也承认自己拿走四匹，却仍喊：“门是沈安开的！”',next:'principal_choice'},
    principal_choice: {act:'第二幕',title:'首与从',place:'县署',speaker:'县令',text:'“胡七起意，沈安随从。你如何记下两人的责任？”',choices:[
      {label:'两人共盗五匹；胡七为首，沈安为从。',to:'principal_right',note:'先并赃，再分首从'},
      {label:'谁开门谁就是主谋，胡七只在巷口。',to:'principal_wrong',note:'把实行行为误作起意'}
    ]},
    principal_right: {act:'第二幕',title:'第二道法律判断',place:'县署',speaker:'县令',text:'“共犯罪，以造意为首，随从者减一等。”你记下另一条可能的从宽依据。沈安确曾开门，故不能因救母就说他没有责任；胡七没进库门，也不能因此脱身。',law:'造意为首；随从者减一等。',next:'fifth'},
    principal_wrong: {act:'第二幕',title:'第二道法律判断',place:'县署',speaker:'县令',text:'“开门是参与；起意是另一回事。”胡七最终承认提出计划，你改写首从。沈安不是无罪，但他的责任不能与先谋划、取走四匹的胡七一笔写齐。',law:'造意为首；随从者减一等。',next:'fifth'},
    fifth: {act:'第三幕',title:'第五匹绢',place:'县署',speaker:'沈母',text:'沈母交出沈安留在家中的一匹，封记未拆。五匹原绢在案上排开。阿成逐匹核对，明日的工钱终于有了着落。杜承远却没有伸手。',next:'du_hurt'},
    du_hurt: {act:'第三幕',title:'绢回来了，信呢',place:'县署',speaker:'杜承远',text:'“绢是对的。可我当年让沈安在店里帮工、认得库门，他拿我的信任去开门。若只说‘绢找回了’，那我报官究竟是为了什么？”',next:'need_choice'},
    need_choice: {act:'第三幕',title:'受害者想要什么',place:'县署',speaker:'县令',text:'“你准备怎样回应杜承远？这会决定你是否明白他要的公道。”',choices:[
      {label:'请他具体说：除了绢，什么结果能让他满意？',to:'need_heard',set:{heardNeed:true},note:'把他的诉求讲清楚'},
      {label:'先告诉他：绢已追回，此案不必再争。',to:'need_missed',note:'只看财物，忽略背信与责任'}
    ]},
    need_heard: {act:'第三幕',title:'受害者的三件事',place:'县署',speaker:'杜承远',text:'“第一，五匹全还，伙计按时领钱；第二，谁出的主意，谁就担该担的责任；第三，沈安当着阿成把开门的事说清。我不要求你逼他说‘我没错’，也不愿官府逼我说‘我原谅’。”',next:'night_note'},
    need_missed: {act:'第三幕',title:'被忽略的一句话',place:'县署',speaker:'杜承远',text:'杜承远把绢收起，却没有答话。阿成低声提醒你：“东家怪的还有沈安用他给的信任开门。您还没问他到底希望听见什么。”你把这句话记在案卷边，暂时没有追问。',next:'night_note'},
    night_note: {act:'第四幕',title:'比报官更早',place:'县署',speaker:'杜承远',text:'“还有一件事。失绢那晚，沈安自己来店里找过我。他说五匹是他和胡七取的，一匹在他家，四匹在胡七手里。我留了一张字据。”杜承远从袖中取出折得发软的纸。',next:'du_fear'},
    du_fear: {act:'第四幕',title:'不敢交出的字据',place:'县署',speaker:'杜承远',text:'“我怕这纸一交，他就不必受刑，而我那四匹还没回来。我不是要瞒官府，只怕我的损失没人管。”他的手仍压在纸角，等你回答。',next:'confess_choice'},
    confess_choice: {act:'第四幕',title:'首露的时间',place:'县署',speaker:'县令',text:'“这张纸可能使处置再变。先确认它写于何时、说了什么。”',choices:[
      {label:'核对字据、阿成见闻与次日清点时刻。',to:'verify_time',note:'审查首露条件'},
      {label:'绢已经找回，不再核实这张纸。',to:'ending_incomplete',note:'关键事实仍未查清'}
    ]},
    verify_time: {act:'第四幕',title:'三句话互相印证',place:'县署',speaker:'阿成',text:'“沈安来时，库里还没清点。杜掌柜是听他自己说了，才知道五匹绢的事。我在旁边听见‘共五匹、胡七四匹、我一匹’；字据也是当晚写下的。”次日账簿的清点记载与此吻合。',next:'verify_shen'},
    verify_shen: {act:'第四幕',title:'如实首露',place:'县署',speaker:'沈安',text:'“我来认的时候，不知道杜掌柜会不会把我送官。我只知道若再拖，胡七可能把四匹卖了。我说的是我们两个人取的五匹，不是只认自己那一匹。”杜承远确认他的说法。',next:'law_turn'},
    law_turn: {act:'第四幕',title:'第三道法律判断',place:'县署',speaker:'县令',text:'“《唐律疏议》说，犯罪未发而自首，原其罪，正赃仍征；盗取财物后向财主首露，与经官司自首同。沈安如实首露于财主，且在此事被揭发之前。先前的从犯判断仍说明两人责任有别，但最终处理沈安，要看这条更直接的自首规则。”',law:'未发前向财主如实首露：同官府自首；原其罪，正赃仍征。',next:'law_choice'},
    law_choice: {act:'第四幕',title:'从宽不等于抹去损失',place:'县署',speaker:'县令',text:'“你怎样把自首与五匹绢的归还写在同一份处理意见里？”',choices:[
      {label:'原沈安窃盗之罪，同时核验并归还五匹原绢。',to:'law_right',note:'免刑与追赃并行'},
      {label:'既然自首，就连五匹绢也不必再还。',to:'law_wrong',note:'忽略“正赃仍征”'}
    ]},
    law_right: {act:'第四幕',title:'判词的两行',place:'县署',speaker:'旁白',text:'你写下两行：沈安符合未发前向财主首露的条件，依律原其盗窃之罪；五匹绢逐匹核验后归还杜承远。胡七未因沈安的首露而一并免责，其行为另拟送州覆审。',law:'正赃仍征；一人首露不使另一人当然免责。',next:'final_choice'},
    law_wrong: {act:'第四幕',title:'被划去的一行',place:'县署',speaker:'县令',text:'县令指着律文中的“正赃犹征如法”：“自首可以原罪，不使财主平白失去财物。”你重新写明归还五匹绢，胡七之事另行审断。',law:'自首原罪，不免追还正赃。',next:'final_choice'},
    final_choice: {act:'第五幕',title:'让双方听见判词',place:'县署',speaker:'旁白',text:'五匹绢齐在案上，胡七的卷宗已另拟。杜承远、阿成、沈安与沈母都在。你必须说出最后的处理意见。',choices:[
      {label:'隐去首露字据，按初见案情从重写判词。',to:'ending_error',note:'用人情覆盖已查明的法定事实'},
      {label:'依法原罪、还绢，宣读后立即结案。',to:'ending_cold',note:'判词正确，但杜承远的诉求尚未回应'},
      {label:'依法原罪、还绢；让双方把损失、责任和信任说清。',to:'resolve_balance',note:'把法律判断与受害者诉求都落实'}
    ]},
    resolve_balance: {act:'第五幕',title:'判词之外',place:'县署',speaker:'你',text:'“沈安参与取绢，不因救母而变成无错；他在事未发时向财主如实首露，依法原其窃盗之罪。五匹原绢全部归还。胡七起意并取走四匹，另依查明事实处理。杜承远，绢和工钱之外，你还有什么必须在这里说清？”',next:() => game.heardNeed ? 'balance_heard' : 'balance_unheard'},
    balance_unheard: {act:'第五幕',title:'你终于听见',place:'县署',speaker:'杜承远',text:'“我还要沈安当着阿成说清：他不是误拿，也不是我许他取的，是他用了我给他的信任去开门。我不求你加刑，只求别把这件事说轻了。”你停下笔，把他的话完整记下。',next:'balance_shen'},
    balance_heard: {act:'第五幕',title:'你记得他的三件事',place:'县署',speaker:'杜承远',text:'你逐项复述他的诉求：五匹全还、伙计领钱、胡七担责，沈安当着阿成说清开门的事。杜承远点头：“这才是我想请官府听见的。”',next:'balance_shen'},
    balance_shen: {act:'第五幕',title:'沈安的回答',place:'县署',speaker:'沈安',text:'“库门是我开的。我怕杜掌柜不借钱，却根本没有问，就替他作了决定。绢找回来了，也不能说我没有辜负他的信任。我愿当着阿成把这些说清。”这番话不是额外刑罚，也不替代法定裁断。',next:'balance_worker'},
    balance_worker: {act:'第五幕',title:'工钱有了着落',place:'县署',speaker:'阿成',text:'阿成重新核对五匹原绢和账册，说明明日三名伙计可以如期领钱。县令告知杜承远：胡七的行为另行拟断；涉及徒刑的卷宗将送州覆审，县署不在堂上越权作最终徒刑裁判。',next:'ending_good'},
    ending_good: {ending:'绢归其主',act:'终章',title:'绢归其主',place:'布店门前',speaker:'杜承远',text:'“我仍怪沈安辜负了我的信任，却不要求你们为了我抹去律文。五匹绢回来了，伙计的工钱保住了，谁起意、谁开门都讲清楚，胡七也会为自己做的事受审。沈安依法得从宽，这个结果，我满意。”',reflection:'依法从宽与受害者满意在此并行：沈安免于初看可能承担的徒刑，杜承远拿回原物、保住工钱，并看见主事者与参与者各负其责。满意不等于原谅。'},
    ending_cold: {ending:'判词未说完',act:'终章',title:'判词未说完',place:'县署',speaker:'杜承远',text:'你依法写明沈安首露原罪、五匹归还。杜承远收了绢，却问：“他借我的信任开库门，这件事就没人听我说？”法律判断成立，受害者仍觉得自己的经历被省略。',reflection:'这一结局的法律方向正确，但没有满足受害者的明确诉求。可以回到最后一幕，补上对损失、责任与背信的回应。',retry:'final_choice'},
    ending_error: {ending:'退回重拟',act:'终章',title:'退回重拟',place:'县署',speaker:'县令',text:'县令把你隐去字据的判词退回：“杜承远有权说出委屈；我们却不能为了替他出气，删去已经查实的首露事实。”杜承远也没有喜色：“我求的是公道，不是请官府替我藏一张纸。”',reflection:'已查明的法定从宽事实不能因同情受害者而被抹去。请重拟判词。',retry:'final_choice'},
    ending_incomplete: {ending:'案卷未明',act:'终章',title:'案卷未明',place:'县署',speaker:'县令',text:'你准备合卷，县令却按住那张字据：“它的时间与内容未核，不能说沈安已经自首，也不能说他没有。五匹绢虽找回，刑责仍待查。”',reflection:'归还财物不能替代查明事实。核对首露的时间、对象及内容后，才能作终局判断。',retry:'confess_choice'}
  };

  const actNumber = act => ({'序幕':0,'第一幕':1,'第二幕':2,'第三幕':3,'第四幕':4,'第五幕':5,'终章':6})[act] || 0;
  const backgrounds = {'县署':'court','布店':'shop','布店后巷':'lane','沈家':'home','布店门前':'shop'};
  const refs = [
    ['《唐律疏议》卷十九·窃盗','https://zh.wikisource.org/wiki/唐律疏議/卷第十九'],
    ['《唐律疏议》卷二十·共盗并赃论','https://zh.wikisource.org/wiki/唐律疏議/卷第二十'],
    ['《唐律疏议》卷五·自首、首露、首从','https://zh.wikisource.org/wiki/唐律疏議/卷第五']
  ];
  // Teaching notes are optional reading. They never change a choice or saved progress.
  const lawCards = {
    theft: {title:'窃盗五匹的初步刑等',rule:'《唐律疏议》以赃值分等：窃盗五匹，徒一年。这是初看案情的刑等，还须核对共犯、首从与自首。',fact:'确认取走的是五匹原绢，并核实为秘密取走他人财物。',mistake:'把初步刑等直接当作沈安的最终结果。',source:'《唐律疏议》卷十九·窃盗',url:'https://zh.wikisource.org/wiki/唐律疏議/卷第十九'},
    joint: {title:'共盗并赃',rule:'共同盗取财物时，合并全案赃数论罪；各人分到多少，不能代替共同取走的总数。',fact:'查明沈安与胡七共同取走五匹，沈安得一匹、胡七得四匹。',mistake:'只按沈安分得的一匹计算全案赃数。',source:'《唐律疏议》卷二十·共盗并赃论',url:'https://zh.wikisource.org/wiki/唐律疏議/卷第二十'},
    roles: {title:'造意为首与随从减等',rule:'共犯罪以造意者为首，随从者减一等；开库门是参与行为，谁先谋划仍要另行查明。',fact:'核对胡七先提出计划、接应并取走四匹，沈安依其计划开门。',mistake:'仅凭谁亲手开门就认定谁是首犯，或因沈安救母便认定其无罪。',source:'《唐律疏议》卷五·共犯罪',url:'https://zh.wikisource.org/wiki/唐律疏議/卷第五'},
    surrender: {title:'犯罪未发而自首',rule:'犯罪尚未被发觉时主动如实首露，依律原其罪。是否“未发”、是否如实，均须核查。',fact:'核对沈安首露时杜承远尚未知失绢，且说出两人共取五匹、各自去向。',mistake:'把被发现后的承认等同未发自首；或只听沈安一面之词便认定时刻。',source:'《唐律疏议》卷五·犯罪未发自首',url:'https://zh.wikisource.org/wiki/唐律疏議/卷第五'},
    owner: {title:'向财主首露',rule:'盗取财物后向财主首露，律文视同向官府自首；首露对象与说出的内容都影响适用。',fact:'核对沈安先向财主杜承远说明共取五匹及胡七的四匹，留有当晚字据和旁证。',mistake:'以“没有先去县署”为由一概否定自首，或将字据存在本身当作充分证明。',source:'《唐律疏议》卷五·于财主首露',url:'https://zh.wikisource.org/wiki/唐律疏議/卷第五'},
    restitution: {title:'正赃仍须追还',rule:'自首可以原罪，但“正赃犹征如法”；刑责从宽并不消灭财主取回原物的权利。',fact:'核验沈安家中一匹与胡七所藏四匹均为布店原绢，逐匹归还。',mistake:'把原罪说成不必还绢，或把还绢当作自动免罪。',source:'《唐律疏议》卷五·正赃犹征',url:'https://zh.wikisource.org/wiki/唐律疏議/卷第五'},
    review: {title:'县署拟断与送州覆审',rule:'唐代《狱官令》所载程序中，杖罪以下可由县决；徒刑以上由县断定后送州覆审。这里是县署拟断意见，不是在堂上越权终定徒刑。',fact:'胡七涉及五匹共盗的徒刑判断，须把查明的事实与拟断卷宗送州覆审。',mistake:'把县令当场宣读的意见写成已经完成的最终徒刑裁判。',source:'《狱官令》引文及唐代审判程序研究',url:'https://www.aisixiang.com/data/122091.html'}
  };
  const lawAtNode = {
    first_join:['theft','joint'],base_right:['theft','joint'],base_wrong:['theft','joint'],
    principal_choice:['roles'],principal_right:['roles'],principal_wrong:['roles'],
    confess_choice:['surrender','owner'],verify_time:['surrender','owner'],law_turn:['surrender','owner','restitution'],
    law_choice:['restitution'],law_right:['restitution','review'],law_wrong:['restitution'],
    final_choice:['review'],balance_worker:['review']
  };
  const portraits = {杜承远:'du',沈安:'shen',胡七:'hu',沈母:'mother',阿成:'acheng',县令:'magistrate'};
  const tenseScenes = new Set(['du_open','du_hurt','du_fear','need_missed','trace_hu','principal_wrong','law_wrong','ending_error']);

  function shell() {
    $('#newCaseGame')?.remove();
    $('#fiveSilkGame')?.remove();
    document.querySelectorAll('.screen').forEach(el => el.classList.add('hidden'));
    const root = document.createElement('section');
    root.id = 'fiveSilkGame';
    root.innerHTML = `<div class="fs-bg" aria-hidden="true"></div><div class="fs-grain" aria-hidden="true"></div>
      <header class="fs-top"><div class="fs-brand"><small>第六卷 · 唐代法制史</small><strong>五匹绢</strong></div><div class="fs-tools"><button type="button" id="fsJournal">案卷</button><button type="button" id="fsRestart">重开</button><button type="button" id="fsExit">十案图</button></div></header>
      <main class="fs-stage" id="fsStage" aria-live="polite"></main><div class="fs-overlay" id="fsOverlay" hidden></div>`;
    document.body.appendChild(root);
    $('#fsJournal').onclick = journal;
    $('#fsRestart').onclick = () => { if (confirm('确定从《五匹绢》开头重新审理吗？')) restart(); };
    $('#fsExit').onclick = exit;
  }

  function render() {
    const node = nodes[game.node] || nodes.start;
    const end = !!node.ending;
    $('#fiveSilkGame').dataset.place = backgrounds[node.place] || 'court';
    const step = actNumber(node.act);
    const progress = `<div class="fs-progress" aria-label="剧情进度">${Array.from({length:7}, (_,i) => `<span class="${i<=step?'on':''}"></span>`).join('')}</div>`;
    const law = node.law ? `<div class="fs-law"><span>律书角签</span>${esc(node.law)}</div>` : '';
    const character = portraits[node.speaker];
    const portrait = character ? `<div class="fs-portrait fs-portrait-${character} ${tenseScenes.has(game.node)?'is-tense':'is-calm'}" role="img" aria-label="${esc(node.speaker)}立绘"><span>${esc(node.speaker)}</span></div>` : '';
    const lawLinks = lawAtNode[game.node] ? `<div class="fs-law-links" aria-label="本幕相关律文">${lawAtNode[game.node].map(key => `<button type="button" class="fs-law-link" data-law="${key}">查看律文 · ${esc(lawCards[key].title)}</button>`).join('')}</div>` : '';
    const buttons = node.choices ? `<div class="fs-choices">${node.choices.map((choice,i) => `<button type="button" class="fs-choice" data-choice="${i}"><i>${'甲乙丙丁'[i]}</i><span>${esc(choice.label)}</span></button>`).join('')}</div>` : `<button type="button" class="fs-next" id="fsNext">${end ? (node.retry?'返回关键一幕':'查看结案札记') : '继续　›'}</button>`;
    $('#fsStage').innerHTML = `<div class="fs-place"><span>唐 · 某州属县</span><h1>${esc(node.place)}</h1><p>一包五匹绢，让从宽与追偿同入一卷。</p></div>${portrait}
      <article class="fs-dialogue ${end?'is-ending':''}"><div class="fs-chapter">${esc(node.act)} · ${esc(node.title)} ${progress}</div><div class="fs-speaker">${esc(node.speaker)}</div><p class="fs-text">${esc(node.text)}</p>${law}${lawLinks}${buttons}<div class="fs-footnote">自动存卷 · 你的选择不会改写既定案情</div></article>`;
    $$('.fs-choice').forEach(button => button.onclick = () => choose(Number(button.dataset.choice)));
    $$('.fs-law-link').forEach(button => button.onclick = () => showLawCard(button.dataset.law));
    const next = $('#fsNext'); if (next) next.onclick = end ? () => end ? endingPanel(node) : null : advance;
    if (end && !game.ending) {
      game.ending = node.ending;
      game.record.push({act: node.act, choice: node.ending});
      save();
      window.unlockVolume?.(VOLUME, node.ending, game.record.map(item => ({stage:item.act,choice:item.choice,effect:item.note||''})));
    }
  }
  const $$ = selector => Array.from(document.querySelectorAll(`#fiveSilkGame ${selector}`));
  function transition(to, record) {
    if (!nodes[to]) return;
    if (record) game.record.push(record);
    game.node = to;
    game.ending = '';
    save();
    render();
  }
  function choose(index) {
    const node = nodes[game.node], choice = node?.choices?.[index];
    if (!choice) return;
    if (choice.set) Object.assign(game, choice.set);
    transition(choice.to, {act:node.act, choice:choice.label, note:choice.note||''});
  }
  function advance() {
    const node = nodes[game.node];
    const next = typeof node.next === 'function' ? node.next() : node.next;
    transition(next);
  }
  function overlay(html) {
    const layer = $('#fsOverlay');
    layer.innerHTML = `<div class="fs-panel" role="dialog" aria-modal="true">${html}<button class="fs-close" type="button">合卷</button></div>`;
    layer.hidden = false;
    layer.querySelector('.fs-close').onclick = () => { layer.hidden = true; layer.innerHTML = ''; };
  }
  function showLawCard(key) {
    const card = lawCards[key];
    if (!card) return;
    overlay(`<small>第六卷 · 唐代法制史资料卡</small><h2>${esc(card.title)}</h2>
      <p class="fs-law-card-rule">${esc(card.rule)}</p>
      <h3>本案要查明</h3><p>${esc(card.fact)}</p>
      <h3>容易误判</h3><p>${esc(card.mistake)}</p>
      <p class="fs-law-card-source">史料核对：<a href="${card.url}" target="_blank" rel="noopener noreferrer">${esc(card.source)} ↗</a></p>
      <p class="fs-muted">律文依据与程序研究见上方链接；人物、字据、对白和具体案情为教学虚构。现代刑法只供课后比较，不能直接当作唐律适用。</p>`);
  }
  function journal() {
    overlay(`<small>随时可查 · 不影响剧情</small><h2>第六卷案卷</h2><p>初步罪名是窃盗五匹。审理须分别查：共盗总赃、谁先造意、向财主首露的时间与内容、五匹原绢是否归还。救母动机解释处境，不自动成为法定减刑事由。</p><h3>你的选择</h3><ol>${game.record.length ? game.record.map(x => `<li>${esc(x.act)}：${esc(x.choice)}</li>`).join('') : '<li>尚未落笔。</li>'}</ol><p class="fs-muted">人物与案情为教学虚构；律条以《唐律疏议》原文为据。</p>`);
  }
  function endingPanel(node) {
    overlay(`<small>${esc(node.ending)} · 教学复盘</small><h2>${esc(node.title)}</h2><p>${esc(node.reflection)}</p><h3>法制史依据</h3><ul>${refs.map(([name,url]) => `<li><a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(name)}</a></li>`).join('')}</ul><p class="fs-muted">史实：所列唐律规则。虚构：杜承远、沈安、胡七、阿成、五匹绢的具体经过及对白。涉及徒刑的胡七案卷只在县署拟断，须送州覆审。</p><div class="fs-panel-actions">${node.retry ? '<button type="button" id="fsRetry">返回关键一幕</button>' : ''}<button type="button" id="fsReplay">重玩本卷</button><button type="button" id="fsMap">返回十案图</button></div>`);
    const retry = $('#fsRetry'); if (retry) retry.onclick = () => { $('#fsOverlay').hidden = true; transition(node.retry); };
    $('#fsReplay').onclick = restart;
    $('#fsMap').onclick = exit;
  }
  function restart() { game = fresh(); save(); shell(); render(); }
  function exit() { save(); $('#fiveSilkGame')?.remove(); window.openMap(); }
  function start() {
    const main = typeof state !== 'undefined' ? state : null;
    if (main) { main.current = VOLUME; main.view = 'custom'; try { localStorage.setItem('lvmai-full-v4', JSON.stringify(main)); } catch (_) {} }
    game = load(); shell(); render();
  }

  const priorStart = window.startCase;
  const priorContinue = window.continueGame;
  window.startCase = id => Number(id) === VOLUME ? start() : priorStart(id);
  window.continueGame = () => Number(state?.current) === VOLUME ? start() : priorContinue();
  window.renderMap?.();
})();
