const artRoot = '../shao-yidou/assets/';
const backgrounds = {
  market: artRoot + '场景/S03_集市量粮处.webp',
  county: artRoot + '场景/S02_县署候讯处.webp',
  road: artRoot + '场景/S04_雨后运输道路.webp',
  court: artRoot + '场景/S05_县署审案处.webp',
  home: artRoot + '场景/S06_田禾家门前.webp',
  rules: artRoot + '场景/S07_规则制定处.webp'
};
const people = {
  tian: { name: '田禾', image: artRoot + '人物/R1_田禾.webp' },
  meng: { name: '孟庸', image: artRoot + '人物/R2_孟庸.webp' },
  aye: { name: '阿叶', image: artRoot + '人物/R3_阿叶.webp' },
  measurer: { name: '量粮人', image: artRoot + '人物/R4_量粮人.webp' },
  judge: { name: '审案官吏', image: artRoot + '人物/R6_审案官吏.webp' },
  family: { name: '田禾家人', image: artRoot + '人物/R7_田禾家人.webp' }
};
const sources = {
  law: {
    title: '有法，还要说明依据',
    html: `<p><strong>可核实史实：</strong>睡虎地秦简《法律答问》以问答方式解释法律适用中的问题。<a href="https://sdcourt.gov.cn/dyzy/372897/372830/36373470/index.html" target="_blank" rel="noopener">查看来源</a></p><p><strong>教学解释：</strong>提出重处意见，仍须区分短少事实、故意与适用依据；处罚强度不能替代事实认定。</p><p class="boundary"><strong>本案边界：</strong>县市、重处风声及人物均为教学虚构。这份史料不能证明本案适用哪条秦律，也不能给出刑名或刑度。</p>`
  },
  record: {
    title: '把前后两说都留下',
    html: `<p><strong>可核实史实：</strong>睡虎地秦简《封诊式》保存讯问与记录供辞的材料。<a href="https://www.spp.gov.cn/spp/llyj/202109/t20210923_530227.shtml" target="_blank" rel="noopener">查看来源</a></p><p><strong>教学解释：</strong>记录不只是写下最后一句话；前后陈述为何不同，也关系到后来的人能否检查官吏的判断。</p><p class="boundary"><strong>本案边界：</strong>量粮人的记号、改口和你的卷宗均属虚构情节。《封诊式》不能证明谁造成短少，也不是本案的专用判例。</p>`
  },
  compare: {
    title: '分时代看规则与重罚',
    html: `<p><strong>春秋 · 郑国：</strong>子产于公元前536年铸刑书，将成文规则公布。它帮助讨论“人能否预知裁判依据”，不是秦朝本案的法条。<a href="https://legalinfo.moj.gov.cn/zhfxfzwh/fzwhfsgs/202406/t20240613_500337.html" target="_blank" rel="noopener">查看来源</a></p><p><strong>战国 · 思想对照：</strong>商鞅相关重刑主张强调威慑。它能解释为何有人期待重处，却不能证明本案应如何处罚。<a href="https://www.spp.gov.cn/llyj/201708/t20170808_197770.shtml" target="_blank" rel="noopener">查看来源</a></p><p class="boundary"><strong>时代边界：</strong>以上是独立课堂复盘视角，不是发生在这宗秦代虚构案件中的连续事件，也不能替代秦代事实查验与依据说明。</p>`
  }
};

