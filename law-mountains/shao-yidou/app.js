"use strict";

const asset = "assets/";
const bg = {
  office: `${asset}场景/S01_县署受理处.webp`, market: `${asset}场景/S03_集市量粮处.webp`,
  road: `${asset}场景/S04_雨后运输道路.webp`, waiting: `${asset}场景/S02_县署候讯处.webp`,
  court: `${asset}场景/S05_县署审案处.webp`, home: `${asset}场景/S06_田禾家门前.webp`,
  policy: `${asset}场景/S07_规则制定处.webp`, spring: `${asset}场景/S00_春秋制度对照.webp`
};
const cast = {
  buyer: ["R2_孟庸.webp", "孟庸"], tian: ["R1_田禾.webp", "田禾"], witness: ["R3_阿叶.webp", "阿叶"],
  measurer: ["R4_量粮人.webp", "量粮人"], clerk: ["R5_县吏.webp", "县吏"],
  judge: ["R6_审案官吏.webp", "审案官吏"], family: ["R7_田禾家人.webp", "田禾家人"]
};
const cards = {
  law: { title: "秦朝 · 法律与适用", source: "睡虎地秦简《法律答问》", url: "https://sdcourt.gov.cn/dyzy/372897/372830/36373470/index.html", fact: "《法律答问》保存了以设问方式解释、适用法律的材料。", reading: "规则和解释能给官吏判断提供依据；当事人是否知道、官吏是否依照依据办案，仍需分别追问。", fiction: "本案没有对应的已核实秦律条文；人物对白并非秦简原文。" },
  record: { title: "秦朝 · 讯问与记录", source: "睡虎地秦简《封诊式》", url: "https://www.spp.gov.cn/spp/llyj/202109/t20210923_530227.shtml", fact: "《封诊式》留有治狱、讯狱和勘验等文书范例。", reading: "把查验、亲见、转述与推断分开，可以让之后的审案者看清依据与疑点；它不能保证每个官吏都会认真执行。", fiction: "这里的粮袋、复量和县吏记录都是教学推演，不是《封诊式》记载的案例。" },
  governance: { title: "秦朝 · 县吏与治理", source: "睡虎地秦简《语书》《为吏之道》及本课教案", url: "https://www.sdcourt.gov.cn/dydyqfy/367792/367794/622156/index.html", fact: "秦简中有关于官吏行事的材料；秦的法律与行政管理密切相关。", reading: "有制度和办案步骤，不等于官吏的权力已经受到现代意义上的约束。玩家要追问记录是否可靠、疏漏是否被遮掩。", fiction: "本案量粮人是否疏漏，须由游戏内已取得的陈述与查验来判断。" },
  severe: { title: "秦朝 · 严刑治理的作用与限度", source: "本课教案“秦朝法律（上）”；《商君书》仅作战国思想背景", url: "https://www.jsfy.gov.cn/article/30253.html", fact: "教案要求分析秦代法家重刑思想，并辩证评价秦朝法制化与严苛治理。", reading: "较重处罚可能使人更谨慎；但若事实不明、执行不一，也可能扩大误罚或使知情者不敢说明意外。单个虚构案件不能证明总体效果。", fiction: "游戏不提供本案适用的刑名、刑度或条号。你作的是有边界的教学判断。" },
  spring: { title: "春秋 · 郑国子产铸刑书", source: "《左传·昭公六年》及本课教案", url: "https://gjzlfzh.hbu.edu.cn/contents/69/5131.html", fact: "公元前536年，郑国铸刑书；《左传》记载叔向对子产的批评。", reading: "公布规则增强可知性，便于人们讨论裁断依据；公开本身不保证事实查准或处罚适当。", fiction: "本画面是跨时代制度对照，不是秦朝案件的前一日。" },
  warring: { title: "战国 · 商鞅变法与重罚思想", source: "本课教案；《商君书》相关思想材料", url: "https://www.chinagscourt.gov.cn/Wap/Show/105265", fact: "战国秦国的商鞅变法重视明确法令、奖惩及国家治理。", reading: "重罚逻辑意在威慑；是否带来良好治理，还取决于发现问题、准确认定与官吏执行。", fiction: "这是战国思想视角，不是本案可直接援引的秦朝交易法条。" }
};
const measures = [
  ["提高对故意欺诈的处罚", "可能增强威慑；认定不准时误罚与隐瞒风险也会增加。"],
  ["统一量具并定期校验", "有助于减少数量争议；需要维护与监督。"],
  ["双方共同确认量粮记录", "方便核对；增加交易时间，记录也可能失真。"],
  ["运输异常时重新复量", "较早发现散失；增加步骤，不能仅凭绳结判断故意。"],
  ["核查经手官吏并容许更正", "促使负责；若只重罚不容更正，可能促使隐瞒。"],
  ["裁断时写明证据与疑点", "便于检验依据；需要时间和认真监督。"]
];
const initial = () => ({ version: 1, step: "buyer", buyer: "", route: "", encounter: "", tian: "", clerk: "", witness: false, measurer: false, bag: false, record: false, followup: false, followupNote: "", ending: "", basis: "", reason: "", selected: [], era: {}, logs: [], error: "" });
const key = "shaoyidou-full-v1";
let state;
try { const saved = JSON.parse(localStorage.getItem(key)); state = saved?.version === 1 ? { ...initial(), ...saved } : initial(); } catch { state = initial(); }
const $ = id => document.getElementById(id);
const interaction = $("interaction");
const escapeHtml = value => String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
const save = () => { try { localStorage.setItem(key, JSON.stringify(state)); } catch {} };
const action = (label, id, primary = false, disabled = false, note = "") => `<button class="action${primary ? " primary" : ""}" type="button" data-action="${id}" ${disabled ? "disabled" : ""}>${label}</button>${note ? `<p class="action-note">${note}</p>` : ""}`;
const source = id => `<button class="source-toggle" type="button" data-card="${id}">查看史料背景 · ${cards[id].title}</button>`;
const note = value => `<div class="evidence-line">${value}</div>`;
function log(label, detail) { state.logs.push({ label, detail }); save(); }

