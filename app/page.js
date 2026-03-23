"use client";

import { useState, useRef, useEffect } from "react";

// ==========================================
// LANG
// ==========================================
const T = {
  tr: {
    slogan: "Rüyaların sana bir şey anlatıyor...",
    slogan2: "Birlikte keşfedelim mi...",
    start: "Başla", or: "VEYA", codeLogin: "Kodumla devam et",
    noAccount: "Üye olmana gerek yok. Sana özel bir kod vereceğiz.",
    namePh: "Adın (isteğe bağlı)", codePh: "ONX-XXXXXX", cont: "Devam et",
    back: "← geri", home: "← ana sayfa", welcome: "Hoş geldin",
    yourCode: "SENİN KODUN", saveCode: "Bu kodu kaydet.",
    tell: "Anlat", journal: "Rüya Günlüğüm", trends: "Rüya Trendlerim",
    collective: "Kolektif Bilinçdışı",
    recordTitle: "Rüyanı anlat",
    recordSub: "Hiçbiri rastgele değil. Aklında kalanları yaz.",
    dreamPh: "Bu gece rüyamda...",
    analyze: "analiz et", newDream: "yeni rüya",
    detailHigh: "detay seviyesi yüksek", detailOk: "iyi gidiyorsun",
    words: "kelime",
    tabInterp: "Tabirler", tabEmotion: "Duygu Atlası",
    emotionCore: "Duygusal çekirdek",
    unnamedEmotion: "Tanımlanamayan duygu",
    reflective: "Derinlik analizi",
    sensoryParadox: "Duyusal çelişki",
    record: "Kayıt",
    journalTitle: "Rüya günlüğü",
    noEntries: "Henüz rüya kaydetmedin.",
    firstDream: "ilk rüyanı kaydet",
    trendsTitle: "Rüya trendleri",
    totalDreams: "Toplam", last30: "Son 30 gün", avgIntensity: "Ort. yoğunluk",
    last14: "Son 14 gün", topSymbols: "En çok görülen semboller",
    emotionDist: "Duygu dağılımı", dayPattern: "Hangi gün daha çok rüya?",
    moreData: "Daha fazla rüya kaydettikçe trendler zenginleşecek.",
    loading: "perdeyi aralıyorum...",
    loadMsgs: ["perdeyi aralıyorum...","anlam katmanları çözülüyor...","arketipler uyanıyor...","duygusal doku hissediliyor...","yorum şekilleniyor..."],
    streak: "gün üst üste!", returnMsg1: "Dün gece ne gördün?",
    returnMsg3: "gündür sessizsin. Bilinçaltın bekliyor.",
    returnMsg7: "Rüyaların hâlâ sana mektup yazıyor.",
    returnMsgLong: "gündür yoktun. Beynin her gece çalışmaya devam etti.",
    firstDreamQ: "İlk rüyanı kaydetmeye hazır mısın?",
    dowNames: ["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],
    onbS1: "Rüyanı anlat", onbD1: "Uyanır uyanmaz kaydet. Beynin 10 dakika sonra %95'ini silecek.",
    onbS2: "6 medeniyet analiz etsin", onbD2: "Hz. Yusuf, Jung, Şaman, İnka, Sufi, Freud — her biri farklı pencereden yorumlar.",
    onbS3: "Bilinçaltını keşfet", onbD3: "Duygu atlası, tanımlanamayan duygular, kolektif bilinçdışı haritası.",
    onbCont: "Devam", onbStart: "Keşfetmeye başla", onbSkip: "atla",
    collectiveTitle: "Kolektif bilinçdışı haritası",
    collectiveSub: "Dünyanın rüya nabzı burada atacak.",
    collectiveComingSoon: "Bu özellik yakında aktif olacak. Binlerce kişinin rüya verisi toplandığında, toplumsal stres dalgalarını, kolektif sembolleri ve şehir bazlı rüya haritalarını burada göreceksin.",
    collectiveExample: "Bugün dünyadaki kullanıcıların %15'i rüyasında 'sınava geç kaldığını' gördü. Yalnız değilsin — genel bir stres dalgası var.",
  },
  en: {
    slogan: "Your dreams are telling you something...",
    slogan2: "Shall we explore together...",
    start: "Start", or: "OR", codeLogin: "Continue with my code",
    noAccount: "No account needed. We'll give you a unique code.",
    namePh: "Your name (optional)", codePh: "ONX-XXXXXX", cont: "Continue",
    back: "← back", home: "← home", welcome: "Welcome",
    yourCode: "YOUR CODE", saveCode: "Save this code.",
    tell: "Tell", journal: "Dream Journal", trends: "Dream Trends",
    collective: "Collective Unconscious",
    recordTitle: "Tell your dream",
    recordSub: "Nothing is random. Write what you remember.",
    dreamPh: "Last night I dreamed...",
    analyze: "analyze", newDream: "new dream",
    detailHigh: "great detail", detailOk: "looking good",
    words: "words",
    tabInterp: "Interpretations", tabEmotion: "Emotion Atlas",
    emotionCore: "Emotional core",
    unnamedEmotion: "Unnamed emotion",
    reflective: "Depth analysis",
    sensoryParadox: "Sensory paradox",
    record: "Record",
    journalTitle: "Dream journal",
    noEntries: "No dreams recorded yet.",
    firstDream: "record your first dream",
    trendsTitle: "Dream trends",
    totalDreams: "Total", last30: "Last 30 days", avgIntensity: "Avg. intensity",
    last14: "Last 14 days", topSymbols: "Most seen symbols",
    emotionDist: "Emotion distribution", dayPattern: "Which day do you dream more?",
    moreData: "Record more dreams to enrich your trends.",
    loading: "lifting the veil...",
    loadMsgs: ["lifting the veil...","decoding meaning layers...","archetypes awakening...","feeling emotional texture...","shaping interpretation..."],
    streak: "days in a row!", returnMsg1: "What did you see last night?",
    returnMsg3: "days of silence. Your subconscious is waiting.",
    returnMsg7: "Your dreams are still writing you letters.",
    returnMsgLong: "days away. Your brain kept working every night.",
    firstDreamQ: "Ready to record your first dream?",
    dowNames: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    onbS1: "Tell your dream", onbD1: "Record right after waking. Your brain erases 95% in 10 minutes.",
    onbS2: "6 civilizations analyze it", onbD2: "Yusuf, Jung, Shaman, Inca, Sufi, Freud — each from a different window.",
    onbS3: "Discover your subconscious", onbD3: "Emotion atlas, unnamed emotions, collective unconscious map.",
    onbCont: "Continue", onbStart: "Start exploring", onbSkip: "skip",
    collectiveTitle: "Collective unconscious map",
    collectiveSub: "The world's dream pulse will beat here.",
    collectiveComingSoon: "This feature will be active soon. When thousands of dream data is collected, you'll see collective stress waves, shared symbols, and city-based dream maps here.",
    collectiveExample: "Today, 15% of users worldwide dreamed about 'being late for an exam.' You're not alone — there's a general stress wave.",
  }
};

// ==========================================
// SYMBOLS & EMOTIONS (compact)
// ==========================================
const SDB={su:{tr:"Duygusal derinlik",jung:"Kolektif bilinçdışı",islami:"Bereket",en:"Emotional depth",cat:"doğa"},deniz:{tr:"Derin duygular",jung:"Bilinçdışının derinliği",islami:"Bilgi okyanusu",en:"Deep emotions",cat:"doğa"},yağmur:{tr:"Arınma",jung:"Bilinçdışı mesajlar",islami:"Rahmet",en:"Cleansing",cat:"doğa"},ateş:{tr:"Tutku, arınma",jung:"Dönüşüm enerjisi",islami:"Fitne veya ilim",en:"Passion",cat:"doğa"},dağ:{tr:"Engel veya hedef",jung:"Kendini gerçekleştirme",islami:"Sabır",en:"Obstacle or goal",cat:"doğa"},orman:{tr:"Bilinmez",jung:"Bilinçdışının karanlığı",islami:"Karmaşıklık",en:"The unknown",cat:"doğa"},ağaç:{tr:"Büyüme, kökler",jung:"Yaşam ağacı",islami:"İman",en:"Growth, roots",cat:"doğa"},ay:{tr:"Dişil enerji",jung:"Anima",islami:"Nur",en:"Feminine energy",cat:"doğa"},güneş:{tr:"Bilinç, başarı",jung:"Ego bilinci",islami:"İlim nuru",en:"Consciousness",cat:"doğa"},ev:{tr:"İç dünya",jung:"Psişenin yapısı",islami:"Aile, huzur",en:"Inner self",cat:"mekan"},okul:{tr:"Öğrenme, kaygı",jung:"Bireyselleşme",islami:"İlim",en:"Learning, anxiety",cat:"mekan"},hastane:{tr:"Şifa ihtiyacı",jung:"İyileşme",islami:"Sabır",en:"Need for healing",cat:"mekan"},cami:{tr:"Maneviyat",jung:"Kutsal mekan",islami:"İbadet",en:"Spirituality",cat:"mekan"},mağara:{tr:"İçe dönüş",jung:"Bilinçdışına iniş",islami:"İlham",en:"Introspection",cat:"mekan"},yılan:{tr:"Dönüşüm",jung:"Kundalini",islami:"Hikmet",en:"Transformation",cat:"hayvan"},ayı:{tr:"Güç, koruma",jung:"İçgüdüsel güç",islami:"Düşman",en:"Strength",cat:"hayvan"},aslan:{tr:"Güç, cesaret",jung:"Kral arketipi",islami:"Cesaret",en:"Power, courage",cat:"hayvan"},kurt:{tr:"İçgüdü",jung:"Gölge",islami:"Düşman",en:"Instinct",cat:"hayvan"},köpek:{tr:"Sadakat",jung:"Koruyucu",islami:"Dost",en:"Loyalty",cat:"hayvan"},kedi:{tr:"Bağımsızlık",jung:"Dişil enerji",islami:"Temizlik",en:"Independence",cat:"hayvan"},at:{tr:"Güç, özgürlük",jung:"İçgüdüsel enerji",islami:"Zafer",en:"Power, freedom",cat:"hayvan"},kuş:{tr:"Özgürlük",jung:"Ruhun uçuşu",islami:"Melek",en:"Freedom",cat:"hayvan"},balık:{tr:"Bereket",jung:"Bilinçdışından gelen",islami:"Rızık",en:"Abundance",cat:"hayvan"},kelebek:{tr:"Dönüşüm",jung:"Metamorfoz",islami:"Diriliş",en:"Transformation",cat:"hayvan"},araba:{tr:"Hayat yolculuğu",jung:"Ego yönlendirmesi",islami:"Rızık aracı",en:"Life journey",cat:"nesne"},kapı:{tr:"Yeni fırsat",jung:"Eşik arketipi",islami:"Rızık kapısı",en:"New opportunity",cat:"nesne"},anahtar:{tr:"Çözüm",jung:"Bilinçdışına erişim",islami:"Hidayet",en:"Solution, access",cat:"nesne"},ayna:{tr:"Öz-farkındalık",jung:"Gölge",islami:"Muhasebe",en:"Self-awareness",cat:"nesne"},köprü:{tr:"Geçiş",jung:"Bilinç köprüsü",islami:"Sırat",en:"Transition",cat:"nesne"},yol:{tr:"Hayat yolculuğu",jung:"Bireyselleşme",islami:"Doğru yol",en:"Life path",cat:"nesne"},bebek:{tr:"Yeni başlangıç",jung:"İlahi çocuk",islami:"Hayır",en:"New beginning",cat:"kişi"},anne:{tr:"Koruma, sevgi",jung:"Anne arketipi",islami:"Cennet",en:"Protection, love",cat:"kişi"},baba:{tr:"Otorite",jung:"Bilge",islami:"Sorumluluk",en:"Authority",cat:"kişi"},çocuk:{tr:"Saflık",jung:"İlahi çocuk",islami:"Neşe",en:"Purity",cat:"kişi"},uçtum:{tr:"Özgürlük",jung:"Ego aşılması",islami:"Yükseliş",cat:"eylem",display:"uçmak",en:"Freedom"},düştüm:{tr:"Kontrol kaybı",jung:"Ego çözülmesi",islami:"İmtihan",cat:"eylem",display:"düşmek",en:"Loss of control"},kaçtım:{tr:"Kaçınma",jung:"Gölgeden kaçış",islami:"İmtihandan kaçma",cat:"eylem",display:"kaçmak",en:"Avoidance"},kovalıyordu:{tr:"Bastırılmış korku",jung:"Gölge takibi",islami:"Nefis mücadelesi",cat:"eylem",display:"kovalamak",en:"Being pursued"},ağladım:{tr:"Boşalma",jung:"Katarsis",islami:"Tövbe",cat:"eylem",display:"ağlamak",en:"Release"},öldüm:{tr:"Değişim",jung:"Ego ölümü",islami:"Yenilenme",cat:"eylem",display:"ölüm",en:"Transformation"},kayboldum:{tr:"Yön kaybı",jung:"Bilinçdışında kaybolma",islami:"Arayış",cat:"eylem",display:"kaybolmak",en:"Lost direction"},water:{tr:"Duygusal derinlik",jung:"Collective unconscious",islami:"Blessing",en:"Emotional depth",cat:"doğa"},fire:{tr:"Tutku",jung:"Transformation energy",islami:"Trial",en:"Passion, purification",cat:"doğa"},snake:{tr:"Dönüşüm",jung:"Kundalini",islami:"Wisdom",en:"Transformation",cat:"hayvan"},bear:{tr:"Güç",jung:"Instinctual power",islami:"Strong enemy",en:"Strength",cat:"hayvan"},flying:{tr:"Özgürlük",jung:"Ego transcendence",islami:"Ascent",en:"Freedom",cat:"eylem"},falling:{tr:"Kontrol kaybı",jung:"Ego dissolution",islami:"Trial",en:"Loss of control",cat:"eylem"},door:{tr:"Fırsat",jung:"Threshold",islami:"Blessing door",en:"Opportunity",cat:"nesne"},key:{tr:"Çözüm",jung:"Unconscious access",islami:"Knowledge",en:"Solution",cat:"nesne"},baby:{tr:"Başlangıç",jung:"Divine child",islami:"Blessing",en:"New beginning",cat:"kişi"},mother:{tr:"Sevgi",jung:"Great mother",islami:"Paradise",en:"Love, protection",cat:"kişi"}};

// Plutchik-based emotion detection
const PLUTCHIK={
  korku:{w:["kork","kaç","düş","kaybol","karanlık","panik","tehlike","kovalıyordu","kabus","kaçtım","fear","scared","panic","nightmare","chasing","dark"],c:"#E24B4A",i:"😰",l:"Korku",en:"Fear",plutchik:"terror→fear→apprehension"},
  huzur:{w:["huzur","sakin","rahat","güzel","sıcak","ışık","cennet","dingin","peace","calm","warm","light","serene"],c:"#1D9E75",i:"😌",l:"Huzur",en:"Serenity",plutchik:"ecstasy→joy→serenity"},
  merak:{w:["merak","keşf","ara","bul","gizli","sır","curious","explore","discover","mystery","secret"],c:"#378ADD",i:"🔮",l:"Merak",en:"Curiosity",plutchik:"amazement→surprise→distraction"},
  hüzün:{w:["üzül","ağla","kayıp","özle","yalnız","gözyaş","sad","cry","lost","lonely","grief","tears"],c:"#534AB7",i:"🌧️",l:"Hüzün",en:"Sadness",plutchik:"grief→sadness→pensiveness"},
  mutluluk:{w:["mutlu","sevin","gül","dans","kutla","neşe","happy","joy","laugh","dance","celebrate"],c:"#EF9F27",i:"✨",l:"Mutluluk",en:"Joy",plutchik:"ecstasy→joy→serenity"},
  öfke:{w:["kız","öfke","sinir","kavga","bağır","nefret","angry","rage","fight","scream","hate"],c:"#A32D2D",i:"🔥",l:"Öfke",en:"Anger",plutchik:"rage→anger→annoyance"},
  şaşkınlık:{w:["şaşır","tuhaf","birden","inanamadım","surprised","strange","suddenly"],c:"#D85A30",i:"⚡",l:"Şaşkınlık",en:"Surprise",plutchik:"amazement→surprise→distraction"},
  iğrenme:{w:["iğren","tiksin","pis","çürü","disgusted","rotten","gross"],c:"#6B8E23",i:"🌿",l:"İğrenme",en:"Disgust",plutchik:"loathing→disgust→boredom"},
  güven:{w:["güven","emin","korun","sığın","trust","safe","protect","shelter"],c:"#2E86AB",i:"🛡️",l:"Güven",en:"Trust",plutchik:"admiration→trust→acceptance"},
  beklenti:{w:["bekle","umut","heyecan","yakında","anticipate","hope","expect","soon","excited"],c:"#FF6B6B",i:"🌅",l:"Beklenti",en:"Anticipation",plutchik:"vigilance→anticipation→interest"},
};

// Sensory paradox detection
function detectSensoryParadox(text,lang){
  const lower=text.toLowerCase();
  const paradoxes=[
    {pos:["güneş","sıcak","aydınlık","ışık","sunny","warm","bright"],neg:["sessiz","ürpert","soğuk","karanlık","silent","eerie","cold","dark"],name:lang==="en"?"Eerie Calm — Unsettling stillness beneath warmth":"Tanımlanamayan Gerilim — Sıcaklığın altındaki ürpertici durgunluk",color:"#8B6B9B"},
    {pos:["huzur","sakin","güzel","calm","peaceful","beautiful"],neg:["kaybol","kaç","düş","tehlike","lost","running","falling","danger"],name:lang==="en"?"Paradoxical Safety — Peace wrapped in threat":"Paradoksal Güvenlik — Tehdidin içine sarılmış huzur",color:"#4A7B8C"},
    {pos:["uç","yüksel","özgür","fly","rising","free"],neg:["düş","ağır","batan","fall","heavy","sinking"],name:lang==="en"?"Gravitational Duality — Rising while falling":"Yerçekimi İkilemi — Düşerken yükselmek",color:"#6B4A8C"},
    {pos:["tanıdık","ev","bilinen","familiar","home","known"],neg:["yabancı","farklı","değiş","strange","different","changed"],name:lang==="en"?"Uncanny Familiarity — Known yet alien":"Tekinsiz Tanıdıklık — Bilinen ama yabancı",color:"#8C6B4A"},
  ];
  for(const p of paradoxes){
    const hasPos=p.pos.some(w=>lower.includes(w));
    const hasNeg=p.neg.some(w=>lower.includes(w));
    if(hasPos&&hasNeg)return p;
  }
  return null;
}

// Unnamed emotion with color + metaphor
function generateUnnamedEmotion(symbols,emotions,text,lang){
  const pool=lang==="en"?[
    {color:"#8B7BB5",name:"Liminality",desc:"Standing at a threshold that leads everywhere and nowhere",metaphor:"like holding a door handle without knowing which side you're on"},
    {color:"#5B8C7B",name:"Sehnsucht",desc:"A deep longing for something you've never had",metaphor:"like hearing a melody you've never heard but somehow remember"},
    {color:"#7B6B8C",name:"Anemoia",desc:"Nostalgia for a time you never lived",metaphor:"like missing a home you've never visited"},
    {color:"#8C7B5B",name:"Kenopsia",desc:"The eerie atmosphere of a place usually full of people, now empty",metaphor:"like walking through a school at midnight"},
    {color:"#6B8C7B",name:"Sonder",desc:"The realization that every passerby has a life as vivid as yours",metaphor:"like suddenly seeing through a stranger's eyes in a crowd"},
  ]:[
    {color:"#8B7BB5",name:"Arafta kalmışlık (Liminality)",desc:"Her yere açılan ama hiçbir yere varmayan bir eşikte durmak",metaphor:"kapı kolunu tutup hangi tarafta olduğunu bilmemek gibi"},
    {color:"#5B8C7B",name:"Ulaşılamaz özlem (Sehnsucht)",desc:"Hiç sahip olmadığın bir şeye duyduğun derin özlem",metaphor:"hiç duymadığın ama bir şekilde hatırladığın bir melodiyi duymak gibi"},
    {color:"#7B6B8C",name:"Yaşanmamış nostalji (Anemoia)",desc:"Hiç yaşamadığın bir zamana duyduğun hasret",metaphor:"hiç gitmediğin bir evi özlemek gibi"},
    {color:"#8C7B5B",name:"Boşluk yankısı (Kenopsia)",desc:"Normalde kalabalık olan bir mekanın boşluğundaki ürpertici atmosfer",metaphor:"gece yarısı bir okulda yürümek gibi"},
    {color:"#6B8C7B",name:"Yabancı farkındalığı (Sonder)",desc:"Her yabancının senin kadar canlı bir hayatı olduğunu fark etmek",metaphor:"kalabalıkta bir yabancının gözlerinden bakmak gibi"},
  ];
  const idx=(symbols.length+emotions.length+text.length)%pool.length;
  return pool[idx];
}

function generateCivs(symbols,dom,lang){const f=symbols[0];const e=lang==="en"?(dom.en||dom.l):dom.l;
  const civs=lang==="en"?[
    {id:"yusuf",title:"Prophet Yusuf",icon:"☪️",interpretation:f?`"${f.name}" holds deep meaning in the prophetic dream tradition. ${f.en||f.islami}. This dream may signal a door of blessing opening. Be patient.`:`A message from within. Every dream carries wisdom.`},
    {id:"jung",title:"Carl Jung",icon:"🧿",interpretation:f?`"${f.name}" represents ${f.jung}. The dominance of ${e} suggests unresolved psychic material. Your brain is restructuring — this is healing.`:`A message from the collective unconscious.`},
    {id:"shaman",title:"Shamanic Journey",icon:"🪶",interpretation:f?`"${f.name}" appeared as a spirit guide. ${f.en||f.tr}. Everything in this journey is a teaching.`:`Your soul journeyed tonight.`},
    {id:"inca",title:"Inca Wisdom",icon:"🌀",interpretation:f?`In Inca cosmology, "${f.name}" carries a universal sign. ${e} indicates spiritual recalibration.`:`Pachamama sent you a message.`},
    {id:"sufi",title:"Sufi Stations",icon:"💫",interpretation:f?`"${f.name}" reflects your station on the spiritual path. ${f.en||f.islami}. "Those who seek light in darkness find it in their hearts at dawn."`:`Your heart held up a mirror tonight.`},
    {id:"freud",title:"Freud",icon:"🔬",interpretation:f?`"${f.name}" is a symbolic expression of suppressed desire. ${f.en||f.tr}. The intensity of ${e} points to id-superego dialogue. This is self-repair.`:`Your unconscious spoke tonight.`},
  ]:[
    {id:"yusuf",title:"Hz. Yusuf",icon:"☪️",interpretation:f?`"${f.name}" Hz. Yusuf'un tabir geleneğinde derin anlam taşır. ${f.islami}. Hayırlı bir kapı aralanıyor. Sabırla bekle.`:`Kalbin derinliklerinden mesaj. Her rüya hikmet barındırır.`},
    {id:"jung",title:"Carl Jung",icon:"🧿",interpretation:f?`"${f.name}" Jung perspektifinden ${f.jung}. ${e} duygusunun baskınlığı bilinçdışının işlenmemiş malzeme sunduğunu gösterir. Beynin kendini onarıyor.`:`Kolektif bilinçdışından mesaj.`},
    {id:"shaman",title:"Şamanik Yolculuk",icon:"🪶",interpretation:f?`"${f.name}" şaman geleneğinde ruh rehberi olarak belirmiş olabilir. ${f.tr}. Gösterilen her şey öğreti.`:`Ruhun yolculuğa çıktı.`},
    {id:"inca",title:"İnka Bilgeliği",icon:"🌀",interpretation:f?`"${f.name}" İnka kozmolojisinde evrensel enerji işareti. ${e} duygusunun baskınlığı ruhsal kalibrasyona işaret.`:`Pachamama mesaj gönderdi.`},
    {id:"sufi",title:"Sufi Makamları",icon:"💫",interpretation:f?`"${f.name}" seyr-i süluk makamını yansıtıyor. ${f.islami}. "Gecenin karanlığında ışığı arayanlar şafakta kalplerinde bulurlar."`:`Kalbin ayna tuttu.`},
    {id:"freud",title:"Freud",icon:"🔬",interpretation:f?`"${f.name}" Freud'a göre bastırılmış arzunun ifadesi. ${f.tr}. ${e} yoğunluğu id-süperego diyaloguna işaret. Beynin kendini onarıyor.`:`Bilinçaltın konuştu.`},
  ];
  return civs;
}

function analyzeDream(text,lang){
  const lower=text.toLowerCase().replace(/[.,!?;:'"()]/g," ");const words=lower.split(/\s+/).filter(Boolean);
  const symbols=[];const seen=new Set();
  Object.entries(SDB).forEach(([k,v])=>{const dn=v.display||k;if(seen.has(dn))return;if(words.some(w=>w===k)||(k.length>3&&lower.includes(k))){seen.add(dn);symbols.push({name:dn,...v});}});
  // Plutchik emotions (top 3)
  const emotions=[];
  Object.entries(PLUTCHIK).forEach(([,v])=>{const s=v.w.filter(w=>lower.includes(w)).length;if(s>0)emotions.push({label:lang==="en"?v.en:v.l,icon:v.i,color:v.c,score:s,plutchik:v.plutchik});});
  emotions.sort((a,b)=>b.score-a.score);
  const top3=emotions.slice(0,3);
  const dom=top3[0]||{label:lang==="en"?"Curiosity":"Merak",icon:"🔮",color:"#378ADD",l:"Merak",en:"Curiosity"};
  const intensity=Math.min(100,Math.round((emotions.reduce((s,e)=>s+e.score,0)/4)*100));

  let title=lang==="en"?"Night Whisper":"Gece Fısıltısı";
  if(symbols.length>=2)title=symbols.slice(0,2).map(s=>s.name.charAt(0).toUpperCase()+s.name.slice(1)).join(lang==="en"?" & ":" ve ")+(lang==="en"?" Dream":" Rüyası");
  else if(symbols.length===1)title=(lang==="en"?"The Call of ":"")+symbols[0].name.charAt(0).toUpperCase()+symbols[0].name.slice(1)+(lang==="en"?"":" Çağrısı");

  // Vibe analysis
  const vibeKeywords={kaotik:["kaç","kovalam","patlat","yık","kavga","chaotic","running","explosion"],dingin:["sakin","huzur","güzel","ışık","calm","peaceful","serene"],melankolik:["özle","yalnız","ağla","kayıp","lonely","missing","grief"]};
  let vibe=lang==="en"?"neutral":"nötr";let vibeScore=0;
  Object.entries(vibeKeywords).forEach(([k,ws])=>{const s=ws.filter(w=>lower.includes(w)).length;if(s>vibeScore){vibeScore=s;vibe=k;}});

  const paradox=detectSensoryParadox(text,lang);
  const unnamed=generateUnnamedEmotion(symbols,emotions,text,lang);

  // Symbol-emotion mapping
  const symbolEmotions=symbols.map(s=>{
    const sLower=s.name.toLowerCase();
    if(["su","water","deniz","sea","yağmur"].includes(sLower)){
      const hasNeg=lower.match(/boğ|kork|dalga|drown|fear|wave/);
      return{symbol:s.name,emotion:hasNeg?(lang==="en"?"drowning fear":"boğulma korkusu"):(lang==="en"?"peace":"huzur"),valence:hasNeg?"negative":"positive"};
    }
    if(["ateş","fire","yangın"].includes(sLower)){
      const hasPos=lower.match(/sıcak|ışık|warm|light/);
      return{symbol:s.name,emotion:hasPos?(lang==="en"?"purification":"arınma"):(lang==="en"?"destruction":"yıkım"),valence:hasPos?"positive":"negative"};
    }
    return{symbol:s.name,emotion:dom.label,valence:"neutral"};
  });

  let fb=symbols.length>0?(lang==="en"?`Your dream reveals deep processing. "${symbols[0].name}" was not random — your brain selected it from thousands of images. The ${dom.label} dominance suggests an area demanding attention. Focus on how you felt, not what you saw.`:`Rüyan derin bir işlemenin ürünü. "${symbols[0].name}" tesadüf değil — beynin bunu binlerce imgeden seçti. ${dom.label} baskınlığı dikkat gerektiren bir alana işaret ediyor. Ne gördüğüne değil, ne hissettiğine odaklan.`):(lang==="en"?"Your dream is symbolically quiet but your brain is in rest mode.":"Rüyan sembolik olarak sessiz ama beynin dinlenme modunda.");

  return{title,civilizations:generateCivs(symbols,dom,lang),symbols,emotions:top3,dominantEmotion:dom,
    emotion_atlas:{primary_emotion:dom.label,primary_icon:dom.icon,primary_color:dom.color,
      secondary_emotion:top3[1]?.label||null,third_emotion:top3[2]?.label||null,
      unnamed_emotion:unnamed,sensory_paradox:paradox,
      emotional_texture:lang==="en"?"Like "+unnamed.metaphor:"Dokusu: "+unnamed.metaphor,
      reflective_feedback:fb,intensity,vibe,vibe_score:vibeScore,
      symbol_emotions:symbolEmotions,
      plutchik_wheel:top3.map(e=>e.plutchik).filter(Boolean),
    },
  };
}

// ==========================================
// STORAGE & HELPERS
// ==========================================
function saveL(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function loadL(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}}
function genCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="ONX-";for(let i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return r;}
function getStreak(d){if(!d.length)return 0;const today=new Date();today.setHours(0,0,0,0);const dates=[...new Set(d.map(x=>{const dt=new Date(x.timestamp||x.id);dt.setHours(0,0,0,0);return dt.getTime();}))].sort((a,b)=>b-a);let streak=0,check=today.getTime();for(const dt of dates){if(dt===check||dt===check-86400000){streak++;check=dt;}else break;}return Math.max(streak,dates[0]===today.getTime()?1:0);}
function getReturnMsg(d,t){if(!d.length)return t.firstDreamQ;const diff=Date.now()-(d[0].timestamp||d[0].id);const days=Math.floor(diff/86400000);if(days===0)return null;if(days===1)return t.returnMsg1;if(days<=3)return`${days} ${t.returnMsg3}`;if(days<=7)return t.returnMsg7;return`${days} ${t.returnMsgLong}`;}
function getDreamStats(d,t){const now=Date.now();const d30=d.filter(x=>(x.timestamp||x.id)>now-30*86400000);const dc=[];for(let i=13;i>=0;i--){const ds=new Date();ds.setHours(0,0,0,0);ds.setDate(ds.getDate()-i);const de=ds.getTime()+86400000;dc.push({label:ds.toLocaleDateString("tr-TR",{day:"numeric",month:"short"}),count:d.filter(x=>{const tt=x.timestamp||x.id;return tt>=ds.getTime()&&tt<de;}).length,isToday:i===0});}const sc={};d30.forEach(x=>(x.data?.symbols||[]).forEach(s=>{sc[s.name]=(sc[s.name]||0)+1;}));const ts=Object.entries(sc).sort((a,b)=>b[1]-a[1]).slice(0,6);const ec={};d30.forEach(x=>{const e=x.data?.emotion_atlas?.primary_emotion;if(e)ec[e]=(ec[e]||0)+1;});const te=Object.entries(ec).sort((a,b)=>b[1]-a[1]);const et=te.reduce((s,e)=>s+e[1],0);const dw=[0,0,0,0,0,0,0];d30.forEach(x=>{dw[new Date(x.timestamp||x.id).getDay()]++;});const ins=d30.map(x=>x.data?.emotion_atlas?.intensity||0).filter(Boolean);const ai=ins.length?Math.round(ins.reduce((a,b)=>a+b,0)/ins.length):0;return{dc,ts,te,et,dw,dn:t.dowNames,ai,t30:d30.length,ta:d.length};}

// ==========================================
// COMPONENTS
// ==========================================
function GC({title,icon,children,delay=0,accent}){return(<div style={{background:"rgba(10,8,24,0.5)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",border:`1px solid ${accent?accent+"15":"rgba(108,60,224,0.06)"}`,borderRadius:22,padding:"22px 24px",marginBottom:16,animation:`fadeUp 0.6s ease ${delay}s both`,boxShadow:accent?`0 4px 30px ${accent}08`:"0 4px 30px rgba(0,0,0,0.2)"}}>{title&&<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>{icon&&<span style={{fontSize:16}}>{icon}</span>}<span style={{fontSize:10,textTransform:"uppercase",letterSpacing:3,color:accent||"#5A5480",fontWeight:600}}>{title}</span></div>}{children}</div>);}

function CivCard({civ,delay}){const[open,setOpen]=useState(false);return(<div onClick={()=>setOpen(!open)} style={{background:open?"rgba(26,19,64,0.45)":"rgba(10,8,24,0.3)",border:open?"1px solid rgba(108,60,224,0.15)":"1px solid rgba(108,60,224,0.04)",borderRadius:20,padding:open?"20px 22px":"16px 22px",marginBottom:10,cursor:"pointer",transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",animation:`fadeUp 0.5s ease ${delay}s both`,boxShadow:open?"0 8px 32px rgba(108,60,224,0.08)":"none"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:24,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.3))"}}>{civ.icon}</span><span style={{fontSize:14,fontWeight:open?500:400,color:open?"#E8E5F2":"#8B83AE",transition:"all 0.3s"}}>{civ.title}</span></div><span style={{color:"#3D385A",fontSize:12,transition:"transform 0.4s",transform:open?"rotate(180deg)":""}}>▾</span></div><div style={{maxHeight:open?400:0,overflow:"hidden",transition:"max-height 0.5s cubic-bezier(0.4,0,0.2,1),opacity 0.4s",opacity:open?1:0}}><div style={{marginTop:16,fontFamily:"Crimson Pro,serif",fontSize:16,lineHeight:1.95,color:"#C8C4DA",fontStyle:"italic",borderTop:"1px solid rgba(108,60,224,0.05)",paddingTop:16}}>{civ.interpretation}</div></div></div>);}

// ==========================================
// ONBOARDING
// ==========================================
function Onboarding({onComplete,lang}){const[step,setStep]=useState(0);const t=T[lang];
  return(<div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 4px"}}>
    <div style={{textAlign:"center",marginBottom:44}} key={`ob${step}${lang}`}>
      <div style={{fontSize:60,marginBottom:24,animation:"fadeUp 0.5s ease",filter:"drop-shadow(0 4px 12px rgba(108,60,224,0.3))"}}>{["🌙","☪️","💜"][step]}</div>
      <h2 style={{fontSize:26,fontWeight:200,marginBottom:14,color:"#E8E5F2",letterSpacing:1,animation:"fadeUp 0.5s ease 0.1s both"}}>{[t.onbS1,t.onbS2,t.onbS3][step]}</h2>
      <p style={{fontSize:14,color:"#6B6590",lineHeight:1.7,maxWidth:300,margin:"0 auto",animation:"fadeUp 0.5s ease 0.15s both"}}>{[t.onbD1,t.onbD2,t.onbD3][step]}</p>
    </div>
    <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:36}}>{[0,1,2].map(i=><div key={i} onClick={()=>setStep(i)} style={{width:i===step?28:8,height:8,borderRadius:4,background:i===step?["#6C3CE0","#1DE9B6","#EF9F27"][step]:"rgba(108,60,224,0.1)",transition:"all 0.4s",cursor:"pointer"}}/>)}</div>
    {step<2?<button onClick={()=>setStep(step+1)} style={{display:"block",width:"100%",maxWidth:320,margin:"0 auto",padding:"18px 24px",border:"none",borderRadius:20,background:`linear-gradient(135deg,${["#6C3CE0","#1DE9B6","#EF9F27"][step]},${["#4A2DB0","#15B893","#D4880F"][step]})`,color:"#fff",fontFamily:"Outfit",fontSize:16,fontWeight:500,cursor:"pointer",boxShadow:`0 8px 32px ${["#6C3CE0","#1DE9B6","#EF9F27"][step]}30`}}>{t.onbCont}</button>
    :<button onClick={onComplete} style={{display:"block",width:"100%",maxWidth:320,margin:"0 auto",padding:"18px 24px",border:"none",borderRadius:20,background:"linear-gradient(135deg,#6C3CE0,#4A2DB0)",color:"#fff",fontFamily:"Outfit",fontSize:16,fontWeight:500,cursor:"pointer",boxShadow:"0 8px 32px #6C3CE030"}}>{t.onbStart}</button>}
    <button onClick={onComplete} style={{display:"block",margin:"18px auto 0",background:"none",border:"none",color:"#2D2850",fontFamily:"Outfit",fontSize:12,cursor:"pointer",letterSpacing:1}}>{t.onbSkip}</button>
  </div>);}

// ==========================================
// CRYSTAL BALL SVG
// ==========================================
function CrystalBall(){return(<svg viewBox="0 0 200 200" style={{width:120,height:120,margin:"0 auto",display:"block",filter:"drop-shadow(0 8px 24px rgba(108,60,224,0.25))"}}>
  {/* Hands */}
  <path d="M30,160 Q40,140 55,135 Q65,132 70,140 Q72,145 68,155 Q60,170 45,175 Q35,178 30,170Z" fill="#2A1F3D" stroke="#3D3060" strokeWidth="0.5" opacity="0.9"/>
  <path d="M170,160 Q160,140 145,135 Q135,132 130,140 Q128,145 132,155 Q140,170 155,175 Q165,178 170,170Z" fill="#2A1F3D" stroke="#3D3060" strokeWidth="0.5" opacity="0.9"/>
  {/* Fingers */}
  <path d="M55,135 Q58,125 62,128 Q65,132 60,138" fill="#2A1F3D" stroke="#3D3060" strokeWidth="0.3"/>
  <path d="M145,135 Q142,125 138,128 Q135,132 140,138" fill="#2A1F3D" stroke="#3D3060" strokeWidth="0.3"/>
  {/* Crystal ball */}
  <circle cx="100" cy="100" r="52" fill="url(#ballGrad)" stroke="rgba(184,156,255,0.2)" strokeWidth="1">
    <animate attributeName="r" values="52;54;52" dur="4s" repeatCount="indefinite"/>
  </circle>
  {/* Inner glow */}
  <circle cx="90" cy="85" r="20" fill="rgba(184,156,255,0.15)">
    <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="110" cy="95" r="12" fill="rgba(29,233,182,0.1)">
    <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3.5s" repeatCount="indefinite"/>
  </circle>
  {/* Mist inside */}
  <ellipse cx="100" cy="105" rx="30" ry="15" fill="rgba(255,255,255,0.04)">
    <animate attributeName="rx" values="30;35;30" dur="5s" repeatCount="indefinite"/>
  </ellipse>
  {/* Highlight */}
  <ellipse cx="85" cy="78" rx="12" ry="8" fill="rgba(255,255,255,0.08)" transform="rotate(-30 85 78)"/>
  {/* Base */}
  <ellipse cx="100" cy="155" rx="35" ry="8" fill="#1A1340" stroke="#3D3060" strokeWidth="0.5"/>
  <defs>
    <radialGradient id="ballGrad" cx="45%" cy="40%"><stop offset="0%" stopColor="#B89CFF" stopOpacity="0.15"/><stop offset="50%" stopColor="#6C3CE0" stopOpacity="0.1"/><stop offset="100%" stopColor="#1A1340" stopOpacity="0.3"/></radialGradient>
  </defs>
</svg>);}

// ==========================================
// APP
// ==========================================
export default function App(){
  const[lang,setLang]=useState("tr");
  const[screen,setScreen]=useState("loading");
  const[user,setUser]=useState(null);
  const[dreamText,setDreamText]=useState("");
  const[analysis,setAnalysis]=useState(null);
  const[dreams,setDreams]=useState([]);
  const[loadingMsg,setLoadingMsg]=useState("");
  const[tab,setTab]=useState("civilizations");
  const[orbs,setOrbs]=useState([]);
  const[nameInput,setNameInput]=useState("");
  const[codeInput,setCodeInput]=useState("");
  const[welcomeMode,setWelcomeMode]=useState("main");
  const[streak,setStreak]=useState(0);
  const[returnMsg,setReturnMsg]=useState(null);
  const taRef=useRef(null);
  const t=T[lang];

  useEffect(()=>{
    setOrbs([{id:0,s:180,x:5,y:10,c:"#6C3CE0",d:22},{id:1,s:250,x:75,y:50,c:"#1DE9B6",d:30},{id:2,s:200,x:15,y:80,c:"#534AB7",d:26},{id:3,s:140,x:85,y:25,c:"#EF9F27",d:34}]);
    const sl=loadL("oneirox-lang");if(sl)setLang(sl);
    const ob=loadL("oneirox-onboarded");const u=loadL("oneirox-user");
    if(u){setUser(u);const d=loadL("oneirox-dreams-"+u.code)||[];setDreams(d);setStreak(getStreak(d));setReturnMsg(getReturnMsg(d,T[sl||"tr"]));setScreen("home");}
    else if(ob)setScreen("welcome");else setScreen("onboarding");
  },[]);

  useEffect(()=>{if(screen==="record"&&taRef.current)setTimeout(()=>taRef.current.focus(),100);},[screen]);

  const switchLang=(l)=>{setLang(l);saveL("oneirox-lang",l);};
  const completeOb=()=>{saveL("oneirox-onboarded",true);setScreen("welcome");};
  const guestStart=()=>{const n=nameInput.trim()||"Gezgin";const c=genCode();const u={name:n,code:c};setUser(u);saveL("oneirox-user",u);setScreen("home");};
  const codeLogin=()=>{if(!codeInput.trim())return;const c=codeInput.trim().toUpperCase();const u={name:"Gezgin",code:c};setUser(u);saveL("oneirox-user",u);const d=loadL("oneirox-dreams-"+c)||[];setDreams(d);setStreak(getStreak(d));setScreen("home");};

  const doAnalyze=()=>{
    if(!dreamText.trim()||dreamText.trim().length<10)return;setScreen("analyzing");
    const msgs=t.loadMsgs;let mi=0;setLoadingMsg(msgs[0]);
    const iv=setInterval(()=>{mi=(mi+1)%msgs.length;setLoadingMsg(msgs[mi]);},1500);
    setTimeout(()=>{clearInterval(iv);const r=analyzeDream(dreamText,lang);const dream={id:Date.now(),timestamp:Date.now(),text:dreamText.trim(),title:r.title,date:new Date().toLocaleDateString(lang==="en"?"en-US":"tr-TR",{day:"numeric",month:"long",year:"numeric"}),time:new Date().toLocaleTimeString(lang==="en"?"en-US":"tr-TR",{hour:"2-digit",minute:"2-digit"}),data:r};setAnalysis(dream);const up=[dream,...dreams].slice(0,50);setDreams(up);setStreak(getStreak(up));setReturnMsg(null);if(user)saveL("oneirox-dreams-"+user.code,up);setTab("civilizations");setScreen("result");},2500);
  };

  const wc=dreamText.split(/\s+/).filter(Boolean).length;
  const nav=(s)=>{setScreen(s);if(s==="home"){setDreamText("");setAnalysis(null);}};
  const bp={display:"block",width:"100%",padding:"18px 24px",border:"none",borderRadius:20,background:"linear-gradient(135deg,#6C3CE0,#4A2DB0)",color:"#fff",fontFamily:"Outfit,sans-serif",fontSize:15,fontWeight:500,cursor:"pointer",letterSpacing:0.5,boxShadow:"0 8px 32px rgba(108,60,224,0.2)"};
  const d=analysis?.data;
  const emoC={"Korku":"#E24B4A","Fear":"#E24B4A","Huzur":"#1D9E75","Serenity":"#1D9E75","Merak":"#378ADD","Curiosity":"#378ADD","Hüzün":"#534AB7","Sadness":"#534AB7","Mutluluk":"#EF9F27","Joy":"#EF9F27","Öfke":"#A32D2D","Anger":"#A32D2D","Şaşkınlık":"#D85A30","Surprise":"#D85A30","İğrenme":"#6B8E23","Disgust":"#6B8E23","Güven":"#2E86AB","Trust":"#2E86AB","Beklenti":"#FF6B6B","Anticipation":"#FF6B6B"};

  const LangT=()=>(<div style={{display:"flex",gap:2,background:"rgba(10,8,24,0.5)",borderRadius:14,padding:2,border:"1px solid rgba(108,60,224,0.04)"}}>
    <button onClick={()=>switchLang("tr")} style={{padding:"4px 10px",borderRadius:12,fontSize:9,fontFamily:"Outfit",cursor:"pointer",border:"none",background:lang==="tr"?"rgba(108,60,224,0.15)":"transparent",color:lang==="tr"?"#E8E5F2":"#3D385A",fontWeight:500,letterSpacing:1}}>TR</button>
    <button onClick={()=>switchLang("en")} style={{padding:"4px 10px",borderRadius:12,fontSize:9,fontFamily:"Outfit",cursor:"pointer",border:"none",background:lang==="en"?"rgba(108,60,224,0.15)":"transparent",color:lang==="en"?"#E8E5F2":"#3D385A",fontWeight:500,letterSpacing:1}}>EN</button>
  </div>);

  return(<>
    <style dangerouslySetInnerHTML={{__html:`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{box-shadow:0 0 40px rgba(108,60,224,0.12)}50%{box-shadow:0 0 80px rgba(108,60,224,0.3)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:0.04}50%{transform:scale(1.2);opacity:0.09}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}*{box-sizing:border-box;margin:0;padding:0}body{font-family:Outfit,sans-serif;background:#080616}::selection{background:rgba(108,60,224,0.3)}input::placeholder,textarea::placeholder{color:#252040}button:active{transform:scale(0.97)!important}`}}/>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>

    <div style={{fontFamily:"Outfit,sans-serif",background:"linear-gradient(180deg,#080616 0%,#0D0B1E 50%,#080616 100%)",minHeight:"100vh",color:"#E8E5F2",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>{orbs.map(o=><div key={o.id} style={{position:"absolute",width:o.s,height:o.s,borderRadius:"50%",background:`radial-gradient(circle,${o.c}0A,transparent 70%)`,left:`${o.x}%`,top:`${o.y}%`,animation:`breathe ${o.d}s ease-in-out infinite`,filter:"blur(60px)"}}/>)}</div>

      <div style={{maxWidth:420,margin:"0 auto",padding:"12px 22px",position:"relative",zIndex:1}}>

        {screen==="loading"&&<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:32,height:32,border:"1.5px solid rgba(108,60,224,0.08)",borderTopColor:"#6C3CE030",borderRadius:"50%",animation:"spin 1s linear infinite"}}/></div>}

        {screen==="onboarding"&&<><div style={{position:"absolute",top:20,right:22,zIndex:2}}><LangT/></div><Onboarding onComplete={completeOb} lang={lang}/></>}

        {screen==="welcome"&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",animation:"fadeUp 0.8s ease"}}>
            <div style={{position:"absolute",top:20,right:22,zIndex:2}}><LangT/></div>
            <div style={{textAlign:"center",marginBottom:36}}>
              <CrystalBall/>
              <div style={{marginTop:24}}>
                <h1 style={{fontSize:34,fontWeight:200,letterSpacing:14,marginBottom:4}}>ONEIROX</h1>
                <p style={{fontSize:10,color:"#4A4570",letterSpacing:4,fontWeight:300}}>Mind Whispers</p>
              </div>
              <p style={{fontFamily:"Crimson Pro,serif",fontSize:16,fontStyle:"italic",color:"#5A5480",lineHeight:1.5,marginTop:16}}>{t.slogan}</p>
            </div>
            {welcomeMode==="main"&&<div style={{animation:"fadeUp 0.5s ease"}}>
              <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder={t.namePh} style={{width:"100%",padding:"16px 20px",background:"rgba(10,8,24,0.5)",border:"1px solid rgba(108,60,224,0.06)",borderRadius:18,color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,outline:"none",marginBottom:12}}/>
              <button onClick={guestStart} style={bp}>{t.start}</button>
              <div style={{display:"flex",alignItems:"center",gap:14,margin:"24px 0"}}><div style={{flex:1,height:1,background:"rgba(108,60,224,0.06)"}}/><span style={{fontSize:9,color:"#252040",letterSpacing:3}}>{t.or}</span><div style={{flex:1,height:1,background:"rgba(108,60,224,0.06)"}}/></div>
              <button onClick={()=>setWelcomeMode("code")} style={{display:"block",width:"100%",padding:"15px 20px",background:"transparent",border:"1px solid rgba(108,60,224,0.08)",borderRadius:18,color:"#5A5480",fontFamily:"Outfit",fontSize:13,cursor:"pointer"}}>{t.codeLogin}</button>
              <p style={{textAlign:"center",fontSize:10,color:"#1A1830",marginTop:28,lineHeight:1.6}}>{t.noAccount}</p>
            </div>}
            {welcomeMode==="code"&&<div style={{animation:"fadeUp 0.4s ease"}}>
              <input value={codeInput} onChange={e=>setCodeInput(e.target.value)} placeholder={t.codePh} style={{width:"100%",padding:"16px 20px",background:"rgba(10,8,24,0.5)",border:"1px solid rgba(108,60,224,0.06)",borderRadius:18,color:"#E8E5F2",fontFamily:"Outfit",fontSize:18,outline:"none",textAlign:"center",letterSpacing:4,marginBottom:14}}/>
              <button onClick={codeLogin} style={{...bp,marginBottom:12}}>{t.cont}</button>
              <button onClick={()=>setWelcomeMode("main")} style={{display:"block",width:"100%",padding:12,background:"transparent",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:12,cursor:"pointer"}}>{t.back}</button>
            </div>}
          </div>
        )}

        {/* HEADER */}
        {!["welcome","onboarding","loading"].includes(screen)&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0 8px"}}>
            <div onClick={()=>nav("home")} style={{cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:14,fontWeight:700,letterSpacing:7,color:"#E8E5F2",opacity:0.75}}>ONEIROX</span>
                {streak>0&&<span style={{fontSize:11,color:"#EF9F27"}}>🔥{streak}</span>}
              </div>
              <span style={{fontSize:8,color:"#3D385A",letterSpacing:3,marginLeft:1}}>Mind Whispers</span>
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <LangT/>
              {dreams.length>=2&&screen!=="trends"&&<button onClick={()=>setScreen("trends")} style={{background:"rgba(239,159,39,0.04)",border:"1px solid rgba(239,159,39,0.06)",color:"#EF9F27",padding:"5px 8px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer"}}>📊</button>}
              {dreams.length>0&&screen!=="journal"&&<button onClick={()=>setScreen("journal")} style={{background:"rgba(108,60,224,0.04)",border:"1px solid rgba(108,60,224,0.06)",color:"#6B6590",padding:"5px 10px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",fontWeight:500}}>{dreams.length}</button>}
            </div>
          </div>
        )}

        {/* HOME */}
        {screen==="home"&&(
          <div style={{animation:"fadeUp 0.6s ease",textAlign:"center",paddingTop:12}}>
            {user?.name&&user.name!=="Gezgin"&&<p style={{fontSize:13,color:"#3D385A",marginBottom:4}}>{t.welcome}, <span style={{color:"#6B6590"}}>{user.name}</span></p>}
            {returnMsg&&<div style={{background:"rgba(108,60,224,0.04)",border:"1px solid rgba(108,60,224,0.06)",borderRadius:18,padding:"14px 18px",marginBottom:16}}><p style={{fontFamily:"Crimson Pro,serif",fontSize:15,fontStyle:"italic",color:"#8B83AE",lineHeight:1.6}}>{returnMsg}</p></div>}
            {streak>=2&&<div style={{background:"rgba(239,159,39,0.04)",border:"1px solid rgba(239,159,39,0.06)",borderRadius:16,padding:"10px 16px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{fontSize:14}}>🔥</span><span style={{fontSize:12,color:"#EF9F27",fontWeight:500}}>{streak} {t.streak}</span></div>}

            <CrystalBall/>

            <div style={{marginTop:16,marginBottom:4}}>
              <p style={{fontFamily:"Crimson Pro,serif",fontSize:18,fontStyle:"italic",color:"#8B83AE",lineHeight:1.4}}>{t.slogan}</p>
              <p style={{fontFamily:"Crimson Pro,serif",fontSize:18,fontStyle:"italic",color:"#B89CFF",lineHeight:1.4}}>{t.slogan2}</p>
            </div>

            <button onClick={()=>setScreen("record")} style={{...bp,marginTop:24,marginBottom:14,fontSize:16}}>{t.tell}</button>

            {/* Journal & Trends as vertical cards */}
            <div style={{display:"flex",gap:10,marginBottom:12}}>
              {dreams.length>0&&<button onClick={()=>setScreen("journal")} style={{flex:1,padding:"20px 14px",background:"rgba(108,60,224,0.04)",border:"1px solid rgba(108,60,224,0.06)",borderRadius:18,color:"#6B6590",fontFamily:"Outfit",fontSize:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <span style={{fontSize:22,filter:"drop-shadow(0 2px 4px rgba(108,60,224,0.2))"}}>📖</span>
                <span>{t.journal}</span>
              </button>}
              {dreams.length>=2&&<button onClick={()=>setScreen("trends")} style={{flex:1,padding:"20px 14px",background:"rgba(239,159,39,0.03)",border:"1px solid rgba(239,159,39,0.06)",borderRadius:18,color:"#EF9F2790",fontFamily:"Outfit",fontSize:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <span style={{fontSize:22,filter:"drop-shadow(0 2px 4px rgba(239,159,39,0.2))"}}>📊</span>
                <span>{t.trends}</span>
              </button>}
            </div>

            {/* Collective Unconscious button */}
            <button onClick={()=>setScreen("collective")} style={{display:"block",width:"100%",padding:"16px 20px",background:"linear-gradient(135deg,rgba(83,74,183,0.08),rgba(29,233,182,0.04))",border:"1px solid rgba(83,74,183,0.08)",borderRadius:18,color:"#8B83AE",fontFamily:"Outfit",fontSize:12,cursor:"pointer",marginBottom:12}}>
              <span style={{fontSize:16,marginRight:8}}>🧠</span>{t.collective}
            </button>

            {user?.code&&<div style={{marginTop:16,padding:"14px 18px",background:"rgba(10,8,24,0.3)",borderRadius:18,border:"1px solid rgba(108,60,224,0.03)"}}><p style={{fontSize:8,color:"#1A1830",letterSpacing:3,marginBottom:4}}>{t.yourCode}</p><p style={{fontSize:16,fontWeight:600,letterSpacing:5,color:"#6C3CE060"}}>{user.code}</p></div>}
          </div>
        )}

        {/* RECORD */}
        {screen==="record"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:24,fontWeight:300,margin:"18px 0 10px",letterSpacing:0.5,background:"linear-gradient(135deg,#E8E5F2,#B89CFF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.recordTitle}</h2>
            <p style={{color:"#3D385A",fontSize:12,marginBottom:18,lineHeight:1.7,fontStyle:"italic"}}>{t.recordSub}</p>
            <textarea ref={taRef} value={dreamText} onChange={e=>setDreamText(e.target.value)} placeholder={t.dreamPh} style={{width:"100%",minHeight:220,background:"rgba(10,8,24,0.4)",border:"1px solid rgba(108,60,224,0.05)",borderRadius:20,padding:"22px 24px",color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,lineHeight:1.9,resize:"vertical",outline:"none"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#1A1830",margin:"10px 4px 18px"}}><span>{wc} {t.words}</span><span style={{color:wc>20?"#1DE9B640":wc>8?"#EF9F2740":""}}>{wc>20?t.detailHigh:wc>8?t.detailOk:""}</span></div>
            <button onClick={doAnalyze} style={{...bp,opacity:dreamText.trim().length<10?0.2:1,pointerEvents:dreamText.trim().length<10?"none":"auto"}}>{t.analyze}</button>
          </div>
        )}

        {/* ANALYZING */}
        {screen==="analyzing"&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"90px 0",animation:"fadeUp 0.4s ease"}}>
            <div style={{position:"relative",width:64,height:64,marginBottom:32}}><div style={{position:"absolute",inset:0,border:"1.5px solid rgba(108,60,224,0.05)",borderTopColor:"#6C3CE030",borderRadius:"50%",animation:"spin 1.2s linear infinite"}}/><div style={{position:"absolute",inset:14,border:"1px solid rgba(29,233,182,0.03)",borderBottomColor:"#1DE9B620",borderRadius:"50%",animation:"spin 2s linear infinite reverse"}}/></div>
            <p style={{color:"#5A5480",fontSize:13,letterSpacing:1,fontStyle:"italic"}}>{loadingMsg}</p>
          </div>
        )}

        {/* RESULT */}
        {screen==="result"&&d&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.home}</button>
            <h2 style={{fontSize:24,fontWeight:200,margin:"14px 0 6px",lineHeight:1.4,letterSpacing:0.5}}>{analysis.title}</h2>
            <p style={{color:"#1A1830",fontSize:10,marginBottom:20,letterSpacing:1.5}}>{analysis.date} · {analysis.time}</p>

            <div style={{display:"flex",gap:4,marginBottom:18}}>
              {[{id:"civilizations",label:t.tabInterp,icon:"☪️"},{id:"emotions",label:t.tabEmotion,icon:"💜"}].map(tb=>(
                <button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"10px 20px",borderRadius:24,fontSize:11,fontFamily:"Outfit",cursor:"pointer",border:tab===tb.id?"1px solid rgba(108,60,224,0.15)":"1px solid rgba(108,60,224,0.03)",background:tab===tb.id?"rgba(108,60,224,0.08)":"transparent",color:tab===tb.id?"#E8E5F2":"#3D385A",fontWeight:tab===tb.id?500:400,transition:"all 0.3s"}}>{tb.icon} {tb.label}</button>
              ))}
            </div>

            {tab==="civilizations"&&d.civilizations&&d.civilizations.map((c,i)=><CivCard key={c.id} civ={c} delay={i*0.08}/>)}

            {tab==="emotions"&&d.emotion_atlas&&(<div>
              {/* Plutchik top 3 */}
              <GC title={t.emotionCore} icon={d.emotion_atlas.primary_icon} delay={0.1} accent={d.emotion_atlas.primary_color}>
                <div style={{fontSize:24,fontWeight:200,color:d.emotion_atlas.primary_color,marginBottom:4}}>{d.emotion_atlas.primary_emotion}</div>
                {d.emotion_atlas.secondary_emotion&&<div style={{fontSize:12,color:"#3D385A",marginBottom:2}}>+ {d.emotion_atlas.secondary_emotion}</div>}
                {d.emotion_atlas.third_emotion&&<div style={{fontSize:11,color:"#252040",marginBottom:12}}>+ {d.emotion_atlas.third_emotion}</div>}
                <div style={{height:3,background:"rgba(255,255,255,0.02)",borderRadius:2,marginBottom:12}}><div style={{width:`${d.emotion_atlas.intensity}%`,height:3,borderRadius:2,background:`linear-gradient(90deg,${d.emotion_atlas.primary_color}50,#1DE9B640)`,transition:"width 2s ease"}}/></div>
                {d.emotion_atlas.vibe&&<p style={{fontSize:11,color:"#3D385A"}}>atmosfer: <span style={{color:"#5A5480"}}>{d.emotion_atlas.vibe}</span></p>}
                {d.emotion_atlas.emotional_texture&&<p style={{fontSize:11,color:"#3D385A",fontStyle:"italic",marginTop:4}}>{d.emotion_atlas.emotional_texture}</p>}
              </GC>

              {/* Symbol-emotion mapping */}
              {d.emotion_atlas.symbol_emotions?.length>0&&(
                <GC title={lang==="en"?"Symbol-emotion map":"Sembol-duygu eşleşmesi"} icon="🔗" delay={0.15} accent="#378ADD">
                  {d.emotion_atlas.symbol_emotions.map((se,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<d.emotion_atlas.symbol_emotions.length-1?"1px solid rgba(108,60,224,0.03)":"none"}}>
                      <span style={{fontSize:12,color:"#8B83AE",fontWeight:500,textTransform:"capitalize"}}>{se.symbol}</span>
                      <span style={{fontSize:10,color:"#3D385A"}}>→</span>
                      <span style={{fontSize:12,color:se.valence==="positive"?"#1DE9B6":se.valence==="negative"?"#E24B4A":"#5A5480"}}>{se.emotion}</span>
                    </div>
                  ))}
                </GC>
              )}

              {/* Sensory paradox */}
              {d.emotion_atlas.sensory_paradox&&(
                <GC title={t.sensoryParadox} icon="⚡" delay={0.2} accent={d.emotion_atlas.sensory_paradox.color}>
                  <p style={{fontFamily:"Crimson Pro,serif",fontSize:16,lineHeight:1.9,color:"#C8C4DA",fontStyle:"italic"}}>{d.emotion_atlas.sensory_paradox.name}</p>
                </GC>
              )}

              {/* Unnamed emotion with color + metaphor */}
              {d.emotion_atlas.unnamed_emotion&&(
                <GC title={t.unnamedEmotion} delay={0.25}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                    <div style={{width:24,height:24,borderRadius:"50%",background:d.emotion_atlas.unnamed_emotion.color,boxShadow:`0 4px 12px ${d.emotion_atlas.unnamed_emotion.color}40`}}/>
                    <span style={{fontSize:14,fontWeight:400,color:"#B89CFF"}}>{d.emotion_atlas.unnamed_emotion.name}</span>
                  </div>
                  <p style={{fontFamily:"Crimson Pro,serif",fontSize:15,lineHeight:1.85,color:"#8B83AE",fontStyle:"italic"}}>{d.emotion_atlas.unnamed_emotion.desc}</p>
                  <p style={{fontSize:11,color:"#3D385A",marginTop:8,fontStyle:"italic"}}>
                    <span style={{color:d.emotion_atlas.unnamed_emotion.color}}>{d.emotion_atlas.unnamed_emotion.color}</span> — {d.emotion_atlas.unnamed_emotion.metaphor}
                  </p>
                </GC>
              )}

              {/* Reflective feedback */}
              {d.emotion_atlas.reflective_feedback&&(
                <GC title={t.reflective} icon="🔍" delay={0.3} accent="#1DE9B6">
                  <p style={{fontFamily:"Crimson Pro,serif",fontSize:15,lineHeight:1.9,color:"#C8C4DA"}}>{d.emotion_atlas.reflective_feedback}</p>
                </GC>
              )}
            </div>)}

            <div style={{marginTop:8}}><GC title={t.record} delay={0.5}><p style={{fontSize:12,color:"#252040",lineHeight:1.8}}>{analysis.text}</p></GC></div>
            <button onClick={()=>{setScreen("record");setDreamText("");setAnalysis(null);}} style={bp}>{t.newDream}</button>
          </div>
        )}

        {/* COLLECTIVE UNCONSCIOUS */}
        {screen==="collective"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 8px",letterSpacing:1}}>🧠 {t.collectiveTitle}</h2>
            <p style={{color:"#3D385A",fontSize:12,marginBottom:20}}>{t.collectiveSub}</p>
            <GC accent="#534AB7">
              <p style={{fontSize:13,color:"#8B83AE",lineHeight:1.8,marginBottom:16}}>{t.collectiveComingSoon}</p>
              <div style={{background:"rgba(83,74,183,0.06)",borderRadius:14,padding:"14px 16px",border:"1px solid rgba(83,74,183,0.08)"}}>
                <p style={{fontSize:12,color:"#B89CFF",lineHeight:1.6,fontStyle:"italic"}}>"{t.collectiveExample}"</p>
              </div>
            </GC>
          </div>
        )}

        {/* TRENDS */}
        {screen==="trends"&&(()=>{const s=getDreamStats(dreams,t);const mD=Math.max(...s.dc.map(d=>d.count),1);const mS=s.ts.length?s.ts[0][1]:1;const mW=Math.max(...s.dw,1);return(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 20px",letterSpacing:1}}>{t.trendsTitle}</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
              {[{v:s.ta,l:t.totalDreams,c:"#B89CFF"},{v:s.t30,l:t.last30,c:"#1DE9B6"},{v:`%${s.ai}`,l:t.avgIntensity,c:"#EF9F27"}].map((x,i)=><div key={i} style={{textAlign:"center",padding:"16px 8px",background:"rgba(10,8,24,0.4)",borderRadius:18,border:"1px solid rgba(108,60,224,0.04)"}}><div style={{fontSize:24,fontWeight:200,color:x.c,marginBottom:4}}>{x.v}</div><div style={{fontSize:8,color:"#3D385A",letterSpacing:2,textTransform:"uppercase"}}>{x.l}</div></div>)}
            </div>
            <GC title={t.last14} icon="📊" accent="#6C3CE0"><div style={{display:"flex",alignItems:"flex-end",gap:4,height:100}}>{s.dc.map((dd,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",background:dd.isToday?"#6C3CE0":dd.count>0?"rgba(108,60,224,0.3)":"rgba(108,60,224,0.05)",borderRadius:4,height:`${Math.max(4,(dd.count/mD)*80)}px`,minHeight:4}}/><span style={{fontSize:6,color:dd.isToday?"#B89CFF":"#252040"}}>{dd.label}</span></div>)}</div></GC>
            {s.ts.length>0&&<GC title={t.topSymbols} icon="🔮" delay={0.1} accent="#B89CFF">{s.ts.map(([n,c])=><div key={n} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:11,color:"#6B6590",width:50,textAlign:"right"}}>{n}</span><div style={{flex:1,height:5,background:"rgba(255,255,255,0.02)",borderRadius:3}}><div style={{width:`${(c/mS)*100}%`,height:5,borderRadius:3,background:"#6C3CE0"}}/></div><span style={{fontSize:10,color:"#3D385A",width:20}}>{c}</span></div>)}</GC>}
            {s.te.length>0&&<GC title={t.emotionDist} icon="💜" delay={0.2} accent="#1DE9B6">{s.te.map(([n,c])=>{const p=s.et>0?Math.round((c/s.et)*100):0;return<div key={n} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:11,color:emoC[n]||"#6B6590",width:70,fontWeight:500}}>{n}</span><div style={{flex:1,height:6,background:"rgba(255,255,255,0.02)",borderRadius:4}}><div style={{width:`${p}%`,height:6,borderRadius:4,background:emoC[n]||"#6C3CE0"}}/></div><span style={{fontSize:10,color:"#3D385A",width:30}}>%{p}</span></div>;})}</GC>}
            <GC title={t.dayPattern} icon="📅" delay={0.3} accent="#EF9F27"><div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>{s.dw.map((c,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",background:c===mW&&c>0?"#EF9F27":"rgba(239,159,39,0.2)",borderRadius:4,height:`${Math.max(4,(c/mW)*60)}px`,minHeight:4}}/><span style={{fontSize:8,color:c===mW&&c>0?"#EF9F27":"#3D385A"}}>{s.dn[i]}</span></div>)}</div></GC>
            {dreams.length<3&&<p style={{textAlign:"center",fontSize:11,color:"#252040",padding:"12px 0",fontStyle:"italic"}}>{t.moreData}</p>}
          </div>);})()}

        {/* JOURNAL */}
        {screen==="journal"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 20px",letterSpacing:1}}>{t.journalTitle}</h2>
            {dreams.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:"#252040"}}><p style={{marginBottom:16}}>{t.noEntries}</p><button onClick={()=>setScreen("record")} style={{...bp,display:"inline-block",width:"auto",padding:"14px 36px"}}>{t.firstDream}</button></div>
            :dreams.map((dr,i)=>(
              <div key={dr.id} onClick={()=>{setAnalysis(dr);setTab("civilizations");setScreen("result");}} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",background:"rgba(10,8,24,0.35)",border:"1px solid rgba(108,60,224,0.03)",borderRadius:18,marginBottom:10,cursor:"pointer",animation:`fadeUp 0.4s ease ${i*0.06}s both`}}>
                <div style={{width:42,height:42,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:`${dr.data?.emotion_atlas?.primary_color||"#534AB7"}08`,flexShrink:0}}>{dr.data?.emotion_atlas?.primary_icon||"🌙"}</div>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:400,marginBottom:4,color:"#C8C4DA"}}>{dr.title}</div><div style={{fontSize:10,color:"#1A1830"}}>{dr.date}</div></div>
                <span style={{color:"#151225",fontSize:14}}>›</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  </>);
}
