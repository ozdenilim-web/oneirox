"use client";

import { useState, useRef, useEffect } from "react";

// ==========================================
// SEMBOL VERİTABANI
// ==========================================
const SDB={su:{tr:"Duygusal derinlik",jung:"Kolektif bilinçdışı",islami:"Bereket, rızık",cat:"doğa"},deniz:{tr:"Derin duygular",jung:"Bilinçdışının derinliği",islami:"Bilgi okyanusu",cat:"doğa"},nehir:{tr:"Zamanın akışı",jung:"Hayat akışı",islami:"Cennet nehirleri",cat:"doğa"},yağmur:{tr:"Arınma, boşalma",jung:"Bilinçdışı mesajlar",islami:"Rahmet, bereket",cat:"doğa"},kar:{tr:"Saflık, durgunluk",jung:"Duygusal donma",islami:"Günahların örtülmesi",cat:"doğa"},ateş:{tr:"Tutku, öfke, arınma",jung:"Dönüşüm enerjisi",islami:"Fitne veya ilim",cat:"doğa"},dağ:{tr:"Engel veya hedef",jung:"Kendini gerçekleştirme",islami:"Sabır, makam",cat:"doğa"},orman:{tr:"Bilinmez, keşif",jung:"Bilinçdışının karanlığı",islami:"Hayatın karmaşıklığı",cat:"doğa"},ağaç:{tr:"Büyüme, kökler",jung:"Yaşam ağacı",islami:"İman, sadaka",cat:"doğa"},çiçek:{tr:"Güzellik, gelişim",jung:"Bütünlük sembolü",islami:"Cennet, güzel amel",cat:"doğa"},ay:{tr:"Dişil enerji",jung:"Anima, aydınlanma",islami:"Güzellik, nur",cat:"doğa"},güneş:{tr:"Bilinç, başarı",jung:"Ego bilinci",islami:"İlim nuru",cat:"doğa"},fırtına:{tr:"İç çatışma",jung:"Psişik kriz",islami:"İlahi uyarı",cat:"doğa"},ev:{tr:"İç dünya, benlik",jung:"Psişenin yapısı",islami:"Aile, huzur",cat:"mekan"},okul:{tr:"Öğrenme, kaygı",jung:"Bireyselleşme",islami:"İlim, imtihan",cat:"mekan"},hastane:{tr:"Şifa ihtiyacı",jung:"İyileşme arketipi",islami:"Sabır, şükür",cat:"mekan"},cami:{tr:"Maneviyat, huzur",jung:"Kutsal mekan",islami:"İbadet, hidayet",cat:"mekan"},mezarlık:{tr:"Geçmiş, veda",jung:"Yeniden doğuş",islami:"Ahiret hatırlatması",cat:"mekan"},mağara:{tr:"İçe dönüş",jung:"Bilinçdışına iniş",islami:"Hira, ilham",cat:"mekan"},bahçe:{tr:"Huzur, bereket",jung:"İç cennet",islami:"Cennet bahçesi",cat:"mekan"},çatı:{tr:"Koruma, zirve",jung:"Bilincin üst katmanı",islami:"İman koruması",cat:"mekan"},yılan:{tr:"Dönüşüm, tehlike",jung:"Kundalini enerjisi",islami:"Düşman veya hikmet",cat:"hayvan"},ayı:{tr:"Güç, koruma",jung:"İçgüdüsel güç",islami:"Güçlü düşman",cat:"hayvan"},aslan:{tr:"Güç, cesaret",jung:"Kral arketipi",islami:"Sultan, cesaret",cat:"hayvan"},kurt:{tr:"İçgüdü, yalnızlık",jung:"Gölge arketipi",islami:"Düşman",cat:"hayvan"},köpek:{tr:"Sadakat, koruma",jung:"Koruyucu gölge",islami:"Sadık dost",cat:"hayvan"},kedi:{tr:"Bağımsızlık, sezgi",jung:"Dişil enerji",islami:"Temizlik",cat:"hayvan"},at:{tr:"Güç, özgürlük",jung:"İçgüdüsel enerji",islami:"Zafer",cat:"hayvan"},kuş:{tr:"Özgürlük, mesaj",jung:"Ruhun uçuşu",islami:"Melek, haber",cat:"hayvan"},balık:{tr:"Bereket",jung:"Bilinçdışından gelen",islami:"Rızık",cat:"hayvan"},örümcek:{tr:"Sabır, tuzak",jung:"Kader ağı",islami:"Tevekkül",cat:"hayvan"},kelebek:{tr:"Dönüşüm",jung:"Metamorfoz",islami:"Yeniden diriliş",cat:"hayvan"},kartal:{tr:"Yüksek bakış",jung:"Ruhsal yükseliş",islami:"Yüksek makam",cat:"hayvan"},araba:{tr:"Hayat yolculuğu",jung:"Ego'nun yönlendirmesi",islami:"Rızık aracı",cat:"nesne"},kapı:{tr:"Yeni fırsat",jung:"Eşik arketipi",islami:"Rızık kapısı",cat:"nesne"},anahtar:{tr:"Çözüm, erişim",jung:"Bilinçdışına erişim",islami:"İlim, hidayet",cat:"nesne"},ayna:{tr:"Öz-farkındalık",jung:"Gölge karşılaşması",islami:"Kalp temizliği",cat:"nesne"},köprü:{tr:"Geçiş, değişim",jung:"Bilinç köprüsü",islami:"Sırat köprüsü",cat:"nesne"},yol:{tr:"Hayat yolculuğu",jung:"Bireyselleşme yolu",islami:"Doğru yol",cat:"nesne"},merdiven:{tr:"Yükselme",jung:"Bilinç seviyeleri",islami:"Makam yükselmesi",cat:"nesne"},para:{tr:"Değer, güç",jung:"Ego'nun gücü",islami:"Rızık, imtihan",cat:"nesne"},kitap:{tr:"Bilgi, sırlar",jung:"Bilinçdışı kayıtları",islami:"Kur'an, ilim",cat:"nesne"},kan:{tr:"Yaşam gücü",jung:"Hayat enerjisi",islami:"Akrabalık",cat:"nesne"},bebek:{tr:"Yeni başlangıç",jung:"İlahi çocuk",islami:"Rızık, hayır",cat:"kişi"},anne:{tr:"Koruma, sevgi",jung:"Büyük anne arketipi",islami:"Cennet ayakları altında",cat:"kişi"},baba:{tr:"Otorite, rehberlik",jung:"Yaşlı bilge",islami:"Sorumluluk",cat:"kişi"},çocuk:{tr:"İç çocuk, saflık",jung:"İlahi çocuk",islami:"Rızık, neşe",cat:"kişi"},uçtum:{tr:"Özgürlük",jung:"Ego'nun aşılması",islami:"Makam yükselmesi",cat:"eylem",display:"uçmak"},uçmak:{tr:"Özgürlük arayışı",jung:"Bireyselleşme",islami:"Manevi yükseliş",cat:"eylem"},düştüm:{tr:"Kontrol kaybı",jung:"Ego çözülmesi",islami:"İmtihan",cat:"eylem",display:"düşmek"},düşmek:{tr:"Kontrol kaybı",jung:"Ego çözülmesi",islami:"Makam kaybı",cat:"eylem"},kaçtım:{tr:"Yüzleşmekten kaçınma",jung:"Gölgeden kaçış",islami:"İmtihandan kaçma",cat:"eylem",display:"kaçmak"},kovalıyordu:{tr:"Bastırılmış korku",jung:"Gölge takibi",islami:"Nefis mücadelesi",cat:"eylem",display:"kovalamak"},atladım:{tr:"Cesaret, risk",jung:"Eşik aşma",islami:"Tevekkül",cat:"eylem"},ağladım:{tr:"Duygusal boşalma",jung:"Katarsis",islami:"Tövbe gözyaşları",cat:"eylem",display:"ağlamak"},öldüm:{tr:"Büyük değişim",jung:"Ego ölümü",islami:"Tövbe, yenilenme",cat:"eylem",display:"ölüm"},kayboldum:{tr:"Yön kaybı",jung:"Bilinçdışında kaybolma",islami:"Hidayet arayışı",cat:"eylem",display:"kaybolmak"}};