function scene({ background, person = "", place, moment, chapter, objective, speaker, speech, prompt = "" }) {
  const image = $("scene-image");
  image.hidden = !background;
  $("stage").classList.toggle("era-neutral", !background);
  if (background && image.getAttribute("src") !== background) image.src = background;
  image.alt = place;
  $("place").textContent = place;
  $("moment").textContent = moment;
  $("scene-count").textContent = chapter;
  $("scene-objective").textContent = objective;
  $("speaker").textContent = speaker;
  $("speech").textContent = speech;
  $("world-prompt").textContent = prompt;
  $("world-prompt").hidden = !prompt;
  const portrait = $("portrait");
  portrait.hidden = !person;
  if (person) { portrait.src = `${asset}人物/${cast[person][0]}`; portrait.alt = cast[person][1]; }
  const progress = { buyer: 1, buyerReply: 1, inspect: 2, encounter: 3, encounterReply: 3, tian: 4, tianReply: 4, clerk: 5, clerkReply: 5, hearing: 6, inquiry: 6, explain: 6, outcomeBuyer: 7, outcomeTian: 7, outcomeFamily: 7, future: 7, reform: 8, eraSpring: 9, eraWarring: 9, eraQin: 9, reveal: 9, finish: 9 }[state.step];
  $("progress").textContent = `${String(progress).padStart(2, "0")} / 09`;
}
function drawBuyer() {
  scene({ background: bg.office, person: "buyer", place: "秦朝统一后 · 某县县署", moment: "买主告发", chapter: "第一幕", objective: "回应重罚要求", speaker: "孟庸", speech: "我付了十袋粟的钱，回去复量却少了一斗。若只叫他补上，下次谁还敢买？官府就该罚得重些。" });
  interaction.innerHTML = `${source("law")}${action("先以重罚震慑，按故意追问田禾。", "buyer:severe")}${action("先回应损失，再查他是否有意。", "buyer:loss", true)}${action("先说清依据，也要查初次量粮由谁经手。", "buyer:rules")}`;
}
function drawBuyerReply() {
  const speech = { severe: "罚得重，我一时安心些。可你们现在知道他是有意的吗？", loss: "少的这一斗不能没人管。我愿意等你们查清经过。", rules: "请把查到的和没查到的都告诉我，别让我只等一句结果。" }[state.buyer];
  scene({ background: bg.office, person: "buyer", place: "秦朝统一后 · 某县县署", moment: "买主的回应", chapter: "第一幕", objective: "听见损失与信任诉求", speaker: "孟庸", speech });
  interaction.innerHTML = `${note("孟庸亲见的是复量后的短少。他没有亲见田禾取走粟。")}${action("请县吏共同复量", "next:inspect", true)}`;
}
function drawInspect() {
  scene({ background: bg.market, person: "clerk", place: "秦朝统一后 · 县市量粮处", moment: "一次共同查验", chapter: "第二幕", objective: "只取得必要事实", speaker: "县吏", speech: "双方在场，用同一量具复量，现存粟仍有短少。这能确认眼下的数量，不能确定短少何时、因何发生。时间只够先追一条线。" });
  interaction.innerHTML = `${note("已查：现存短少。未查：运输经过、初次量粮、田禾是否故意。")}${action("去雨后的道路问目击者", "route:road")}${action("留在集市问初次量粮人", "route:market", true)}`;
}
function drawEncounter() {
  const road = state.route === "road";
  scene({ background: road ? bg.road : bg.market, person: road ? "witness" : "measurer", place: road ? "秦朝统一后 · 雨后运输道路" : "秦朝统一后 · 县市量粮处", moment: road ? "阿叶的有限目击" : "量粮人的初次记录", chapter: "第三幕", objective: "决定怎样提问", speaker: road ? "阿叶" : "量粮人", speech: road ? "那日我在路边，见过田禾的车。你要我说哪一段？" : "交货时我说数量够了。你们现在要查什么？" });
  interaction.innerHTML = `${source("record")}${road ? `${action("只问她亲眼看见什么，以及没看见什么。", "encounter:scope", true)}${action("既然她在路边，就让她证明洒失了一斗。", "encounter:overstate")}${action("先不问她，靠复量直接判断。", "encounter:skip")}` : `${action("请他说明是否逐袋复核、如何留下记录。", "encounter:verify", true)}${action("他当时说够了，先采信这个说法。", "encounter:accept")}${action("先以失职重罚相逼，要求他承认。", "encounter:pressure")}`}`;
}
function drawEncounterReply() {
  const road = state.route === "road";
  const speech = road ? {
    scope: "我看见一袋跌落，田禾和同行者拾了散粟，又扎好袋口。我没量散粟，也没在集市看他们量粮。",
    overstate: "我只见跌袋和重扎，哪里知道恰好少了一斗？这个数不能写成我亲眼看见的。",
    skip: "若你们不问，我看到的跌袋就不会进入卷宗；复量也说不出短少从何而来。"
  }[state.encounter] : {
    verify: "我当时没有逐袋复核，记号也很简略；先前只说数量够了。究竟少在哪一段，我说不准。",
    accept: "既然你们愿意照我先前说的记，我只说当时交货有人量过、说够了。",
    pressure: "你们若先说要重罚失职，我只能说当时按我记得的做了；别的话我不敢乱认。"
  }[state.encounter];
  scene({ background: road ? bg.road : bg.market, person: road ? "witness" : "measurer", place: road ? "秦朝统一后 · 雨后运输道路" : "秦朝统一后 · 县市量粮处", moment: "提问的后果", chapter: "第三幕", objective: "别把陈述当成全知", speaker: road ? "阿叶" : "量粮人", speech });
  interaction.innerHTML = `${note(road ? "阿叶不能证明散失数量或田禾的心意。" : "初次量粮的说法与是否复核，仍需分别记录。")}${action("回县署问田禾", "next:tian", true)}`;
}
function drawTian() {
  const guarded = state.buyer === "severe";
  scene({ background: bg.waiting, person: "tian", place: "秦朝统一后 · 县署候讯处", moment: "被告发者的说法", chapter: "第四幕", objective: "问法会改变你听见什么", speaker: "田禾", speech: guarded ? "听说官府已经要按故意重罚我？交货时有人量过，说是够的。" : "交货时有人量过，说是够的。你们想问哪一段经过？" });
  interaction.innerHTML = `${source("record")}${action("若你不承认故意，就按欺瞒追究。", "tian:threat")}${action("先讲交货前后发生了什么，不知道的也直说。", "tian:open", true)}${action(state.route === "road" && state.witness ? "提出阿叶亲见的跌袋，再问田禾" : state.route === "market" && state.measurer ? "提出初量未逐袋复核，再问田禾" : "先请田禾回应已查到的数量", "tian:confront")}`;
}
function drawTianReply() {
  const speech = state.tian === "threat" ? "交货时有人量过，说够了。若你们已经把我当作存心骗人，我再说什么也像辩解。" : state.tian === "open" ? "雨中跌过一袋。我和同行者拾回散粟，以为齐了，没有再量。究竟洒失多少，我不知道。" : state.route === "road" && state.witness ? "阿叶说的跌袋是真的。我们拾回散粟，却没有再量；我以为没有少。" : state.route === "market" && state.measurer ? "量粮人说当时没逐袋复核？路上也跌过一袋，我们拾回后没再量。请把两段都查清。" : "我知道眼下少了，但初量和路上都还没问全。只凭复量，怎能说我有意？";
  scene({ background: bg.waiting, person: "tian", place: "秦朝统一后 · 县署候讯处", moment: "问法改变了陈述", chapter: "第四幕", objective: "把供述当作待核实材料", speaker: "田禾", speech });
  interaction.innerHTML = `${note(state.bag ? "田禾说出跌袋与未复量，但这仍是待核实陈述，不自动证明故意。" : "你没有取得田禾对途中经过的完整陈述；沉默或防御也不能直接证明故意。")}${action("请县吏整理卷宗", "next:clerk", true)}`;
}
function drawClerk() {
  scene({ background: bg.court, person: "clerk", place: "秦朝统一后 · 县署审案处", moment: "案卷怎样写", chapter: "第五幕", objective: "约束办案者自己的推断", speaker: "县吏", speech: "催着结案的人不少。卷宗中有复量结果，也有人的说法。你要我怎样写给审案官吏？" });
  interaction.innerHTML = `${source("governance")}${action("写作‘故意短给’，尽快交卷。", "clerk:presume")}${action("分列复量、陈述、疑点，并记初次量粮待核。", "clerk:full", true)}${action("只记少一斗，其余不写，先处理损失。", "clerk:brief")}`;
}
function drawClerkReply() {
  const speech = { presume: "若写成故意，卷宗里哪一步能证明他的心意？我的一句定性，不能代替查验。", full: "我会把短少记为复量所得，把跌袋记为陈述，把未复核或尚未查验的环节逐项列出。经手人的话也须核查。", brief: "损失可以先记，但经手与成因若都略去，下次还会只剩双方争执。" }[state.clerk];
  scene({ background: bg.court, person: "clerk", place: "秦朝统一后 · 县署审案处", moment: "记录的后果", chapter: "第五幕", objective: "将有限卷宗交给审案者", speaker: "县吏", speech });
  interaction.innerHTML = `${action("带着已有材料去审案", "next:hearing", true)}`;
}
function canCareful() { return state.record && state.bag && (state.witness || state.measurer); }
function drawHearing() {
  const known = ["双方复量确认现存短少", state.witness ? "阿叶亲见跌袋，未见散失数量" : "阿叶尚未提供可核实的目击", state.measurer ? "初次量粮未逐袋复核" : "初次量粮是否复核未明", state.bag ? "田禾陈述跌袋与未复量" : "田禾未完整说明途中经过"];
  scene({ background: bg.court, person: "judge", place: "秦朝统一后 · 县署审案处", moment: "第一次裁断", chapter: "第六幕", objective: "处罚强度不能代替认定", speaker: "审案官吏", speech: "短少可以查到；短少何时发生、田禾是否有意、经手人是否疏漏，是不同问题。你准备怎样处理？" });
  interaction.innerHTML = `${source("severe")}${note(`卷宗所载：${known.join("；")}。`)}<div class="verdict-options">${action("A · 认定故意，以严厉处理回应告发", "verdict:A")}${action("B · 回应损失，暂不认定故意，并核查经手", "verdict:B", false, !canCareful(), !canCareful() ? "需先取得可核实的经过，并让县吏分列事实与疑点；可选择定向补查。" : "")}${action("C · 列明疑点，作一次定向补查或暂缓", "verdict:C", true)}${action("D · 只补足损失，不再追问程序", "verdict:D")}</div>`;
}
function drawInquiry() {
  scene({ background: bg.court, person: "judge", place: "秦朝统一后 · 县署审案处", moment: "定向补查", chapter: "第六幕", objective: "只补一处关键缺口", speaker: "审案官吏", speech: "继续查，不是无限拖延。你要写明一项能够改变判断的问题；也可以让案件暂留疑点，先不认定故意。" });
  interaction.innerHTML = `${state.followup ? note(`已补查：${escapeHtml(state.followupNote)}。本轮不再无限追加。`) : `${!state.bag ? action("重新以开放方式问田禾的途中经过", "follow:tian") : ""}${!state.witness ? action("问阿叶亲眼所见的范围", "follow:witness") : ""}${!state.measurer ? action("核查初次量粮是否逐袋复核", "follow:measurer") : ""}${!state.record ? action("令县吏分列查验、陈述和待查", "follow:record") : ""}`}${action("带新材料返回审案", "next:hearing", true)}${action("暂缓故意认定，把具体疑点留给后续查验", "verdict:C-final")}`;
}
function drawExplain() {
  const titles = { A: "草率重罚", B: "查明短少，审慎认定", C: "有疑点，继续查验", D: "只处理损失" };
  scene({ background: bg.court, person: "judge", place: "秦朝统一后 · 县署审案处", moment: "说清处理理由", chapter: "第六幕", objective: "理由须对应已知信息", speaker: "审案官吏", speech: `你选择了“${titles[state.ending]}”。请向双方说清已证实什么、尚不能认定什么，以及这项处理可能带来什么代价。` });
  const basisNote = { fact: "复量能支持现存短少，不能直接证明故意。", statements: "人物陈述能指向待查经过，不能仅凭一人所说认定故意。", deterrence: "处罚更严是治理主张，不是田禾是否故意的证据。" }[state.basis] || "";
  interaction.innerHTML = `${source("law")}<div class="choice-title">你首先援引哪一类依据？</div><div class="basis-options">${[["fact", "共同复量的结果"], ["statements", "问话与待查经过"], ["deterrence", "重罚能震慑后来者"]].map(([id, label]) => `<button type="button" class="action${state.basis === id ? " selected" : ""}" data-action="basis:${id}" aria-pressed="${state.basis === id}">${label}</button>`).join("")}</div>${basisNote ? note(basisNote) : ""}<label class="choice-title" for="reason">你的裁断说明</label><textarea id="reason" class="reason-input" maxlength="240" placeholder="例如：复量支持现存短少；但故意仍缺依据……"></textarea>${state.error ? `<p class="inline-error">${escapeHtml(state.error)}</p>` : ""}${action("向双方宣布处理", "submit", true)}`;
  $("reason").value = state.reason;
}
function outcomeLine(role) {
  const ending = state.ending;
  const buyer = { A: "官府动作很快，我一时觉得有人负责。可我没亲眼见他有意取粟；下回买卖，数量还是得量清。", B: "短少得到回应，未查明的故意也没被写成定论。我不一定满意等待，但知道官府凭什么说。", C: "还要等查验，我着急拿回损失。请说清要查谁、何时再答复我。", D: "这一斗有了着落。可是第一次量粮出了什么问题，下次我仍不知道。" }[ending];
  const tian = { A: "我说了交货时有人量过。若把短少直接写成故意，再重的处理也不能让我知道凭什么这样断。", B: "若有短少，理当说清如何处理。我承认未复量有疏忽，却不能因此被写成存心欺骗。", C: "暂不把我说成故意，我可以配合补查。但也不能让我一直悬着，等一个没有期限的判断。", D: "事情似乎结束了，但量粮环节未查；若下次再有争执，我仍说不清。" }[ending];
  const family = { A: "处罚越重，一句未经查实的定性压在家里就越沉。", B: "家里还要想办法应对短少；至少官府没有把猜测先写成定论。", C: "我们仍要等消息。继续查验必须真的指向疑点，不能只是拖着。", D: "这一回补了粟，下回是谁量错、如何更正，没人回答。" }[ending];
  if (role === "buyer") {
    const memory = state.buyer === "severe" ? "你起初答应先用重罚回应我；" : state.buyer === "rules" ? "你起初答应说清依据；" : "你起初说先分清损失与故意；";
    return memory + buyer;
  }
  if (role === "tian" && state.tian === "threat") return "先前的威胁让我不敢把途中经过讲全。" + tian;
  if (role === "family" && state.clerk === "presume") return "卷宗先写了故意，家里最怕这句话成了不再查验的理由。" + family;
  return { tian, family }[role];
}
function drawOutcome(role, next) {
  const person = role === "buyer" ? "buyer" : role === "tian" ? "tian" : "family";
  scene({ background: role === "family" ? bg.home : role === "tian" ? bg.waiting : bg.office, person, place: role === "family" ? "秦朝统一后 · 田禾家门前" : "秦朝统一后 · 某县", moment: "处理后的生活", chapter: "第七幕", objective: "听见不同人的代价", speaker: cast[person][1], speech: outcomeLine(role) });
  interaction.innerHTML = `${role === "buyer" ? note(`你说给双方的理由：${escapeHtml(state.reason)}`) : ""}${action(next === "future" ? "看看这种处理可能如何影响下次交易" : "听另一位当事人怎么说", `next:${next}`, true)}`;
}
function drawFuture() {
  const lines = { A: "有些人可能因此更谨慎；也有人可能更不敢主动报告运输意外。这是效果推演，不是本案测得的市场统计。", B: "查验与写明依据可能增加时间，却使争议中的已知与未知更清楚。双方仍未必完全满意。", C: "进一步查验有成本；若查不到关键事实，官府仍须交代不能认定的范围。", D: "眼前损失得到补救，但初次量粮的疏漏若不追问，类似争议仍可能再发生。" };
  scene({ background: bg.market, person: "clerk", place: "秦朝统一后 · 县市", moment: "后果不是一条分数", chapter: "第七幕", objective: "区别可能效果与已证事实", speaker: "县吏", speech: lines[state.ending] });
  interaction.innerHTML = `${action("讨论下次怎样减少这类纠纷", "next:reform", true)}`;
}
function drawReform() {
  scene({ background: bg.policy, person: "clerk", place: "秦朝案件 · 规则改进推演", moment: "选择三项措施", chapter: "第八幕", objective: "每项改进都有条件和成本", speaker: "县吏", speech: "若下次仍有人说‘罚重些就好’，你准备同时改变什么？从六项措施中选三项，看看各自能处理哪段漏洞。" });
  interaction.innerHTML = `${source("governance")}<div class="measure-grid">${measures.map(([label, tradeoff], i) => `<button class="measure ${state.selected.includes(i) ? "selected" : ""}" type="button" data-action="measure:${i}" aria-pressed="${state.selected.includes(i)}"><span>${state.selected.includes(i) ? "✓ " : ""}${label}</span><small>${tradeoff}</small></button>`).join("")}</div><p class="action-note">已选 ${state.selected.length} / 3。没有唯一最佳组合。</p>${state.error ? `<p class="inline-error">${escapeHtml(state.error)}</p>` : ""}${action("带着方案进入分时代复盘", "reform:submit", true)}`;
}
function eraOptions(options) { return options.map(([label, key]) => action(label, `era:${key}`, state.era[state.step] === key)).join(""); }
function drawEraSpring() {
  scene({ background: bg.spring, place: "春秋 · 郑国 · 公元前536年", moment: "独立制度对照，非秦朝案情", chapter: "第九幕", objective: "规则公开能解决什么", speaker: "制度对照", speech: "假设你是当时的商人，连裁断依据都无从知晓。子产铸刑书引发争论；规则被公布之后，哪件事可能先改变？" });
  interaction.innerHTML = `${source("spring")}${eraOptions([["当事人更可能知道、讨论裁断依据；仍须查清事实。", "spring-bounded"], ["只要公布成文法，官吏必然判断准确。", "spring-total"]])}${state.era.eraSpring ? note(state.era.eraSpring === "spring-bounded" ? "公开改善可知性，但不自动带来事实准确。" : "这是一个重要期待，却把规则公开与事实查验混为一谈。") : ""}${state.era.eraSpring ? action("转到战国思想视角", "next:eraWarring", true) : ""}`;
}
function drawEraWarring() {
  scene({ background: null, place: "战国 · 秦国变法与法家思想", moment: "独立制度对照，非本案法条", chapter: "第九幕", objective: "重罚的作用有何条件", speaker: "制度对照", speech: "商鞅变法所处的战国环境重视法令与奖惩。把处罚加重，会不会自动使这件虚构买卖案更公平？", prompt: "战国思想视角 · 不属于秦朝县署的连续剧情" });
  interaction.innerHTML = `${source("warring")}${eraOptions([["可能增强威慑；仍取决于查明事实与官吏执行。", "warring-bounded"], ["处罚越重，故意就越容易认定。", "warring-total"]])}${state.era.eraWarring ? note(state.era.eraWarring === "warring-bounded" ? "威慑与正确认定不是同一件事。" : "处罚强度不能倒过来成为田禾故意的证据。") : ""}${state.era.eraWarring ? action("回看秦朝案件的办案过程", "next:eraQin", true) : ""}`;
}
function drawEraQin() {
  scene({ background: bg.court, place: "秦朝统一后 · 本案回看", moment: "回到虚构案件", chapter: "第九幕", objective: "有法不等于权力受约束", speaker: "制度对照", speech: "秦简留下法律解释与司法文书材料。你在本案中还需要追问哪一件事，才能判断这些制度是否真的帮助了当事人？" });
  interaction.innerHTML = `${source("law")}${source("record")}${eraOptions([["官吏是否按查验结果写依据，并交代仍待查的疑点。", "qin-bounded"], ["只要留下卷宗，就无须再管官吏怎样判断。", "qin-total"]])}${state.era.eraQin ? note(state.era.eraQin === "qin-bounded" ? "办案技术有价值，其运行仍须检验；古代法制不能直接等同现代法治。" : "卷宗可能详细，也可能掩盖疏漏；制度文本与权力受约束不能画等号。") : ""}${state.era.eraQin ? action("查看教学底稿与自己的判断", "next:reveal", true) : ""}`;
}
function drawReveal() {
  scene({ background: bg.home, person: "family", place: "课堂复盘 · 教学底稿此时才揭示", moment: "回看当时可知的范围", chapter: "第九幕", objective: "不要用事后全知倒扣判断", speaker: "教师底稿", speech: "教学设定中，一袋在雨中跌落，田禾和同行者拾回散粟，以为齐了，未再量；初次量粮人也没有认真逐袋复核。没有证据证明田禾故意少给。" });
  interaction.innerHTML = `${note("这是虚构案件的教师底稿，不是秦代史料。裁断时你只能使用当时已取得的信息；合理的‘尚不足以认定’不应因事后真相被扣分。")}${action("完成复盘，查看你的路径", "next:finish", true)}`;
}
function drawFinish() {
  const measuresText = state.selected.map(i => measures[i][0]).join("、");
  scene({ background: bg.policy, place: "课堂结束 · 三个时代已分别标明", moment: "你的判断路径", chapter: "第九幕", objective: "带走核心问题", speaker: "少了一斗的粟", speech: "法律是不是惩罚很重，效果就很好？重罚可能产生威慑；规则可知、事实查验、官吏负责与处理相称，也都不能缺席。" });
  interaction.innerHTML = `<div class="finish-question">你的处理：${{ A: "草率重罚", B: "审慎处理", C: "列明疑点继续查验", D: "只补损失" }[state.ending]}</div>${note(`你给双方的理由：${escapeHtml(state.reason)}`)}${note(`你选择的改进：${escapeHtml(measuresText)}。`)}${action("在案卷中回看所有选择", "journal", true)}${action("重玩，比较另一条路径", "restart")}`;
}
const renderers = { buyer: drawBuyer, buyerReply: drawBuyerReply, inspect: drawInspect, encounter: drawEncounter, encounterReply: drawEncounterReply, tian: drawTian, tianReply: drawTianReply, clerk: drawClerk, clerkReply: drawClerkReply, hearing: drawHearing, inquiry: drawInquiry, explain: drawExplain, outcomeBuyer: () => drawOutcome("buyer", "outcomeTian"), outcomeTian: () => drawOutcome("tian", "outcomeFamily"), outcomeFamily: () => drawOutcome("family", "future"), future: drawFuture, reform: drawReform, eraSpring: drawEraSpring, eraWarring: drawEraWarring, eraQin: drawEraQin, reveal: drawReveal, finish: drawFinish };
function render() {
  if (!Object.prototype.hasOwnProperty.call(renderers, state.step) || !Array.isArray(state.logs) || !Array.isArray(state.selected) || !state.era || typeof state.era !== "object") {
    state = initial();
  }
  state.error = state.error || "";
  renderers[state.step]();
  save();
}