const nodes = {
  intro: { chapter: '第三卷 · 安静的县市', scene: 'market', place: '秦统一后 · 某县县市', speaker: '旁白', line: '骤雨刚过，十袋粟停在量粮处前。你是县署的年轻吏员，正从市口经过。', actors: [], next: 'marketWhisper' },
  marketWhisper: { scene: 'market', place: '县市 · 交易', speaker: '旁白', line: '市上正传着一个风声：县里对查实故意短给的人，可能建议重处。卖粮的人反复看秤，买粮的人说终于敢放心。这是本案虚构的县市风声，不是秦律条文。', actors: [], next: 'tianTrade' },
  tianTrade: { scene: 'market', place: '县市 · 交易', speaker: '田禾', line: '十袋都在这里。劳烦量清楚。', actors: ['tian'], next: 'tianHesitates' },
  tianHesitates: { scene: 'market', place: '县市 · 交易', speaker: '旁白', line: '田禾摸了摸一袋潮湿的绳口，像是想说什么。听见旁人谈起重处，他又把手缩了回去。', actors: ['tian'], next: 'mengTrade' },
  mengTrade: { scene: 'market', place: '县市 · 交易', speaker: '孟庸', line: '我是替几户人家买的。数若不对，回去我也没法向他们交代。', actors: ['meng', 'tian'], focus: 'meng', next: 'measureTrade' },
  measureTrade: { scene: 'market', place: '县市 · 交易', speaker: '量粮人', line: '后面排着队。十袋交付，我先记下来。', actors: ['measurer', 'meng'], focus: 'measurer', next: 'tradeClose' },
  tradeClose: { scene: 'market', place: '县市 · 交易', speaker: '旁白', line: '孟庸付钱，叫伙计把粟搬走。一个邻摊卖家又往袋里添了一把粟，低声说：“如今谁还敢差一点？”市口比往日安静。', actors: ['tian', 'measurer'], next: 'taskDispute' },
  taskDispute: { type: 'task', number: '一', title: '回应争执', description: '交易已经结束。孟庸忽然把粮抬了回来。你的一句话，将决定人们愿不愿意把后面的事说全。', scene: 'market', place: '县市 · 闭市前', next: 'timePasses' },
  timePasses: { scene: 'market', place: '县市 · 闭市前', speaker: '旁白', line: '暮色压下来，你正要离开，忽然听见急促的脚步。孟庸和伙计又把粮抬回了市口。', actors: [], next: 'mengReturns' },
  mengReturns: { scene: 'market', place: '县市 · 闭市前', speaker: '孟庸', line: '我回去复量过了。十袋合起来，少了一斗。钱已经付了，这叫我怎么向人交代？', actors: ['meng', 'tian'], focus: 'meng', next: 'tianFirst' },
  tianFirst: { scene: 'market', place: '县市 · 闭市前', speaker: '田禾', line: '刚才在市上不是说足数吗？我没有私下取粮。', actors: ['tian', 'meng'], focus: 'tian', next: 'mengDemands' },
  mengDemands: { scene: 'market', place: '县市 · 人群围拢', speaker: '孟庸', line: '补回一斗，只补我的损失。若有人故意短给，却不受重处，刚才人人仔细量粮的规矩还能撑几日？我要求县里提出重处意见。', actors: ['meng', 'tian'], focus: 'meng', source: 'law', next: 'publicChoice' },
  publicChoice: { scene: 'market', place: '县市 · 人群围拢', speaker: '旁白', line: '人群等着你的回答。此刻你能让争吵停下，但你说的话也会被在场的人记住。', actors: ['meng', 'tian'], source: 'law', choices: [
    { label: '“先记涉嫌故意，并拟请重处；查验后再定。”', to: 'sternCrowd', set: s => { s.stance = 'stern'; s.publicDraft = '涉嫌故意，拟请重处；待核实'; } },
    { label: '“今晚共同复量，先记短少与损失；故意未明，不能先提重处。”', to: 'carefulMeng', set: s => { s.stance = 'careful'; s.publicDraft = '短少与损失待核，故意未明'; } }
  ] },
  sternCrowd: { scene: 'market', place: '县市 · 人群围拢', speaker: '旁白', line: '人群迅速安静。邻摊立刻重看袋口，孟庸松了口气。田禾却退后半步，量粮人把记号攥紧了。', actors: ['meng', 'tian'], next: 'sternMeng' },
  sternMeng: { scene: 'market', place: '县市 · 人群围拢', speaker: '孟庸', line: '这话让我放心一些。可你说的“涉嫌故意”，究竟凭什么？我的一斗也不能只等一个重处意见。', actors: ['meng'], next: 'sternTian' },
  sternTian: { scene: 'market', place: '县市 · 人群围拢', speaker: '田禾', line: '……我只是照市上的记号交货。', actors: ['tian'], next: 'taskRemeasure' },
  carefulMeng: { scene: 'market', place: '县市 · 人群围拢', speaker: '孟庸', line: '若只说“故意未明”，我这一斗怎么办？买粮的人不能空手等。', actors: ['meng', 'tian'], focus: 'meng', next: 'carefulReply' },
  carefulReply: { scene: 'market', place: '县市 · 人群围拢', speaker: '你', line: '我会把短少和你的损失分别记下，请你们当场共同复量。查清后再谈处理，不把你的损失当成小事。', actors: ['meng', 'tian'], next: 'carefulTian' },
  carefulTian: { scene: 'market', place: '县市 · 人群围拢', speaker: '田禾', line: '若真少了，我愿在场重看。可请不要先把我说成存心骗人。', actors: ['tian', 'meng'], focus: 'tian', next: 'carefulCrowd' },
  carefulCrowd: { scene: 'market', place: '县市 · 人群围拢', speaker: '旁白', line: '争吵没有立刻停，有人催你快些了结。孟庸仍盯着那一斗，田禾却没有离开，还低头摸了摸潮湿的绳口。', actors: ['tian', 'meng'], next: 'taskRemeasure' },
  taskRemeasure: { type: 'task', number: '二', title: '共同复量', description: '短少是否存在，先让买卖双方和量粮人在同一现场看清。一次查验能说明多少，又不能说明多少？', scene: 'market', place: '县市 · 双方在场', next: 'remeasure' },
  remeasure: { scene: 'market', place: '县市 · 双方在场', speaker: '旁白', line: '你请双方和量粮人一起复量，这是今晚唯一一次现场查验。现存的十袋粟确实比约定少一斗；这一刻仍看不出短少发生在何时。', actors: ['meng', 'measurer'], next: 'mengAfterMeasure' },
  mengAfterMeasure: { scene: 'market', place: '县市 · 双方在场', speaker: '孟庸', line: '我说少了，不是假话。可你们若还问“是不是故意”，我希望有人把答案讲明白。', actors: ['meng', 'tian'], focus: 'meng', next: 'tianAfterMeasure' },
  tianAfterMeasure: { scene: 'market', place: '县市 · 双方在场', speaker: '田禾', line: s => s.stance === 'stern' ? '少了，我看见了。可你已把“拟请重处”说出口，我再提路上的事，听来都像找借口。' : '少了，我看见了。你说会先记损失、听完经过；路上有件事，我刚才没敢讲。', actors: ['tian', 'meng'], focus: 'tian', next: 'tianChoice' },
  tianChoice: { scene: 'market', place: '县市 · 双方在场', speaker: '旁白', line: '田禾盯着湿透的袋绳。他的话说到一半，正等你怎样接下去。', actors: ['tian'], choices: [
    { label: '“你先把路上发生的事说完；我不会替你补上动机。”', to: 'tianOpens', set: s => { s.tianOpens = true; } },
    { label: '“既然少了，你先解释为什么我不该按故意记。”', to: 'tianCloses', set: s => { s.tianOpens = false; } }
  ] },
  tianOpens: { scene: 'market', place: '县市 · 双方在场', speaker: '田禾', line: s => s.stance === 'stern' ? '……路上雨急，有一袋跌了。我和同行的人把散粟拾回，扎好袋口，没再复量。方才不敢说，是怕你把跌袋直接当成我故意少给。' : '路上雨急，有一袋跌了。我和同行的人拾回散粟、重新扎袋；我以为拾尽了，便没再复量。', actors: ['tian'], next: 'ayeApproaches' },
  tianCloses: { scene: 'market', place: '县市 · 双方在场', speaker: '田禾', line: '我说过，市上有人量过。我再说别的，你也只会当我狡辩。', actors: ['tian'], next: 'ayeApproaches' },
  ayeApproaches: { scene: 'market', place: '县市 · 人群将散', speaker: '旁白', line: s => s.stance === 'stern' ? '阿叶在市口停了很久。听见“拟请重处”，她先看了看田禾，才走近。' : '阿叶听到田禾提起雨路，主动走近。她似乎见过那辆运粮车。', actors: ['aye', 'tian'], focus: 'aye', next: 'ayeSpeaks' },
  ayeSpeaks: { scene: 'road', place: '阿叶回忆中的雨路', memory: true, speaker: '阿叶', line: s => s.tianOpens ? '我见那袋跌到路边，他们蹲下拾粟，又重新扎了袋口。田禾说的这段，我确实看见了。' : '我在雨路上见过他们。一袋跌过，后来重新扎了袋口。', actors: ['aye'], next: 'ayeChoice' },
  ayeChoice: { scene: 'road', place: '阿叶回忆中的雨路', memory: true, speaker: '旁白', line: '阿叶说完，孟庸立即看向你。一个“重扎”的动作，在众人耳里已经快变成了“偷粮”。', actors: ['aye'], choices: [
    { label: '“你只说亲眼见的。没有见到的，也请明说。”', to: 'ayeFull', set: s => { s.ayeFull = true; } },
    { label: '“你看见重扎，能替孟庸证明有人故意少给吗？”', to: 'ayeWithdraws', set: s => { s.ayeFull = false; } }
  ] },
  ayeFull: { scene: 'road', place: '阿叶回忆中的雨路', memory: true, speaker: '阿叶', line: '我见了跌袋、拾粟、扎袋；散了多少，我没量。到集市后量得怎样，我也没看。请把“不知道”一起记下。', actors: ['aye'], next: 'taskRecord' },
  ayeWithdraws: { scene: 'road', place: '阿叶回忆中的雨路', memory: true, speaker: '阿叶', line: '不能。我没见谁故意拿粮。若我的话会被写成那样，后面的事我不敢替谁说。', actors: ['aye'], next: 'taskRecord' },
  taskRecord: { type: 'task', number: '三', title: '准备交卷', description: '短少已看见，经过仍有空缺。入县署前，想一想哪些话是亲见，哪些只是猜测。', scene: 'county', place: '县署 · 入夜', next: 'toCounty' },
  toCounty: { chapter: '第三卷 · 县署门内', scene: 'county', place: '县署 · 入夜', speaker: '旁白', line: s => s.stance === 'stern' ? '市口已经安静。孟庸说官府的态度让他安心；田禾一路少言。你带着“拟请重处”的初稿入署。' : '市口的争论拖到入夜。孟庸催着要说法；田禾愿意留下补述。你带着“故意未明”的初稿入署。', actors: ['tian', 'meng'], next: 'draftThought' },
  draftThought: { scene: 'county', place: '县署 · 入夜', speaker: '旁白', line: s => `你的初稿起头是“${s.publicDraft}”。${s.tianOpens ? '田禾说了雨路跌袋，' : '田禾仍未亲口说明雨路，'}${s.ayeFull ? '阿叶的亲见与未知分开记下。' : '阿叶只留下一句不愿被误写的纠正。'}`, actors: [], next: 'judgeQuestion' },
  judgeQuestion: { scene: 'county', place: '县署 · 入夜', speaker: '审案官吏', line: s => s.stance === 'stern' ? '你在市口拟请重处，秩序暂稳。可若要把意见交上去，先答我：少一斗，能推出是谁在何时故意短给吗？' : '你没有先提重处，也记了孟庸的损失。但损失要怎样处理？先把短少、发生经过和故意与否分开写。', actors: ['judge'], source: 'law', next: 'judgeLaw' },
  judgeLaw: { scene: 'county', place: '县署 · 入夜', speaker: '审案官吏', line: '秦代有解释法律适用疑难的材料。可要说明依据，不能拿“罚得更重”填上事实的空白；也不能因一时查不清，就把买主的损失抹去。', actors: ['judge'], source: 'law', next: 'measurerHesitates' },
  measurerHesitates: { scene: 'county', place: '县署 · 入夜', speaker: '量粮人', line: '白天那道记号……你打算写成“逐袋量足”吗？若我更正，怕大家认定这一斗全是我的错。', actors: ['measurer'], source: 'record', next: 'recordChoice' },
  recordChoice: { scene: 'county', place: '县署 · 入夜', speaker: '旁白', line: '量粮人捏着记号，等你落笔。改写这句话，孟庸会追问；不改，明日的审案官吏只能看见“量足”。', actors: ['measurer'], source: 'record', choices: [
    { label: '“原话与更正都写。你说清当时究竟量了什么。”', to: 'measurerCorrects', set: s => { s.recordCorrected = true; } },
    { label: '“先按你白天的说法写。眼下别再起争执。”', to: 'measurerWhispers', set: s => { s.recordCorrected = false; } }
  ] },
  measurerCorrects: { scene: 'county', place: '县署 · 入夜', speaker: '量粮人', line: '那日人多。我留下的是十袋交付的记号，没有逐袋复核。先前说“量足”，是怕一开口，短少便全算到我身上。', actors: ['measurer'], next: 'openEnd' },
  tianReacts: { scene: 'county', place: '县署 · 入夜', speaker: '田禾', line: '你也没逐袋量清？那我一直倚着的“市上量过”，究竟能说明什么？', actors: ['tian', 'measurer'], focus: 'tian', next: 'openEnd' },
  openEnd: { chapter: '第三卷 · 第一次转折', scene: 'county', place: '县署 · 入夜', speaker: '旁白', line: s => `你把原说与更正并列写下。${s.stance === 'stern' ? '市口因重处意见安静下来，如今初稿却需要补上这处空缺。' : '争执虽未立刻平息，孟庸的损失与量粮疏漏都能同时被看见。'}短少确实存在；发生经过与田禾是否故意，仍待查明。`, actors: ['measurer', 'tian'], next: 'taskJudgment' },
  measurerWhispers: { scene: 'county', place: '县署 · 入夜', speaker: '量粮人', line: '若照白天写，我就先不当众改口了。只是……那记号只记十袋交付，我并未逐袋复核。', actors: ['measurer'], next: 'closedEnd' },
  closedEnd: { chapter: '第三卷 · 第一次转折', scene: 'county', place: '县署 · 入夜', speaker: '旁白', line: s => `量粮人承认未逐袋复核，你却暂不把更正写入初稿。${s.stance === 'stern' ? '市口暂时安静，后来的官吏仍会把旧记号误看成逐袋量足。' : '你先前承诺查明，此刻的省略仍让查明更难。'}短少确实存在；发生经过与故意与否，仍待查明。`, actors: ['measurer'], next: 'taskJudgment' },
  taskJudgment: { type: 'task', number: '四', title: '写下处理意见', description: '天亮后，孟庸要的是损失得到回应，县署要的是有依据的记录。你能提出什么，又还不能认定什么？', scene: 'court', place: '县署 · 次日', next: 'morningJudge' },
  morningJudge: { chapter: '第三卷 · 县署议事', scene: 'court', place: '县署 · 次日', speaker: '审案官吏', line: s => s.recordCorrected ? '昨夜的原说与更正都在卷上。十袋交付，不等于逐袋量足；现在把能认定的与仍待查的分开说。' : '卷上仍写着“当场量足”，量粮人却向你承认没有逐袋复核。若不补记，你今天的意见会从不完整的记录出发。', actors: ['judge'], source: 'record', next: 'mengMorning' },
  mengMorning: { scene: 'court', place: '县署 · 次日', speaker: '孟庸', line: '你们谈了一夜。我少的一斗还是少着。重处若能让人不再短给，我愿意等；可不能让我的损失在卷里消失。', actors: ['meng', 'judge'], focus: 'meng', next: 'judgmentChoice' },
  judgmentChoice: { scene: 'court', place: '县署 · 次日', speaker: '旁白', line: s => `你的初稿是“${s.publicDraft}”。你还记得昨晚谁愿意说、谁停了口。现在写下处理意见；不等于已经作出刑罚裁断。`, actors: ['judge', 'meng'], source: 'law', choices: [
    { label: '维持拟请重处的意见，请上级进一步核定故意与依据。', to: 'severeSubmit', when: s => s.stance === 'stern', locked: '需曾在市口提出重处意见', set: s => { s.resolution = 'severe'; } },
    { label: '先促成双方核对并补足一斗；故意仍待查，不以补足代替责任判断。', to: 'measuredSubmit', when: s => s.recordCorrected && (s.tianOpens || s.ayeFull), locked: '需保留更正，并听到至少一段可核对的经过', set: s => { s.resolution = 'measured'; } },
    { label: '补记量粮人的更正，明确期限继续查明；先登记孟庸的损失。', to: 'recheckSubmit', set: s => { s.resolution = 'recheck'; s.recordCorrected = true; } }
  ] },
  severeSubmit: { scene: 'court', place: '县署 · 次日', speaker: '审案官吏', line: s => s.recordCorrected ? '你可以呈交重处建议，但卷上同时写明未逐袋复核和故意未明。建议不是裁断，我会要求继续核验，不会把短少直接写成故意。' : '你仍要呈交重处建议？旧记号和量粮人的更正相冲突。我先让你把更正补在卷后，再把你的意见列为待核建议，不作刑罚裁断。', actors: ['judge'], next: 'severeMeng' },
  severeMeng: { scene: 'court', place: '县署 · 次日', speaker: '孟庸', line: '总算有人认真对待这事。只是，建议送上去，我那一斗还没有回来。', actors: ['meng'], next: 'taskMarket' },
  measuredSubmit: { scene: 'court', place: '县署 · 次日', speaker: '田禾', line: '当面复量确实少一斗。我愿与孟庸核对并补足；可这不是承认我故意短给。路上散了多少，我也没有量。', actors: ['tian', 'meng'], focus: 'tian', next: 'measuredJudge' },
  measuredJudge: { scene: 'court', place: '县署 · 次日', speaker: '审案官吏', line: '把补足和故意问题分开记。双方对一斗的处理有了办法，不等于官府已经认定当初如何短少。', actors: ['judge'], next: 'taskMarket' },
  recheckSubmit: { scene: 'court', place: '县署 · 次日', speaker: '审案官吏', line: '我收下更正，也记下孟庸的损失。明日请双方再来说明交付经过；暂不就故意或刑罚提出结论。拖延必须有期限，不能让买主无限等。', actors: ['judge'], next: 'recheckMeng' },
  recheckMeng: { scene: 'court', place: '县署 · 次日', speaker: '孟庸', line: '明日，我会来。有人肯记清楚是好事，可我今天仍要向那几户人家解释少掉的一斗。', actors: ['meng'], next: 'taskMarket' },
  taskMarket: { type: 'task', number: '五', title: '把话带回市口', description: '处理意见已经写下。人们听见的若只是“重处”或“再等等”，下一次发现差错时会怎样做？', scene: 'market', place: '县市 · 当日', next: 'noticeChoice' },
  noticeChoice: { scene: 'market', place: '县市 · 当日', speaker: '旁白', line: '众人围过来打听。卷中的私人陈述不能全公开，但你可以说明怎样报错、怎样查验，以及哪些事仍未认定。', actors: ['meng', 'tian'], choices: [
    { label: '说明程序：短少已确认，故意未明；允许当事人补述和更正。', to: 'noticeClear', set: s => { s.notice = 'clear'; } },
    { label: '只告知案件仍在处理，不公开任何判断，以免再引发争执。', to: 'noticeQuiet', set: s => { s.notice = 'quiet'; } }
  ] },
  noticeClear: { scene: 'market', place: '县市 · 当日', speaker: '你', line: '我们确认现在少了一斗，也记下孟庸的损失。何时短少、是否故意仍待查。谁发现自己的记号或陈述有误，都可来补说；官吏会把前后说法一并留下。', actors: ['meng', 'tian'], next: 'nowCrowd' },
  noticeQuiet: { scene: 'market', place: '县市 · 当日', speaker: '你', line: '事情已入县署，我不把卷内的话在市上重复。请等后续通知。', actors: ['meng', 'tian'], next: 'nowCrowd' },
  nowCrowd: { scene: 'market', place: '县市 · 当日', speaker: '旁白', line: s => s.resolution === 'severe' ? (s.notice === 'clear' ? '“拟请重处”的风声让摊主仔细量粮；你说明仍未认定故意后，有人开始问如何更正记号。' : '“拟请重处”的风声让摊主添粮、买主点头，市口很安静；一个发现记号可疑的人却把话咽了回去。') : s.resolution === 'measured' ? (s.notice === 'clear' ? '孟庸和田禾当面核对补足一斗。围观的人看见损失被回应，也听见故意仍待查。' : '一斗得到补足，争吵渐散；旁人却不清楚下次发现差错该向谁说明。') : (s.notice === 'clear' ? '孟庸仍要等到明日，但几位摊主听懂了怎样补述错误。' : '人们知道此事还没完，买主抱怨等候，卖粮人不知道报错后会怎样。'), actors: ['meng', 'tian'], next: 'mengNow' },
  mengNow: { scene: 'market', place: '县市 · 当日', speaker: '孟庸', line: s => s.resolution === 'measured' ? '一斗补上了，这件损失有了交代。但我仍想知道，当初到底是雨路出了错，还是有人存心短给。' : s.resolution === 'severe' ? '我认可你没有把重处轻轻放过。可若只剩一个“请重处”的建议，买主仍得自己承担那一斗。' : '我按约明日来。请别让我只听到“再查”，却始终没有处理损失的办法。', actors: ['meng'], next: 'homeEvening' },
  homeEvening: { chapter: '第三卷 · 人各有家', scene: 'home', place: '田禾家门前 · 当晚', speaker: '田禾家人', line: s => s.stance === 'stern' ? '今日市口一听见重处，田禾连跌袋都不敢先说。明日再有差错，是不是谁都先闭嘴？' : '田禾说县吏让他把经过讲完。可是少掉的一斗也是真的，我们得想办法面对买主。', actors: ['family', 'tian'], focus: 'family', next: 'tianHome' },
  tianHome: { scene: 'home', place: '田禾家门前 · 当晚', speaker: '田禾', line: s => s.resolution === 'severe' ? '我并非不愿补足。可如今一开口，怕别人只听见“承认短给”，明日我还敢把粟运去市上吗？' : s.resolution === 'measured' ? '这一斗补了，买主的事先有着落。我也盼县署把跌袋和量粮经过查清，不把补足写成认罪。' : '明日还要去县署。我会把雨路的事说清，也愿意和孟庸核对那一斗。', actors: ['tian', 'family'], focus: 'tian', next: s => s.resolution === 'severe' ? 'heavyReturn' : s.resolution === 'recheck' ? 'recheckReturn' : 'taskLater' },
  heavyReturn: { chapter: '第三卷 · 次日再议', scene: 'court', place: '县署 · 次日', speaker: '审案官吏', line: '重处意见不能当作已经生效的裁断。复量证明眼下短少，原记号又有疏漏；这些仍不足以认定田禾故意短给。我把意见留作待核，不据此施罚。', actors: ['judge', 'tian'], focus: 'judge', next: 'heavySettlement' },
  heavySettlement: { scene: 'court', place: '县署 · 次日', speaker: '田禾', line: '若补足一斗只为回应交易差额，不写作我故意短给的供认，我愿和孟庸当面核对、补足。昨夜我迟迟不敢这样说。', actors: ['tian', 'meng'], focus: 'tian', next: 'heavyMengReply' },
  heavyMengReply: { scene: 'court', place: '县署 · 次日', speaker: '孟庸', line: '我收下补足的一斗，也知道重处意见没有成为裁断。若再有人短给，官府至少要把依据和经过说清。', actors: ['meng'], next: 'taskLater' },
  recheckReturn: { chapter: '第三卷 · 次日再议', scene: 'court', place: '县署 · 次日', speaker: '审案官吏', line: '量粮人的更正与原记号已经并列。双方再核对：交付后少一斗可以确认，最初短少发生在哪一步、是否故意仍不能确定。', actors: ['judge', 'measurer'], next: 'recheckSettlement' },
  recheckSettlement: { scene: 'court', place: '县署 · 次日', speaker: '孟庸', line: '我多跑了一趟，田禾现在同意当面补足一斗。损失有了回应；至于故意与否，我不愿再只凭一句话定。', actors: ['meng', 'tian'], focus: 'meng', next: 'taskLater' },
  taskLater: { type: 'task', number: '六', title: '再过些日子', description: '一宗案不会只留下处理意见。下一次有人发现差错时，市场会给出更直接的回答。', scene: 'market', place: '县市 · 数日后', next: 'laterMarket' },
  laterMarket: { chapter: '第三卷 · 后来的县市', scene: 'market', place: '县市 · 数日后', speaker: '旁白', line: '另一位卖粮者摸到潮湿袋口，发现自己的交付记号可能有误。他看向量粮处，犹豫要不要开口。', actors: ['measurer', 'aye'], next: 'measurerLater' },
  measurerLater: { scene: 'market', place: '县市 · 数日后', speaker: '量粮人', line: s => s.recordCorrected && s.notice === 'clear' ? '上回我更正了记号，原说与改说都留下了。你现在报错，我先把实际量了什么记清，别再用一个记号冒充逐袋复核。' : s.notice === 'clear' ? '县吏说能补述。上回我迟了一步才承认没有逐袋复核，这回先把实情讲清。' : '这记号若改了，又会牵出多少事？我先不在人前说，你也想清楚。', actors: ['measurer'], next: 'ayeLater' },
  ayeLater: { scene: 'market', place: '县市 · 数日后', speaker: '阿叶', line: s => s.ayeFull && s.notice === 'clear' ? '我见到他停下来查袋口，至于袋里差多少，我不知道。上次“不知道”也被记了，我愿再作证。' : '我只看见他停下，不知道袋里多少。上次有人差点把我的话写成故意，我这回得先问清会怎样记。', actors: ['aye'], next: 'laterResponse' },
  laterResponse: { scene: 'market', place: '县市 · 数日后', speaker: '旁白', line: s => s.notice === 'clear' && s.recordCorrected ? (s.resolution === 'severe' ? '卖粮者先私下找量粮人更正记号。重处意见虽未成为裁断，先前的风声仍使他不敢当众开口；差错总算没有被压下。' : '卖粮者带着记号走向量粮处。市口没有立刻安静，但差错在交易前被说了出来。') : s.notice === 'clear' ? '卖粮者还是走向量粮处，却反复问更正后会不会立刻受重处。有人听见了真实的疑问。' : '卖粮者把袋口重新扎紧，先离开了人群。市口看着平静，县署却少了一条可核实的消息。', actors: ['measurer', 'aye'], next: 'taskReview' },
  taskReview: { type: 'task', number: '七', title: '分时代复盘', description: '故事结束。现在离开秦朝虚构案情，从三个不同年代看：规则公开、重罚与事实查验各解决什么问题？', scene: 'rules', place: '课堂复盘 · 非案情连续事件', next: 'reviewQin' },
  reviewQin: { chapter: '独立复盘 · 秦朝', scene: 'rules', place: '秦朝史料视角 · 非本案法条', speaker: '旁白', line: '睡虎地秦简《法律答问》留下法律解释材料，《封诊式》留下讯问与记录材料。它们提醒我们：官吏不能只说处罚重，还要说明依据并把陈述的前后变化记清；它们不证明这宗虚构交易适用什么刑罚。', actors: [], source: 'law', next: 'reviewSpring' },
  reviewSpring: { chapter: '独立复盘 · 春秋', scene: 'rules', place: '春秋 · 郑国 · 公元前536年', speaker: '旁白', line: '子产铸刑书，是法律公开的制度对照。让人事先知道规则，与把处罚加重，是两个不同问题。这里不是田禾所在的秦朝县市。', actors: [], source: 'compare', next: 'reviewWarring' },
  reviewWarring: { chapter: '独立复盘 · 战国', scene: 'rules', place: '战国 · 重刑思想对照', speaker: '旁白', line: '战国商鞅相关重刑主张强调威慑。市场暂时安静，可以让人理解这一逻辑；后来的沉默又让人追问：表面服从是否等于官府得到真实消息？这不是本案的直接依据。', actors: [], source: 'compare', next: 'final' },
  final: { chapter: '第三卷 · 卷终', scene: 'rules', place: '秦朝虚构案 · 教学复盘', speaker: '旁白', line: s => `你的路线是“${s.resolution === 'severe' ? '拟请重处' : s.resolution === 'measured' ? '先回应损失、故意待查' : '补记并续查'}”。${s.notice === 'clear' ? '你向市口说明了报错与补述的办法。' : '你选择暂不向市口说明程序。'}这宗案仍不能仅凭短少一斗认定故意；重处的威慑、查清事实、说明规则与回应损失，也不能互相替代。`, actors: [], end: true }
};