const EMOTIONS={korku:{w:["kork","kaç","düş","kaybol","karanlık","panik","tehlike","kovalam","kovalıyordu","kabus","kaçtım"],c:"#E24B4A",i:"😰",l:"Korku"},huzur:{w:["huzur","sakin","rahat","güzel","sıcak","ışık","cennet","dingin"],c:"#1D9E75",i:"😌",l:"Huzur"},merak:{w:["merak","keşf","ara","bul","gizli","bilinmeyen","sır","tuhaf","garip"],c:"#378ADD",i:"🤔",l:"Merak"},hüzün:{w:["üzül","ağla","kayıp","özle","yalnız","ayrıl","gözyaş","hüzün"],c:"#534AB7",i:"😢",l:"Hüzün"},mutluluk:{w:["mutlu","sevin","gül","dans","kutla","neşe","harika"],c:"#EF9F27",i:"😊",l:"Mutluluk"},öfke:{w:["kız","öfke","sinir","kavga","bağır","yık","nefret"],c:"#A32D2D",i:"😤",l:"Öfke"},şaşkınlık:{w:["şaşır","tuhaf","inanamadım","birden"],c:"#D85A30",i:"😲",l:"Şaşkınlık"}};

function generateCivs(symbols,dom){const f=symbols[0];const e=dom.l||"belirsiz";return[{id:"yusuf",title:"Hz. Yusuf Geleneği",icon:"🕌",interpretation:f?`"${f.name}" sembolü Hz. Yusuf'un tabir geleneğinde derin anlam taşır. ${f.islami}. Bu rüya hayırlı bir kapının aralanmakta olduğuna işaret edebilir. Sabırla bekle — en güzel tabirler sabredenler içindir.`:`Kalbin derinliklerinden bir mesaj. Her rüya bir hikmet barındırır.`},{id:"jung",title:"Carl Jung — Arketipler",icon:"🧠",interpretation:f?`"${f.name}" Jung perspektifinden ${f.jung}. ${e} duygusunun baskınlığı, bilinçdışının işlenmemiş psişik malzeme sunduğunu gösterir. Beynin gündüz bastırdığın bir şeyi yeniden yapılandırıyor — bu iyileşme süreci.`:`Kolektif bilinçdışından bir mesaj. Her rüya bireyselleşme yolculuğunun parçası.`},{id:"shaman",title:"Şamanik Yolculuk",icon:"🦅",interpretation:f?`"${f.name}" şaman geleneğinde ruh rehberi olarak belirmiş olabilir. ${f.tr}. Bu yolculukta gösterilen her şey öğreti — korkuların bile güçlendirmek için orada.`:`Ruhun bu gece yolculuğa çıktı. Gördüklerini rehber olarak kabul et.`},{id:"inca",title:"İnka Bilgeliği",icon:"🌄",interpretation:f?`İnka kozmolojisinde "${f.name}" evrensel enerji akışında senin için bir işaret. ${e} duygusunun baskınlığı ruhsal dengenin kalibre edildiğini gösterir. "Rüya, uyanıkken göremediğin gerçeği gösterir."`:`Pachamama sana mesaj gönderdi. İnka bilgeleri her rüyayı evrenin fısıltısı görür.`},{id:"sufi",title:"Sufi Makamları",icon:"🌀",interpretation:f?`Tasavvufta "${f.name}" seyr-i süluk yolculuğundaki makamı yansıtıyor. ${f.islami}. Mevlana: "Gecenin karanlığında gizlenen ışığı arayanlar, şafakta onu kalplerinde bulurlar."`:`Kalbin bu gece ayna tuttu. Her rüya ruhun vuslat arayışının yansıması.`},{id:"freud",title:"Freud — Bilinçaltı",icon:"🛋️",interpretation:f?`"${f.name}" Freud'a göre bastırılmış arzu veya çözümlenmemiş çatışmanın sembolik ifadesi. ${f.tr}. ${e} yoğunluğu id-süperego diyaloğuna işaret ediyor. Korkutucu değil — beynin kendini onarıyor.`:`Bilinçaltın konuştu. Her rüya bastırılmış düşüncelerin sembolik ifadesi.`}];}