function openOverlay(title, body) {
  $("overlay-title").textContent = title;
  $("overlay-body").innerHTML = body;
  $("overlay").hidden = false;
  $("overlay-close").focus();
}
function closeOverlay() { $("overlay").hidden = true; }
function openCard(id) {
  const card = cards[id];
  openOverlay(card.title, `<div class="card-portion"><h3>可核实史实</h3><p>${card.fact}</p></div><div class="card-portion"><h3>教学解释</h3><p>${card.reading}</p></div><div class="card-portion"><h3>虚构案情边界</h3><p>${card.fiction}</p></div><p class="card-citation">资料：<a href="${card.url}" target="_blank" rel="noopener noreferrer">${card.source}</a></p>`);
}
function openJournal() {
  const facts = ["共同复量：现存短少", state.witness ? "阿叶亲见跌袋与重扎，不知数量" : "阿叶亲见范围未完整取得", state.measurer ? "量粮人未逐袋复核" : "初次量粮是否逐袋复核未查清", state.bag ? "田禾陈述跌袋与未复量" : "田禾途中经过仍不完整"];
  openOverlay("本轮案卷", `<h3>已知与未明</h3><ul>${facts.map(item => `<li>${item}</li>`).join("")}</ul><h3>你的选择</h3><ol>${state.logs.map(item => `<li><b>${escapeHtml(item.label)}</b>：${escapeHtml(item.detail)}</li>`).join("") || "<li>尚无记录</li>"}</ol><p class="card-citation">${["reveal", "finish"].includes(state.step) ? "教师底稿已在复盘时揭示；它不改变你裁断时实际知道的范围。" : "案卷只显示本轮已经取得的信息；教师底稿须到复盘才出现。"}</p>`);
}

