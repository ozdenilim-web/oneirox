"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ==========================================
// SEMBOL VERİTABANI
// ==========================================
const SDB = {
  su:{tr:"Duygusal derinlik, bilinçaltı akış",jung:"Kolektif bilinçdışı, yaşam enerjisi",islami:"Bereket, rızık, temizlenme",cat:"doğa"},
  deniz:{tr:"Derin duygular, bilinmeze açılma",jung:"Kolektif bilinçdışının derinliği",islami:"Bilgi okyanusu, zenginlik",cat:"doğa"},
  nehir:{tr:"Zamanın akışı, duygusal yolculuk",jung:"Hayat akışı",islami:"Cennet nehirleri, ilim",cat:"doğa"},
  yağmur:{tr:"Arınma, duygusal boşalma",jung:"Bilinçdışından gelen mesajlar",islami:"Rahmet, bereket",cat:"doğa"},
  kar:{tr:"Saflık, durgunluk",jung:"Duygusal donma, arınma",islami:"Günahların örtülmesi",cat:"doğa"},
  ateş:{tr:"Tutku, öfke veya arınma",jung:"Dönüşüm enerjisi",islami:"Fitne veya ilim nuru",cat:"doğa"},
  dağ:{tr:"Engel veya hedef, yücelik",jung:"Kendini gerçekleştirme zirvesi",islami:"Sabır, makam",cat:"doğa"},
  orman:{tr:"Bilinmez, kaybolma, keşif",jung:"Bilinçdışının karanlık bölgesi",islami:"Dünya hayatının karmaşıklığı",cat:"doğa"},
  ağaç:{tr:"Büyüme, kökler, aile",jung:"Yaşam ağacı",islami:"İman, sadaka",cat:"doğa"},
  çiçek:{tr:"Güzellik, gelişim",jung:"Mandala, bütünlük",islami:"Cennet, güzel amel",cat:"doğa"},
  ay:{tr:"Dişil enerji, döngüsellik",jung:"Anima, bilinçdışı aydınlanma",islami:"Güzellik, nur",cat:"doğa"},
  güneş:{tr:"Bilinç, enerji, başarı",jung:"Ego bilinci",islami:"İlim nuru, adalet",cat:"doğa"},
  fırtına:{tr:"İç çatışma, kaos",jung:"Psişik kriz",islami:"İlahi uyarı",cat:"doğa"},
  ev:{tr:"İç dünya, benlik, aile",jung:"Psişenin yapısı",islami:"Aile, huzur, sığınak",cat:"mekan"},
  okul:{tr:"Öğrenme, sınav kaygısı",jung:"Bireyselleşme süreci",islami:"İlim, imtihan",cat:"mekan"},
  hastane:{tr:"Şifa ihtiyacı, kırılganlık",jung:"İyileşme arketipi",islami:"Sabır, şükür",cat:"mekan"},
  cami:{tr:"Maneviyat, huzur",jung:"Kutsal mekan arketipi",islami:"İbadet, hidayet",cat:"mekan"},
  mezarlık:{tr:"Geçmiş, vedalaşma",jung:"Ölüm-yeniden doğuş",islami:"Ahiret hatırlatması",cat:"mekan"},
  mağara:{tr:"İçe dönüş, sığınak",jung:"Bilinçdışına iniş",islami:"Hira mağarası, ilham",cat:"mekan"},
  bahçe:{tr:"Huzur, bereket",jung:"İç cennet",islami:"Cennet bahçesi",cat:"mekan"},
  çatı:{tr:"Koruma, sığınak, zirve",jung:"Bilincin üst katmanı",islami:"İman koruması",cat:"mekan"},
  yılan:{tr:"Dönüşüm, gizli tehlike veya şifa",jung:"Kundalini enerjisi",islami:"Düşman veya hikmet",cat:"hayvan"},
  ayı:{tr:"Güç, koruma içgüdüsü",jung:"İçgüdüsel güç",islami:"Güçlü düşman",cat:"hayvan"},
  aslan:{tr:"Güç, cesaret, liderlik",jung:"Kral arketipi",islami:"Sultan, cesaret",cat:"hayvan"},
  kurt:{tr:"İçgüdü, tehlike, yalnızlık",jung:"Gölge arketipi",islami:"Düşman, hileci",cat:"hayvan"},
  köpek:{tr:"Sadakat, koruma",jung:"Koruyucu gölge",islami:"Sadık dost",cat:"hayvan"},
  kedi:{tr:"Bağımsızlık, sezgi",jung:"Dişil enerji",islami:"Temizlik, bereket",cat:"hayvan"},
  at:{tr:"Güç, özgürlük",jung:"İçgüdüsel enerji",islami:"Zafer, yolculuk",cat:"hayvan"},
  kuş:{tr:"Özgürlük, ruhani mesaj",jung:"Ruhun uçuşu",islami:"Melek, haber",cat:"hayvan"},
  balık:{tr:"Bereket, bilinçaltı",jung:"Bilinçdışından yüzeye çıkan",islami:"Rızık, helal kazanç",cat:"hayvan"},
  örümcek:{tr:"Sabır, tuzak",jung:"Kader ağı",islami:"Tevekkül, korunma",cat:"hayvan"},
  kelebek:{tr:"Dönüşüm, güzellik",jung:"Ruhun metamorfozu",islami:"Yeniden diriliş",cat:"hayvan"},
  kartal:{tr:"Yüksek bakış, güç",jung:"Ruhsal yükseliş",islami:"Yüksek makam",cat:"hayvan"},
  araba:{tr:"Hayat yolculuğu, kontrol",jung:"Ego'nun yönlendirmesi",islami:"Rızık aracı",cat:"nesne"},
  kapı:{tr:"Yeni fırsat, geçiş",jung:"Eşik arketipi",islami:"Rızık kapısı",cat:"nesne"},
  anahtar:{tr:"Çözüm, sır, erişim",jung:"Bilinçdışına erişim",islami:"İlim, hidayet",cat:"nesne"},
  ayna:{tr:"Öz-farkındalık",jung:"Gölge ile karşılaşma",islami:"Kalp temizliği",cat:"nesne"},
  köprü:{tr:"Geçiş, değişim",jung:"Bilinç-bilinçdışı köprüsü",islami:"Sırat köprüsü",cat:"nesne"},
  yol:{tr:"Hayat yolculuğu",jung:"Bireyselleşme yolu",islami:"Doğru yol",cat:"nesne"},
  merdiven:{tr:"Yükselme, ilerleme",jung:"Bilinç seviyelerini aşma",islami:"Makam yükselmesi",cat:"nesne"},
  para:{tr:"Değer, güç",jung:"Ego'nun güç aracı",islami:"Rızık, imtihan",cat:"nesne"},
  kitap:{tr:"Bilgi, sırlar",jung:"Bilinçdışının kayıtları",islami:"Kur'an, amel defteri",cat:"nesne"},
  kan:{tr:"Yaşam gücü, kayıp",jung:"Hayat enerjisi",islami:"Akrabalık, şehadet",cat:"nesne"},
  bebek:{tr:"Yeni başlangıç",jung:"İlahi çocuk arketipi",islami:"Rızık, hayır",cat:"kişi"},
  anne:{tr:"Koruma, sevgi",jung:"Büyük anne arketipi",islami:"Cennet ayakları altında",cat:"kişi"},
  baba:{tr:"Otorite, rehberlik",jung:"Yaşlı bilge",islami:"Sorumluluk, rızık",cat:"kişi"},
  çocuk:{tr:"İç çocuk, saflık",jung:"İlahi çocuk arketipi",islami:"Rızık, neşe",cat:"kişi"},
  uçtum:{tr:"Özgürlük, sınırları aşma",jung:"Ego'nun aşılması",islami:"Makam yükselmesi",cat:"eylem",display:"uçmak"},
  uçmak:{tr:"Özgürlük arayışı",jung:"Bireyselleşme",islami:"Manevi yükseliş",cat:"eylem"},
  düştüm:{tr:"Kontrol kaybı korkusu",jung:"Ego çözülmesi",islami:"İmtihan",cat:"eylem",display:"düşmek"},
  düşmek:{tr:"Kontrol kaybı",jung:"Ego çözülmesi",islami:"Makam kaybı uyarısı",cat:"eylem"},
  kaçtım:{tr:"Yüzleşmekten kaçınma",jung:"Gölgeden kaçış",islami:"İmtihandan kaçma",cat:"eylem",display:"kaçmak"},
  kovalıyordu:{tr:"Bastırılmış korku",jung:"Gölge takibi",islami:"Nefis mücadelesi",cat:"eylem",display:"kovalamak"},
  atladım:{tr:"Cesaret, risk alma",jung:"Eşik aşma",islami:"Tevekkül",cat:"eylem"},
  ağladım:{tr:"Duygusal boşalma",jung:"Katarsis",islami:"Tövbe gözyaşları",cat:"eylem",display:"ağlamak"},
  öldüm:{tr:"Büyük değişim",jung:"Ego ölümü, yeniden doğuş",islami:"Tövbe, yenilenme",cat:"eylem",display:"ölüm"},
  kayboldum:{tr:"Yön kaybı, arayış",jung:"Bilinçdışında kaybolma",islami:"Hidayet arayışı",cat:"eylem",display:"kaybolmak"},
};