function analyzeDream(text){const lower=text.toLowerCase().replace(/[.,!?;:'"()]/g," ");const words=lower.split(/\s+/).filter(Boolean);const symbols=[];const seen=new Set();Object.entries(SDB).forEach(([k,v])=>{const dn=v.display||k;if(seen.has(dn))return;if(words.some(w=>w===k)||(k.length>3&&lower.includes(k))){seen.add(dn);symbols.push({name:dn,...v});}});const emotions=[];Object.entries(EMOTIONS).forEach(([,v])=>{const s=v.w.filter(w=>lower.includes(w)).length;if(s>0)emotions.push({label:v.l,icon:v.i,color:v.c,score:s});});emotions.sort((a,b)=>b.score-a.score);const dom=emotions[0]||{label:"Merak",icon:"🤔",color:"#378ADD",l:"Merak"};const intensity=Math.min(100,Math.round((emotions.reduce((s,e)=>s+e.score,0)/4)*100));let title="Gece Fısıltısı";if(symbols.length>=2)title=symbols.slice(0,2).map(s=>s.name.charAt(0).toUpperCase()+s.name.slice(1)).join(" ve ")+" Rüyası";else if(symbols.length===1)title=symbols[0].name.charAt(0).toUpperCase()+symbols[0].name.slice(1)+"'ın Çağrısı";const ue=["Bir yere ait olduğunu hissedip aynı anda orada yabancı olmak","Bir şeyin bittiğini bilmek ama henüz üzülmemiş olmak","Tanıdık bir yere ilk kez gidiyormuş gibi hissetmek","Birini özlediğini fark etmeden önce hissettiğin sızı","Uyanıkken yaşanmamış bir anıyı hatırlamak"];const tx=["Sabah çiyinin cam üzerindeki serinliği gibi","Eski kitap sayfalarının kokusu gibi","Uzak odadan gelen piyano titreşimi gibi","Gün batımında denize bakmanın iç çekişi gibi"];let fb=symbols.length>0?`Rüyan beyninin gece yaptığı derin çalışmanın ürünü. ${dom.label} duygusunun baskınlığı bilinçaltının dikkat etmeni istediği alanı gösteriyor. "${symbols[0].name}" tesadüf değil — beynin bunu binlerce imgeden seçti. Bu iyileşme işareti. Hislere odaklan.`:`Rüyan sembolik olarak sessiz ama beynin dinlenme modunda. En derin mesajlar en sakin rüyalarda gizlenir.`;return{title,civilizations:generateCivs(symbols,dom),symbols,emotions,dominantEmotion:dom,emotion_atlas:{primary_emotion:dom.label,primary_icon:dom.icon,primary_color:dom.color,secondary_emotion:emotions[1]?.label||null,unnamed_emotion:ue[symbols.length%ue.length],emotional_texture:tx[words.length%tx.length],reflective_feedback:fb,intensity},lucid_coach:{tonight_exercise:"Yatmadan önce ellerine 30 saniye bak, her parmağını say. Gözlerini kapa ve 'rüyamda ellerime bakacağım' de.",reality_check:"Gün içinde 5 kez 'bu rüya mı?' diye sor. Ellerine bak.",dream_sign:symbols.length>0?`"${symbols[0].name}" senin rüya işaretin — rüyanda gördüğünde 'bu bir rüya!' de.`:"Tekrar eden tema bul — bu senin rüya işaretin.",progress_note:"Her kayıt lucid rüyaya bir adım. Hipokampüs güçleniyor."}};}

// ==========================================
// STORAGE & HELPERS
// ==========================================
function saveL(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
function loadL(k){try{const v=localStorage.getItem(k);return v?JSON.parse(v):null;}catch(e){return null;}}
function genCode(){const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="ONX-";for(let i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return r;}
function getStreak(dreams){if(!dreams.length)return 0;const today=new Date();today.setHours(0,0,0,0);const dates=[...new Set(dreams.map(d=>{const dt=new Date(d.timestamp||d.id);dt.setHours(0,0,0,0);return dt.getTime();}))].sort((a,b)=>b-a);let streak=0,check=today.getTime();for(const dt of dates){if(dt===check||dt===check-86400000){streak++;check=dt;}else if(dt<check-86400000)break;}return Math.max(streak,dates[0]===today.getTime()?1:0);}
function getReturnMsg(dreams){if(!dreams.length)return"İlk rüyanı kaydetmeye hazır mısın?";const diff=Date.now()-(dreams[0].timestamp||dreams[0].id);const days=Math.floor(diff/86400000);if(days===0)return null;if(days===1)return"Dün gece ne gördün?";if(days<=3)return`${days} gündür sessizsin. Bilinçaltın bekliyor.`;if(days<=7)return"Rüyaların hâlâ sana mektup yazıyor.";return`${days} gündür yoktun. Beynin her gece çalışmaya devam etti.`;}

// ==========================================
// TRENDS & STATS
// ==========================================
function getDreamStats(dreams){
  const now=Date.now();
  const d30=dreams.filter(d=>(d.timestamp||d.id)>now-30*86400000);
  const d7=dreams.filter(d=>(d.timestamp||d.id)>now-7*86400000);

  // Daily counts for last 14 days
  const dailyCounts=[];
  for(let i=13;i>=0;i--){
    const dayStart=new Date();dayStart.setHours(0,0,0,0);dayStart.setDate(dayStart.getDate()-i);
    const dayEnd=dayStart.getTime()+86400000;
    const count=dreams.filter(d=>{const t=d.timestamp||d.id;return t>=dayStart.getTime()&&t<dayEnd;}).length;
    const label=dayStart.toLocaleDateString("tr-TR",{day:"numeric",month:"short"});
    dailyCounts.push({label,count,isToday:i===0});
  }

  // Top symbols (30 day)
  const symCount={};
  d30.forEach(d=>(d.data?.symbols||[]).forEach(s=>{symCount[s.name]=(symCount[s.name]||0)+1;}));
  const topSymbols=Object.entries(symCount).sort((a,b)=>b[1]-a[1]).slice(0,6);

  // Emotion breakdown (30 day)
  const emoCount={};
  d30.forEach(d=>{const e=d.data?.emotion_atlas?.primary_emotion;if(e)emoCount[e]=(emoCount[e]||0)+1;});
  const topEmotions=Object.entries(emoCount).sort((a,b)=>b[1]-a[1]);
  const emoTotal=topEmotions.reduce((s,e)=>s+e[1],0);

  // Day of week pattern
  const dowCount=[0,0,0,0,0,0,0];
  const dowNames=["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"];
  d30.forEach(d=>{const day=new Date(d.timestamp||d.id).getDay();dowCount[day]++;});

  // Average intensity
  const intensities=d30.map(d=>d.data?.emotion_atlas?.intensity||0).filter(Boolean);
  const avgIntensity=intensities.length?Math.round(intensities.reduce((a,b)=>a+b,0)/intensities.length):0;

  return{dailyCounts,topSymbols,topEmotions,emoTotal,dowCount,dowNames,avgIntensity,total30:d30.length,total7:d7.length,totalAll:dreams.length};
}

// ==========================================
// COMPONENTS
// ==========================================
function GlassCard({title,icon,children,delay=0,accent}){
  return(<div style={{background:"rgba(13,11,30,0.4)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:`1px solid ${accent?accent+"18":"rgba(108,60,224,0.08)"}`,borderRadius:20,padding:"20px 22px",marginBottom:16,animation:`fadeUp 0.6s ease ${delay}s both`,transition:"transform 0.2s",}}>{title&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>{icon&&<span style={{fontSize:15}}>{icon}</span>}<span style={{fontSize:10,textTransform:"uppercase",letterSpacing:3,color:accent||"#6B6590",fontWeight:600}}>{title}</span></div>}{children}</div>);
}

function CivCard({civ,delay}){
  const[open,setOpen]=useState(false);
  return(<div onClick={()=>setOpen(!open)} style={{background:open?"rgba(26,19,64,0.5)":"rgba(13,11,30,0.25)",border:open?"1px solid rgba(108,60,224,0.18)":"1px solid rgba(108,60,224,0.05)",borderRadius:18,padding:open?"18px 20px":"15px 20px",marginBottom:10,cursor:"pointer",transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",animation:`fadeUp 0.5s ease ${delay}s both`}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}><span style={{fontSize:22}}>{civ.icon}</span><span style={{fontSize:14,fontWeight:500,color:open?"#E8E5F2":"#8B83AE",transition:"color 0.3s"}}>{civ.title}</span></div>
      <span style={{color:"#4A4570",fontSize:12,transition:"transform 0.4s",transform:open?"rotate(180deg)":""}}>▾</span>
    </div>
    <div style={{maxHeight:open?300:0,overflow:"hidden",transition:"max-height 0.5s cubic-bezier(0.4,0,0.2,1),opacity 0.4s",opacity:open?1:0}}>
      <div style={{marginTop:16,fontFamily:"Crimson Pro,serif",fontSize:16,lineHeight:1.9,color:"#D0CCE0",fontStyle:"italic",borderTop:"1px solid rgba(108,60,224,0.06)",paddingTop:16}}>{civ.interpretation}</div>
    </div>
  </div>);
}

function MiniBar({value,max,color,label}){
  const pct=max>0?(value/max)*100:0;
  return(<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
    <span style={{fontSize:11,color:"#8B83AE",width:40,textAlign:"right",flexShrink:0}}>{label}</span>
    <div style={{flex:1,height:6,background:"rgba(255,255,255,0.03)",borderRadius:3,overflow:"hidden"}}>
      <div style={{width:`${pct}%`,height:6,borderRadius:3,background:color||"#6C3CE0",transition:"width 1s ease"}}/>
    </div>
    <span style={{fontSize:11,color:"#6B6590",width:20,flexShrink:0}}>{value}</span>
  </div>);
}

// ==========================================
// ONBOARDING
// ==========================================
function Onboarding({onComplete}){
  const[step,setStep]=useState(0);
  const slides=[{icon:"🌙",title:"Rüyanı anlat",sub:"Uyanır uyanmaz kaydet. Beynin 10 dakika sonra %95'ini silecek.",accent:"#6C3CE0"},{icon:"🕌",title:"6 medeniyet analiz etsin",sub:"Hz. Yusuf, Jung, Şaman, İnka, Sufi, Freud — her biri farklı pencereden yorumlar.",accent:"#1DE9B6"},{icon:"💜",title:"Bilinçaltını keşfet",sub:"Duygu atlası, adı konmamış duygular, lucid rüya koçu — beynini bu kadar yakından hiç tanımadın.",accent:"#EF9F27"}];
  const s=slides[step];
  return(<div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 24px"}}>
    <div style={{textAlign:"center",marginBottom:44}} key={step}>
      <div style={{fontSize:60,marginBottom:24,animation:"fadeUp 0.5s ease"}}>{s.icon}</div>
      <h2 style={{fontSize:26,fontWeight:200,marginBottom:14,color:"#E8E5F2",letterSpacing:1,animation:"fadeUp 0.5s ease 0.1s both"}}>{s.title}</h2>
      <p style={{fontSize:14,color:"#8B83AE",lineHeight:1.7,maxWidth:300,margin:"0 auto",animation:"fadeUp 0.5s ease 0.15s both"}}>{s.sub}</p>
    </div>
    <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:36}}>
      {slides.map((_,i)=><div key={i} onClick={()=>setStep(i)} style={{width:i===step?28:8,height:8,borderRadius:4,background:i===step?s.accent:"rgba(108,60,224,0.15)",transition:"all 0.4s cubic-bezier(0.4,0,0.2,1)",cursor:"pointer"}}/>)}
    </div>
    {step<2?<button onClick={()=>setStep(step+1)} style={{display:"block",width:"100%",maxWidth:320,margin:"0 auto",padding:"18px 24px",border:"none",borderRadius:18,background:`linear-gradient(135deg,${s.accent},${s.accent}88)`,color:"#fff",fontFamily:"Outfit",fontSize:16,fontWeight:500,cursor:"pointer",letterSpacing:0.5,transition:"transform 0.2s"}}>Devam</button>
    :<button onClick={onComplete} style={{display:"block",width:"100%",maxWidth:320,margin:"0 auto",padding:"18px 24px",border:"none",borderRadius:18,background:"linear-gradient(135deg,#6C3CE0,#4A2DB0)",color:"#fff",fontFamily:"Outfit",fontSize:16,fontWeight:500,cursor:"pointer",letterSpacing:0.5}}>Keşfetmeye başla</button>}
    <button onClick={onComplete} style={{display:"block",margin:"18px auto 0",background:"none",border:"none",color:"#3D385A",fontFamily:"Outfit",fontSize:12,cursor:"pointer",letterSpacing:1}}>atla</button>
    {step===2&&<div style={{marginTop:36,animation:"fadeUp 0.6s ease 0.2s both"}}><div style={{background:"rgba(13,11,30,0.5)",borderRadius:18,padding:"18px 20px",border:"1px solid rgba(108,60,224,0.08)"}}>
      <p style={{fontSize:9,color:"#4A4570",letterSpacing:2,marginBottom:10}}>ÖRNEK ANALİZ</p>
      <p style={{fontSize:15,fontWeight:500,color:"#E8E5F2",marginBottom:8}}>Deniz ve Anahtar Rüyası</p>
      <div style={{display:"flex",gap:5,marginBottom:10,flexWrap:"wrap"}}>{["🕌 Hz. Yusuf","🧠 Jung","🦅 Şaman","🌄 İnka","🌀 Sufi","🛋️ Freud"].map(c=><span key={c} style={{fontSize:10,padding:"4px 10px",borderRadius:12,background:"rgba(108,60,224,0.1)",color:"#8B83AE"}}>{c}</span>)}</div>
      <p style={{fontSize:11,color:"#6B6590",fontStyle:"italic"}}>💜 Merak · ⚡ %72 yoğunluk · 🧘 Lucid koçu dahil</p>
    </div></div>}
  </div>);
}

// ==========================================
// TRENDS PAGE
// ==========================================
function TrendsPage({dreams,onBack}){
  const stats=getDreamStats(dreams);
  const maxDaily=Math.max(...stats.dailyCounts.map(d=>d.count),1);
  const maxSym=stats.topSymbols.length?stats.topSymbols[0][1]:1;
  const maxDow=Math.max(...stats.dowCount,1);
  const emoColors={"Korku":"#E24B4A","Huzur":"#1D9E75","Merak":"#378ADD","Hüzün":"#534AB7","Mutluluk":"#EF9F27","Öfke":"#A32D2D","Şaşkınlık":"#D85A30"};

  return(<div style={{animation:"fadeUp 0.5s ease"}}>
    <button onClick={onBack} style={{background:"none",border:"none",color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← geri</button>
    <h2 style={{fontSize:20,fontWeight:200,margin:"14px 0 20px",letterSpacing:1}}>Rüya trendleri</h2>

    {/* Overview stats */}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
      {[{v:stats.totalAll,l:"Toplam rüya",c:"#B89CFF"},{v:stats.total30,l:"Son 30 gün",c:"#1DE9B6"},{v:`%${stats.avgIntensity}`,l:"Ort. yoğunluk",c:"#EF9F27"}].map((s,i)=>(
        <div key={i} style={{textAlign:"center",padding:"16px 8px",background:"rgba(13,11,30,0.4)",borderRadius:16,border:"1px solid rgba(108,60,224,0.06)"}}>
          <div style={{fontSize:24,fontWeight:300,color:s.c,marginBottom:4}}>{s.v}</div>
          <div style={{fontSize:9,color:"#4A4570",letterSpacing:1.5,textTransform:"uppercase"}}>{s.l}</div>
        </div>
      ))}
    </div>

    {/* 14-day chart */}
    <GlassCard title="Son 14 gün" icon="📊" accent="#6C3CE0">
      <div style={{display:"flex",alignItems:"flex-end",gap:4,height:100,paddingTop:8}}>
        {stats.dailyCounts.map((d,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:"100%",background:d.isToday?"#6C3CE0":d.count>0?"rgba(108,60,224,0.4)":"rgba(108,60,224,0.08)",borderRadius:4,height:`${Math.max(4,(d.count/maxDaily)*80)}px`,transition:"height 1s ease",minHeight:4}}/>
            <span style={{fontSize:7,color:d.isToday?"#B89CFF":"#3D385A",whiteSpace:"nowrap"}}>{d.label}</span>
          </div>
        ))}
      </div>
    </GlassCard>

    {/* Top symbols */}
    {stats.topSymbols.length>0&&(
      <GlassCard title="En çok görülen semboller" icon="🔮" delay={0.1} accent="#B89CFF">
        {stats.topSymbols.map(([name,count],i)=><MiniBar key={name} label={name} value={count} max={maxSym} color="#6C3CE0"/>)}
      </GlassCard>
    )}

    {/* Emotion breakdown */}
    {stats.topEmotions.length>0&&(
      <GlassCard title="Duygu dağılımı" icon="💜" delay={0.2} accent="#1DE9B6">
        {stats.topEmotions.map(([name,count],i)=>{
          const pct=stats.emoTotal>0?Math.round((count/stats.emoTotal)*100):0;
          return(<div key={name} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
            <span style={{fontSize:12,color:emoColors[name]||"#8B83AE",width:70,fontWeight:500}}>{name}</span>
            <div style={{flex:1,height:8,background:"rgba(255,255,255,0.03)",borderRadius:4,overflow:"hidden"}}>
              <div style={{width:`${pct}%`,height:8,borderRadius:4,background:emoColors[name]||"#6C3CE0",transition:"width 1.2s ease"}}/>
            </div>
            <span style={{fontSize:11,color:"#6B6590",width:30}}>%{pct}</span>
          </div>);
        })}
      </GlassCard>
    )}

    {/* Day of week */}
    <GlassCard title="Hangi gün daha çok rüya görüyorsun?" icon="📅" delay={0.3} accent="#EF9F27">
      <div style={{display:"flex",alignItems:"flex-end",gap:6,height:80}}>
        {stats.dowCount.map((count,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
            <div style={{width:"100%",background:count===maxDow&&count>0?"#EF9F27":"rgba(239,159,39,0.25)",borderRadius:4,height:`${Math.max(4,(count/maxDow)*60)}px`,transition:"height 1s ease",minHeight:4}}/>
            <span style={{fontSize:9,color:count===maxDow&&count>0?"#EF9F27":"#4A4570"}}>{stats.dowNames[i]}</span>
          </div>
        ))}
      </div>
    </GlassCard>

    {dreams.length<3&&<p style={{textAlign:"center",fontSize:12,color:"#3D385A",padding:"12px 0",fontStyle:"italic"}}>Daha fazla rüya kaydettikçe trendler zenginleşecek.</p>}
  </div>);
}

// ==========================================
// APP
// ==========================================
export default function OneiroxApp(){
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

  useEffect(()=>{
    setOrbs([{id:0,s:180,x:8,y:12,c:"#6C3CE0",d:20},{id:1,s:280,x:72,y:55,c:"#1DE9B6",d:28},{id:2,s:220,x:18,y:78,c:"#534AB7",d:24},{id:3,s:160,x:82,y:28,c:"#EF9F27",d:32}]);
    const ob=loadL("oneirox-onboarded");const u=loadL("oneirox-user");
    if(u){setUser(u);const d=loadL("oneirox-dreams-"+u.code)||[];setDreams(d);setStreak(getStreak(d));setReturnMsg(getReturnMsg(d));setScreen("home");}
    else if(ob)setScreen("welcome");else setScreen("onboarding");
  },[]);

  useEffect(()=>{if(screen==="record"&&taRef.current)setTimeout(()=>taRef.current.focus(),100);},[screen]);

  const completeOb=()=>{saveL("oneirox-onboarded",true);setScreen("welcome");};
  const guestStart=()=>{const n=nameInput.trim()||"Gezgin";const c=genCode();const u={name:n,code:c};setUser(u);saveL("oneirox-user",u);setScreen("home");};
  const codeLogin=()=>{if(!codeInput.trim())return;const c=codeInput.trim().toUpperCase();const u={name:"Gezgin",code:c};setUser(u);saveL("oneirox-user",u);const d=loadL("oneirox-dreams-"+c)||[];setDreams(d);setStreak(getStreak(d));setScreen("home");};

  const doAnalyze=()=>{
    if(!dreamText.trim()||dreamText.trim().length<10)return;
    setScreen("analyzing");
    const msgs=["Rüya katmanları açılıyor...","Hz. Yusuf'un bilgeliği aranıyor...","Şaman davulları çalınıyor...","Arketipler uyanıyor...","Duygu dokusu hissediliyor..."];
    let mi=0;setLoadingMsg(msgs[0]);
    const iv=setInterval(()=>{mi=(mi+1)%msgs.length;setLoadingMsg(msgs[mi]);},1500);
    setTimeout(()=>{clearInterval(iv);const r=analyzeDream(dreamText);const dream={id:Date.now(),timestamp:Date.now(),text:dreamText.trim(),title:r.title,date:new Date().toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"}),time:new Date().toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"}),data:r};setAnalysis(dream);const up=[dream,...dreams].slice(0,50);setDreams(up);setStreak(getStreak(up));setReturnMsg(null);if(user)saveL("oneirox-dreams-"+user.code,up);setTab("civilizations");setScreen("result");},2500);
  };

  const wc=dreamText.split(/\s+/).filter(Boolean).length;
  const nav=(s)=>{setScreen(s);if(s==="home"){setDreamText("");setAnalysis(null);}};
  const bp={display:"block",width:"100%",padding:"18px 24px",border:"none",borderRadius:18,background:"linear-gradient(135deg,#6C3CE0,#4A2DB0)",color:"#fff",fontFamily:"Outfit,sans-serif",fontSize:15,fontWeight:500,cursor:"pointer",letterSpacing:0.5,transition:"transform 0.2s"};
  const d=analysis?.data;

  return(<>
    <style dangerouslySetInnerHTML={{__html:`
      @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      @keyframes pulse{0%,100%{box-shadow:0 0 40px rgba(108,60,224,0.15)}50%{box-shadow:0 0 80px rgba(108,60,224,0.35)}}
      @keyframes spin{to{transform:rotate(360deg)}}
      @keyframes rec{0%,100%{opacity:1}50%{opacity:.3}}
      @keyframes breathe{0%,100%{transform:scale(1);opacity:0.05}50%{transform:scale(1.2);opacity:0.1}}
      @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
      *{box-sizing:border-box;margin:0;padding:0}body{font-family:Outfit,sans-serif;background:#0A0818}
      ::selection{background:rgba(108,60,224,0.3)}input::placeholder,textarea::placeholder{color:#2D2850}
      button:active{transform:scale(0.97)!important}
    `}}/>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>

    <div style={{fontFamily:"Outfit,sans-serif",background:"linear-gradient(180deg,#0A0818 0%,#0D0B1E 50%,#0A0818 100%)",minHeight:"100vh",color:"#E8E5F2",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
        {orbs.map(o=><div key={o.id} style={{position:"absolute",width:o.s,height:o.s,borderRadius:"50%",background:`radial-gradient(circle,${o.c}10,transparent 70%)`,left:`${o.x}%`,top:`${o.y}%`,animation:`breathe ${o.d}s ease-in-out infinite`,filter:"blur(50px)"}}/>)}
      </div>

      <div style={{maxWidth:440,margin:"0 auto",padding:"12px 22px",position:"relative",zIndex:1}}>

        {screen==="loading"&&<div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:36,height:36,border:"2px solid rgba(108,60,224,0.1)",borderTopColor:"#6C3CE040",borderRadius:"50%",animation:"spin 1s linear infinite"}}/></div>}

        {screen==="onboarding"&&<Onboarding onComplete={completeOb}/>}

        {screen==="welcome"&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",animation:"fadeUp 0.8s ease"}}>
            <div style={{textAlign:"center",marginBottom:36}}>
              <div style={{width:84,height:84,borderRadius:"50%",margin:"0 auto 28px",background:"radial-gradient(circle at 35% 35%,#B89CFF,#6C3CE0,#1A1340)",animation:"pulse 6s ease-in-out infinite,float 4s ease-in-out infinite",position:"relative"}}><div style={{position:"absolute",inset:-8,borderRadius:"50%",border:"1px solid rgba(108,60,224,0.08)",animation:"spin 30s linear infinite"}}/></div>
              <h1 style={{fontSize:32,fontWeight:200,letterSpacing:12,marginBottom:12}}>ONEIROX</h1>
              <p style={{fontFamily:"Crimson Pro,serif",fontSize:16,fontStyle:"italic",color:"#6B6590",lineHeight:1.5}}>Rüyaların sana bir şey anlatıyor.</p>
            </div>
            {welcomeMode==="main"&&<div style={{animation:"fadeUp 0.5s ease"}}>
              <input value={nameInput} onChange={e=>setNameInput(e.target.value)} placeholder="Adın (isteğe bağlı)" style={{width:"100%",padding:"16px 20px",background:"rgba(13,11,30,0.5)",border:"1px solid rgba(108,60,224,0.08)",borderRadius:16,color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,outline:"none",marginBottom:12,transition:"border-color 0.3s"}} onFocus={e=>e.target.style.borderColor="rgba(108,60,224,0.25)"} onBlur={e=>e.target.style.borderColor="rgba(108,60,224,0.08)"}/>
              <button onClick={guestStart} style={bp}>Başla</button>
              <div style={{display:"flex",alignItems:"center",gap:14,margin:"24px 0"}}><div style={{flex:1,height:1,background:"rgba(108,60,224,0.08)"}}/><span style={{fontSize:9,color:"#3D385A",letterSpacing:3}}>VEYA</span><div style={{flex:1,height:1,background:"rgba(108,60,224,0.08)"}}/></div>
              <button onClick={()=>setWelcomeMode("code")} style={{display:"block",width:"100%",padding:"15px 20px",background:"transparent",border:"1px solid rgba(108,60,224,0.1)",borderRadius:16,color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",transition:"border-color 0.3s"}}>Kodumla devam et</button>
              <p style={{textAlign:"center",fontSize:10,color:"#2D2850",marginTop:28,lineHeight:1.6}}>Üye olmana gerek yok. Sana özel bir kod vereceğiz.</p>
            </div>}
            {welcomeMode==="code"&&<div style={{animation:"fadeUp 0.4s ease"}}>
              <input value={codeInput} onChange={e=>setCodeInput(e.target.value)} placeholder="ONX-XXXXXX" style={{width:"100%",padding:"16px 20px",background:"rgba(13,11,30,0.5)",border:"1px solid rgba(108,60,224,0.08)",borderRadius:16,color:"#E8E5F2",fontFamily:"Outfit",fontSize:18,outline:"none",textAlign:"center",letterSpacing:4,marginBottom:14}}/>
              <button onClick={codeLogin} style={{...bp,marginBottom:12}}>Devam et</button>
              <button onClick={()=>setWelcomeMode("main")} style={{display:"block",width:"100%",padding:12,background:"transparent",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:12,cursor:"pointer"}}>← geri</button>
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
            <div style={{display:"flex",gap:6}}>
              {screen!=="lucid"&&<button onClick={()=>setScreen("lucid")} style={{background:"rgba(29,233,182,0.05)",border:"1px solid rgba(29,233,182,0.08)",color:"#1DE9B6",padding:"5px 11px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",letterSpacing:1.5,fontWeight:500}}>LUCID</button>}
              {dreams.length>=2&&screen!=="trends"&&<button onClick={()=>setScreen("trends")} style={{background:"rgba(239,159,39,0.05)",border:"1px solid rgba(239,159,39,0.08)",color:"#EF9F27",padding:"5px 11px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",letterSpacing:1.5,fontWeight:500}}>📊</button>}
              {dreams.length>0&&screen!=="journal"&&<button onClick={()=>setScreen("journal")} style={{background:"rgba(108,60,224,0.05)",border:"1px solid rgba(108,60,224,0.08)",color:"#8B83AE",padding:"5px 11px",borderRadius:20,fontFamily:"Outfit",fontSize:9,cursor:"pointer",letterSpacing:1.5,fontWeight:500}}>{dreams.length}</button>}
            </div>
          </div>
        )}

        {/* HOME */}
        {screen==="home"&&(
          <div style={{animation:"fadeUp 0.6s ease",textAlign:"center",paddingTop:16}}>
            {user?.name&&user.name!=="Gezgin"&&<p style={{fontSize:13,color:"#4A4570",marginBottom:4}}>Hoş geldin, <span style={{color:"#8B83AE"}}>{user.name}</span></p>}
            {returnMsg&&<div style={{background:"rgba(108,60,224,0.06)",border:"1px solid rgba(108,60,224,0.08)",borderRadius:16,padding:"14px 18px",marginBottom:16,animation:"fadeUp 0.5s ease"}}><p style={{fontFamily:"Crimson Pro,serif",fontSize:15,fontStyle:"italic",color:"#B89CFF",lineHeight:1.6}}>{returnMsg}</p></div>}
            {streak>=2&&<div style={{background:"rgba(239,159,39,0.06)",border:"1px solid rgba(239,159,39,0.08)",borderRadius:14,padding:"10px 16px",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><span style={{fontSize:16}}>🔥</span><span style={{fontSize:13,color:"#EF9F27",fontWeight:500}}>{streak} gün üst üste!</span></div>}
            <div style={{width:80,height:80,borderRadius:"50%",margin:"8px auto 24px",background:"radial-gradient(circle at 35% 35%,#B89CFF,#6C3CE0,#1A1340)",animation:"pulse 6s ease-in-out infinite,float 4s ease-in-out infinite"}}/>
            <p style={{fontFamily:"Crimson Pro,serif",fontSize:19,fontStyle:"italic",color:"#A8A3C0",lineHeight:1.6,marginBottom:4}}>Rüyaların sana bir şey anlatıyor.</p>
            <p style={{fontFamily:"Crimson Pro,serif",fontSize:19,fontStyle:"italic",color:"#D0CCE0",lineHeight:1.6,marginBottom:4}}>Birlikte keşfedelim mi?</p>
            <button onClick={()=>setScreen("record")} style={{...bp,marginTop:28,marginBottom:14}}>Rüyamı anlat</button>
            {dreams.length>0&&<button onClick={()=>setScreen("journal")} style={{display:"block",width:"100%",padding:"15px 22px",background:"transparent",border:"1px solid rgba(108,60,224,0.1)",borderRadius:18,color:"#6B6590",fontFamily:"Outfit",fontSize:13,cursor:"pointer",marginBottom:10,transition:"border-color 0.3s"}}>Rüya günlüğüm</button>}
            {dreams.length>=2&&<button onClick={()=>setScreen("trends")} style={{display:"block",width:"100%",padding:"15px 22px",background:"transparent",border:"1px solid rgba(239,159,39,0.08)",borderRadius:18,color:"#EF9F2780",fontFamily:"Outfit",fontSize:13,cursor:"pointer",marginBottom:10}}>📊 Rüya trendlerim</button>}
            {user?.code&&<div style={{marginTop:24,padding:"14px 18px",background:"rgba(13,11,30,0.25)",borderRadius:16,border:"1px solid rgba(108,60,224,0.04)"}}><p style={{fontSize:8,color:"#2D2850",letterSpacing:3,marginBottom:4}}>SENİN KODUN</p><p style={{fontSize:17,fontWeight:600,letterSpacing:5,color:"#6C3CE0"}}>{user.code}</p></div>}
          </div>
        )}

        {/* RECORD */}
        {screen==="record"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← geri</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"18px 0 10px",letterSpacing:1}}>Rüyanı anlat</h2>
            <p style={{color:"#3D385A",fontSize:12,marginBottom:18,lineHeight:1.7}}>Mekanlar, yüzler, sesler, renkler, duygular — beynin bunları bir sebepten seçti.</p>
            <textarea ref={taRef} value={dreamText} onChange={e=>setDreamText(e.target.value)} placeholder="Bu gece rüyamda..." style={{width:"100%",minHeight:220,background:"rgba(13,11,30,0.4)",border:"1px solid rgba(108,60,224,0.06)",borderRadius:18,padding:"20px 22px",color:"#E8E5F2",fontFamily:"Outfit",fontSize:14,lineHeight:1.9,resize:"vertical",outline:"none",transition:"border-color 0.3s"}} onFocus={e=>e.target.style.borderColor="rgba(108,60,224,0.2)"} onBlur={e=>e.target.style.borderColor="rgba(108,60,224,0.06)"}/>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#2D2850",margin:"10px 4px 18px"}}><span>{wc} kelime</span><span style={{color:wc>20?"#1DE9B650":wc>8?"#EF9F2750":""}}>{wc>20?"detay seviyesi yüksek":wc>8?"iyi gidiyorsun":""}</span></div>
            <button onClick={doAnalyze} style={{...bp,opacity:dreamText.trim().length<10?0.25:1,pointerEvents:dreamText.trim().length<10?"none":"auto"}}>analiz et</button>
          </div>
        )}

        {/* ANALYZING */}
        {screen==="analyzing"&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"90px 0",animation:"fadeUp 0.4s ease"}}>
            <div style={{position:"relative",width:64,height:64,marginBottom:32}}>
              <div style={{position:"absolute",inset:0,border:"2px solid rgba(108,60,224,0.06)",borderTopColor:"#6C3CE040",borderRadius:"50%",animation:"spin 1.2s linear infinite"}}/>
              <div style={{position:"absolute",inset:14,border:"1.5px solid rgba(29,233,182,0.04)",borderBottomColor:"#1DE9B630",borderRadius:"50%",animation:"spin 2s linear infinite reverse"}}/>
            </div>
            <p style={{color:"#6B6590",fontSize:13,letterSpacing:0.5}}>{loadingMsg}</p>
          </div>
        )}

        {/* RESULT */}
        {screen==="result"&&d&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← ana sayfa</button>
            <h2 style={{fontSize:24,fontWeight:200,margin:"14px 0 6px",lineHeight:1.4,letterSpacing:0.5}}>{analysis.title}</h2>
            <p style={{color:"#2D2850",fontSize:10,marginBottom:20,letterSpacing:1.5}}>{analysis.date} · {analysis.time}</p>

            <div style={{display:"flex",gap:4,marginBottom:18}}>
              {[{id:"civilizations",label:"Tabirler",icon:"🕌"},{id:"emotions",label:"Duygu Atlası",icon:"💜"},{id:"lucidResult",label:"Lucid",icon:"🧘"}].map(t=>(
                <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"9px 18px",borderRadius:24,fontSize:11,fontFamily:"Outfit",cursor:"pointer",border:tab===t.id?"1px solid rgba(108,60,224,0.2)":"1px solid rgba(108,60,224,0.04)",background:tab===t.id?"rgba(108,60,224,0.1)":"transparent",color:tab===t.id?"#E8E5F2":"#3D385A",fontWeight:tab===t.id?500:400,letterSpacing:0.5,transition:"all 0.3s"}}>{t.icon} {t.label}</button>
              ))}
            </div>

            {tab==="civilizations"&&d.civilizations&&d.civilizations.map((c,i)=><CivCard key={c.id} civ={c} delay={i*0.08}/>)}

            {tab==="emotions"&&d.emotion_atlas&&(<div>
              <GlassCard title="Duygusal çekirdek" icon={d.emotion_atlas.primary_icon} delay={0.1} accent={d.emotion_atlas.primary_color}>
                <div style={{fontSize:24,fontWeight:200,color:d.emotion_atlas.primary_color||"#B89CFF",marginBottom:6}}>{d.emotion_atlas.primary_emotion}</div>
                {d.emotion_atlas.secondary_emotion&&<div style={{fontSize:13,color:"#4A4570",marginBottom:14}}>+ {d.emotion_atlas.secondary_emotion}</div>}
                <div style={{height:3,background:"rgba(255,255,255,0.02)",borderRadius:2,marginBottom:12}}><div style={{width:`${d.emotion_atlas.intensity}%`,height:3,borderRadius:2,background:`linear-gradient(90deg,${d.emotion_atlas.primary_color||"#6C3CE0"}50,#1DE9B650)`,transition:"width 2s ease"}}/></div>
                {d.emotion_atlas.emotional_texture&&<p style={{fontSize:12,color:"#4A4570",fontStyle:"italic"}}>{d.emotion_atlas.emotional_texture}</p>}
              </GlassCard>
              {d.emotion_atlas.unnamed_emotion&&<GlassCard title="Adı henüz konmamış duygu" icon="🌊" delay={0.2} accent="#D85A30"><p style={{fontFamily:"Crimson Pro,serif",fontSize:17,lineHeight:1.9,color:"#D0CCE0",fontStyle:"italic"}}>{d.emotion_atlas.unnamed_emotion}</p></GlassCard>}
              {d.emotion_atlas.reflective_feedback&&<GlassCard title="Reflektif geri bildirim" icon="🪞" delay={0.3} accent="#1DE9B6"><p style={{fontFamily:"Crimson Pro,serif",fontSize:15,lineHeight:1.9,color:"#D0CCE0"}}>{d.emotion_atlas.reflective_feedback}</p></GlassCard>}
            </div>)}

            {tab==="lucidResult"&&d.lucid_coach&&(<div>
              <GlassCard title="Bu gece dene" icon="🌙" delay={0.1} accent="#6C3CE0"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>{d.lucid_coach.tonight_exercise}</p></GlassCard>
              <GlassCard title="Gerçeklik testi" icon="👁️" delay={0.15} accent="#1DE9B6"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>{d.lucid_coach.reality_check}</p></GlassCard>
              <GlassCard title="Rüya işaretin" icon="⚡" delay={0.2} accent="#EF9F27"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>{d.lucid_coach.dream_sign}</p></GlassCard>
              <GlassCard delay={0.25}><p style={{fontSize:13,color:"#1DE9B6",fontWeight:500,textAlign:"center"}}>{d.lucid_coach.progress_note}</p></GlassCard>
            </div>)}

            <div style={{marginTop:8}}><GlassCard title="Kayıt" delay={0.5}><p style={{fontSize:12,color:"#3D385A",lineHeight:1.8}}>{analysis.text}</p></GlassCard></div>
            <button onClick={()=>{setScreen("record");setDreamText("");setAnalysis(null);}} style={bp}>yeni rüya</button>
          </div>
        )}

        {/* TRENDS */}
        {screen==="trends"&&<TrendsPage dreams={dreams} onBack={()=>nav("home")}/>}

        {/* LUCID */}
        {screen==="lucid"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← geri</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 8px",letterSpacing:1}}>Lucid rüya koçu</h2>
            <p style={{color:"#3D385A",fontSize:12,marginBottom:18}}>Rüyanda uyanık olmayı öğren.</p>
            <GlassCard title="Nedir?" icon="💡" accent="#6C3CE0"><p style={{fontSize:13,color:"#D0CCE0",lineHeight:1.8}}>Rüya gördüğünün farkında olduğun andır. Prefrontal korteksin — normalde REM'de suskunlaşan bölge — tekrar aktif olur.</p></GlassCard>
            <GlassCard title="4 adım" icon="📋" delay={0.1} accent="#1DE9B6"><div style={{fontSize:13,color:"#D0CCE0",lineHeight:1.9}}><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>1.</span> Her sabah rüyanı kaydet.</p><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>2.</span> Gün içinde "bu rüya mı?" diye sor.</p><p style={{marginBottom:10}}><span style={{color:"#1DE9B6"}}>3.</span> Uyumadan "rüyamda fark edeceğim" de.</p><p><span style={{color:"#1DE9B6"}}>4.</span> 5 saat sonra 20 dk uyan, tekrar uyu.</p></div></GlassCard>
            <button onClick={()=>setScreen("record")} style={{...bp,marginTop:6}}>rüyamı kaydet</button>
          </div>
        )}

        {/* JOURNAL */}
        {screen==="journal"&&(
          <div style={{animation:"fadeUp 0.5s ease"}}>
            <button onClick={()=>nav("home")} style={{background:"none",border:"none",color:"#4A4570",fontFamily:"Outfit",fontSize:13,cursor:"pointer",padding:"6px 0"}}>← geri</button>
            <h2 style={{fontSize:22,fontWeight:200,margin:"14px 0 20px",letterSpacing:1}}>Rüya günlüğü</h2>
            {dreams.length===0?<div style={{textAlign:"center",padding:"60px 20px",color:"#3D385A"}}><p style={{marginBottom:16}}>Henüz rüya kaydetmedin.</p><button onClick={()=>setScreen("record")} style={{...bp,display:"inline-block",width:"auto",padding:"14px 36px"}}>ilk rüyanı kaydet</button></div>
            :dreams.map((dr,i)=>(
              <div key={dr.id} onClick={()=>{setAnalysis(dr);setTab("civilizations");setScreen("result");}} style={{display:"flex",alignItems:"center",gap:14,padding:"16px 18px",background:"rgba(13,11,30,0.3)",border:"1px solid rgba(108,60,224,0.04)",borderRadius:16,marginBottom:10,cursor:"pointer",animation:`fadeUp 0.4s ease ${i*0.06}s both`,transition:"background 0.3s"}}>
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
