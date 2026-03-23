"use client";

import { useState, useRef, useEffect } from "react";

// ==========================================
// LANGUAGE SYSTEM
// ==========================================
const LANG = {
  tr: {
    slogan: "Rüyaların sana bir şey anlatıyor.",
    slogan2: "Birlikte keşfedelim mi?",
    start: "Başla",
    or: "VEYA",
    codeLogin: "Kodumla devam et",
    noAccount: "Üye olmana gerek yok. Sana özel bir kod vereceğiz.",
    namePlaceholder: "Adın (isteğe bağlı)",
    codePlaceholder: "ONX-XXXXXX",
    continue: "Devam et",
    back: "← geri",
    home: "← ana sayfa",
    welcome: "Hoş geldin",
    yourCode: "SENİN KODUN",
    saveCode: "Bu kodu kaydet — rüyalarına her yerden ulaşabilirsin.",
    tellDream: "Rüyamı anlat",
    journal: "Rüya günlüğüm",
    trends: "Rüya trendlerim",
    community: "Topluluk",
    recordTitle: "Rüyanı anlat",
    recordSub: "Mekanlar, yüzler, sesler, renkler, duygular — beynin bunları bir sebepten seçti.",
    dreamPlaceholder: "Bu gece rüyamda...",
    analyze: "analiz et",
    analyzing: "Rüya katmanları açılıyor...",
    newDream: "yeni rüya",
    detailHigh: "detay seviyesi yüksek",
    detailOk: "iyi gidiyorsun",
    words: "kelime",
    tabInterp: "Tabirler",
    tabEmotion: "Duygu Atlası",
    tabLucid: "Lucid",
    emotionCore: "Duygusal çekirdek",
    unnamedEmotion: "Adı henüz konmamış duygu",
    reflective: "Reflektif geri bildirim",
    tonight: "Bu gece dene",
    realityCheck: "Gerçeklik testi",
    dreamSign: "Rüya işaretin",
    record: "Kayıt",
    lucidTitle: "Lucid rüya koçu",
    lucidSub: "Rüyanda uyanık olmayı öğren.",
    lucidWhat: "Nedir?",
    lucidDesc: "Rüya gördüğünün farkında olduğun andır. Prefrontal korteksin — normalde REM'de suskunlaşan bölge — tekrar aktif olur.",
    lucidSteps: "4 adım",
    lucidS1: "Her sabah rüyanı kaydet.",
    lucidS2: "Gün içinde \"bu rüya mı?\" diye sor.",
    lucidS3: "Uyumadan \"rüyamda fark edeceğim\" de.",
    lucidS4: "5 saat sonra 20 dk uyan, tekrar uyu.",
    lucidRecord: "rüyamı kaydet",
    journalTitle: "Rüya günlüğü",
    noEntries: "Henüz rüya kaydetmedin.",
    firstDream: "ilk rüyanı kaydet",
    trendsTitle: "Rüya trendleri",
    totalDreams: "Toplam rüya",
    last30: "Son 30 gün",
    avgIntensity: "Ort. yoğunluk",
    last14: "Son 14 gün",
    topSymbols: "En çok görülen semboller",
    emotionDist: "Duygu dağılımı",
    dayPattern: "Hangi gün daha çok rüya görüyorsun?",
    moreData: "Daha fazla rüya kaydettikçe trendler zenginleşecek.",
    communityTitle: "Rüya topluluğu",
    communitySub: "Anonim rüya akışı — herkesin bilinçaltı burada buluşuyor.",
    shareAnon: "Rüyamı anonim paylaş",
    shared: "Paylaşıldı!",
    tonightStat: "Bu gece",
    peopleDreamed: "kişi rüya paylaştı",
    onbS1: "Rüyanı anlat",
    onbD1: "Uyanır uyanmaz kaydet. Beynin 10 dakika sonra %95'ini silecek.",
    onbS2: "6 medeniyet analiz etsin",
    onbD2: "Hz. Yusuf, Jung, Şaman, İnka, Sufi, Freud — her biri farklı pencereden yorumlar.",
    onbS3: "Bilinçaltını keşfet",
    onbD3: "Duygu atlası, adı konmamış duygular, lucid rüya koçu — beynini bu kadar yakından hiç tanımadın.",
    onbContinue: "Devam",
    onbStart: "Keşfetmeye başla",
    onbSkip: "atla",
    onbExample: "ÖRNEK ANALİZ",
    streak: "gün üst üste!",
    weeklySummary: "HAFTALIK ÖZET",
    returnMsg1: "Dün gece ne gördün?",
    returnMsg3: "gündür sessizsin. Bilinçaltın bekliyor.",
    returnMsg7: "Rüyaların hâlâ sana mektup yazıyor.",
    returnMsgLong: "gündür yoktun. Beynin her gece çalışmaya devam etti.",
    firstDreamQ: "İlk rüyanı kaydetmeye hazır mısın?",
    loadMsgs: ["Rüya katmanları açılıyor...","Hz. Yusuf'un bilgeliği aranıyor...","Şaman davulları çalınıyor...","Arketipler uyanıyor...","Duygu dokusu hissediliyor..."],
    dowNames: ["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],
  },
  en: {
    slogan: "Your dreams are telling you something.",
    slogan2: "Shall we explore together?",
    start: "Start",
    or: "OR",
    codeLogin: "Continue with my code",
    noAccount: "No account needed. We'll give you a unique code.",
    namePlaceholder: "Your name (optional)",
    codePlaceholder: "ONX-XXXXXX",
    continue: "Continue",
    back: "← back",
    home: "← home",
    welcome: "Welcome",
    yourCode: "YOUR CODE",
    saveCode: "Save this code — access your dreams from anywhere.",
    tellDream: "Tell my dream",
    journal: "Dream journal",
    trends: "Dream trends",
    community: "Community",
    recordTitle: "Tell your dream",
    recordSub: "Places, faces, sounds, colors, emotions — your brain chose these for a reason.",
    dreamPlaceholder: "Last night I dreamed...",
    analyze: "analyze",
    analyzing: "Opening dream layers...",
    newDream: "new dream",
    detailHigh: "great detail level",
    detailOk: "looking good",
    words: "words",
    tabInterp: "Interpretations",
    tabEmotion: "Emotion Atlas",
    tabLucid: "Lucid",
    emotionCore: "Emotional core",
    unnamedEmotion: "An emotion yet to be named",
    reflective: "Reflective feedback",
    tonight: "Try tonight",
    realityCheck: "Reality check",
    dreamSign: "Your dream sign",
    record: "Record",
    lucidTitle: "Lucid dream coach",
    lucidSub: "Learn to be awake in your dreams.",
    lucidWhat: "What is it?",
    lucidDesc: "It's the moment you realize you're dreaming. Your prefrontal cortex — normally silent during REM — reactivates.",
    lucidSteps: "4 steps",
    lucidS1: "Record your dream every morning.",
    lucidS2: "Ask yourself \"am I dreaming?\" during the day.",
    lucidS3: "Before sleep, repeat \"I will realize I'm dreaming.\"",
    lucidS4: "Wake up after 5 hours for 20 min, then sleep again.",
    lucidRecord: "record my dream",
    journalTitle: "Dream journal",
    noEntries: "No dreams recorded yet.",
    firstDream: "record your first dream",
    trendsTitle: "Dream trends",
    totalDreams: "Total dreams",
    last30: "Last 30 days",
    avgIntensity: "Avg. intensity",
    last14: "Last 14 days",
    topSymbols: "Most seen symbols",
    emotionDist: "Emotion distribution",
    dayPattern: "Which day do you dream more?",
    moreData: "Record more dreams to enrich your trends.",
    communityTitle: "Dream community",
    communitySub: "Anonymous dream feed — everyone's subconscious meets here.",
    shareAnon: "Share my dream anonymously",
    shared: "Shared!",
    tonightStat: "Tonight",
    peopleDreamed: "people shared dreams",
    onbS1: "Tell your dream",
    onbD1: "Record right after waking. Your brain will erase 95% in 10 minutes.",
    onbS2: "6 civilizations analyze it",
    onbD2: "Yusuf, Jung, Shaman, Inca, Sufi, Freud — each interprets from a different window.",
    onbS3: "Discover your subconscious",
    onbD3: "Emotion atlas, unnamed emotions, lucid dream coach — you've never known your brain this closely.",
    onbContinue: "Continue",
    onbStart: "Start exploring",
    onbSkip: "skip",
    onbExample: "EXAMPLE ANALYSIS",
    streak: "days in a row!",
    weeklySummary: "WEEKLY SUMMARY",
    returnMsg1: "What did you see last night?",
    returnMsg3: "days of silence. Your subconscious is waiting.",
    returnMsg7: "Your dreams are still writing you letters.",
    returnMsgLong: "days away. Your brain kept working every night.",
    firstDreamQ: "Ready to record your first dream?",
    loadMsgs: ["Opening dream layers...","Consulting ancient wisdom...","Shaman drums are beating...","Archetypes awakening...","Feeling emotional texture..."],
    dowNames: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
  }
};

// ==========================================
// SEMBOL VERİTABANI (compact)
// ==========================================
const SDB={su:{tr:"Duygusal derinlik",jung:"Kolektif bilinçdışı",islami:"Bereket, rızık",en:"Emotional depth, subconscious flow",cat:"doğa"},deniz:{tr:"Derin duygular",jung:"Bilinçdışının derinliği",islami:"Bilgi okyanusu",en:"Deep emotions, the unknown",cat:"doğa"},yağmur:{tr:"Arınma, boşalma",jung:"Bilinçdışı mesajlar",islami:"Rahmet",en:"Cleansing, emotional release",cat:"doğa"},ateş:{tr:"Tutku, arınma",jung:"Dönüşüm enerjisi",islami:"Fitne veya ilim",en:"Passion, transformation",cat:"doğa"},dağ:{tr:"Engel veya hedef",jung:"Kendini gerçekleştirme",islami:"Sabır, makam",en:"Obstacle or aspiration",cat:"doğa"},orman:{tr:"Bilinmez, keşif",jung:"Bilinçdışının karanlığı",islami:"Hayatın karmaşıklığı",en:"The unknown, exploration",cat:"doğa"},ağaç:{tr:"Büyüme, kökler",jung:"Yaşam ağacı",islami:"İman, sadaka",en:"Growth, roots, family",cat:"doğa"},ay:{tr:"Dişil enerji",jung:"Anima",islami:"Güzellik, nur",en:"Feminine energy, cycles",cat:"doğa"},güneş:{tr:"Bilinç, başarı",jung:"Ego bilinci",islami:"İlim nuru",en:"Consciousness, success",cat:"doğa"},ev:{tr:"İç dünya, benlik",jung:"Psişenin yapısı",islami:"Aile, huzur",en:"Inner self, identity",cat:"mekan"},okul:{tr:"Öğrenme, kaygı",jung:"Bireyselleşme",islami:"İlim, imtihan",en:"Learning, test anxiety",cat:"mekan"},hastane:{tr:"Şifa ihtiyacı",jung:"İyileşme arketipi",islami:"Sabır",en:"Need for healing",cat:"mekan"},cami:{tr:"Maneviyat",jung:"Kutsal mekan",islami:"İbadet, hidayet",en:"Spirituality, sacred space",cat:"mekan"},mağara:{tr:"İçe dönüş",jung:"Bilinçdışına iniş",islami:"İlham",en:"Introspection, refuge",cat:"mekan"},yılan:{tr:"Dönüşüm, tehlike",jung:"Kundalini",islami:"Düşman veya hikmet",en:"Transformation, hidden danger",cat:"hayvan"},ayı:{tr:"Güç, koruma",jung:"İçgüdüsel güç",islami:"Güçlü düşman",en:"Strength, protective instinct",cat:"hayvan"},aslan:{tr:"Güç, cesaret",jung:"Kral arketipi",islami:"Sultan, cesaret",en:"Power, courage, leadership",cat:"hayvan"},kurt:{tr:"İçgüdü, yalnızlık",jung:"Gölge arketipi",islami:"Düşman",en:"Instinct, solitude",cat:"hayvan"},köpek:{tr:"Sadakat",jung:"Koruyucu gölge",islami:"Sadık dost",en:"Loyalty, protection",cat:"hayvan"},kedi:{tr:"Bağımsızlık",jung:"Dişil enerji",islami:"Temizlik",en:"Independence, intuition",cat:"hayvan"},at:{tr:"Güç, özgürlük",jung:"İçgüdüsel enerji",islami:"Zafer",en:"Power, freedom",cat:"hayvan"},kuş:{tr:"Özgürlük, mesaj",jung:"Ruhun uçuşu",islami:"Melek",en:"Freedom, spiritual message",cat:"hayvan"},balık:{tr:"Bereket",jung:"Bilinçdışından gelen",islami:"Rızık",en:"Abundance, subconscious message",cat:"hayvan"},kelebek:{tr:"Dönüşüm",jung:"Metamorfoz",islami:"Yeniden diriliş",en:"Transformation, beauty",cat:"hayvan"},araba:{tr:"Hayat yolculuğu",jung:"Ego yönlendirmesi",islami:"Rızık aracı",en:"Life journey, control",cat:"nesne"},kapı:{tr:"Yeni fırsat",jung:"Eşik arketipi",islami:"Rızık kapısı",en:"New opportunity, threshold",cat:"nesne"},anahtar:{tr:"Çözüm, erişim",jung:"Bilinçdışına erişim",islami:"İlim, hidayet",en:"Solution, access, secret",cat:"nesne"},ayna:{tr:"Öz-farkındalık",jung:"Gölge karşılaşması",islami:"Kalp temizliği",en:"Self-awareness, confrontation",cat:"nesne"},köprü:{tr:"Geçiş, değişim",jung:"Bilinç köprüsü",islami:"Sırat köprüsü",en:"Transition, change",cat:"nesne"},yol:{tr:"Hayat yolculuğu",jung:"Bireyselleşme yolu",islami:"Doğru yol",en:"Life path, choices",cat:"nesne"},bebek:{tr:"Yeni başlangıç",jung:"İlahi çocuk",islami:"Rızık, hayır",en:"New beginning, innocence",cat:"kişi"},anne:{tr:"Koruma, sevgi",jung:"Büyük anne arketipi",islami:"Cennet ayakları altında",en:"Protection, unconditional love",cat:"kişi"},baba:{tr:"Otorite, rehberlik",jung:"Yaşlı bilge",islami:"Sorumluluk",en:"Authority, guidance",cat:"kişi"},çocuk:{tr:"İç çocuk, saflık",jung:"İlahi çocuk",islami:"Neşe",en:"Inner child, purity",cat:"kişi"},uçtum:{tr:"Özgürlük",jung:"Ego'nun aşılması",islami:"Makam yükselmesi",cat:"eylem",display:"uçmak",en:"Freedom, transcendence"},düştüm:{tr:"Kontrol kaybı",jung:"Ego çözülmesi",islami:"İmtihan",cat:"eylem",display:"düşmek",en:"Loss of control, fear"},kaçtım:{tr:"Yüzleşmekten kaçınma",jung:"Gölgeden kaçış",islami:"İmtihandan kaçma",cat:"eylem",display:"kaçmak",en:"Avoidance, flight response"},kovalıyordu:{tr:"Bastırılmış korku",jung:"Gölge takibi",islami:"Nefis mücadelesi",cat:"eylem",display:"kovalamak",en:"Suppressed fear, being pursued"},ağladım:{tr:"Duygusal boşalma",jung:"Katarsis",islami:"Tövbe gözyaşları",cat:"eylem",display:"ağlamak",en:"Emotional release, catharsis"},öldüm:{tr:"Büyük değişim",jung:"Ego ölümü",islami:"Tövbe, yenilenme",cat:"eylem",display:"ölüm",en:"Major transformation, rebirth"},kayboldum:{tr:"Yön kaybı",jung:"Bilinçdışında kaybolma",islami:"Hidayet arayışı",cat:"eylem",display:"kaybolmak",en:"Lost direction, identity search"},
  // English keywords
  water:{tr:"Duygusal derinlik",jung:"Collective unconscious",islami:"Blessing, sustenance",en:"Emotional depth, subconscious",cat:"doğa"},sea:{tr:"Derin duygular",jung:"Depths of unconscious",islami:"Ocean of knowledge",en:"Deep emotions",cat:"doğa"},fire:{tr:"Tutku",jung:"Transformation energy",islami:"Trial or knowledge",en:"Passion, anger, purification",cat:"doğa"},mountain:{tr:"Engel veya hedef",jung:"Self-realization peak",islami:"Patience, authority",en:"Obstacle or goal",cat:"doğa"},forest:{tr:"Bilinmez",jung:"Dark unconscious zone",islami:"Life complexity",en:"Unknown, exploration",cat:"doğa"},house:{tr:"İç dünya",jung:"Structure of psyche",islami:"Family, peace",en:"Inner self, identity",cat:"mekan"},snake:{tr:"Dönüşüm",jung:"Kundalini energy",islami:"Enemy or wisdom",en:"Transformation, hidden threat",cat:"hayvan"},bear:{tr:"Güç, koruma",jung:"Instinctual power",islami:"Strong enemy",en:"Strength, mother figure",cat:"hayvan"},lion:{tr:"Güç, cesaret",jung:"King archetype",islami:"Sultan, courage",en:"Power, leadership",cat:"hayvan"},dog:{tr:"Sadakat",jung:"Protective shadow",islami:"Loyal friend",en:"Loyalty, protection",cat:"hayvan"},cat:{tr:"Bağımsızlık",jung:"Feminine energy",islami:"Cleanliness",en:"Independence, mystery",cat:"hayvan"},bird:{tr:"Özgürlük",jung:"Soul flight",islami:"Angel, news",en:"Freedom, spiritual message",cat:"hayvan"},flying:{tr:"Özgürlük",jung:"Ego transcendence",islami:"Spiritual ascent",en:"Freedom, breaking limits",cat:"eylem"},falling:{tr:"Kontrol kaybı",jung:"Ego dissolution",islami:"Trial",en:"Loss of control, anxiety",cat:"eylem"},running:{tr:"Kaçış",jung:"Shadow flight",islami:"Avoiding trial",en:"Avoidance, escape",cat:"eylem"},door:{tr:"Yeni fırsat",jung:"Threshold archetype",islami:"Door of sustenance",en:"New opportunity",cat:"nesne"},key:{tr:"Çözüm",jung:"Access to unconscious",islami:"Knowledge",en:"Solution, access",cat:"nesne"},baby:{tr:"Yeni başlangıç",jung:"Divine child",islami:"Blessing",en:"New beginning, innocence",cat:"kişi"},mother:{tr:"Koruma, sevgi",jung:"Great mother archetype",islami:"Paradise beneath her feet",en:"Protection, unconditional love",cat:"kişi"},
};

const EMOTIONS={korku:{w:["kork","kaç","düş","kaybol","karanlık","panik","tehlike","kovalıyordu","kabus","kaçtım","fear","scared","dark","panic","nightmare","chasing"],c:"#E24B4A",i:"😰",l:"Korku",en:"Fear"},huzur:{w:["huzur","sakin","rahat","güzel","sıcak","ışık","cennet","peace","calm","warm","light","serene"],c:"#1D9E75",i:"😌",l:"Huzur",en:"Peace"},merak:{w:["merak","keşf","ara","bul","gizli","sır","curious","explore","discover","mystery","secret"],c:"#378ADD",i:"🤔",l:"Merak",en:"Curiosity"},hüzün:{w:["üzül","ağla","kayıp","özle","yalnız","gözyaş","sad","cry","lost","lonely","grief","tears"],c:"#534AB7",i:"😢",l:"Hüzün",en:"Sadness"},mutluluk:{w:["mutlu","sevin","gül","dans","kutla","neşe","happy","joy","laugh","dance","celebrate"],c:"#EF9F27",i:"😊",l:"Mutluluk",en:"Joy"},öfke:{w:["kız","öfke","sinir","kavga","bağır","nefret","angry","rage","fight","scream","hate"],c:"#A32D2D",i:"😤",l:"Öfke",en:"Anger"},şaşkınlık:{w:["şaşır","tuhaf","birden","inanamadım","surprised","strange","suddenly"],c:"#D85A30",i:"😲",l:"Şaşkınlık",en:"Surprise"}};

// ==========================================
// ANALYSIS & HELPERS
// ==========================================
function generateCivs(symbols,dom,lang){const f=symbols[0];const e=lang==="en"?(dom.en||dom.l):dom.l;
  if(lang==="en")return[
    {id:"yusuf",title:"Prophet Yusuf Tradition",icon:"🕌",interpretation:f?`The "${f.name}" symbol holds deep meaning in Prophet Yusuf's dream interpretation tradition. ${f.en||f.islami}. This dream may signal a door of blessing opening. Be patient — the most beautiful interpretations come to those who wait.`:`A message from deep within. Every dream carries wisdom.`},
    {id:"jung",title:"Carl Jung — Archetypes",icon:"🧠",interpretation:f?`From Jung's perspective, "${f.name}" represents ${f.jung}. The dominance of ${e} suggests your unconscious is processing unresolved psychic material. Your brain is restructuring something it suppressed during the day — this is actually a healing process.`:`A message from the collective unconscious. Every dream is part of the individuation journey.`},
    {id:"shaman",title:"Shamanic Journey",icon:"🦅",interpretation:f?`In shamanic tradition, "${f.name}" may have appeared as a spirit guide. ${f.en||f.tr}. Everything shown in this journey is a teaching — even your fears are there to make you stronger.`:`Your soul journeyed tonight. Accept what you saw as guidance.`},
    {id:"inca",title:"Inca Wisdom",icon:"🌄",interpretation:f?`In Inca cosmology, "${f.name}" carries a sign for you in the universal energy flow. The dominance of ${e} indicates your spiritual balance is recalibrating. "The dream shows you the truth you cannot see while awake."`:`Pachamama sent you a message. The Inca wise ones see every dream as a whisper of the universe.`},
    {id:"sufi",title:"Sufi Dream Stations",icon:"🌀",interpretation:f?`In Sufism, "${f.name}" reflects the station on your spiritual journey. ${f.en||f.islami}. As Rumi said: "Those who seek the light hidden in darkness will find it in their hearts at dawn."`:`Your heart held up a mirror tonight. Every dream reflects the soul's longing for union.`},
    {id:"freud",title:"Freud — Unconscious",icon:"🛋️",interpretation:f?`According to Freud, "${f.name}" is a symbolic expression of a suppressed desire or unresolved conflict. ${f.en||f.tr}. The intensity of ${e} points to an active id-superego dialogue. This isn't scary — it's your brain's self-repair mechanism.`:`Your unconscious spoke. Every dream is a symbolic expression of suppressed thoughts.`},
  ];
  return[
    {id:"yusuf",title:"Hz. Yusuf Geleneği",icon:"🕌",interpretation:f?`"${f.name}" sembolü Hz. Yusuf'un tabir geleneğinde derin anlam taşır. ${f.islami}. Bu rüya hayırlı bir kapının aralanmakta olduğuna işaret edebilir. Sabırla bekle.`:`Kalbin derinliklerinden bir mesaj. Her rüya bir hikmet barındırır.`},
    {id:"jung",title:"Carl Jung — Arketipler",icon:"🧠",interpretation:f?`"${f.name}" Jung perspektifinden ${f.jung}. ${e} duygusunun baskınlığı bilinçdışının işlenmemiş psişik malzeme sunduğunu gösterir. Beynin gündüz bastırdığın bir şeyi yeniden yapılandırıyor — iyileşme süreci.`:`Kolektif bilinçdışından mesaj. Her rüya bireyselleşme yolculuğunun parçası.`},
    {id:"shaman",title:"Şamanik Yolculuk",icon:"🦅",interpretation:f?`"${f.name}" şaman geleneğinde ruh rehberi olarak belirmiş olabilir. ${f.tr}. Bu yolculukta gösterilen her şey öğreti.`:`Ruhun yolculuğa çıktı. Gördüklerini rehber kabul et.`},
    {id:"inca",title:"İnka Bilgeliği",icon:"🌄",interpretation:f?`İnka kozmolojisinde "${f.name}" evrensel enerji akışında senin için işaret. ${e} duygusunun baskınlığı ruhsal dengenin kalibre edildiğini gösterir.`:`Pachamama mesaj gönderdi. İnka bilgeleri her rüyayı evrenin fısıltısı görür.`},
    {id:"sufi",title:"Sufi Makamları",icon:"🌀",interpretation:f?`Tasavvufta "${f.name}" seyr-i süluk makamını yansıtıyor. ${f.islami}. Mevlana: "Gecenin karanlığında gizlenen ışığı arayanlar şafakta kalplerinde bulurlar."`:`Kalbin ayna tuttu. Her rüya vuslat arayışının yansıması.`},
    {id:"freud",title:"Freud — Bilinçaltı",icon:"🛋️",interpretation:f?`"${f.name}" Freud'a göre bastırılmış arzunun sembolik ifadesi. ${f.tr}. ${e} yoğunluğu id-süperego diyaloğuna işaret ediyor. Korkutucu değil — beynin kendini onarıyor.`:`Bilinçaltın konuştu. Her rüya bastırılmış düşüncelerin ifadesi.`},
  ];
}

function analyzeDream(text,lang){const lower=text.toLowerCase().replace(/[.,!?;:'"()]/g," ");const words=lower.split(/\s+/).filter(Boolean);const symbols=[];const seen=new Set();Object.entries(SDB).forEach(([k,v])=>{const dn=v.display||k;if(seen.has(dn))return;if(words.some(w=>w===k)||(k.length>3&&lower.includes(k))){seen.add(dn);symbols.push({name:dn,...v});}});const emotions=[];Object.entries(EMOTIONS).forEach(([,v])=>{const s=v.w.filter(w=>lower.includes(w)).length;if(s>0)emotions.push({label:lang==="en"?v.en:v.l,icon:v.i,color:v.c,score:s});});emotions.sort((a,b)=>b.score-a.score);const dom=emotions[0]||{label:lang==="en"?"Curiosity":"Merak",icon:"🤔",color:"#378ADD",l:"Merak",en:"Curiosity"};const intensity=Math.min(100,Math.round((emotions.reduce((s,e)=>s+e.score,0)/4)*100));let title=lang==="en"?"Night Whisper":"Gece Fısıltısı";if(symbols.length>=2)title=symbols.slice(0,2).map(s=>s.name.charAt(0).toUpperCase()+s.name.slice(1)).join(lang==="en"?" & ":" ve ")+(lang==="en"?" Dream":" Rüyası");else if(symbols.length===1)title=(lang==="en"?"The Call of ":"")+ symbols[0].name.charAt(0).toUpperCase()+symbols[0].name.slice(1)+(lang==="en"?"":" Çağrısı");const ue=lang==="en"?["Feeling you belong somewhere while being a stranger there","Knowing something ended but not yet feeling sad","Visiting a familiar place as if for the first time","The faint ache of missing someone before realizing you miss them","Remembering a memory that never happened while awake"]:["Bir yere ait olduğunu hissedip orada yabancı olmak","Bir şeyin bittiğini bilmek ama henüz üzülmemiş olmak","Tanıdık bir yere ilk kez gidiyormuş gibi hissetmek","Birini özlediğini fark etmeden önceki hafif sızı","Uyanıkken yaşanmamış bir anıyı hatırlamak"];const tx=lang==="en"?["Like morning dew's coolness on glass","Like the scent of old book pages turning","Like a distant piano's soft vibration","Like the sigh of watching sunset over the sea"]:["Sabah çiyinin cam üzerindeki serinliği gibi","Eski kitap sayfalarının kokusu gibi","Uzak odadan gelen piyano titreşimi gibi","Gün batımında denize bakmanın iç çekişi gibi"];let fb=symbols.length>0?(lang==="en"?`Your dream is a product of your brain's deep work during the night. The dominance of ${dom.label} shows your subconscious wants your attention. "${symbols[0].name}" is not random — your brain selected it from thousands of images. This is a sign of healing. Focus on how you felt.`:`Rüyan beyninin gece yaptığı derin çalışmanın ürünü. ${dom.label} duygusunun baskınlığı bilinçaltının dikkat etmeni istediği alanı gösteriyor. "${symbols[0].name}" tesadüf değil. Bu iyileşme işareti. Hislere odaklan.`):(lang==="en"?"Your dream seems symbolically quiet, but your brain is in rest mode. The deepest messages hide in the calmest dreams.":"Rüyan sembolik olarak sessiz ama beynin dinlenme modunda. En derin mesajlar en sakin rüyalarda gizlenir.");return{title,civilizations:generateCivs(symbols,dom,lang),symbols,emotions,dominantEmotion:dom,emotion_atlas:{primary_emotion:dom.label,primary_icon:dom.icon,primary_color:dom.color,secondary_emotion:emotions[1]?.label||null,unnamed_emotion:ue[symbols.length%ue.length],emotional_texture:tx[words.length%tx.length],reflective_feedback:fb,intensity},lucid_coach:{tonight_exercise:lang==="en"?"Look at your hands for 30 seconds before bed. Count each finger. Close your eyes and say 'I will look at my hands in my dream.'":"Yatmadan önce ellerine 30 saniye bak, parmakları say. 'Rüyamda ellerime bakacağım' de.",reality_check:lang==="en"?"Ask yourself 'am I dreaming?' 5 times today. Look at your hands — in dreams you can't count your fingers properly.":"Gün içinde 5 kez 'bu rüya mı?' diye sor. Ellerine bak.",dream_sign:symbols.length>0?(lang==="en"?`"${symbols[0].name}" could be your dream sign — next time you see this in a dream, say "this is a dream!"`:`"${symbols[0].name}" rüya işaretin olabilir — rüyanda gördüğünde 'bu bir rüya!' de.`):(lang==="en"?"Find a recurring theme — that's your personal dream sign.":"Tekrar eden tema bul — bu senin rüya işaretin."),progress_note:lang==="en"?"Every dream you record brings you one step closer to lucid dreaming. Your hippocampus is getting stronger.":"Her kayıt lucid rüyaya bir adım. Hipokampüs güçleniyor."}};}

// Storage
function saveL(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function loadL(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}}
function genCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="ONX-";for(let i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return r;}
function getStreak(dreams){if(!dreams.length)return 0;const today=new Date();today.setHours(0,0,0,0);const dates=[...new Set(dreams.map(d=>{const dt=new Date(d.timestamp||d.id);dt.setHours(0,0,0,0);return dt.getTime();}))].sort((a,b)=>b-a);let streak=0,check=today.getTime();for(const dt of dates){if(dt===check||dt===check-86400000){streak++;check=dt;}else break;}return Math.max(streak,dates[0]===today.getTime()?1:0);}
function getReturnMsg(dreams,t){if(!dreams.length)return t.firstDreamQ;const diff=Date.now()-(dreams[0].timestamp||dreams[0].id);const days=Math.floor(diff/86400000);if(days===0)return null;if(days===1)return t.returnMsg1;if(days<=3)return`${days} ${t.returnMsg3}`;if(days<=7)return t.returnMsg7;return`${days} ${t.returnMsgLong}`;}
function getDreamStats(dreams,t){const now=Date.now();const d30=dreams.filter(d=>(d.timestamp||d.id)>now-30*86400000);const dailyCounts=[];for(let i=13;i>=0;i--){const ds=new Date();ds.setHours(0,0,0,0);ds.setDate(ds.getDate()-i);const de=ds.getTime()+86400000;const count=dreams.filter(d=>{const tt=d.timestamp||d.id;return tt>=ds.getTime()&&tt<de;}).length;dailyCounts.push({label:ds.toLocaleDateString("tr-TR",{day:"numeric",month:"short"}),count,isToday:i===0});}const symCount={};d30.forEach(d=>(d.data?.symbols||[]).forEach(s=>{symCount[s.name]=(symCount[s.name]||0)+1;}));const topSymbols=Object.entries(symCount).sort((a,b)=>b[1]-a[1]).slice(0,6);const emoCount={};d30.forEach(d=>{const e=d.data?.emotion_atlas?.primary_emotion;if(e)emoCount[e]=(emoCount[e]||0)+1;});const topEmotions=Object.entries(emoCount).sort((a,b)=>b[1]-a[1]);const emoTotal=topEmotions.reduce((s,e)=>s+e[1],0);const dowCount=[0,0,0,0,0,0,0];d30.forEach(d=>{dowCount[new Date(d.timestamp||d.id).getDay()]++;});const intensities=d30.map(d=>d.data?.emotion_atlas?.intensity||0).filter(Boolean);const avgI=intensities.length?Math.round(intensities.reduce((a,b)=>a+b,0)/intensities.length):0;return{dailyCounts,topSymbols,topEmotions,emoTotal,dowCount,dowNames:t.dowNames,avgIntensity:avgI,total30:d30.length,totalAll:dreams.length};}

// ==========================================
// COMMUNITY (shared storage)
// ==========================================
async function loadCommunity(){try{const r=await window.storage?.get("oneirox-community",true);return r?JSON.parse(r.value):[];}catch(e){return[];}}
async function shareToCommunity(dream,lang){try{const existing=await loadCommunity();const shared={id:Date.now(),title:dream.title,emotion:dream.data?.emotion_atlas?.primary_icon||"🌙",emotionLabel:dream.data?.emotion_atlas?.primary_emotion||"",text:dream.text.substring(0,120)+"...",timestamp:Date.now(),lang};existing.unshift(shared);if(existing.length>100)existing.length=100;await window.storage?.set("oneirox-community",JSON.stringify(existing),true);return true;}catch(e){return false;}}

// ==========================================
// COMPONENTS
// ==========================================
function GC({title,icon,children,delay=0,accent}){return(<div style={{background:"rgba(13,11,30,0.4)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:`1px solid ${accent?accent+"18":"rgba(108,60,224,0.08)"}`,borderRadius:20,padding:"20px 22px",marginBottom:16,animation:`fadeUp 0.6s ease ${delay}s both`}}>{title&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>{icon&&<span style={{fontSize:15}}>{icon}</span>}<span style={{fontSize:10,textTransform:"uppercase",letterSpacing:3,color:accent||"#6B6590",fontWeight:600}}>{title}</span></div>}{children}</div>);}

function CivCard({civ,delay}){const[open,setOpen]=useState(false);return(<div onClick={()=>setOpen(!open)} style={{background:open?"rgba(26,19,64,0.5)":"rgba(13,11,30,0.25)",border:open?"1px solid rgba(108,60,224,0.18)":"1px solid rgba(108,60,224,0.05)",borderRadius:18,padding:open?"18px 20px":"15px 20px",marginBottom:10,cursor:"pointer",transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",animation:`fadeUp 0.5s ease ${delay}s both`}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:22}}>{civ.icon}</span><span style={{fontSize:14,fontWeight:500,color:open?"#E8E5F2":"#8B83AE",transition:"color 0.3s"}}>{civ.title}</span></div><span style={{color:"#4A4570",fontSize:12,transition:"transform 0.4s",transform:open?"rotate(180deg)":""}}>▾</span></div><div style={{maxHeight:open?400:0,overflow:"hidden",transition:"max-height 0.5s cubic-bezier(0.4,0,0.2,1),opacity 0.4s",opacity:open?1:0}}><div style={{marginTop:16,fontFamily:"Crimson Pro,serif",fontSize:16,lineHeight:1.9,color:"#D0CCE0",fontStyle:"italic",borderTop:"1px solid rgba(108,60,224,0.06)",paddingTop:16}}>{civ.interpretation}</div></div></div>);}

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
  const[community,setCommunity]=useState([]);
  const[shared,setShared]=useState(false);
  const[onbStep,setOnbStep]=useState(0);
  const taRef=useRef(null);
  const t=LANG[lang];

  useEffect(()=>{
    setOrbs([{id:0,s:180,x:8,y:12,c:"#6C3CE0",d:20},{id:1,s:280,x:72,y:55,c:"#1DE9B6",d:28},{id:2,s:220,x:18,y:78,c:"#534AB7",d:24},{id:3,s:160,x:82,y:28,c:"#EF9F27",d:32}]);
    const savedLang=loadL("oneirox-lang");if(savedLang)setLang(savedLang);
    const ob=loadL("oneirox-onboarded");const u=loadL("oneirox-user");
    if(u){setUser(u);const d=loadL("oneirox-dreams-"+u.code)||[];setDreams(d);setStreak(getStreak(d));setReturnMsg(getReturnMsg(d,LANG[savedLang||"tr"]));setScreen("home");}
    else if(ob)setScreen("welcome");else setScreen("onboarding");
    loadCommunity().then(c=>setCommunity(c));
  },[]);

  useEffect(()=>{if(screen==="record"&&taRef.current)setTimeout(()=>taRef.current.focus(),100);},[screen]);

  const switchLang=(l)=>{setLang(l);saveL("oneirox-lang",l);};
  const completeOb=()=>{saveL("oneirox-onboarded",true);setScreen("welcome");};
  const guestStart=()=>{const n=nameInput.trim()||"Gezgin";const c=genCode();const u={name:n,code:c};setUser(u);saveL("oneirox-user",u);setScreen("home");};
  const codeLogin=()=>{if(!codeInput.trim())return;const c=codeInput.trim().toUpperCase();const u={name:"Gezgin",code:c};setUser(u);saveL("oneirox-user",u);const d=loadL("oneirox-dreams-"+c)||[];setDreams(d);setStreak(getStreak(d));setScreen("home");};

  const doAnalyze=()=>{
    if(!dreamText.trim()||dreamText.trim().length<10)return;
    setScreen("analyzing");const msgs=t.loadMsgs;let mi=0;setLoadingMsg(msgs[0]);
    const iv=setInterval(()=>{mi=(mi+1)%msgs.length;setLoadingMsg(msgs[mi]);},1500);
    setTimeout(()=>{clearInterval(iv);const r=analyzeDream(dreamText,lang);const dream={id:Date.now(),timestamp:Date.now(),text:dreamText.trim(),title:r.title,date:new Date().toLocaleDateString(lang==="en"?"en-US":"tr-TR",{day:"numeric",month:"long",year:"numeric"}),time:new Date().toLocaleTimeString(lang==="en"?"en-US":"tr-TR",{hour:"2-digit",minute:"2-digit"}),data:r};setAnalysis(dream);const up=[dream,...dreams].slice(0,50);setDreams(up);setStreak(getStreak(up));setReturnMsg(null);setShared(false);if(user)saveL("oneirox-dreams-"+user.code,up);setTab("civilizations");setScreen("result");},2500);
  };

  const handleShare=async()=>{if(analysis&&!shared){const ok=await shareToCommunity(analysis,lang);if(ok){setShared(true);const c=await loadCommunity();setCommunity(c);}}};

  const wc=dreamText.split(/\s+/).filter(Boolean).length;
  const nav=(s)=>{setScreen(s);if(s==="home"){setDreamText("");setAnalysis(null);setShared(false);}};
  const bp={display:"block",width:"100%",padding:"18px 24px",border:"none",borderRadius:18,background:"linear-gradient(135deg,#6C3CE0,#4A2DB0)",color:"#fff",fontFamily:"Outfit,sans-serif",fontSize:15,fontWeight:500,cursor:"pointer",letterSpacing:0.5};
  const d=analysis?.data;
  const emoColors={"Korku":"#E24B4A","Fear":"#E24B4A","Huzur":"#1D9E75","Peace":"#1D9E75","Merak":"#378ADD","Curiosity":"#378ADD","Hüzün":"#534AB7","Sadness":"#534AB7","Mutluluk":"#EF9F27","Joy":"#EF9F27","Öfke":"#A32D2D","Anger":"#A32D2D","Şaşkınlık":"#D85A30","Surprise":"#D85A30"};

  // Language toggle component
  const LangToggle=()=>(<div style={{display:"flex",gap:2,background:"rgba(13,11,30,0.4)",borderRadius:14,padding:2,border:"1px solid rgba(108,60,224,0.06)"}}>
    <button onClick={()=>switchLang("tr")} style={{padding:"4px 10px",borderRadius:12,fontSize:10,fontFamily:"Outfit",cursor:"pointer",border:"none",background:lang==="tr"?"rgba(108,60,224,0.2)":"transparent",color:lang==="tr"?"#E8E5F2":"#4A4570",fontWeight:500,letterSpacing:1}}>TR</button>
    <button onClick={()=>switchLang("en")} style={{padding:"4px 10px",borderRadius:12,fontSize:10,fontFamily:"Outfit",cursor:"pointer",border:"none",background:lang==="en"?"rgba(108,60,224,0.2)":"transparent",color:lang==="en"?"#E8E5F2":"#4A4570",fontWeight:500,letterSpacing:1}}>EN</button>
  </div>);

  return(<>
    <style dangerouslySetInnerHTML={{__html:`@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{box-shadow:0 0 40px rgba(108,60,224,0.15)}50%{box-shadow:0 0 80px rgba(108,60,224,0.35)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes breathe{0%,100%{transform:scale(1);opacity:0.05}50%{transform:scale(1.2);opacity:0.1}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}*{box-sizing:border-box;margin:0;padding:0}body{font-family:Outfit,sans-serif;background:#0A0818}::selection{background:rgba(108,60,224,0.3)}input::placeholder,textarea::placeholder{color:#2D2850}button:active{transform:scale(0.97)!important}`}}/>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>

    <div style={{fontFamily:"Outfit,sans-serif",background:"linear-gradient(180deg,#0A0818 0%,#0D0B1E 50%,#0A0818 100%)",minHeight:"100vh",color:"#E8E5F2",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{orbs.map(o=><div key={o.id} style={{position:"absolute",width:o.s,height:o.s,borderRadius:"50%",background:`radial-gradient(circle,${o.c}10,transparent 70%)`,left:`${o.x}%`,top:`${o.y}%`,animation:`breathe ${o.d}s ease-in-out infinite`,filter:"blur(50px)"}}/>)}</div>

      <div style={{maxWidth:440,margin:"0 auto",padding:"12px 22px",position:"relative",zIndex:1}}>

        {screen==="loading"&&<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:36,height:36,border:"2px solid rgba(108,60,224,0.1)",borderTopColor:"#6C3CE040",borderRadius:"50%",animation:"spin 1s linear infinite"}}/></div>}

        {/* ONBOARDING */}
        {screen==="onboarding"&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 4px"}}>
            <div style={{position:"absolute",top:20,right:22}}><LangToggle/></div>
            <div style={{textAlign:"center",marginBottom:44}} key={`ob${onbStep}${lang}`}>
              <div style={{fontSize:60,marginBottom:24,animation:"fadeUp 0.5s ease"}}>{["🌙","🕌","💜"][onbStep]}</div>
              <h2 style={{fontSize:26,fontWeight:200,marginBottom:14,color:"#E8E5F2",letterSpacing:1,animation:"fadeUp 0.5s ease 0.1s both"}}>{[t.onbS1,t.onbS2,t.onbS3][onbStep]}</h2>
              <p style={{fontSize:14,color:"#8B83AE",lineHeight:1.7,maxWidth:300,margin:"0 auto",animation:"fadeUp 0.5s ease 0.15s both"}}>{[t.onbD1,t.onbD2,t.onbD3][onbStep]}</p>
            </div>
            <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:36}}>{[0,1,2].map(i=><div key={i} onClick={()=>setOnbStep(i)} style={{width:i===onbStep?28:8,height:8,borderRadius:4,background:i===onbStep?["#6C3CE0","#1DE9B6","#EF9F27"][onbStep]:"rgba(108,60,224,0.15)",transition:"all 0.4s",cursor:"pointer"}}/>)}</div>
            {onbStep<2?<button onClick={()=>setOnbStep(onbStep+1)} style={{...bp,maxWidth:320,margin:"0 auto",background:`linear-gradient(135deg,${["#6C3CE0","#1DE9B6","#EF9F27"][onbStep]},${["#6C3CE0","#1DE9B6","#EF9F27"][onbStep]}88)`}}>{t.onbContinue}</button>
            :<button onClick={completeOb} style={{...bp,maxWidth:320,margin:"0 auto"}}>{t.onbStart}</button>}
            <button onClick={completeOb} style={{display:"block",margin:"18px auto 0",background:"none",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:12,cursor:"pointer",letterSpacing:1}}>{t.onbSkip}</button>
          </div>
        )}

        {/* WELCOME */}
        {screen==="welcome"&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",animation:"fadeUp 0.8s ease"}}>
            <div style={{position:"absolute",top:20,right:22}}><LangToggle/></div>
            <div style={{textAlign:"center",marginBottom:36}}>
              <div style={{width:84,height:84,borderRadius:"50%",margin:"0 auto 28px",background:"radial-gradient(circle at 35% 35%,#B89CFF,#6C3CE0,#1A1340)",animation:"pulse 6s ease-in-out infinite,float 4s ease-in-out infinite",position:"relative"}}><div style={{position:"absolute",inset:-8,borderRadius:"50%",border:"1px solid rgba(108,60,224,0.08)",animation:"spin 30s linear infinite"}}/></div>
              <h1 style={{fontSize:32,fontWeight:200,letterSpacing:12,marginBottom:12}}>ONEIROX</h1>
              <p style={{fontFamily:"Crimson Pro,serif",fontSize:16,fontStyle:"italic",color:"#6B6590",lineHeight:1.5}}>{t.slogan}</p>
            </div>
            {welcomeMode==="main"&&<div style={{animation:"fadeUp 0.5s ease"}}>
              <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder={t.namePlaceholder} style={{width:"100%",padding:"16px 20px",background:"rgba(13,11,30,0.5)",border:"1px solid rgba(108,60,224,0.08)",borderRadius:16,color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,outline:"none",marginBottom:12}}/>
              <button onClick={guestStart} style={bp}>{t.start}</button>
              <div style={{display:"flex",alignItems:"center",gap:14,margin:"24px 0"}}><div style={{flex:1,height:1,background:"rgba(108,60,224,0.08)"}}/><span style={{fontSize:9,color:"#3D385A",letterSpacing:3}}>{t.or}</span><div style={{flex:1,height:1,background:"rgba(108,60,224,0.08)"}}/></div>
              <button onClick={()=>setWelcomeMode("code")} style={{display:"block",width:"100%",padding:"15px 20px",background:"transparent",border:"1px solid rgba(108,60,224,0.1)",borderRadius:16,color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer"}}>{t.codeLogin}</button>
              <p style={{textAlign:"center",fontSize:10,color:"#2D2850",marginTop:28,lineHeight:1.6}}>{t.noAccount}</p>
            </div>}
            {welcomeMode==="code"&&<div style={{animation:"fadeUp 0.4s ease"}}>
              <input value={codeInput} onChange={e=>setCodeInput(e.target.value)} placeholder={t.codePlaceholder} style={{width:"100%",padding:"16px 20px",background:"rgba(13,11,30,0.5)",border:"1px solid rgba(108,60,224,0.08)",borderRadius:16,color:"#E8E5F2",fontFamily:"Outfit",fontSize:18,outline:"none",textAlign:"center",letterSpacing:4,marginBottom:14}}/>
              <button onClick={codeLogin} style={{...bp,marginBottom:12}}>{t.continue}</button>
              <button onClick={()=>setWelcomeMode("main")} style={{display:"block",width:"100%",padding:12,background:"transparent",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:12,cursor:"pointer"}}>{t.back}</button>
            </div>}
          </div>
        )}

        {/* HEADER */}
        {!["welcome","onboarding","loading"].includes(screen)&&(
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 0 8px"}}>
            <div onClick={()=>nav("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:15,fontWeight:700,letterSpacing:7,color:"#E8E5F2",opacity:0.8}}>ONEIROX</span>
              {streak>0&&<span style={{fontSize:12,color:"#EF9F27"}}>🔥{streak}</span>}
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <LangToggle/>
              {screen!=="community"&&community.length>0&&<button onClick={()=>setScreen("community")} style={{background:"rgba(216,90,48,0.05)",border:"1px solid rgba(216,90,48,0.08)",color:"#D85A30",padding:"5px 11px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",letterSpacing:1,fontWeight:500}}>🌍</button>}
              {screen!=="lucid"&&<button onClick={()=>setScreen("lucid")} style={{background:"rgba(29,233,182,0.05)",border:"1px solid rgba(29,233,182,0.08)",color:"#1DE9B6",padding:"5px 11px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",letterSpacing:1,fontWeight:500}}>LUCID</button>}
              {dreams.length>=2&&screen!=="trends"&&<button onClick={()=>setScreen("trends")} style={{background:"rgba(239,159,39,0.05)",border:"1px solid rgba(239,159,39,0.08)",color:"#EF9F27",padding:"5px 8px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer"}}>📊</button>}
              {dreams.length>0&&screen!=="journal"&&<button onClick={()=>setScreen("journal")} style={{background:"rgba(108,60,224,0.05)",border:"1px solid rgba(108,60,224,0.08)",color:"#8B83AE",padding:"5px 11px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",fontWeight:500}}>{dreams.length}</button>}
            </div>
          </div>
        )}

        {/* HOME */}
        {screen==="home"&&(
          <div style={{animation:"fadeUp 0.6s ease",textAlign:"center",paddingTop:16}}>
            {user?.name&&user.name!=="Gezgin"&&<p style={{fontSize:13,color:"#4A4570",marginBottom:4}}>{t.welcome}, <span style={{color:"#8B83AE"}}>{user.name}</span></p>}
            {returnMsg&&<div style={{background:"rgba(108,60,224,0.06)",border:"1px solid rgba(108,60,224,0.08)",borderRadius:16,padding:"14px 18px",marginBottom:16}}><p style={{fontFamily:"Crimson Pro,serif",fontSize:15,fontStyle:"italic",color:"#B89CFF",lineHeight:1.6}}>{returnMsg}</p></div>}
            {streak>=2&&<div style={{background:"rgba(239,159,39,0.06)",border:"1px solid rgba(239,159,39,0.08)",borderRadius:14,padding:"10px 16px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{fontSize:16}}>🔥</span><span style={{fontSize:13,color:"#EF9F27",fontWeight:500}}>{streak} {t.streak}</span></div>}
            <div style={{width:80,height:80,borderRadius:"50%",margin:"8px auto 24px",background:"radial-gradient(circle at 35% 35%,#B89CFF,#6C3CE0,#1A1340)",animation:"pulse 6s ease-in-out infinite,float 4s ease-in-out infinite"}}/>
            <p style={{fontFamily:"Crimson Pro,serif",fontSize:19,fontStyle:"italic",color:"#A8A3C0",lineHeight:1.6,marginBottom:4}}>{t.slogan}</p>
            <p style={{fontFamily:"Crimson Pro,serif",fontSize:19,fontStyle:"italic",color:"#D0CCE0",lineHeight:1.6}}>{t.slogan2}</p>
            <button onClick={()=>setScreen("record")} style={{...bp,marginTop:28,marginBottom:14}}>{t.tellDream}</button>
            {dreams.length>0&&<button onClick={()=>setScreen("journal")} style={{display:"block",width:"100%",padding:"15px 22px",background:"transparent",border:"1px solid rgba(108,60,224,0.1)",borderRadius:18,color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",marginBottom:10}}>{t.journal}</button>}
            {dreams.length>=2&&<button onClick={()=>setScreen("trends")} style={{display:"block",width:"100%",padding:"15px 22px",background:"transparent",border:"1px solid rgba(239,159,39,0.08)",borderRadius:18,color:"#EF9F2780",fontFamily:"Outfit",fontSize:13,cursor:"pointer",marginBottom:10}}>📊 {t.trends}</button>}
            {community.length>0&&<button onClick={()=>setScreen("community")} style={{display:"block",width:"100%",padding:"15px 22px",background:"transparent",border:"1px solid rgba(216,90,48,0.08)",borderRadius:18,color:"#D85A3080",fontFamily:"Outfit",fontSize:13,cursor:"pointer",marginBottom:10}}>🌍 {t.community}</button>}
            {user?.code&&<div style={{marginTop:20,padding:"14px 18px",background:"rgba(13,11,30,0.25)",borderRadius:16,border:"1px solid rgba(108,60,224,0.04)"}}><p style={{fontSize:8,color:"#2D2850",letterSpacing:3,marginBottom:4}}>{t.yourCode}</p><p style={{fontSize:17,fontWeight:600,letterSpacing:5,color:"#6C3CE0"}}>{user.code}</p><p style={{fontSize:9,color:"#2D2850",marginTop:4}}>{t.saveCode}</p></div>}
          </div>
        )}

        {/* RECORD */}
        {screen==="record"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"18px 0 10px",letterSpacing:1}}>{t.recordTitle}</h2>
            <p style={{color:"#3D385A",fontSize:12,marginBottom:18,lineHeight:1.7}}>{t.recordSub}</p>
            <textarea ref={taRef} value={dreamText} onChange={e=>setDreamText(e.target.value)} placeholder={t.dreamPlaceholder} style={{width:"100%",minHeight:220,background:"rgba(13,11,30,0.4)",border:"1px solid rgba(108,60,224,0.06)",borderRadius:18,padding:"20px 22px",color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,lineHeight:1.9,resize:"vertical",outline:"none"}}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#2D2850",margin:"10px 4px 18px"}}><span>{wc} {t.words}</span><span style={{color:wc>20?"#1DE9B650":wc>8?"#EF9F2750":""}}>{wc>20?t.detailHigh:wc>8?t.detailOk:""}</span></div>
            <button onClick={doAnalyze} style={{...bp,opacity:dreamText.trim().length<10?0.25:1,pointerEvents:dreamText.trim().length<10?"none":"auto"}}>{t.analyze}</button>
          </div>
        )}

        {/* ANALYZING */}
        {screen==="analyzing"&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"90px 0",animation:"fadeUp 0.4s ease"}}>
            <div style={{position:"relative",width:64,height:64,marginBottom:32}}><div style={{position:"absolute",inset:0,border:"2px solid rgba(108,60,224,0.06)",borderTopColor:"#6C3CE040",borderRadius:"50%",animation:"spin 1.2s linear infinite"}}/><div style={{position:"absolute",inset:14,border:"1.5px solid rgba(29,233,182,0.04)",borderBottomColor:"#1DE9B630",borderRadius:"50%",animation:"spin 2s linear infinite reverse"}}/></div>
            <p style={{color:"#6B6590",fontSize:13,letterSpacing:0.5}}>{loadingMsg}</p>
          </div>
        )}

        {/* RESULT */}
        {screen==="result"&&d&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.home}</button>
            <h2 style={{fontSize:24,fontWeight:200,margin:"14px 0 6px",lineHeight:1.4,letterSpacing:0.5}}>{analysis.title}</h2>
            <p style={{color:"#2D2850",fontSize:10,marginBottom:20,letterSpacing:1.5}}>{analysis.date} · {analysis.time}</p>

            <div style={{display:"flex",gap:4,marginBottom:18}}>
              {[{id:"civilizations",label:t.tabInterp,icon:"🕌"},{id:"emotions",label:t.tabEmotion,icon:"💜"},{id:"lucidResult",label:t.tabLucid,icon:"🧘"}].map(tb=>(
                <button key={tb.id} onClick={()=>setTab(tb.id)} style={{padding:"9px 16px",borderRadius:24,fontSize:11,fontFamily:"Outfit",cursor:"pointer",border:tab===tb.id?"1px solid rgba(108,60,224,0.2)":"1px solid rgba(108,60,224,0.04)",background:tab===tb.id?"rgba(108,60,224,0.1)":"transparent",color:tab===tb.id?"#E8E5F2":"#3D385A",fontWeight:tab===tb.id?500:400,transition:"all 0.3s"}}>{tb.icon} {tb.label}</button>
              ))}
            </div>

            {tab==="civilizations"&&d.civilizations&&d.civilizations.map((c,i)=><CivCard key={c.id} civ={c} delay={i*0.08}/>)}

            {tab==="emotions"&&d.emotion_atlas&&(<div>
              <GC title={t.emotionCore} icon={d.emotion_atlas.primary_icon} delay={0.1} accent={d.emotion_atlas.primary_color}>
                <div style={{fontSize:24,fontWeight:200,color:d.emotion_atlas.primary_color||"#B89CFF",marginBottom:6}}>{d.emotion_atlas.primary_emotion}</div>
                {d.emotion_atlas.secondary_emotion&&<div style={{fontSize:13,color:"#4A4570",marginBottom:14}}>+ {d.emotion_atlas.secondary_emotion}</div>}
                <div style={{height:3,background:"rgba(255,255,255,0.02)",borderRadius:2,marginBottom:12}}><div style={{width:`${d.emotion_atlas.intensity}%`,height:3,borderRadius:2,background:`linear-gradient(90deg,${d.emotion_atlas.primary_color||"#6C3CE0"}50,#1DE9B650)`,transition:"width 2s ease"}}/></div>
                {d.emotion_atlas.emotional_texture&&<p style={{fontSize:12,color:"#4A4570",fontStyle:"italic"}}>{d.emotion_atlas.emotional_texture}</p>}
              </GC>
              {d.emotion_atlas.unnamed_emotion&&<GC title={t.unnamedEmotion} icon="🌊" delay={0.2} accent="#D85A30"><p style={{fontFamily:"Crimson Pro,serif",fontSize:17,lineHeight:1.9,color:"#D0CCE0",fontStyle:"italic"}}>{d.emotion_atlas.unnamed_emotion}</p></GC>}
              {d.emotion_atlas.reflective_feedback&&<GC title={t.reflective} icon="🪞" delay={0.3} accent="#1DE9B6"><p style={{fontFamily:"Crimson Pro,serif",fontSize:15,lineHeight:1.9,color:"#D0CCE0"}}>{d.emotion_atlas.reflective_feedback}</p></GC>}
            </div>)}

            {tab==="lucidResult"&&d.lucid_coach&&(<div>
              <GC title={t.tonight} icon="🌙" delay={0.1} accent="#6C3CE0"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>{d.lucid_coach.tonight_exercise}</p></GC>
              <GC title={t.realityCheck} icon="👁️" delay={0.15} accent="#1DE9B6"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>{d.lucid_coach.reality_check}</p></GC>
              <GC title={t.dreamSign} icon="⚡" delay={0.2} accent="#EF9F27"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>{d.lucid_coach.dream_sign}</p></GC>
              <GC delay={0.25}><p style={{fontSize:13,color:"#1DE9B6",fontWeight:500,textAlign:"center"}}>{d.lucid_coach.progress_note}</p></GC>
            </div>)}

            <div style={{marginTop:8}}><GC title={t.record} delay={0.5}><p style={{fontSize:12,color:"#3D385A",lineHeight:1.8}}>{analysis.text}</p></GC></div>

            {/* Share button */}
            <button onClick={handleShare} disabled={shared} style={{display:"block",width:"100%",padding:"14px 20px",background:shared?"rgba(29,233,182,0.1)":"rgba(216,90,48,0.08)",border:`1px solid ${shared?"rgba(29,233,182,0.15)":"rgba(216,90,48,0.12)"}`,borderRadius:16,color:shared?"#1DE9B6":"#D85A30",fontFamily:"Outfit",fontSize:13,cursor:shared?"default":"pointer",marginBottom:12}}>{shared?"✓ "+t.shared:"🌍 "+t.shareAnon}</button>

            <button onClick={()=>{setScreen("record");setDreamText("");setAnalysis(null);setShared(false);}} style={bp}>{t.newDream}</button>
          </div>
        )}

        {/* COMMUNITY */}
        {screen==="community"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 6px",letterSpacing:1}}>🌍 {t.communityTitle}</h2>
            <p style={{color:"#3D385A",fontSize:12,marginBottom:20}}>{t.communitySub}</p>

            {community.length>0&&(
              <div style={{background:"rgba(216,90,48,0.06)",border:"1px solid rgba(216,90,48,0.08)",borderRadius:14,padding:"12px 16px",marginBottom:20,textAlign:"center"}}>
                <span style={{fontSize:13,color:"#D85A30"}}>{t.tonightStat}: <strong>{community.length}</strong> {t.peopleDreamed}</span>
              </div>
            )}

            {community.length===0?<p style={{textAlign:"center",color:"#3D385A",padding:"40px 0",fontSize:13}}>{lang==="en"?"No shared dreams yet. Be the first!":"Henüz paylaşılan rüya yok. İlk sen ol!"}</p>
            :community.slice(0,20).map((c,i)=>(
              <div key={c.id} style={{background:"rgba(13,11,30,0.3)",border:"1px solid rgba(108,60,224,0.04)",borderRadius:16,padding:"14px 18px",marginBottom:10,animation:`fadeUp 0.4s ease ${i*0.06}s both`}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                  <span style={{fontSize:16}}>{c.emotion}</span>
                  <span style={{fontSize:13,fontWeight:500,color:"#D0CCE0"}}>{c.title}</span>
                </div>
                <p style={{fontSize:12,color:"#4A4570",lineHeight:1.6}}>{c.text}</p>
                <p style={{fontSize:9,color:"#2D2850",marginTop:6}}>{new Date(c.timestamp).toLocaleDateString(lang==="en"?"en-US":"tr-TR",{day:"numeric",month:"short"})}</p>
              </div>
            ))}
          </div>
        )}

        {/* TRENDS */}
        {screen==="trends"&&(()=>{const stats=getDreamStats(dreams,t);const maxD=Math.max(...stats.dailyCounts.map(d=>d.count),1);const maxS=stats.topSymbols.length?stats.topSymbols[0][1]:1;const maxDow=Math.max(...stats.dowCount,1);return(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 20px",letterSpacing:1}}>{t.trendsTitle}</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
              {[{v:stats.totalAll,l:t.totalDreams,c:"#B89CFF"},{v:stats.total30,l:t.last30,c:"#1DE9B6"},{v:`%${stats.avgIntensity}`,l:t.avgIntensity,c:"#EF9F27"}].map((s,i)=><div key={i} style={{textAlign:"center",padding:"16px 8px",background:"rgba(13,11,30,0.4)",borderRadius:16,border:"1px solid rgba(108,60,224,0.06)"}}><div style={{fontSize:24,fontWeight:300,color:s.c,marginBottom:4}}>{s.v}</div><div style={{fontSize:9,color:"#4A4570",letterSpacing:1.5,textTransform:"uppercase"}}>{s.l}</div></div>)}
            </div>
            <GC title={t.last14} icon="📊" accent="#6C3CE0"><div style={{display:"flex",alignItems:"flex-end",gap:4,height:100}}>{stats.dailyCounts.map((dd,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",background:dd.isToday?"#6C3CE0":dd.count>0?"rgba(108,60,224,0.4)":"rgba(108,60,224,0.08)",borderRadius:4,height:`${Math.max(4,(dd.count/maxD)*80)}px`,minHeight:4}}/><span style={{fontSize:7,color:dd.isToday?"#B89CFF":"#3D385A"}}>{dd.label}</span></div>)}</div></GC>
            {stats.topSymbols.length>0&&<GC title={t.topSymbols} icon="🔮" delay={0.1} accent="#B89CFF">{stats.topSymbols.map(([name,count])=><div key={name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}><span style={{fontSize:11,color:"#8B83AE",width:50,textAlign:"right"}}>{name}</span><div style={{flex:1,height:6,background:"rgba(255,255,255,0.03)",borderRadius:3}}><div style={{width:`${(count/maxS)*100}%`,height:6,borderRadius:3,background:"#6C3CE0"}}/></div><span style={{fontSize:11,color:"#6B6590",width:20}}>{count}</span></div>)}</GC>}
            {stats.topEmotions.length>0&&<GC title={t.emotionDist} icon="💜" delay={0.2} accent="#1DE9B6">{stats.topEmotions.map(([name,count])=>{const pct=stats.emoTotal>0?Math.round((count/stats.emoTotal)*100):0;return<div key={name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:12,color:emoColors[name]||"#8B83AE",width:70,fontWeight:500}}>{name}</span><div style={{flex:1,height:8,background:"rgba(255,255,255,0.03)",borderRadius:4}}><div style={{width:`${pct}%`,height:8,borderRadius:4,background:emoColors[name]||"#6C3CE0"}}/></div><span style={{fontSize:11,color:"#6B6590",width:30}}>%{pct}</span></div>;})}</GC>}
            <GC title={t.dayPattern} icon="📅" delay={0.3} accent="#EF9F27"><div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>{stats.dowCount.map((count,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}><div style={{width:"100%",background:count===maxDow&&count>0?"#EF9F27":"rgba(239,159,39,0.25)",borderRadius:4,height:`${Math.max(4,(count/maxDow)*60)}px`,minHeight:4}}/><span style={{fontSize:9,color:count===maxDow&&count>0?"#EF9F27":"#4A4570"}}>{stats.dowNames[i]}</span></div>)}</div></GC>
          </div>);})()}

        {/* LUCID */}
        {screen==="lucid"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 8px",letterSpacing:1}}>{t.lucidTitle}</h2>
            <p style={{color:"#3D385A",fontSize:12,marginBottom:18}}>{t.lucidSub}</p>
            <GC title={t.lucidWhat} icon="💡" accent="#6C3CE0"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>{t.lucidDesc}</p></GC>
            <GC title={t.lucidSteps} icon="📋" delay={0.1} accent="#1DE9B6"><div style={{fontSize:13,color:"#D0CCE0",lineHeight:1.9}}><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>1.</span> {t.lucidS1}</p><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>2.</span> {t.lucidS2}</p><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>3.</span> {t.lucidS3}</p><p><span style={{color:"#1DE9B6"}}>4.</span> {t.lucidS4}</p></div></GC>
            <button onClick={()=>setScreen("record")} style={{...bp,marginTop:6}}>{t.lucidRecord}</button>
          </div>
        )}

        {/* JOURNAL */}
        {screen==="journal"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>{t.back}</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 20px",letterSpacing:1}}>{t.journalTitle}</h2>
            {dreams.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:"#3D385A"}}><p style={{marginBottom:16}}>{t.noEntries}</p><button onClick={()=>setScreen("record")} style={{...bp,display:"inline-block",width:"auto",padding:"14px 36px"}}>{t.firstDream}</button></div>
            :dreams.map((dr,i)=>(
              <div key={dr.id} onClick={()=>{setAnalysis(dr);setTab("civilizations");setScreen("result");setShared(false);}} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",background:"rgba(13,11,30,0.3)",border:"1px solid rgba(108,60,224,0.04)",borderRadius:16,marginBottom:10,cursor:"pointer",animation:`fadeUp 0.4s ease ${i*0.06}s both`}}>
                <div style={{width:42,height:42,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:`${dr.data?.emotion_atlas?.primary_color||"#534AB7"}0A`,flexShrink:0}}>{dr.data?.emotion_atlas?.primary_icon||"🌙"}</div>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:14,fontWeight:400,marginBottom:4,color:"#D0CCE0"}}>{dr.title}</div><div style={{fontSize:10,color:"#2D2850"}}>{dr.date}</div></div>
                <span style={{color:"#1A1830",fontSize:14}}>›</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  </>);
}