const EMOTIONS = {
  korku:{w:["kork","kaç","düş","kaybol","karanlık","panik","tehlike","kovalam","kovalıyordu","kabus","kaçtım","kaçıyordum"],c:"#E24B4A",i:"😰",l:"Korku"},
  huzur:{w:["huzur","sakin","rahat","güzel","sıcak","ışık","cennet","dingin"],c:"#1D9E75",i:"😌",l:"Huzur"},
  merak:{w:["merak","keşf","ara","bul","gizli","bilinmeyen","sır","tuhaf","garip"],c:"#378ADD",i:"🤔",l:"Merak"},
  hüzün:{w:["üzül","ağla","kayıp","özle","yalnız","ayrıl","gözyaş","hüzün"],c:"#534AB7",i:"😢",l:"Hüzün"},
  mutluluk:{w:["mutlu","sevin","gül","dans","kutla","neşe","harika","muhteşem"],c:"#EF9F27",i:"😊",l:"Mutluluk"},
  öfke:{w:["kız","öfke","sinir","kavga","bağır","yık","nefret"],c:"#A32D2D",i:"😤",l:"Öfke"},
  şaşkınlık:{w:["şaşır","garip","tuhaf","inanamadım","birden"],c:"#D85A30",i:"😲",l:"Şaşkınlık"},
};

// ==========================================
// 6 MEDENİYET YORUM
// ==========================================
function generateCivs(symbols, dom) {
  const first = symbols[0];
  const emo = dom.l || "belirsiz";
  return [
    {id:"yusuf",title:"Hz. Yusuf Geleneği",icon:"🕌",
      interpretation: first ? `Rüyanda beliren "${first.name}" sembolü, Hz. Yusuf'un tabir geleneğinde derin bir anlam taşır. ${first.islami}. Bu rüya, sana hayırlı bir kapının aralanmakta olduğunu işaret ediyor olabilir. Sabırla bekle — en güzel tabirler sabredenler içindir.` : `Bu rüya kalbin derinliklerinden bir mesaj. Hz. Yusuf geleneğinde her rüya bir hikmet barındırır.`},
    {id:"jung",title:"Carl Jung — Arketipler",icon:"🧠",
      interpretation: first ? `"${first.name}" sembolü Jung perspektifinden ${first.jung}. ${emo} duygusunun baskınlığı, bilinçdışının işlenmemiş bir psişik malzeme sunduğunu gösterir. Beynin gece boyunca gündüz bastırdığın bir şeyi yeniden yapılandırıyor — bu bir iyileşme süreci.` : `Kolektif bilinçdışından bir mesaj. Jung'a göre her rüya bireyselleşme yolculuğunun parçasıdır.`},
    {id:"shaman",title:"Şamanik Yolculuk",icon:"🦅",
      interpretation: first ? `Şaman geleneğinde "${first.name}" sana bir ruh rehberi olarak belirmiş olabilir. ${first.tr}. Bu yolculukta gösterilen her şey bir öğreti — korkuların bile seni güçlendirmek için orada.` : `Ruhun bu gece bir yolculuğa çıktı. Gördüklerini rehber olarak kabul et.`},
    {id:"inca",title:"İnka Bilgeliği",icon:"🌄",
      interpretation: first ? `İnka kozmolojisinde "${first.name}" evrensel enerji akışında senin için bir işaret. ${emo} duygusunun baskınlığı ruhsal dengenin kalibre edildiğini gösterir. "Rüya, uyanıkken göremediğin gerçeği gösterir."` : `Pachamama sana bir mesaj gönderdi. İnka bilgeleri her rüyayı evrenin fısıltısı görür.`},
    {id:"sufi",title:"Sufi Makamları",icon:"🌀",
      interpretation: first ? `Tasavvufta "${first.name}" seyr-i süluk yolculuğundaki makamı yansıtıyor. ${first.islami}. Mevlana'nın dediği gibi: "Gecenin karanlığında gizlenen ışığı arayanlar, şafakta onu kalplerinde bulurlar."` : `Kalbin bu gece bir ayna tuttu. Her rüya ruhun vuslat arayışının yansımasıdır.`},
    {id:"freud",title:"Freud — Bilinçaltı",icon:"🛋️",
      interpretation: first ? `Freud'a göre "${first.name}" bastırılmış bir arzu veya çözümlenmemiş çatışmanın sembolik ifadesi. ${first.tr}. ${emo} yoğunluğu id-süperego diyaloğuna işaret ediyor. Korkutucu değil — beynin kendini onarıyor.` : `Bilinçaltın konuştu. Her rüya bastırılmış düşüncelerin sembolik ifadesidir.`},
  ];
}