const state = {};
const saveKey = 'lvmai-shao-third-v1';
const els = {
  backdrop: document.getElementById('backdrop'), chapter: document.getElementById('chapter-text'), place: document.getElementById('place'), memory: document.getElementById('memory-label'), portraits: document.getElementById('portraits'), speaker: document.getElementById('speaker'), beat: document.getElementById('beat'), line: document.getElementById('line'), choices: document.getElementById('choice-list'), next: document.getElementById('next-button'), hint: document.getElementById('hint'), sourceButton: document.getElementById('source-button'), overlay: document.getElementById('source-overlay'), sourceTitle: document.getElementById('source-title'), sourceBody: document.getElementById('source-body'), taskLayer: document.getElementById('task-layer'), taskCount: document.getElementById('task-count'), taskTitle: document.getElementById('task-title'), taskDescription: document.getElementById('task-description'), taskNext: document.getElementById('task-next'), dialogue: document.querySelector('.dialogue'), endActions: document.getElementById('end-actions')
};
let current = 'intro';
let lastScene = '';
function saveProgress() {
  try { localStorage.setItem(saveKey, JSON.stringify({ edition: 1, current, state })); } catch (_) {}
}
function markComplete() {
  try {
    const key = 'lvmai-full-v4';
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (!saved || saved.version !== 4) return;
    saved.completed ||= {};
    saved.completed[8] = { ending: state.resolution === 'severe' ? '重处待核' : state.resolution === 'measured' ? '损失先应' : '续查留痕', logs: [{ stage: '第三卷', choice: state.resolution, effect: state.notice }] };
    saved.unlocked = Math.max(saved.unlocked || 1, 10);
    localStorage.setItem(key, JSON.stringify(saved));
  } catch (_) {}
}
function renderPortraits(node) {
  const actors = node.actors || [];
  els.portraits.innerHTML = actors.map((id, i) => {
    const side = actors.length === 1 ? 'center' : i === 0 ? 'left' : 'right';
    const muted = node.focus && node.focus !== id ? ' muted' : '';
    return `<img class="portrait ${side}${muted}" src="${people[id].image}" alt="">`;
  }).join('');
}
function show(id) {
  current = id;
  const node = nodes[id];
  if (!node) throw new Error(`Unknown scene: ${id}`);
  const scene = node.scene || 'market';
  if (scene !== lastScene) { els.backdrop.style.backgroundImage = `url("${backgrounds[scene]}")`; lastScene = scene; }
  els.chapter.textContent = node.chapter || (scene === 'county' ? '第三卷 · 县署门内' : '第三卷 · 安静的县市');
  els.place.textContent = node.place || '';
  els.memory.hidden = !node.memory;
  els.taskLayer.hidden = node.type !== 'task';
  els.dialogue.hidden = node.type === 'task';
  if (node.type === 'task') {
    els.taskCount.textContent = `任务 ${node.number}`;
    els.taskTitle.textContent = node.title;
    els.taskDescription.textContent = node.description;
  }
  els.speaker.textContent = node.speaker;
  els.beat.textContent = node.end ? '卷终 · 可重玩' : '';
  els.line.textContent = typeof node.line === 'function' ? node.line(state) : node.line;
  els.sourceButton.hidden = !node.source;
  els.sourceButton.dataset.source = node.source || '';
  renderPortraits(node);
  els.choices.innerHTML = '';
  for (const choice of node.choices || []) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'choice-button';
    const allowed = !choice.when || choice.when(state);
    button.textContent = allowed ? choice.label : `${choice.label}（${choice.locked}）`;
    button.disabled = !allowed;
    if (allowed) button.addEventListener('click', () => { choice.set(state); show(choice.to); });
    els.choices.append(button);
  }
  els.next.hidden = !!node.choices || !!node.end || node.type === 'task';
  els.endActions.hidden = !node.end;
  els.hint.textContent = node.end ? '本卷已归档，另一条路线可从头重玩' : node.choices ? '你的选择将影响后面的回应与处理' : '自动存档 · 点击继续或按空格键';
  if (node.end) markComplete();
  saveProgress();
}
function advance() { const node = nodes[current]; if (node.next && els.overlay.hidden) show(typeof node.next === 'function' ? node.next(state) : node.next); }
function reset() { for (const key of Object.keys(state)) delete state[key]; try { localStorage.removeItem(saveKey); } catch (_) {} lastScene = ''; show('intro'); }
function openSource() { const source = sources[els.sourceButton.dataset.source]; if (!source) return; els.sourceTitle.textContent = source.title; els.sourceBody.innerHTML = source.html; els.overlay.hidden = false; document.getElementById('source-close').focus(); }
function closeSource() { els.overlay.hidden = true; els.sourceButton.focus(); }
els.next.addEventListener('click', advance);
els.taskNext.addEventListener('click', advance);
document.getElementById('restart-button').addEventListener('click', reset);
document.getElementById('end-replay').addEventListener('click', reset);
els.sourceButton.addEventListener('click', openSource);
document.getElementById('source-close').addEventListener('click', closeSource);
els.overlay.addEventListener('click', e => { if (e.target === els.overlay) closeSource(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !els.overlay.hidden) closeSource();
  if ((e.key === ' ' || e.key === 'Enter') && els.overlay.hidden && !nodes[current].choices && !nodes[current].end && document.activeElement === document.body) { e.preventDefault(); advance(); }
});
window.__storySample = { show, reset, state, get current() { return current; } };
try {
  const saved = JSON.parse(localStorage.getItem(saveKey) || 'null');
  if (saved?.edition === 1 && nodes[saved.current] && saved.state && typeof saved.state === 'object') {
    Object.assign(state, saved.state);
    show(saved.current);
  } else reset();
} catch (_) { reset(); }