interaction.addEventListener("input", event => { if (event.target.id === "reason") { state.reason = event.target.value; save(); } });
interaction.addEventListener("click", event => {
  const card = event.target.closest("[data-card]");
  if (card) { openCard(card.dataset.card); return; }
  const control = event.target.closest("[data-action]");
  if (!control || control.disabled) return;
  const id = control.dataset.action;
  if (id.startsWith("buyer:")) { state.buyer = id.slice(6); log("告发回应", control.textContent); state.step = "buyerReply"; }
  else if (id.startsWith("route:")) { state.route = id.slice(6); log("查验方向", control.textContent); state.step = "encounter"; }
  else if (id.startsWith("encounter:")) { state.encounter = id.slice(10); state.witness = state.route === "road" && state.encounter === "scope"; state.measurer = state.route === "market" && state.encounter === "verify"; log("相关人物问话", control.textContent); state.step = "encounterReply"; }
  else if (id.startsWith("tian:")) { state.tian = id.slice(5); state.bag = state.tian === "open" || (state.tian === "confront" && (state.witness || state.measurer)); log("田禾问话", control.textContent); state.step = "tianReply"; }
  else if (id.startsWith("clerk:")) { state.clerk = id.slice(6); state.record = state.clerk === "full"; log("县吏记录", control.textContent); state.step = "clerkReply"; }
  else if (id.startsWith("verdict:")) {
    const verdict = id.slice(8);
    if (verdict === "C") state.step = "inquiry";
    else { state.ending = verdict; state.step = "explain"; log("处理方向", control.textContent); }
  } else if (id.startsWith("follow:")) {
    const target = id.slice(7);
    state.followup = true;
    if (target === "tian") { state.bag = true; state.followupNote = "田禾补述跌袋、拾回后未复量；仍是待核实陈述"; }
    if (target === "witness") { state.witness = true; state.followupNote = "阿叶见跌袋与重扎，但不知散失数量"; }
    if (target === "measurer") { state.measurer = true; state.followupNote = "量粮人承认初次未逐袋复核"; }
    if (target === "record") { state.record = true; state.followupNote = "县吏补记查验、陈述与待查项目"; }
    log("定向补查", state.followupNote); state.step = "inquiry";
  } else if (id === "verdict:C-final") { state.ending = "C"; log("处理方向", "列明具体疑点，暂缓故意认定"); state.step = "explain"; }
  else if (id.startsWith("basis:")) { state.basis = id.slice(6); state.error = ""; }
  else if (id === "submit") {
    state.reason = $("reason").value.trim();
    if (!state.basis) state.error = "请先选择你援引的依据。";
    else if (state.reason.length < 8) state.error = "请至少用一句完整的话说明处理依据。";
    else { state.error = ""; log("裁断理由", state.reason); state.step = "outcomeBuyer"; }
  } else if (id.startsWith("measure:")) {
    const index = Number(id.slice(8));
    if (state.selected.includes(index)) state.selected = state.selected.filter(i => i !== index);
    else if (state.selected.length < 3) state.selected.push(index);
    else state.error = "请先取消一项，再选择新的措施。";
    if (state.selected.length <= 3 && state.selected.includes(index)) state.error = "";
  } else if (id === "reform:submit") {
    if (state.selected.length !== 3) state.error = "请选择三项措施。";
    else { state.error = ""; log("规则改进", state.selected.map(i => measures[i][0]).join("、")); state.step = "eraSpring"; }
  } else if (id.startsWith("era:")) { state.era[state.step] = id.slice(4); log("制度对照", control.textContent); }
  else if (id === "journal") { openJournal(); return; }
  else if (id === "restart") { if (window.confirm("重新开始这一案？当前进度会清除。")) { state = initial(); save(); } else return; }
  else if (id.startsWith("next:")) state.step = id.slice(5);
  render();
});
$("overlay-close").addEventListener("click", closeOverlay);
$("overlay").addEventListener("click", event => { if (event.target.id === "overlay") closeOverlay(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeOverlay(); });
$("journal").addEventListener("click", openJournal);
$("restart").addEventListener("click", () => { if (window.confirm("重新开始这一案？当前进度会清除。")) { state = initial(); render(); } });
render();