// ==========================================
// ANALİZ
// ==========================================
function analyzeDream(text) {
  const lower = text.toLowerCase().replace(/[.,!?;:'"()]/g, " ");
  const words = lower.split(/\s+/).filter(Boolean);
  const symbols = []; const seen = new Set();
  Object.entries(SDB).forEach(([k, v]) => {
    const dn = v.display || k;
    if (seen.has(dn)) return;
    if (words.some(w => w === k) || (k.length > 3 && lower.includes(k))) { seen.add(dn); symbols.push({ name: dn, ...v }); }
  });
  const emotions = [];
  Object.entries(EMOTIONS).forEach(([, v]) => { const s = v.w.filter(w => lower.includes(w)).length; if (s > 0) emotions.push({ label: v.l, icon: v.i, color: v.c, score: s }); });
  emotions.sort((a, b) => b.score - a.score);
  const dom = emotions[0] || { label: "Merak", icon: "🤔", color: "#378ADD", l: "Merak" };
  const intensity = Math.min(100, Math.round((emotions.reduce((s, e) => s + e.score, 0) / 4) * 100));

  let title = "Gece Fısıltısı";
  if (symbols.length >= 2) title = symbols.slice(0, 2).map(s => s.name.charAt(0).toUpperCase() + s.name.slice(1)).join(" ve ") + " Rüyası";
  else if (symbols.length === 1) title = symbols[0].name.charAt(0).toUpperCase() + symbols[0].name.slice(1) + "'ın Çağrısı";

  const unnamed_emotions = ["Bir yere ait olduğunu hissedip aynı anda orada yabancı olmak","Bir şeyin bittiğini bilmek ama henüz üzülmemiş olmak","Tanıdık bir yere ilk kez gidiyormuş gibi hissetmek","Birini özlediğini fark etmeden önce hissettiğin hafif sızı","Uyanıkken yaşanmamış bir anıyı hatırlamak"];
  const textures = ["Sabah çiyinin cam üzerinde bıraktığı serinlik gibi","Eski bir kitabın sayfalarını çevirirken gelen kağıt kokusu gibi","Uzak bir odadan gelen piyanonun titreşimi gibi","Gün batımında denize bakan birinin iç çekişi gibi"];

  let feedback = symbols.length > 0
    ? `Rüyan, beyninin gece yaptığı derin çalışmanın ürünü. ${dom.label} duygusunun baskınlığı, bilinçaltının dikkat etmeni istediği bir alan olduğunu gösteriyor. "${symbols[0].name}" sembolü tesadüf değil — beynin bunu binlerce imgeden seçti. Bu bir iyileşme işareti. Kendini rüyada nasıl hissettiğine odaklan — cevap hislerde gizli.`
    : `Rüyan sembolik olarak sessiz görünse de, beynin dinlenme modunda. En derin mesajlar en sakin rüyalarda gizlenir.`;

  return {
    title, civilizations: generateCivs(symbols, dom), symbols, emotions, dominantEmotion: dom,
    emotion_atlas: { primary_emotion: dom.label, primary_icon: dom.icon, primary_color: dom.color, secondary_emotion: emotions[1]?.label || null, unnamed_emotion: unnamed_emotions[symbols.length % unnamed_emotions.length], emotional_texture: textures[words.length % textures.length], reflective_feedback: feedback, intensity },
    lucid_coach: {
      tonight_exercise: "Yatmadan önce ellerine 30 saniye bak, her parmağını say. Gözlerini kapa ve 'rüyamda ellerime bakacağım' de.",
      reality_check: "Gün içinde 5 kez dur ve 'bu bir rüya mı?' diye sor. Ellerine bak.",
      dream_sign: symbols.length > 0 ? `"${symbols[0].name}" senin rüya işaretin olabilir — rüyanda bunu gördüğünde 'bu bir rüya!' de.` : "Rüyanda tekrar eden tema bul — bu senin rüya işaretin olacak.",
      progress_note: "Her kaydettiğin rüya lucid rüyaya bir adım daha. Hipokampüs güçleniyor.",
    },
  };
}

// ==========================================
// STORAGE
// ==========================================
function saveL(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) {} }
function loadL(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch(e) { return null; } }
function genCode() { const c = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; let r = "ONX-"; for (let i = 0; i < 6; i++) r += c[Math.floor(Math.random() * c.length)]; return r; }

// ==========================================
// STREAK & RETENTION
// ==========================================
function getStreak(dreams) {
  if (!dreams.length) return 0;
  const today = new Date(); today.setHours(0,0,0,0);
  const dates = [...new Set(dreams.map(d => { const dt = new Date(d.timestamp || d.id); dt.setHours(0,0,0,0); return dt.getTime(); }))].sort((a,b) => b - a);
  let streak = 0;
  let check = today.getTime();
  for (const dt of dates) {
    if (dt === check || dt === check - 86400000) { streak++; check = dt; }
    else if (dt < check - 86400000) break;
  }
  return Math.max(streak, dates[0] === today.getTime() ? 1 : 0);
}

function getWeeklySummary(dreams) {
  const week = Date.now() - 7 * 86400000;
  const recent = dreams.filter(d => (d.timestamp || d.id) > week);
  if (!recent.length) return null;
  const allSymbols = {};
  const allEmotions = {};
  recent.forEach(d => {
    (d.data?.symbols || []).forEach(s => { allSymbols[s.name] = (allSymbols[s.name] || 0) + 1; });
    (d.data?.emotions || []).forEach(e => { allEmotions[e.label] = (allEmotions[e.label] || 0) + e.score; });
  });
  const topSymbol = Object.entries(allSymbols).sort((a,b) => b[1] - a[1])[0];
  const topEmotion = Object.entries(allEmotions).sort((a,b) => b[1] - a[1])[0];
  return { count: recent.length, topSymbol: topSymbol ? topSymbol[0] : null, topSymbolCount: topSymbol ? topSymbol[1] : 0, topEmotion: topEmotion ? topEmotion[0] : null };
}

function getReturnMessage(user, dreams) {
  if (!user) return null;
  const last = dreams[0];
  if (!last) return "İlk rüyanı kaydetmeye hazır mısın?";
  const diff = Date.now() - (last.timestamp || last.id);
  const days = Math.floor(diff / 86400000);
  if (days === 0) return null;
  if (days === 1) return "Dün gece ne gördün?";
  if (days <= 3) return `${days} gündür rüya kaydetmedin. Bilinçaltın seni bekliyor.`;
  if (days <= 7) return "Bir haftadır sessizsin. Rüyaların hâlâ sana mektup yazıyor.";
  return `${days} gündür yoktun. Ama beynin her gece çalışmaya devam etti. Tekrar başlayalım mı?`;
}

// ==========================================
// COMPONENTS
// ==========================================
function Card({ title, icon, children, delay = 0, accent }) {
  return (
    <div style={{background:"rgba(13,11,30,0.45)",backdropFilter:"blur(12px)",border:`1px solid ${accent?accent+"20":"rgba(108,60,224,0.1)"}`,borderRadius:18,padding:"18px 20px",marginBottom:14,animation:`fadeUp 0.5s ease ${delay}s both`}}>
      {title&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>{icon&&<span style={{fontSize:14}}>{icon}</span>}<span style={{fontSize:10,textTransform:"uppercase",letterSpacing:2.5,color:accent||"#8B83AE",fontWeight:600}}>{title}</span></div>}
      {children}
    </div>
  );
}

function CivCard({ civ, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={()=>setOpen(!open)} style={{background:open?"rgba(26,19,64,0.55)":"rgba(13,11,30,0.3)",border:open?"1px solid rgba(108,60,224,0.2)":"1px solid rgba(108,60,224,0.06)",borderRadius:16,padding:open?"16px 18px":"14px 18px",marginBottom:8,cursor:"pointer",transition:"all 0.3s",animation:`fadeUp 0.4s ease ${delay}s both`}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>{civ.icon}</span><span style={{fontSize:13,fontWeight:500,color:open?"#E8E5F2":"#8B83AE"}}>{civ.title}</span></div>
        <span style={{color:"#4A4570",fontSize:12,transition:"transform 0.3s",transform:open?"rotate(180deg)":""}}>▾</span>
      </div>
      {open&&<div style={{marginTop:14,fontFamily:"Crimson Pro,serif",fontSize:15.5,lineHeight:1.85,color:"#D0CCE0",fontStyle:"italic",animation:"fadeUp 0.3s ease",borderTop:"1px solid rgba(108,60,224,0.08)",paddingTop:14}}>{civ.interpretation}</div>}
    </div>
  );
}

// ==========================================
// ONBOARDING
// ==========================================
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);

  const slides = [
    {
      icon: "🌙",
      title: "Rüyanı anlat",
      subtitle: "Uyanır uyanmaz rüyanı yaz veya sesle kaydet. Beynin REM'den çıktıktan 10 dakika sonra %95'ini silecek.",
      accent: "#6C3CE0",
    },
    {
      icon: "🕌",
      title: "6 medeniyet analiz etsin",
      subtitle: "Hz. Yusuf, Jung, Şaman, İnka, Sufi ve Freud — her biri farklı bir pencereden rüyanı yorumlar.",
      accent: "#1DE9B6",
    },
    {
      icon: "💜",
      title: "Bilinçaltını keşfet",
      subtitle: "Duygu atlası, adı konmamış duygular, lucid rüya koçu — beynini hiç bu kadar yakından tanımadın.",
      accent: "#EF9F27",
    },
  ];

  const s = slides[step];

  return (
    <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 20px",animation:"fadeUp 0.5s ease"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontSize:56,marginBottom:20,animation:"fadeUp 0.4s ease"}} key={step}>{s.icon}</div>
        <h2 style={{fontSize:24,fontWeight:300,marginBottom:12,color:"#E8E5F2",animation:"fadeUp 0.4s ease 0.1s both"}} key={`t${step}`}>{s.title}</h2>
        <p style={{fontSize:14,color:"#8B83AE",lineHeight:1.7,maxWidth:300,margin:"0 auto",animation:"fadeUp 0.4s ease 0.2s both"}} key={`s${step}`}>{s.subtitle}</p>
      </div>

      {/* Dots */}
      <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:32}}>
        {slides.map((_, i) => (
          <div key={i} onClick={() => setStep(i)} style={{width:i===step?24:8,height:8,borderRadius:4,background:i===step?s.accent:"rgba(108,60,224,0.2)",transition:"all 0.3s",cursor:"pointer"}}/>
        ))}
      </div>

      {step < 2 ? (
        <button onClick={() => setStep(step + 1)} style={{display:"block",width:"100%",maxWidth:300,margin:"0 auto",padding:"16px 20px",border:"none",borderRadius:16,background:`linear-gradient(135deg,${s.accent},${s.accent}99)`,color:"#fff",fontFamily:"Outfit",fontSize:15,fontWeight:500,cursor:"pointer",letterSpacing:0.5}}>
          Devam
        </button>
      ) : (
        <button onClick={onComplete} style={{display:"block",width:"100%",maxWidth:300,margin:"0 auto",padding:"16px 20px",border:"none",borderRadius:16,background:"linear-gradient(135deg,#6C3CE0,#4A2DB0)",color:"#fff",fontFamily:"Outfit",fontSize:15,fontWeight:500,cursor:"pointer",letterSpacing:0.5}}>
          Keşfetmeye başla
        </button>
      )}

      <button onClick={onComplete} style={{display:"block",margin:"16px auto 0",background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:12,cursor:"pointer"}}>
        Atla
      </button>

      {/* Example preview on last slide */}
      {step === 2 && (
        <div style={{marginTop:32,animation:"fadeUp 0.5s ease 0.3s both"}}>
          <div style={{background:"rgba(13,11,30,0.5)",borderRadius:16,padding:"16px 18px",border:"1px solid rgba(108,60,224,0.1)"}}>
            <p style={{fontSize:10,color:"#4A4570",letterSpacing:2,marginBottom:8}}>ÖRNEK ANALİZ</p>
            <p style={{fontSize:14,fontWeight:500,color:"#E8E5F2",marginBottom:6}}>Deniz ve Anahtar Rüyası</p>
            <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
              {["🕌 Hz. Yusuf","🧠 Jung","🦅 Şaman","🌄 İnka","🌀 Sufi","🛋️ Freud"].map(c => (
                <span key={c} style={{fontSize:10,padding:"4px 8px",borderRadius:10,background:"rgba(108,60,224,0.12)",color:"#8B83AE"}}>{c}</span>
              ))}
            </div>
            <p style={{fontSize:12,color:"#6B6590",fontStyle:"italic",lineHeight:1.6}}>💜 Duygu: Merak · ⚡ Yoğunluk: %72 · 🧘 Lucid koçu dahil</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// APP
// ==========================================
export default function OneiroxApp() {
  const [screen, setScreen] = useState("loading");
  const [user, setUser] = useState(null);
  const [dreamText, setDreamText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [dreams, setDreams] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [tab, setTab] = useState("civilizations");
  const [orbs, setOrbs] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [welcomeMode, setWelcomeMode] = useState("main");
  const [streak, setStreak] = useState(0);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [returnMsg, setReturnMsg] = useState(null);
  const taRef = useRef(null);

  useEffect(() => {
    setOrbs([{id:0,size:150,x:10,y:15,color:"#6C3CE0",dur:18},{id:1,size:250,x:70,y:60,color:"#1DE9B6",dur:25},{id:2,size:200,x:20,y:75,color:"#534AB7",dur:22},{id:3,size:180,x:80,y:30,color:"#EF9F27",dur:30}]);
    const onboarded = loadL("oneirox-onboarded");
    const u = loadL("oneirox-user");
    if (u) {
      setUser(u);
      const d = loadL("oneirox-dreams-" + u.code) || [];
      setDreams(d);
      setStreak(getStreak(d));
      setWeeklySummary(getWeeklySummary(d));
      setReturnMsg(getReturnMessage(u, d));
      setScreen("home");
    } else if (onboarded) {
      setScreen("welcome");
    } else {
      setScreen("onboarding");
    }
  }, []);

  useEffect(() => { if (screen === "record" && taRef.current) setTimeout(() => taRef.current.focus(), 100); }, [screen]);

  const completeOnboarding = () => { saveL("oneirox-onboarded", true); setScreen("welcome"); };
  const handleGuestStart = () => { const name = nameInput.trim() || "Gezgin"; const code = genCode(); const u = { name, code }; setUser(u); saveL("oneirox-user", u); setScreen("home"); };
  const handleCodeLogin = () => { if (!codeInput.trim()) return; const code = codeInput.trim().toUpperCase(); const u = { name: "Gezgin", code }; setUser(u); saveL("oneirox-user", u); const d = loadL("oneirox-dreams-" + code) || []; setDreams(d); setStreak(getStreak(d)); setWeeklySummary(getWeeklySummary(d)); setScreen("home"); };

  const handleAnalyze = () => {
    if (!dreamText.trim() || dreamText.trim().length < 10) return;
    setScreen("analyzing");
    const msgs = ["Rüya katmanları açılıyor...","Hz. Yusuf'un bilgeliği aranıyor...","Şaman davulları çalınıyor...","Arketipler uyanıyor...","Duygu dokusu hissediliyor...","Sufi aynası tutuluyor..."];
    let mi = 0; setLoadingMsg(msgs[0]);
    const iv = setInterval(() => { mi = (mi + 1) % msgs.length; setLoadingMsg(msgs[mi]); }, 1500);
    setTimeout(() => {
      clearInterval(iv);
      const result = analyzeDream(dreamText);
      const dream = { id: Date.now(), timestamp: Date.now(), text: dreamText.trim(), title: result.title, date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" }), time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }), data: result };
      setAnalysis(dream);
      const updated = [dream, ...dreams].slice(0, 50);
      setDreams(updated);
      setStreak(getStreak(updated));
      setWeeklySummary(getWeeklySummary(updated));
      setReturnMsg(null);
      if (user) saveL("oneirox-dreams-" + user.code, updated);
      setTab("civilizations"); setScreen("result");
    }, 2500);
  };

  const wc = dreamText.split(/\s+/).filter(Boolean).length;
  const nav = (s) => { setScreen(s); if (s === "home") { setDreamText(""); setAnalysis(null); } };
  const bp = { display: "block", width: "100%", padding: "17px 20px", border: "none", borderRadius: 16, background: "linear-gradient(135deg,#6C3CE0,#4A2DB0)", color: "#fff", fontFamily: "Outfit,sans-serif", fontSize: 15, fontWeight: 500, cursor: "pointer", letterSpacing: 0.5 };
  const d = analysis?.data;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 30px rgba(108,60,224,0.2)}50%{box-shadow:0 0 60px rgba(108,60,224,0.4)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes rec{0%,100%{opacity:1}50%{opacity:.35}}
        @keyframes breathe{0%,100%{transform:scale(1);opacity:0.06}50%{transform:scale(1.15);opacity:0.12}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        *{box-sizing:border-box;margin:0;padding:0}body{font-family:Outfit,sans-serif;background:#0D0B1E}
        ::selection{background:rgba(108,60,224,0.3)}input::placeholder,textarea::placeholder{color:#3D385A}
      `}}/>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>

      <div style={{fontFamily:"Outfit,sans-serif",background:"#0D0B1E",minHeight:"100vh",color:"#E8E5F2",position:"relative",overflow:"hidden"}}>
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
          {orbs.map(o=><div key={o.id} style={{position:"absolute",width:o.size,height:o.size,borderRadius:"50%",background:`radial-gradient(circle,${o.color}12,transparent 70%)`,left:`${o.x}%`,top:`${o.y}%`,animation:`breathe ${o.dur}s ease-in-out infinite`,filter:"blur(40px)"}}/>)}
        </div>

        <div style={{maxWidth:460,margin:"0 auto",padding:"12px 20px",position:"relative",zIndex:1}}>

          {/* LOADING */}
          {screen==="loading"&&<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:40,height:40,border:"2px solid rgba(108,60,224,0.15)",borderTopColor:"#6C3CE0",borderRadius:"50%",animation:"spin 1s linear infinite"}}/></div>}

          {/* ONBOARDING */}
          {screen==="onboarding"&&<Onboarding onComplete={completeOnboarding}/>}

          {/* WELCOME */}
          {screen==="welcome"&&(
            <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",animation:"slideUp 0.8s ease"}}>
              <div style={{textAlign:"center",marginBottom:32}}>
                <div style={{width:80,height:80,borderRadius:"50%",margin:"0 auto 24px",background:"radial-gradient(circle at 35% 35%,#B89CFF,#6C3CE0,#1A1340)",animation:"pulse 5s ease-in-out infinite",position:"relative"}}><div style={{position:"absolute",inset:-6,borderRadius:"50%",border:"1px solid rgba(108,60,224,0.12)",animation:"spin 25s linear infinite"}}/></div>
                <h1 style={{fontSize:30,fontWeight:200,letterSpacing:10,marginBottom:10}}>ONEIROX</h1>
                <p style={{fontFamily:"Crimson Pro,serif",fontSize:15,fontStyle:"italic",color:"#6B6590"}}>Rüyaların sana bir şey anlatıyor.</p>
              </div>
              {welcomeMode==="main"&&(
                <div style={{animation:"fadeUp 0.5s ease"}}>
                  <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Adın (isteğe bağlı)" style={{width:"100%",padding:"14px 18px",background:"rgba(13,11,30,0.6)",border:"1px solid rgba(108,60,224,0.12)",borderRadius:14,color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,outline:"none",marginBottom:10}}/>
                  <button onClick={handleGuestStart} style={bp}>Başla</button>
                  <div style={{display:"flex",alignItems:"center",gap:12,margin:"20px 0"}}><div style={{flex:1,height:1,background:"rgba(108,60,224,0.12)"}}/><span style={{fontSize:10,color:"#4A4570",letterSpacing:2}}>VEYA</span><div style={{flex:1,height:1,background:"rgba(108,60,224,0.12)"}}/></div>
                  <button onClick={()=>setWelcomeMode("code")} style={{display:"block",width:"100%",padding:"14px 20px",background:"transparent",border:"1px solid rgba(108,60,224,0.15)",borderRadius:14,color:"#8B83AE",fontFamily:"Outfit",fontSize:13,cursor:"pointer"}}>Kodumla devam et</button>
                  <p style={{textAlign:"center",fontSize:10,color:"#3D385A",marginTop:24,lineHeight:1.6}}>Üye olmana gerek yok. Sana özel bir kod vereceğiz.</p>
                </div>
              )}
              {welcomeMode==="code"&&(
                <div style={{animation:"fadeUp 0.4s ease"}}>
                  <input value={codeInput} onChange={e=>setCodeInput(e.target.value)} placeholder="ONX-XXXXXX" style={{width:"100%",padding:"14px 18px",background:"rgba(13,11,30,0.6)",border:"1px solid rgba(108,60,224,0.12)",borderRadius:14,color:"#E8E5F2",fontFamily:"Outfit",fontSize:16,outline:"none",textAlign:"center",letterSpacing:3,marginBottom:12}}/>
                  <button onClick={handleCodeLogin} style={{...bp,marginBottom:10}}>Devam et</button>
                  <button onClick={()=>setWelcomeMode("main")} style={{display:"block",width:"100%",padding:12,background:"transparent",border:"none",color:"#6B6590",fontFamily:"Outfit",fontSize:12,cursor:"pointer"}}>← geri</button>
                </div>
              )}
            </div>
          )}

          {/* HEADER */}
          {!["welcome","onboarding","loading"].includes(screen)&&(
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 0 6px"}}>
              <div onClick={()=>nav("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:16,fontWeight:700,letterSpacing:6,color:"#E8E5F2",opacity:0.85}}>ONEIROX</span>
                {streak>0&&<span style={{fontSize:12,color:"#EF9F27"}} title={`${streak} gün üst üste`}>🔥{streak}</span>}
              </div>
              <div style={{display:"flex",gap:6}}>
                {screen!=="lucid"&&<button onClick={()=>setScreen("lucid")} style={{background:"rgba(29,233,182,0.06)",border:"1px solid rgba(29,233,182,0.12)",color:"#1DE9B6",padding:"5px 10px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",letterSpacing:1,fontWeight:500}}>LUCID</button>}
                {dreams.length>0&&screen!=="journal"&&<button onClick={()=>setScreen("journal")} style={{background:"rgba(108,60,224,0.06)",border:"1px solid rgba(108,60,224,0.12)",color:"#8B83AE",padding:"5px 10px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",letterSpacing:1,fontWeight:500}}>{dreams.length}</button>}
              </div>
            </div>
          )}

          {/* HOME */}
          {screen==="home"&&(
            <div style={{animation:"fadeUp 0.6s ease",textAlign:"center",paddingTop:20}}>
              {user?.name&&user.name!=="Gezgin"&&<p style={{fontSize:13,color:"#6B6590",marginBottom:4}}>Hoş geldin, {user.name}</p>}

              {/* Return message */}
              {returnMsg&&(
                <div style={{background:"rgba(108,60,224,0.08)",border:"1px solid rgba(108,60,224,0.12)",borderRadius:14,padding:"12px 16px",marginBottom:16,animation:"fadeUp 0.5s ease"}}>
                  <p style={{fontFamily:"Crimson Pro,serif",fontSize:15,fontStyle:"italic",color:"#B89CFF",lineHeight:1.6}}>{returnMsg}</p>
                </div>
              )}

              {/* Streak banner */}
              {streak>=2&&(
                <div style={{background:"rgba(239,159,39,0.08)",border:"1px solid rgba(239,159,39,0.12)",borderRadius:14,padding:"10px 16px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                  <span style={{fontSize:18}}>🔥</span>
                  <span style={{fontSize:13,color:"#EF9F27",fontWeight:500}}>{streak} gün üst üste kayıt!</span>
                </div>
              )}

              {/* Weekly summary */}
              {weeklySummary&&weeklySummary.count>=2&&(
                <div style={{background:"rgba(29,233,182,0.06)",border:"1px solid rgba(29,233,182,0.1)",borderRadius:14,padding:"12px 16px",marginBottom:16,textAlign:"left"}}>
                  <p style={{fontSize:10,color:"#1DE9B6",letterSpacing:2,marginBottom:6}}>HAFTALIK ÖZET</p>
                  <p style={{fontSize:12,color:"#8B83AE",lineHeight:1.6}}>
                    Bu hafta <span style={{color:"#E8E5F2",fontWeight:500}}>{weeklySummary.count} rüya</span> kaydettin.
                    {weeklySummary.topSymbol&&<> En çok tekrar eden sembol: <span style={{color:"#B89CFF",fontWeight:500}}>"{weeklySummary.topSymbol}"</span> ({weeklySummary.topSymbolCount}x).</>}
                    {weeklySummary.topEmotion&&<> Baskın duygu: <span style={{color:"#EF9F27",fontWeight:500}}>{weeklySummary.topEmotion}</span>.</>}
                  </p>
                </div>
              )}

              <div style={{width:76,height:76,borderRadius:"50%",margin:"0 auto 20px",background:"radial-gradient(circle at 35% 35%,#B89CFF,#6C3CE0,#1A1340)",animation:"pulse 5s ease-in-out infinite"}}/>
              <p style={{fontFamily:"Crimson Pro,serif",fontSize:18,fontStyle:"italic",color:"#A8A3C0",lineHeight:1.6,marginBottom:4}}>Rüyaların sana bir şey anlatıyor.</p>
              <p style={{fontFamily:"Crimson Pro,serif",fontSize:18,fontStyle:"italic",color:"#D0CCE0",lineHeight:1.6}}>Birlikte keşfedelim mi?</p>

              <button onClick={()=>setScreen("record")} style={{...bp,marginTop:24,marginBottom:12}}>Rüyamı anlat</button>
              {dreams.length>0&&<button onClick={()=>setScreen("journal")} style={{display:"block",width:"100%",padding:"14px 20px",background:"transparent",border:"1px solid rgba(108,60,224,0.15)",borderRadius:16,color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",marginBottom:12}}>Rüya günlüğüm</button>}
              {user?.code&&<div style={{marginTop:20,padding:"12px 16px",background:"rgba(13,11,30,0.3)",borderRadius:14,border:"1px solid rgba(108,60,224,0.06)"}}><p style={{fontSize:9,color:"#3D385A",letterSpacing:2,marginBottom:4}}>SENİN KODUN</p><p style={{fontSize:16,fontWeight:600,letterSpacing:4,color:"#6C3CE0"}}>{user.code}</p></div>}
            </div>
          )}

          {/* RECORD */}
          {screen==="record"&&(
            <div style={{animation:"fadeUp 0.4s ease"}}>
              <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← geri</button>
              <h2 style={{fontSize:20,fontWeight:300,margin:"16px 0 8px",letterSpacing:1}}>Rüyanı anlat</h2>
              <p style={{color:"#4A4570",fontSize:12,marginBottom:16,lineHeight:1.6}}>Mekanlar, yüzler, sesler, renkler, duygular — beynin bunları bir sebepten seçti.</p>
              <textarea ref={taRef} value={dreamText} onChange={e=>setDreamText(e.target.value)} placeholder="Bu gece rüyamda..." style={{width:"100%",minHeight:200,background:"rgba(13,11,30,0.5)",border:"1px solid rgba(108,60,224,0.1)",borderRadius:16,padding:"18px 20px",color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,lineHeight:1.8,resize:"vertical",outline:"none"}}/>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#3D385A",margin:"10px 4px 16px"}}><span>{wc} kelime</span><span style={{color:wc>20?"#1DE9B660":wc>8?"#EF9F2760":"#3D385A"}}>{wc>20?"detay seviyesi yüksek":wc>8?"iyi gidiyorsun":""}</span></div>
              <button onClick={handleAnalyze} style={{...bp,opacity:dreamText.trim().length<10?0.3:1,pointerEvents:dreamText.trim().length<10?"none":"auto"}}>analiz et</button>
            </div>
          )}

          {/* ANALYZING */}
          {screen==="analyzing"&&(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"80px 0",animation:"fadeUp 0.4s ease"}}>
              <div style={{position:"relative",width:60,height:60,marginBottom:28}}><div style={{position:"absolute",inset:0,border:"2px solid rgba(108,60,224,0.1)",borderTopColor:"#6C3CE050",borderRadius:"50%",animation:"spin 1.2s linear infinite"}}/><div style={{position:"absolute",inset:12,border:"1.5px solid rgba(29,233,182,0.08)",borderBottomColor:"#1DE9B640",borderRadius:"50%",animation:"spin 1.8s linear infinite reverse"}}/></div>
              <p style={{color:"#6B6590",fontSize:13,letterSpacing:0.5}}>{loadingMsg}</p>
            </div>
          )}

          {/* RESULT */}
          {screen==="result"&&d&&(
            <div style={{animation:"fadeUp 0.5s ease"}}>
              <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← ana sayfa</button>
              <h2 style={{fontSize:22,fontWeight:300,margin:"12px 0 4px",lineHeight:1.4}}>{analysis.title}</h2>
              <p style={{color:"#3D385A",fontSize:10,marginBottom:18,letterSpacing:1}}>{analysis.date} · {analysis.time}</p>

              <div style={{display:"flex",gap:3,marginBottom:16}}>
                {[{id:"civilizations",label:"Tabirler",icon:"🕌"},{id:"emotions",label:"Duygu Atlası",icon:"💜"},{id:"lucidResult",label:"Lucid",icon:"🧘"}].map(t=>(
                  <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"8px 16px",borderRadius:24,fontSize:11,fontFamily:"Outfit",cursor:"pointer",border:tab===t.id?"1px solid rgba(108,60,224,0.25)":"1px solid rgba(108,60,224,0.06)",background:tab===t.id?"rgba(108,60,224,0.12)":"transparent",color:tab===t.id?"#E8E5F2":"#4A4570",fontWeight:tab===t.id?500:400,letterSpacing:0.5}}>{t.icon} {t.label}</button>
                ))}
              </div>

              {tab==="civilizations"&&d.civilizations&&d.civilizations.map((c,i)=><CivCard key={c.id} civ={c} delay={i*0.07}/>)}

              {tab==="emotions"&&d.emotion_atlas&&(
                <div>
                  <Card title="Duygusal çekirdek" icon={d.emotion_atlas.primary_icon} delay={0.1} accent={d.emotion_atlas.primary_color}>
                    <div style={{fontSize:22,fontWeight:300,color:d.emotion_atlas.primary_color||"#B89CFF",marginBottom:4}}>{d.emotion_atlas.primary_emotion}</div>
                    {d.emotion_atlas.secondary_emotion&&<div style={{fontSize:13,color:"#6B6590",marginBottom:12}}>+ {d.emotion_atlas.secondary_emotion}</div>}
                    <div style={{height:3,background:"rgba(255,255,255,0.03)",borderRadius:2,marginBottom:10}}><div style={{width:`${d.emotion_atlas.intensity}%`,height:3,borderRadius:2,background:`linear-gradient(90deg,${d.emotion_atlas.primary_color||"#6C3CE0"}60,#1DE9B660)`,transition:"width 2s ease"}}/></div>
                    {d.emotion_atlas.emotional_texture&&<p style={{fontSize:12,color:"#6B6590",fontStyle:"italic"}}>{d.emotion_atlas.emotional_texture}</p>}
                  </Card>
                  {d.emotion_atlas.unnamed_emotion&&<Card title="Adı henüz konmamış duygu" icon="🌊" delay={0.2} accent="#D85A30"><p style={{fontFamily:"Crimson Pro,serif",fontSize:16,lineHeight:1.85,color:"#D0CCE0",fontStyle:"italic"}}>{d.emotion_atlas.unnamed_emotion}</p></Card>}
                  {d.emotion_atlas.reflective_feedback&&<Card title="Reflektif geri bildirim" icon="🪞" delay={0.3} accent="#1DE9B6"><p style={{fontFamily:"Crimson Pro,serif",fontSize:15,lineHeight:1.85,color:"#D0CCE0"}}>{d.emotion_atlas.reflective_feedback}</p></Card>}
                </div>
              )}

              {tab==="lucidResult"&&d.lucid_coach&&(
                <div>
                  <Card title="Bu gece dene" icon="🌙" delay={0.1} accent="#6C3CE0"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.75}}>{d.lucid_coach.tonight_exercise}</p></Card>
                  <Card title="Gerçeklik testi" icon="👁️" delay={0.15} accent="#1DE9B6"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.75}}>{d.lucid_coach.reality_check}</p></Card>
                  <Card title="Rüya işaretin" icon="⚡" delay={0.2} accent="#EF9F27"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.75}}>{d.lucid_coach.dream_sign}</p></Card>
                  <Card delay={0.25}><p style={{fontSize:13,color:"#1DE9B6",fontWeight:500,textAlign:"center"}}>{d.lucid_coach.progress_note}</p></Card>
                </div>
              )}

              <div style={{marginTop:6}}><Card title="Kayıt" delay={0.5}><p style={{fontSize:12,color:"#4A4570",lineHeight:1.7}}>{analysis.text}</p></Card></div>
              <button onClick={()=>{setScreen("record");setDreamText("");setAnalysis(null);}} style={bp}>yeni rüya</button>
            </div>
          )}

          {/* LUCID */}
          {screen==="lucid"&&(
            <div style={{animation:"fadeUp 0.5s ease"}}>
              <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← geri</button>
              <h2 style={{fontSize:20,fontWeight:300,margin:"14px 0 6px",letterSpacing:1}}>Lucid rüya koçu</h2>
              <p style={{color:"#4A4570",fontSize:12,marginBottom:16}}>Rüyanda uyanık olmayı öğren.</p>
              <Card title="Nedir?" icon="💡" accent="#6C3CE0"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.75}}>Rüya gördüğünün farkında olduğun andır. Prefrontal korteksin — normalde REM'de suskunlaşan bölge — tekrar aktif olur.</p></Card>
              <Card title="4 adım" icon="📋" delay={0.1} accent="#1DE9B6"><div style={{fontSize:13,color:"#D0CCE0",lineHeight:1.85}}><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>1.</span> Her sabah rüyanı kaydet.</p><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>2.</span> Gün içinde "bu rüya mı?" diye sor.</p><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>3.</span> Uyumadan "rüyamda fark edeceğim" de.</p><p><span style={{color:"#1DE9B6"}}>4.</span> 5 saat sonra 20 dk uyan, tekrar uyu.</p></div></Card>
              <button onClick={()=>setScreen("record")} style={{...bp,marginTop:4}}>rüyamı kaydet</button>
            </div>
          )}

          {/* JOURNAL */}
          {screen==="journal"&&(
            <div style={{animation:"fadeUp 0.4s ease"}}>
              <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← geri</button>
              <h2 style={{fontSize:20,fontWeight:300,margin:"14px 0 18px",letterSpacing:1}}>Rüya günlüğü</h2>
              {dreams.length===0?(<div style={{textAlign:"center",padding:"60px 20px",color:"#4A4570"}}><p style={{marginBottom:16}}>Henüz rüya kaydetmedin.</p><button onClick={()=>setScreen("record")} style={{...bp,display:"inline-block",width:"auto",padding:"12px 32px"}}>ilk rüyanı kaydet</button></div>)
              :dreams.map((dr,i)=>(
                <div key={dr.id} onClick={()=>{setAnalysis(dr);setTab("civilizations");setScreen("result");}} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"rgba(13,11,30,0.4)",border:"1px solid rgba(108,60,224,0.08)",borderRadius:14,marginBottom:8,cursor:"pointer",animation:`fadeUp 0.4s ease ${i*0.05}s both`}}>
                  <div style={{width:40,height:40,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,background:`${dr.data?.emotion_atlas?.primary_color||"#534AB7"}12`,flexShrink:0}}>{dr.data?.emotion_atlas?.primary_icon||"🌙"}</div>
                  <div style={{flex:1,minWidth:0}}><div style={{fontSize:13,fontWeight:500,marginBottom:3,color:"#D0CCE0"}}>{dr.title}</div><div style={{fontSize:10,color:"#3D385A"}}>{dr.date}</div></div>
                  <span style={{color:"#2A2550",fontSize:14}}>›</span>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
