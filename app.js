/* ===== Swiss Trip 2026 — app logic ===== */
'use strict';

/* ---------- i18n dictionary ---------- */
const I18N = {
  nav_overview:   { zh:'概覽', en:'Overview', de:'Übersicht' },
  nav_calendar:   { zh:'行程', en:'Itinerary', de:'Reiseplan' },
  nav_booking:    { zh:'票券', en:'Booking', de:'Tickets' },
  nav_budget:     { zh:'花費', en:'Expenses', de:'Ausgaben' },
  nav_spots:      { zh:'景點', en:'Spots', de:'Orte' },
  nav_checklist:  { zh:'清單', en:'Checklist', de:'Checkliste' },
  nav_retro:      { zh:'回顧', en:'Retro', de:'Rückblick' },
  nav_more:       { zh:'更多', en:'More', de:'Mehr' },
  lang_label:     { zh:'語言', en:'Language', de:'Sprache' },
  print:          { zh:'列印', en:'Print', de:'Drucken' },

  hdr_title:      { zh:'瑞士 9 天 · 四人同行', en:'Switzerland 9 Days · Party of 4', de:'Schweiz 9 Tage · Zu viert' },
  hdr_meta:       { zh:'2026/7/17（五）– 7/27（一）· 瑞士 9 天 · 4 位大人', en:'Jul 17 (Fri) – Jul 27 (Mon), 2026 · 9 days in CH · 4 adults', de:'17.–27. Juli 2026 · 9 Tage CH · 4 Erwachsene' },
  hdr_desc:       { zh:'蘇黎世 → 琉森 → Stoos → 因特拉肯 → 格林德瓦 → 策馬特', en:'Zurich → Lucerne → Stoos → Interlaken → Grindelwald → Zermatt', de:'Zürich → Luzern → Stoos → Interlaken → Grindelwald → Zermatt' },

  stat_total:     { zh:'實際花費', en:'Total Spent', de:'Ausgegeben' },
  stat_total_sub: { zh:'每人 · 出發後記帳', en:'per person · logged during trip', de:'p.P. · während der Reise' },
  stat_est:       { zh:'預估總額', en:'Estimated', de:'Budget' },
  stat_est_sub:   { zh:'每人 · 含機票', en:'per person · incl. flights', de:'p.P. · inkl. Flug' },
  stat_pois:      { zh:'景點數', en:'Spots', de:'Orte' },
  stat_pois_sub:  { zh:'6 個城市/區域', en:'across 6 areas', de:'in 6 Regionen' },
  stat_days:      { zh:'天數', en:'Days', de:'Tage' },
  stat_days_sub:  { zh:'請 7 天休 11 天', en:'7 days PTO → 11 off', de:'7 Urlaubstage', },

  info_title:     { zh:'夏季提示', en:'Summer notes', de:'Sommer-Hinweise' },
  info_body:      { zh:'七月是瑞士健行黃金季：山下約 25°C、First／Gornergrat 約 5–10°C、冰川天堂終年積雪。午後山區易有雷陣雨，纜車行程前先看 <b>MeteoSwiss</b>。Swiss Travel Pass 涵蓋全部城際火車、市區交通、琉森遊船、Stoosbahn 與博物館。', en:'July is prime hiking season: ~25°C in towns, 5–10°C at First/Gornergrat, year-round snow at Glacier Paradise. Watch for afternoon storms — check <b>MeteoSwiss</b> before lift days. The Swiss Travel Pass covers all intercity trains, city transit, the Lucerne cruise, Stoosbahn and museums.', de:'Juli ist Hochsaison: ~25°C im Tal, 5–10°C am Berg. Nachmittags Gewitter möglich — <b>MeteoSwiss</b> prüfen. Der Swiss Travel Pass deckt Züge, ÖV, Schiff, Stoosbahn und Museen.' },
  info_mymaps:    { zh:'原始規劃地圖（Google My Maps）', en:'Planning map (Google My Maps)', de:'Planungskarte (My Maps)' },
  info_lockers:   { zh:'SBB 車站置物櫃', en:'SBB station lockers', de:'SBB-Schliessfächer' },
  info_stp:       { zh:'Swiss Travel Pass 官網', en:'Swiss Travel Pass', de:'Swiss Travel Pass' },

  countdown_title:{ zh:'距離出發', en:'Until departure', de:'Bis zur Abreise' },
  countdown_during:{ zh:'旅程進行中', en:'Trip in progress', de:'Reise läuft' },
  countdown_done: { zh:'旅程已結束', en:'Trip completed', de:'Reise beendet' },
  cd_days: { zh:'天', en:'Days', de:'Tage' },
  cd_hours:{ zh:'時', en:'Hrs', de:'Std' },
  cd_min:  { zh:'分', en:'Min', de:'Min' },
  cd_sec:  { zh:'秒', en:'Sec', de:'Sek' },

  today_card_title: { zh:'今日行程', en:"Today's plan", de:'Heute' },
  today_notstarted: { zh:'旅程尚未開始 — Day 1 預覽', en:'Trip not started — Day 1 preview', de:'Noch nicht gestartet — Tag 1' },
  today_ended_card: { zh:'旅程已結束，去回顧分頁看看吧', en:'Trip over — check the Retro tab', de:'Reise vorbei — siehe Rückblick' },
  weather_title:  { zh:'8 天天氣（七月平均估計）', en:'8-day weather (July seasonal estimate)', de:'Wetter (Juli-Schätzung)' },

  cal_title:      { zh:'行程日曆', en:'Itinerary', de:'Reiseplan' },
  cal_week1:      { zh:'第 1 週（7/17–7/23）', en:'Week 1 (Jul 17–23)', de:'Woche 1 (17.–23.7.)' },
  cal_week2:      { zh:'第 2 週（7/24–7/27）', en:'Week 2 (Jul 24–27)', de:'Woche 2 (24.–27.7.)' },
  clock_dest:     { zh:'瑞士', en:'Switzerland', de:'Schweiz' },
  clock_home:     { zh:'台灣', en:'Taiwan', de:'Taiwan' },
  res_needed:     { zh:'需訂位', en:'Reserve', de:'Reservieren' },
  res_done:       { zh:'已訂位', en:'Booked', de:'Reserviert' },

  cat_attraction: { zh:'景點', en:'Sights', de:'Sehenswert' },
  cat_food:       { zh:'餐飲', en:'Food', de:'Essen' },
  cat_cafe:       { zh:'咖啡甜點', en:'Café', de:'Café' },
  cat_shopping:   { zh:'購物', en:'Shopping', de:'Einkaufen' },
  cat_transport:  { zh:'交通', en:'Transit', de:'Verkehr' },
  cat_hotel:      { zh:'住宿', en:'Hotel', de:'Hotel' },
  cat_other:      { zh:'其他', en:'Other', de:'Sonstiges' },

  city_zurich:     { zh:'蘇黎世', en:'Zurich', de:'Zürich' },
  city_lucerne:    { zh:'琉森', en:'Lucerne', de:'Luzern' },
  city_stoos:      { zh:'Stoos', en:'Stoos', de:'Stoos' },
  city_interlaken: { zh:'因特拉肯', en:'Interlaken', de:'Interlaken' },
  city_grindelwald:{ zh:'格林德瓦', en:'Grindelwald', de:'Grindelwald' },
  city_zermatt:    { zh:'策馬特', en:'Zermatt', de:'Zermatt' },
  city_all:        { zh:'全程', en:'Whole trip', de:'Gesamt' },
  city_taipei:     { zh:'台北／飛行', en:'Taipei / flight', de:'Taipei / Flug' },

  scity_zurich:          { zh:'蘇黎世', en:'Zurich', de:'Zürich' },
  scity_lucerne:         { zh:'琉森', en:'Lucerne', de:'Luzern' },
  scity_stoos_interlaken:{ zh:'Stoos→因特拉肯', en:'Stoos→Interlaken', de:'Stoos→Interlaken' },
  scity_grindelwald:     { zh:'格林德瓦', en:'Grindelwald', de:'Grindelwald' },
  scity_gw_zermatt:      { zh:'格林德瓦→策馬特', en:'Grindelwald→Zermatt', de:'Grindelwald→Zermatt' },
  scity_zermatt:         { zh:'策馬特', en:'Zermatt', de:'Zermatt' },
  scity_zermatt_zurich:  { zh:'策馬特→蘇黎世', en:'Zermatt→Zurich', de:'Zermatt→Zürich' },
  scity_tpe_zrh:         { zh:'台北→蘇黎世', en:'Taipei→Zurich', de:'Taipei→Zürich' },
  scity_zrh_home:        { zh:'蘇黎世→回程', en:'Zurich→home', de:'Zürich→Heimreise' },
  scity_icn_tpe:         { zh:'仁川→台北', en:'Incheon→Taipei', de:'Incheon→Taipei' },

  booking_title:  { zh:'票券與訂房', en:'Bookings & Tickets', de:'Buchungen & Tickets' },
  booking_sub:    { zh:'已訂 / 待訂 / 建議購買 / 比價', en:'Confirmed / pending / to buy / price check', de:'Gebucht / offen / Kauf-Tipps' },
  booking_flight_title: { zh:'機票行情', en:'Flight prices', de:'Flugpreise' },
  fi_range:       { zh:'12 個月估計區間', en:'12-month est. range', de:'12-Monats-Spanne' },
  fi_july:        { zh:'七月估價', en:'July estimate', de:'Juli-Schätzung' },
  fi_user:        { zh:'你的價格', en:'Your price', de:'Dein Preis' },
  fi_advice:      { zh:'七月為歐洲旺季，確認人數後盡快下訂', en:'July is peak season — book as soon as headcount is final', de:'Juli ist Hochsaison — früh buchen' },
  fi_badge:       { zh:'🔴 旺季 · 盡快訂', en:'🔴 Peak · book now', de:'🔴 Hochsaison' },
  fi_badge_booked:{ zh:'🟢 已訂 · 低於均價', en:'🟢 Booked · below average', de:'🟢 Gebucht · unter Schnitt' },
  fi_verdict_good:{ zh:'比 12 個月均價便宜約 {pct}%，買得漂亮！', en:'~{pct}% below the 12-month average — great deal!', de:'Ca. {pct}% unter dem 12-Monats-Schnitt — top!' },
  holidays_title: { zh:'台灣連假攻略（接下來）', en:'Taiwan holidays (upcoming)', de:'Feiertage Taiwan' },
  booking_confirmed_title: { zh:'住宿訂位進度', en:'Accommodation status', de:'Unterkünfte' },
  booking_comparison_title:{ zh:'票券比價', en:'Ticket price comparison', de:'Preisvergleich' },
  booking_tobuy_title:     { zh:'建議購買', en:'To buy', de:'Noch zu kaufen' },
  booking_purchased: { zh:'已訂', en:'Booked', de:'Gebucht' },
  booking_pending:   { zh:'待訂', en:'Pending', de:'Offen' },
  booking_official:  { zh:'官網', en:'Official', de:'Offiziell' },
  booking_item:      { zh:'項目', en:'Item', de:'Position' },
  booking_advice:    { zh:'建議', en:'Advice', de:'Tipp' },
  booking_map:       { zh:'地圖', en:'Map', de:'Karte' },
  booking_link:      { zh:'訂房連結', en:'Booking link', de:'Buchungslink' },

  bud_title:      { zh:'花費', en:'Expenses', de:'Ausgaben' },
  bud_scope:      { zh:'金額為每人估算（住宿已全訂，房價為估價——回報實際金額即可更新）', en:'Per-person estimates (all stays booked; room prices are estimates — send real amounts to update)', de:'Beträge pro Person (Unterkünfte gebucht, Preise geschätzt)' },
  bud_est:        { zh:'預估', en:'Estimated', de:'Budget' },
  bud_act:        { zh:'實際', en:'Actual', de:'Ist' },
  bud_total_est:  { zh:'預估總額（每人）', en:'Estimated total (pp)', de:'Budget gesamt (p.P.)' },
  bud_total_act:  { zh:'實際總額（每人）', en:'Actual total (pp)', de:'Ist gesamt (p.P.)' },
  bud_city:       { zh:'城市占比', en:'By city', de:'Nach Ort' },
  bud_cat:        { zh:'分類占比', en:'By category', de:'Nach Kategorie' },
  bud_items:      { zh:'明細', en:'Details', de:'Positionen' },
  bud_prepurchased:{ zh:'行前已購', en:'Pre-purchased', de:'Vorab gekauft' },
  bud_noactual:   { zh:'旅程開始後在此記錄實際花費（data/trip.json → budget.actual_expenses）', en:'Log actual expenses here once the trip starts (data/trip.json → budget.actual_expenses)', de:'Ausgaben während der Reise erfassen' },

  talloc_title:   { zh:'時間分配（依行程自動計算）', en:'Time allocation (computed from the schedule)', de:'Zeitverteilung' },
  talloc_hours:   { zh:'小時', en:'hrs', de:'Std' },

  spots_export_gmap: { zh:'開啟 Google Maps', en:'Open in Google Maps', de:'In Google Maps' },
  spots_export_geo:  { zh:'匯出 GeoJSON', en:'Export GeoJSON', de:'GeoJSON exportieren' },
  filter_all:     { zh:'全部', en:'All', de:'Alle' },
  poi_hours:      { zh:'時間', en:'Hours', de:'Zeiten' },
  poi_price:      { zh:'價格', en:'Price', de:'Preis' },
  poi_free:       { zh:'免費', en:'Free', de:'Gratis' },
  poi_search_more:{ zh:'更多搜尋', en:'Search more', de:'Mehr suchen' },
  poi_seating:    { zh:'座位', en:'Seating', de:'Plätze' },
  poi_group_ok:   { zh:'4 人 OK', en:'Group of 4 OK', de:'Für 4 OK' },
  poi_group_warn: { zh:'4 人注意', en:'Heads-up for 4', de:'Achtung bei 4' },

  checklist_title:{ zh:'行前清單', en:'Pre-trip checklist', de:'Checkliste' },

  retro_title:    { zh:'旅程回顧', en:'Trip retro', de:'Rückblick' },
  retro_empty:    { zh:'旅程結束後（7/25 之後），這裡會出現預算回顧、未去成的景點與行程變更記錄。', en:'After the trip ends (post Jul 25), budget review, missed spots and plan changes will appear here.', de:'Nach der Reise erscheint hier der Rückblick.' },

  today_days_left:{ zh:'天後出發', en:'days to go', de:'Tage bis Abflug' },
  today_day:      { zh:'第', en:'Day', de:'Tag' },
  today_day2:     { zh:'天', en:'', de:'' },
  today_enter:    { zh:'進入行程規劃 →', en:'Enter trip planner →', de:'Zum Reiseplan →' },
  today_start:    { zh:'開始旅程 →', en:'Start your trip →', de:'Reise starten →' },
  today_now:      { zh:'進行中', en:'Now', de:'Jetzt' },
  today_next:     { zh:'接下來', en:'Up next', de:'Als Nächstes' },
  today_free:     { zh:'自由時間', en:'Free time', de:'Freie Zeit' },
  today_events:   { zh:'個行程', en:'events today', de:'Programmpunkte' },
  today_ended:    { zh:'旅程已結束', en:'Trip completed', de:'Reise beendet' },
  today_todo_title:{ zh:'現在可以做的事', en:'Things you can do now', de:'Jetzt erledigen' },
  today_first:    { zh:'第一個行程', en:'First event', de:'Erster Punkt' },
  today_morning:  { zh:'上午', en:'Morning', de:'Vormittag' },
  today_afternoon:{ zh:'下午', en:'Afternoon', de:'Nachmittag' },
  today_evening:  { zh:'晚上', en:'Evening', de:'Abend' },

  todo_flights:   { zh:'✋ 確認機票（TPE↔ZRH 尚未訂！）', en:'✋ Book flights (TPE↔ZRH not booked!)', de:'✋ Flüge buchen!' },
  todo_hotel:     { zh:'住宿七晚全訂齊 ✔ 收集確認信＋回報實際房價更新預算', en:'All 7 nights booked ✔ collect confirmations + send real prices to update the budget', de:'Alle Nächte gebucht ✔ Bestätigungen sammeln' },
  todo_tickets:   { zh:'購買 Swiss Travel Pass 電子票（CHF 439）', en:'Buy the Swiss Travel Pass e-ticket (CHF 439)', de:'Swiss Travel Pass kaufen' },
  todo_esim:      { zh:'安裝歐洲 eSIM（需含瑞士）', en:'Install a Europe eSIM (must include CH)', de:'eSIM installieren (inkl. CH)' },
  todo_cash:      { zh:'換少量瑞郎現金（CHF 100–200）', en:'Get some CHF cash (100–200)', de:'CHF-Bargeld besorgen' },
  todo_pack:      { zh:'打包行李（洋蔥式穿搭＋登山鞋＋墨鏡）', en:'Pack (layers + hiking shoes + sunglasses)', de:'Packen (Zwiebelprinzip)' },
  todo_passport:  { zh:'檢查護照效期（6 個月以上）', en:'Check passport validity (6+ months)', de:'Pass prüfen' },
  todo_charger:   { zh:'充電器＋行動電源＋瑞士 Type J 轉接頭', en:'Chargers + power bank + Swiss Type J adapter', de:'Ladegeräte + Typ-J-Adapter' },
  todo_weather:   { zh:'查看 MeteoSwiss 山區天氣', en:'Check MeteoSwiss mountain weather', de:'MeteoSwiss prüfen' },
  todo_itinerary: { zh:'檢視行程（本次全程免餐廳訂位）', en:'Review the plan (no restaurant reservations needed)', de:'Plan prüfen' },
  todo_resto:     { zh:'預訂 Schäferstube 黑面羊晚餐（4 人）', en:'Reserve Schäferstube dinner (party of 4)', de:'Schäferstube reservieren' }
};

/* ---------- weather (July seasonal estimates) ---------- */
const WEATHER_DATA = [
  { date:'2026-07-17', icon:'thunderstorm', hi:33, lo:27, desc:{zh:'午後雷陣雨',en:'PM storms',de:'Gewitter'}, sunrise:'05:17', sunset:'18:46', city:'taipei' },
  { date:'2026-07-18', icon:'partly_cloudy_day', hi:25, lo:15, desc:{zh:'多雲時晴',en:'Partly sunny',de:'Teils sonnig'}, sunrise:'05:48', sunset:'21:21', city:'zurich' },
  { date:'2026-07-19', icon:'clear_day', hi:26, lo:15, desc:{zh:'晴',en:'Sunny',de:'Sonnig'}, sunrise:'05:49', sunset:'21:20', city:'zurich' },
  { date:'2026-07-20', icon:'clear_day', hi:25, lo:16, desc:{zh:'晴',en:'Sunny',de:'Sonnig'}, sunrise:'05:52', sunset:'21:17', city:'lucerne' },
  { date:'2026-07-21', icon:'partly_cloudy_day', hi:19, lo:11, desc:{zh:'山區多雲',en:'Mtn clouds',de:'Bewölkt (Berg)'}, sunrise:'05:53', sunset:'21:16', city:'stoos' },
  { date:'2026-07-22', icon:'clear_day', hi:21, lo:11, desc:{zh:'晴 · 山上涼',en:'Sunny, cool up top',de:'Sonnig, kühl oben'}, sunrise:'05:55', sunset:'21:13', city:'grindelwald' },
  { date:'2026-07-23', icon:'partly_cloudy_day', hi:22, lo:11, desc:{zh:'多雲時晴',en:'Partly sunny',de:'Teils sonnig'}, sunrise:'05:56', sunset:'21:12', city:'zermatt' },
  { date:'2026-07-24', icon:'clear_day', hi:22, lo:10, desc:{zh:'晴',en:'Sunny',de:'Sonnig'}, sunrise:'05:57', sunset:'21:11', city:'zermatt' },
  { date:'2026-07-25', icon:'partly_cloudy_day', hi:23, lo:12, desc:{zh:'多雲時晴',en:'Partly sunny',de:'Teils sonnig'}, sunrise:'05:58', sunset:'21:10', city:'zermatt' },
  { date:'2026-07-26', icon:'partly_cloudy_day', hi:25, lo:15, desc:{zh:'多雲時晴',en:'Partly sunny',de:'Teils sonnig'}, sunrise:'05:59', sunset:'21:09', city:'zurich' },
  { date:'2026-07-27', icon:'clear_day', hi:33, lo:27, desc:{zh:'晴',en:'Sunny',de:'Sonnig'}, sunrise:'05:22', sunset:'18:42', city:'taipei' }
];

/* ---------- constants ---------- */
const DEST_TZ = 'Europe/Zurich';
const HOME_TZ = 'Asia/Taipei';
const HOUR_START = 5, HOUR_END = 23;
const LANGS = ['zh', 'en', 'de'];
const LANG_NAMES = { zh:'繁體中文', en:'English', de:'Deutsch' };
const CAT_COLORS = { attraction:'#e8664a', hotel:'#4a7ce8', food:'#4aad5b', cafe:'#9b6ad4', shopping:'#e8964a', transport:'#4ab8c9', work:'#6a6ad4', other:'#888', personal:'#c9b99a' };
const CAT_ICONS = { attraction:'attractions', food:'restaurant', cafe:'coffee', transport:'directions_transit', work:'laptop_mac', hotel:'hotel', shopping:'shopping_bag', personal:'bedtime', other:'event' };
const CITY_KEYS = ['zurich','lucerne','stoos','interlaken','grindelwald','zermatt'];
const CITY_COLORS = { zurich:'#3a7bd5', lucerne:'#4ab8c9', stoos:'#6a6ad4', interlaken:'#2e7d32', grindelwald:'#e8964a', zermatt:'#c0392b', taipei:'#888', all:'#666' };
const CITY_ICONS = { zurich:'water', lucerne:'directions_boat', stoos:'landscape', interlaken:'forest', grindelwald:'hiking', zermatt:'ac_unit', taipei:'flight' };
const SCHEDULE_CITY_I18N = {
  '蘇黎世':'scity_zurich', '琉森':'scity_lucerne', 'Stoos→因特拉肯':'scity_stoos_interlaken',
  '格林德瓦':'scity_grindelwald', '格林德瓦→策馬特':'scity_gw_zermatt', '策馬特':'scity_zermatt', '策馬特→蘇黎世':'scity_zermatt_zurich', '台北→蘇黎世':'scity_tpe_zrh', '蘇黎世→回程':'scity_zrh_home', '仁川→台北':'scity_icn_tpe'
};

/* ---------- state ---------- */
let TRIP = null;
let currentLang = 'zh';
let currentCurrency = 'TWD';
let budgetMode = 'est';
let currentWeek = 0;
let filterCity = 'all';
let filterCat = 'all';
let map = null, markerLayer = null, poiMarkers = {};

/* ---------- helpers ---------- */
function t(key) { const e = I18N[key]; if (!e) return key; return e[currentLang] || e.zh || key; }
function getField(obj, field) {
  if (!obj) return '';
  if (currentLang !== 'zh') { const v = obj[field + '_' + currentLang]; if (v) return v; }
  return obj[field] || '';
}
function getI18nObj(obj) { if (!obj) return ''; return obj[currentLang] || obj.zh || obj.en || ''; }
function getEventName(ev) { return getField(ev, 'name'); }
function getEventNote(ev) { return getField(ev, 'note'); }
function getPOIName(p) {
  const zhName = p.name, local = p.nameLocal || p.name_en || p.name;
  if (currentLang === 'zh') return { primary: zhName, secondary: local !== zhName ? local : '' };
  const primary = getField(p, 'name');
  return { primary: primary, secondary: local !== primary ? local : '' };
}
function getScheduleCityName(city) { const k = SCHEDULE_CITY_I18N[city]; return k ? t(k) : city; }
function getCityName(cityKey) { return t('city_' + cityKey); }
function getCatName(cat) { return t('cat_' + cat); }
function mi(name, size) { return '<span class="mi material-symbols-outlined"' + (size ? ' style="font-size:' + size + 'px"' : '') + '>' + name + '</span>'; }
function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function fmtHour(h) { const hh = Math.floor(h), mm = Math.round((h - hh) * 60); return String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0'); }
function localDateStr(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
function fmtMoney(twd) {
  if (currentCurrency === 'CHF') {
    const chf = twd / TRIP.currency.rates.CHF;
    return 'CHF ' + (chf >= 100 ? Math.round(chf).toLocaleString() : chf.toFixed(0));
  }
  if (currentCurrency === 'JPY') {
    return '¥' + Math.round(twd / TRIP.currency.rates.JPY).toLocaleString();
  }
  return 'NT$' + Math.round(twd).toLocaleString();
}
function safe(name, fn) { try { fn(); } catch (e) { console.error('[' + name + ']', e); } }
function dayNumber(dateStr) {
  const s = new Date(TRIP.startDate + 'T00:00:00'), d = new Date(dateStr + 'T00:00:00');
  return Math.round((d - s) / 86400000) + 1;
}
function weekdayName(dateStr) {
  const names = { zh:['日','一','二','三','四','五','六'], en:['SUN','MON','TUE','WED','THU','FRI','SAT'], de:['SO','MO','DI','MI','DO','FR','SA'] };
  const d = new Date(dateStr + 'T00:00:00');
  return names[currentLang][d.getDay()];
}
function getEvIcon(ev) {
  const n = ((ev.name || '') + ' ' + (ev.name_en || '')).toLowerCase();
  if (n.match(/airport|flight|landing|takeoff|機場|航班/)) return 'flight';
  return CAT_ICONS[ev.cat] || 'event';
}

/* ---------- boot ---------- */
async function loadTrip() {
  try {
    const r = await fetch('data/trip.json');
    if (!r.ok) throw new Error('http ' + r.status);
    return await r.json();
  } catch (e) {
    return JSON.parse(document.getElementById('trip-data').textContent);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  TRIP = await loadTrip();
  currentLang = localStorage.getItem('trip-lang') || 'zh';
  if (LANGS.indexOf(currentLang) < 0) currentLang = 'zh';
  safe('today', renderToday);
  safe('nav', initNav);
  safe('lang', initLangMenus);
  safe('overview', renderOverview);
  safe('spots', initSpots);
  safe('calendar', initCalendar);
  safe('booking', renderBooking);
  safe('budget', initBudget);
  safe('talloc', renderTimeAlloc);
  safe('checklist', renderChecklist);
  safe('retro', renderRetro);
  safe('clocks', initClocks);
  safe('export', initExport);
  applyLang();
});

/* ---------- language ---------- */
function applyLang() {
  localStorage.setItem('trip-lang', currentLang);
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.innerHTML = t(el.getAttribute('data-i18n')); });
  safe('today', renderToday);
  safe('overview', renderOverview);
  safe('pois', renderPOIs);
  safe('filters', renderFilters);
  safe('calendar', renderCalendar);
  safe('booking', renderBooking);
  safe('budget', renderBudget);
  safe('talloc', renderTimeAlloc);
  safe('checklist', renderChecklist);
  safe('retro', renderRetro);
  safe('clocks', updateClocks);
  document.querySelectorAll('.sb-lang-item, .bb-lang-item').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === currentLang);
  });
}
function initLangMenus() {
  const html = LANGS.map(l => '<button class="sb-lang-item" data-lang="' + l + '">' + LANG_NAMES[l] + '</button>').join('');
  document.getElementById('sb-lang-menu').innerHTML = html;
  document.getElementById('bb-lang-menu').innerHTML = LANGS.map(l => '<button class="sb-lang-item bb-lang-item" data-lang="' + l + '">' + LANG_NAMES[l] + '</button>').join('');
  document.querySelectorAll('.sb-lang-item').forEach(b => {
    b.addEventListener('click', e => { e.stopPropagation(); currentLang = b.getAttribute('data-lang'); closeMenus(); applyLang(); });
  });
  document.getElementById('sb-lang-btn').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('sb-lang-menu').classList.toggle('open');
  });
  document.addEventListener('click', closeMenus);
}
function closeMenus() {
  document.getElementById('sb-lang-menu').classList.remove('open');
  document.getElementById('bb-more-menu').classList.remove('open');
  document.getElementById('bb-lang-menu').classList.remove('open');
}

/* ---------- today overlay dismiss ---------- */
function dismissToday() { document.getElementById('today-overlay').classList.add('hidden'); }

/* ---------- today overlay ---------- */
function renderToday() {
  const el = document.getElementById('today-content');
  if (!el) return;
  const now = new Date();
  const today = localDateStr(now);
  const nowHour = now.getHours() + now.getMinutes() / 60;
  const tripStart = new Date(TRIP.startDate + 'T00:00:00');
  const tripEnd = new Date(TRIP.endDate + 'T23:59:59');
  const todaySchedule = TRIP.schedule.find(d => d.date === today);
  const firstEv = todaySchedule ? todaySchedule.events[0] : null;
  const showBefore = now < tripStart || (today === TRIP.startDate && firstEv && nowHour < firstEv.sh);
  let html = '';

  if (showBefore) {
    const daysLeft = Math.max(0, Math.ceil((tripStart - now) / 86400000));
    const todos = buildPreTripTodos(daysLeft);
    const first = TRIP.schedule[0].events[0];
    html += '<div class="today-countdown-label">' + esc(getField(TRIP, 'destination')) + ' · ' + TRIP.startDate.replace(/-/g, '/') + '</div>';
    html += '<div class="today-countdown-num">' + daysLeft + '</div>';
    html += '<div class="today-countdown-label">' + t('today_days_left') + '</div>';
    html += '<div class="today-dest">' + esc(getField(TRIP, 'title')) + '</div>';
    html += '<div class="today-tagline">' + esc(getI18nObj(TRIP.tagline)) + '</div>';
    html += '<div class="today-status">' + t('hdr_meta') + '</div>';
    html += '<div class="today-todos"><div class="today-todos-label">' + mi('checklist', 16) + ' ' + t('today_todo_title') + '</div>';
    todos.forEach(td => { html += '<div class="today-todo-item">' + mi(td.icon, 20) + '<div class="tt-body"><div class="tt-name">' + td.text + '</div></div></div>'; });
    html += '</div>';
    html += '<div class="today-todos"><div class="today-todos-label">' + mi('flight_takeoff', 16) + ' ' + t('today_first') + '</div>';
    html += '<div class="today-todo-item">' + mi(getEvIcon(first), 20) + '<div class="tt-body"><div class="tt-name">' + esc(getEventName(first)) + '</div><div class="tt-sub">' + fmtHour(first.sh) + ' · ' + esc(getEventNote(first)) + '</div></div></div></div>';
    html += '<button class="today-enter-btn" onclick="dismissToday()">' + t('today_enter') + '</button>';
  } else if (now <= tripEnd && todaySchedule) {
    const dayN = dayNumber(today);
    const evs = todaySchedule.events;
    const current = evs.find(ev => nowHour >= ev.sh && nowHour < ev.eh);
    const next = evs.find(ev => ev.sh > nowHour);
    html += '<div class="today-countdown-label">' + today.slice(5).replace('-', '/') + ' · Day ' + dayN + '</div>';
    html += '<div class="today-dest">' + esc(getScheduleCityName(todaySchedule.city)) + '</div>';
    html += '<div class="today-status">' + evs.length + ' ' + t('today_events') + '</div>';
    const focus = current || next;
    html += '<div class="today-todos"><div class="today-todos-label">' + mi(current ? 'my_location' : 'schedule', 16) + ' ' + (current ? t('today_now') : t('today_next')) + '</div>';
    if (focus) {
      html += '<div class="today-todo-item now">' + mi(getEvIcon(focus), 20) + '<div class="tt-body"><div class="tt-name">' + esc(getEventName(focus)) + '</div><div class="tt-sub">' + fmtHour(focus.sh) + '–' + fmtHour(focus.eh) + ' · ' + esc(getEventNote(focus)) + restLine(focus) + '</div></div></div>';
    } else {
      html += '<div class="today-todo-item now">' + mi('coffee', 20) + '<div class="tt-body"><div class="tt-name">' + t('today_free') + ' ☕</div></div></div>';
    }
    html += '</div>';
    const periods = [
      { key: 'today_morning', icon: 'wb_sunny', evs: evs.filter(e => e.sh < 12) },
      { key: 'today_afternoon', icon: 'wb_twilight', evs: evs.filter(e => e.sh >= 12 && e.sh < 18) },
      { key: 'today_evening', icon: 'dark_mode', evs: evs.filter(e => e.sh >= 18) }
    ];
    periods.forEach(p => {
      if (!p.evs.length) return;
      html += '<div class="today-todos"><div class="today-todos-label">' + mi(p.icon, 16) + ' ' + t(p.key) + '</div>';
      p.evs.forEach(ev => {
        const active = nowHour >= ev.sh && nowHour < ev.eh;
        html += '<div class="today-todo-item' + (active ? ' now' : '') + '">' + mi(getEvIcon(ev), 20) + '<div class="tt-body"><div class="tt-name">' + esc(getEventName(ev)) + '</div><div class="tt-sub">' + fmtHour(ev.sh) + '–' + fmtHour(ev.eh) + (getEventNote(ev) ? ' · ' + esc(getEventNote(ev)) : '') + restLine(ev) + '</div></div></div>';
      });
      html += '</div>';
    });
    html += '<button class="today-enter-btn" onclick="dismissToday()">' + t('today_enter') + '</button>';
  } else {
    html += '<div class="today-countdown-num">' + mi('flight_takeoff', 64) + '</div>';
    html += '<div class="today-dest">' + t('today_ended') + '</div>';
    html += '<div class="today-tagline">' + esc(getI18nObj(TRIP.tagline)) + '</div>';
    html += '<button class="today-enter-btn" onclick="dismissToday()">' + t('today_enter') + '</button>';
  }
  el.innerHTML = html;
}
function restLine(ev) {
  if (!ev.restaurant) return '';
  let s = '<br>🍽️ ' + esc(ev.restaurant);
  if (ev.map) s += ' <a href="' + ev.map + '" target="_blank" rel="noopener">📍</a>';
  if (ev.reservation === 'needed') s += ' ⚠️' + t('res_needed');
  if (ev.reservation === true) s += ' ✅';
  return s;
}
function buildPreTripTodos(daysLeft) {
  const todos = [];
  if (!TRIP.flightIntel.booked) todos.push({ icon: 'flight', text: t('todo_flights') });
  if (daysLeft > 7) {
    todos.push({ icon: 'hotel', text: t('todo_hotel') }, { icon: 'confirmation_number', text: t('todo_tickets') }, { icon: 'travel_explore', text: t('todo_itinerary') });
  } else if (daysLeft > 3) {
    todos.push({ icon: 'confirmation_number', text: t('todo_tickets') }, { icon: 'hotel', text: t('todo_hotel') }, { icon: 'sim_card', text: t('todo_esim') }, { icon: 'cloud', text: t('todo_weather') }, { icon: 'travel_explore', text: t('todo_itinerary') });
  } else {
    todos.push({ icon: 'luggage', text: t('todo_pack') }, { icon: 'badge', text: t('todo_passport') }, { icon: 'sim_card', text: t('todo_esim') }, { icon: 'currency_exchange', text: t('todo_cash') }, { icon: 'power', text: t('todo_charger') }, { icon: 'cloud', text: t('todo_weather') });
  }
  return todos;
}

/* ---------- nav ---------- */
const TAB_IDS = ['attractions', 'calendar', 'booking', 'budget', 'time', 'checklist', 'retro'];
function initNav() {
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', e => {
      const id = btn.getAttribute('data-tab');
      if (btn.classList.contains('bb-more-item')) closeMenus();
      showTab(id);
    });
  });
  document.getElementById('bb-more-btn').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('bb-lang-menu').classList.remove('open');
    document.getElementById('bb-more-menu').classList.toggle('open');
  });
  document.getElementById('bb-lang-btn').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('bb-more-menu').classList.remove('open');
    document.getElementById('bb-lang-menu').classList.add('open');
  });
  const tripOver = new Date() > new Date(TRIP.endDate + 'T23:59:59');
  document.querySelectorAll('[data-retro-only]').forEach(el => { el.style.display = tripOver ? '' : 'none'; });
}
function showTab(id) {
  const cur = document.querySelector('.tab-panel.active');
  if (cur && cur.id === 'tab-' + id) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  document.querySelectorAll('.sb[data-tab], .bb[data-tab], .bb-more-item[data-tab]').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === id);
  });
  const moreTabs = ['budget', 'checklist', 'retro'];
  document.getElementById('bb-more-btn').classList.toggle('has-active', moreTabs.indexOf(id) >= 0);
  if (id === 'time' && map) setTimeout(() => { map.invalidateSize(); setTimeout(fitMapToPOIs, 150); }, 120);
  window.scrollTo(0, 0);
}

/* ---------- overview ---------- */
function renderOverview() {
  const est = TRIP.budget.items.reduce((s, i) => s + (i.cost_twd || 0), 0);
  const actual = sumActual();
  const days = TRIP.schedule.length;
  document.getElementById('stat-est').textContent = fmtMoney(est);
  document.getElementById('stat-actual').textContent = actual > 0 ? fmtMoney(actual) : '–';
  document.getElementById('stat-pois').textContent = TRIP.pois.length;
  document.getElementById('stat-days').textContent = days;
  renderCountdown();
  renderTodayCard();
  renderWeatherStrip();
}
function sumActual() {
  let s = TRIP.budget.items.filter(i => i.purchased).reduce((a, i) => a + (i.cost_twd || 0), 0);
  (TRIP.budget.actual_expenses || []).forEach(d => d.items.forEach(i => { s += i.cost_twd || 0; }));
  return s;
}
let cdTimer = null;
function renderCountdown() {
  const el = document.getElementById('time-countdown');
  if (!el) return;
  if (cdTimer) clearInterval(cdTimer);
  const tick = () => {
    const now = new Date();
    const start = new Date(TRIP.startDate + 'T18:50:00+08:00');
    const end = new Date(TRIP.endDate + 'T23:59:59+02:00');
    let html;
    if (now < start) {
      let diff = Math.floor((start - now) / 1000);
      const d = Math.floor(diff / 86400); diff -= d * 86400;
      const h = Math.floor(diff / 3600); diff -= h * 3600;
      const m = Math.floor(diff / 60); const s = diff - m * 60;
      html = '<div class="countdown-panel"><span class="cd-title">' + t('countdown_title') + '</span><div class="cd-units">' +
        [[d, 'cd_days'], [h, 'cd_hours'], [m, 'cd_min'], [s, 'cd_sec']].map(u =>
          '<div class="cd-unit"><div class="cd-num">' + u[0] + '</div><div class="cd-lab">' + t(u[1]) + '</div></div>').join('') +
        '</div></div>';
    } else if (now <= end) {
      html = '<div class="countdown-panel"><span class="cd-title">' + t('countdown_during') + '</span><div class="cd-units"><div class="cd-unit"><div class="cd-num">Day ' + dayNumber(localDateStr(now)) + '</div></div></div></div>';
    } else {
      html = '<div class="countdown-panel"><span class="cd-title">' + t('countdown_done') + '</span></div>';
    }
    el.innerHTML = html;
  };
  tick();
  cdTimer = setInterval(tick, 1000);
}
function renderTodayCard() {
  const el = document.getElementById('today-card');
  if (!el) return;
  const today = localDateStr();
  const now = new Date();
  const tripStart = new Date(TRIP.startDate + 'T00:00:00');
  const tripEnd = new Date(TRIP.endDate + 'T23:59:59');
  let day = TRIP.schedule.find(d => d.date === today);
  let title, showPreview = false;
  if (now < tripStart) { day = TRIP.schedule[0]; title = t('today_notstarted'); showPreview = true; }
  else if (now > tripEnd) {
    el.innerHTML = '<div class="today-card-inner"><div class="today-card-header">' + mi('flight_takeoff') + ' ' + t('today_ended_card') + '</div></div>';
    return;
  } else if (day) { title = t('today_card_title') + ' · Day ' + dayNumber(today) + ' · ' + getScheduleCityName(day.city); }
  if (!day) { el.innerHTML = ''; return; }
  const w = WEATHER_DATA.find(x => x.date === day.date);
  const nowHour = now.getHours() + now.getMinutes() / 60;
  let html = '<div class="today-card-inner"><div class="today-card-header">' + mi(CITY_ICONS[day.cityKey] || 'today') + ' ' + esc(title) + '</div>';
  if (w) {
    html += '<div class="today-weather">' + mi(w.icon) + ' <b>' + w.hi + '° / ' + w.lo + '°</b> ' + esc(getI18nObj(w.desc)) +
      ' <span>' + mi('wb_twilight', 15) + ' ' + w.sunrise + '</span><span>' + mi('nightlight', 15) + ' ' + w.sunset + '</span></div>';
  }
  html += '<div class="today-events-timeline">';
  day.events.forEach(ev => {
    const past = !showPreview && nowHour >= ev.eh;
    const cur = !showPreview && nowHour >= ev.sh && nowHour < ev.eh;
    html += '<div class="today-ev' + (past ? ' past' : '') + (cur ? ' current' : '') + '">' +
      '<span class="today-ev-dot" style="background:' + (CAT_COLORS[ev.cat] || '#888') + '"></span>' +
      '<span class="today-ev-time">' + fmtHour(ev.sh) + '–' + fmtHour(ev.eh) + '</span>' +
      '<span>' + esc(getEventName(ev)) + '</span></div>';
  });
  html += '</div></div>';
  el.innerHTML = html;
}
function renderWeatherStrip() {
  const el = document.getElementById('weather-strip');
  if (!el) return;
  const today = localDateStr();
  let html = '<div class="weather-strip-scroll">';
  WEATHER_DATA.forEach((w, i) => {
    html += '<div class="weather-day' + (w.date === today ? ' today' : '') + '">' +
      '<div class="wd-day">D' + (i + 1) + ' · ' + weekdayName(w.date) + '</div>' +
      '<div class="wd-date">' + w.date.slice(5).replace('-', '/') + '</div>' +
      '<div class="wd-icon">' + mi(w.icon) + '</div>' +
      '<div class="wd-temp">' + w.hi + '° <span style="color:var(--text-3);font-weight:400">' + w.lo + '°</span></div>' +
      '<div class="wd-desc">' + esc(getI18nObj(w.desc)) + '</div>' +
      '<div class="wd-sun"><span>' + mi('wb_twilight', 12) + w.sunrise + '</span><span>' + mi('nightlight', 12) + w.sunset + '</span></div>' +
      '<div class="wd-city-row"><div class="wd-city-dot" title="' + esc(getCityName(w.city)) + '"></div><span class="wd-city-label wd-city-' + w.city + '">' + esc(getCityName(w.city)) + '</span></div>' +
      '</div>';
  });
  html += '</div>';
  el.innerHTML = html;
  const tEl = el.querySelector('.weather-day.today');
  if (tEl) tEl.scrollIntoView({ block: 'nearest', inline: 'center' });
}

/* ---------- spots / map ---------- */
function initSpots() {
  renderFilters();
  renderPOIs();
  initMap();
  document.getElementById('poi-modal-overlay').addEventListener('click', e => {
    if (e.target.id === 'poi-modal-overlay') closePOIModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePOIModal(); });
}
function renderFilters() {
  const el = document.getElementById('spot-filters');
  if (!el) return;
  let html = '<button class="chip' + (filterCity === 'all' ? ' on' : '') + '" data-fcity="all">' + t('filter_all') + '</button>';
  CITY_KEYS.forEach(c => {
    html += '<button class="chip' + (filterCity === c ? ' on' : '') + '" data-fcity="' + c + '"><span class="chip-dot" style="background:' + CITY_COLORS[c] + '"></span>' + getCityName(c) + '</button>';
  });
  html += '<span style="width:10px"></span>';
  ['attraction', 'food', 'cafe', 'shopping', 'hotel', 'transport'].forEach(c => {
    html += '<button class="chip' + (filterCat === c ? ' on' : '') + '" data-fcat="' + c + '"><span class="chip-dot" style="background:' + CAT_COLORS[c] + '"></span>' + getCatName(c) + '</button>';
  });
  el.innerHTML = html;
  el.querySelectorAll('[data-fcity]').forEach(b => b.addEventListener('click', () => {
    filterCity = (filterCity === b.getAttribute('data-fcity')) ? 'all' : b.getAttribute('data-fcity');
    if (b.getAttribute('data-fcity') === 'all') filterCity = 'all';
    renderFilters(); renderPOIs(); refreshMarkers();
  }));
  el.querySelectorAll('[data-fcat]').forEach(b => b.addEventListener('click', () => {
    filterCat = (filterCat === b.getAttribute('data-fcat')) ? 'all' : b.getAttribute('data-fcat');
    renderFilters(); renderPOIs(); refreshMarkers();
  }));
}
function visiblePOIs() {
  return TRIP.pois.filter(p =>
    (filterCity === 'all' || p.city === filterCity) &&
    (filterCat === 'all' || p.cat === filterCat));
}
function renderPOIs() {
  const el = document.getElementById('poi-list');
  if (!el) return;
  let html = '';
  visiblePOIs().forEach(p => {
    const n = getPOIName(p);
    const gm = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent((p.nameLocal || p.name_en || p.name) + ' ' + (currentLang === 'zh' ? '' : '') + getCityName(p.city));
    html += '<div class="poi" data-poi="' + p.id + '">' +
      '<span class="poi-dot" style="background:' + (CAT_COLORS[p.cat] || '#888') + '"></span>' +
      '<div class="poi-info"><div class="poi-name">' + esc(n.primary) +
      (p.warnings && p.warnings.length ? ' <span class="poi-warn mi material-symbols-outlined" style="font-size:15px">warning</span>' : '') + '</div>' +
      (n.secondary ? '<div class="poi-sub">' + esc(n.secondary) + '</div>' : '') +
      '<div class="poi-desc">' + esc(getField(p, 'desc')) + '</div></div>' +
      '<div class="poi-links">' +
      (p.url ? '<a href="' + p.url + '" target="_blank" rel="noopener" title="' + t('booking_link') + '" onclick="event.stopPropagation()">' + mi('open_in_new', 16) + '</a>' : '') +
      '<a href="' + gm + '" target="_blank" rel="noopener" title="Google Maps" onclick="event.stopPropagation()">' + mi('location_on', 16) + '</a></div>' +
      '</div>';
  });
  el.innerHTML = html || '<div style="color:var(--text-3);padding:20px">—</div>';
  el.querySelectorAll('.poi').forEach(div => div.addEventListener('click', () => openPOIModal(div.getAttribute('data-poi'))));
}
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;
  map = L.map('map', { scrollWheelZoom: true });
  map.setView([46.7, 8.1], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19
  }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  refreshMarkers();
  window.addEventListener('resize', () => {
    const active = document.querySelector('.tab-panel.active');
    if (map && active && active.id === 'tab-time') {
      map.invalidateSize();
      if (map.getZoom() <= 5) setTimeout(fitMapToPOIs, 120);
    }
  });
}
function refreshMarkers() {
  if (!map) return;
  markerLayer.clearLayers();
  poiMarkers = {};
  const pts = [];
  visiblePOIs().forEach(p => {
    const mk = L.circleMarker([p.lat, p.lng], {
      radius: 7, color: '#fff', weight: 2, fillColor: CAT_COLORS[p.cat] || '#888', fillOpacity: 0.95
    });
    mk.bindPopup('<b>' + esc(getPOIName(p).primary) + '</b><br><span style="font-size:.8em;color:#666">' + esc(getField(p, 'desc')) + '</span>');
    mk.on('click', () => openPOIModal(p.id, true));
    mk.addTo(markerLayer);
    poiMarkers[p.id] = mk;
    pts.push([p.lat, p.lng]);
  });
  if (pts.length) map.fitBounds(pts, { padding: [30, 30] });
}
function fitMapToPOIs() {
  if (!map) return;
  const pts = visiblePOIs().map(p => [p.lat, p.lng]);
  if (pts.length) map.fitBounds(pts, { padding: [30, 30] });
}
function focusPOI(id) {
  const p = TRIP.pois.find(x => x.id === id);
  if (!p || !map) return;
  map.setView([p.lat, p.lng], 14);
  const mk = poiMarkers[id];
  if (mk) mk.openPopup();
  if (window.innerWidth <= 900) document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function openPOIModal(id, fromMap) {
  const p = TRIP.pois.find(x => x.id === id);
  if (!p) return;
  if (!fromMap) focusPOI(id);
  const n = getPOIName(p);
  const q = encodeURIComponent((p.nameLocal || p.name_en || p.name));
  const gm = 'https://www.google.com/maps/search/?api=1&query=' + q;
  let html = '<div class="poi-modal-header"><span class="poi-dot" style="background:' + (CAT_COLORS[p.cat] || '#888') + '"></span>' +
    '<div><div class="poi-modal-title">' + esc(n.primary) + '</div>' + (n.secondary ? '<div class="poi-modal-sub">' + esc(n.secondary) + '</div>' : '') + '</div></div>';
  (p.warnings || []).forEach(w => { html += '<div class="poi-modal-warn">⚠️ ' + esc(getField(w, 'text')) + '</div>'; });
  html += '<div class="poi-modal-section">';
  html += '<div class="poi-modal-row">' + mi('location_on') + '<span>' + getCityName(p.city) + ' · ' + esc(getField(p, 'addr')) + '</span></div>';
  if (p.hours) html += '<div class="poi-modal-row">' + mi('schedule') + '<span>' + esc(p.hours) + '</span></div>';
  const price = p.price_twd > 0 ? ('CHF ' + p.price_chf + '（' + fmtMoneyForce(p.price_twd, 'TWD') + '）') : t('poi_free');
  html += '<div class="poi-modal-row">' + mi('payments') + '<span>' + price + '</span></div>';
  if (getField(p, 'desc')) html += '<div class="poi-modal-row">' + mi('info') + '<span>' + esc(getField(p, 'desc')) + '</span></div>';
  if (p.url) html += '<div class="poi-modal-row">' + mi('open_in_new') + '<span><a href="' + p.url + '" target="_blank" rel="noopener">' + t('booking_link') + '</a></span></div>';
  html += '<div style="margin-top:8px"><span class="poi-modal-badge" style="background:' + (CAT_COLORS[p.cat] || '#888') + '">' + getCatName(p.cat) + '</span></div>';
  html += '</div>';
  if (p.dining) {
    const ok = p.dining.group_friendly !== false;
    html += '<div class="poi-modal-section"><div class="dining-box"><div class="dining-badges">' +
      '<span class="dining-badge' + (ok ? '' : ' warn') + '">' + mi(ok ? 'groups' : 'warning', 13) + ' ' + (ok ? t('poi_group_ok') : t('poi_group_warn')) + '</span>' +
      (p.dining.solo_friendly ? '<span class="dining-badge">' + mi('person', 13) + ' Solo OK</span>' : '') + '</div>' +
      '<div><b>' + t('poi_seating') + ':</b> ' + esc(getField(p.dining, 'seating')) + '</div></div></div>';
  }
  html += '<div class="poi-modal-section"><div class="section-label">' + t('poi_search_more') + '</div><div class="poi-modal-links">' +
    '<a href="' + gm + '" target="_blank" rel="noopener">' + mi('location_on', 14) + ' Google Maps</a>' +
    '<a href="https://www.google.com/search?q=' + q + '" target="_blank" rel="noopener">' + mi('search', 14) + ' Google</a>' +
    '<a href="https://www.instagram.com/explore/search/keyword/?q=' + q + '" target="_blank" rel="noopener">' + mi('photo_camera', 14) + ' Instagram</a>' +
    '<a href="https://www.youtube.com/results?search_query=' + q + '" target="_blank" rel="noopener">' + mi('play_circle', 14) + ' YouTube</a>' +
    '</div></div>';
  document.getElementById('poi-modal-content').innerHTML = html;
  document.getElementById('poi-modal-overlay').classList.add('open');
}
function closePOIModal() { document.getElementById('poi-modal-overlay').classList.remove('open'); }
function fmtMoneyForce(twd, cur) { return cur === 'TWD' ? 'NT$' + Math.round(twd).toLocaleString() : 'CHF ' + Math.round(twd / TRIP.currency.rates.CHF); }

/* ---------- calendar ---------- */
function initCalendar() {
  renderCalendar();
}
function weekChunks() {
  const days = TRIP.schedule;
  const chunks = [];
  for (let i = 0; i < days.length; i += 7) chunks.push(days.slice(i, i + 7));
  return chunks;
}
function renderCalendar() {
  const wrap = document.getElementById('cal-wrap');
  if (!wrap) return;
  const chunks = weekChunks();
  if (currentWeek >= chunks.length) currentWeek = 0;
  const days = chunks[currentWeek];
  const today = localDateStr();
  /* pills */
  let pills = '<div class="pill-group">';
  chunks.forEach((c, i) => {
    pills += '<button class="pill' + (i === currentWeek ? ' on' : '') + '" data-week="' + i + '">' + t(i === 0 ? 'cal_week1' : 'cal_week2') + '</button>';
  });
  pills += '</div>';
  document.getElementById('cal-pills').innerHTML = pills;
  document.querySelectorAll('#cal-pills [data-week]').forEach(b => b.addEventListener('click', () => {
    currentWeek = parseInt(b.getAttribute('data-week'), 10);
    renderCalendar();
  }));
  /* desktop grid */
  const cols = days.length;
  let html = '<div class="calendar-desktop" style="--cal-cols:' + cols + '">';
  html += '<div class="cal-header"><div></div>';
  days.forEach(d => {
    const isToday = d.date === today;
    html += '<div class="cal-day-hdr' + (isToday ? ' current' : '') + '"><div class="cd-name">' + weekdayName(d.date) + '</div><div class="cd-num">' + parseInt(d.date.slice(8), 10) + '</div><div class="cd-city">' + esc(getScheduleCityName(d.city)) + '</div></div>';
  });
  html += '</div><div class="cal-scroll"><div class="cal-grid" style="--cal-cols:' + cols + '"><div class="cal-time-col">';
  for (let h = HOUR_START; h < HOUR_END; h++) html += '<div class="cal-time-slot">' + String(h).padStart(2, '0') + ':00</div>';
  html += '</div>';
  days.forEach(d => {
    html += '<div class="cal-day-col" data-date="' + d.date + '">';
    for (let h = HOUR_START; h < HOUR_END; h++) html += '<div class="cal-hour-line"></div>';
    d.events.forEach(ev => {
      const top = (ev.sh - HOUR_START) * 60;
      const height = Math.max(22, (ev.eh - ev.sh) * 60 - 3);
      html += '<div class="cal-event cat-' + (ev.cat || 'other') + '" style="top:' + top + 'px;height:' + height + 'px">' +
        '<span class="ev-title">' + esc(getEventName(ev)) + '</span>' +
        '<span class="ev-loc">' + fmtHour(ev.sh) + '–' + fmtHour(ev.eh) + '</span>' +
        (ev.restaurant && height > 54 ? '<div class="ev-rest">🍽️ ' + esc(ev.restaurant) + (ev.map ? ' <a href="' + ev.map + '" target="_blank" rel="noopener">📍</a>' : '') + (ev.reservation === 'needed' ? ' ⚠️' : '') + '</div>' : '') +
        (ev.booking_url && height > 76 ? '<div class="ev-rest">🎫 <a href="' + ev.booking_url + '" target="_blank" rel="noopener">' + t('booking_link') + '</a></div>' : '') +
        '</div>';
    });
    html += '</div>';
  });
  html += '</div></div></div>';
  /* mobile list */
  html += '<div class="calendar-mobile">';
  days.forEach(d => {
    html += '<div class="cal-m-day"><div class="cal-m-date"><div class="cmd-name">' + weekdayName(d.date) + '</div><div class="cmd-num">' + parseInt(d.date.slice(8), 10) + '</div><div class="cmd-city">' + esc(getScheduleCityName(d.city)) + '</div></div><div class="cal-m-events" data-date="' + d.date + '">';
    d.events.forEach(ev => {
      html += '<div class="cal-m-event" style="border-color:' + (CAT_COLORS[ev.cat] || '#000') + '" data-sh="' + ev.sh + '">' +
        '<div class="cme-title">' + esc(getEventName(ev)) + '</div>' +
        '<div class="cme-time">' + fmtHour(ev.sh) + '–' + fmtHour(ev.eh) + '</div>' +
        (getEventNote(ev) ? '<div class="cme-note">' + esc(getEventNote(ev)) + '</div>' : '') +
        (ev.restaurant ? '<div class="cme-rest">🍽️ ' + esc(ev.restaurant) + (ev.map ? ' <a href="' + ev.map + '" target="_blank" rel="noopener">📍Map</a>' : '') + (ev.reservation === 'needed' ? ' ⚠️' + t('res_needed') : (ev.reservation === true ? ' ✅' : '')) + '</div>' : '') +
        (ev.booking_url ? '<div class="cme-rest">🎫 <a href="' + ev.booking_url + '" target="_blank" rel="noopener">' + t('booking_link') + '</a>' + (ev.booking_note ? ' · ' + esc(ev.booking_note) : '') + '</div>' : '') +
        '</div>';
    });
    html += '</div></div>';
  });
  html += '</div>';
  wrap.innerHTML = html;
  renderNowLine();
}
function renderNowLine() {
  document.querySelectorAll('.cal-now-line, .cal-m-now').forEach(el => el.remove());
  const now = new Date();
  const destParts = new Intl.DateTimeFormat('en-CA', { timeZone: DEST_TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(now);
  const get = tp => destParts.find(x => x.type === tp).value;
  const destDate = get('year') + '-' + get('month') + '-' + get('day');
  const destHour = parseInt(get('hour'), 10) + parseInt(get('minute'), 10) / 60;
  const tzName = new Intl.DateTimeFormat('en-US', { timeZone: DEST_TZ, timeZoneName: 'short' }).formatToParts(now).find(x => x.type === 'timeZoneName').value;
  const col = document.querySelector('.cal-day-col[data-date="' + destDate + '"]');
  if (col && destHour >= HOUR_START && destHour <= HOUR_END) {
    const line = document.createElement('div');
    line.className = 'cal-now-line';
    line.style.top = ((destHour - HOUR_START) * 60) + 'px';
    line.innerHTML = '<span class="cal-now-label">' + fmtHour(destHour) + ' ' + tzName + '</span>';
    col.appendChild(line);
  }
  const mcol = document.querySelector('.cal-m-events[data-date="' + destDate + '"]');
  if (mcol) {
    const marker = document.createElement('div');
    marker.className = 'cal-m-now';
    marker.textContent = fmtHour(destHour) + ' ' + tzName;
    let inserted = false;
    Array.from(mcol.children).forEach(ch => {
      if (!inserted && parseFloat(ch.getAttribute('data-sh') || '99') > destHour) { mcol.insertBefore(marker, ch); inserted = true; }
    });
    if (!inserted) mcol.appendChild(marker);
  }
}

/* ---------- clocks ---------- */
function initClocks() { updateClocks(); setInterval(() => { updateClocks(); renderNowLine(); }, 30000); }
function getTimeInTZ(tz) { return new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit' }); }
function updateClocks() {
  const d = document.getElementById('clock-dest'), h = document.getElementById('clock-home');
  if (d) d.textContent = getTimeInTZ(DEST_TZ);
  if (h) h.textContent = getTimeInTZ(HOME_TZ);
}

/* ---------- booking ---------- */
function renderBooking() {
  const bk = TRIP.booking;
  if (!bk) return;
  /* flight intel */
  const fi = TRIP.flightIntel;
  const fiEl = document.getElementById('flight-intel');
  if (fiEl && fi) {
    const max = Math.max(...fi.monthlyPrices.map(m => m.avg));
    let bars = '';
    fi.monthlyPrices.forEach(m => {
      const hot = m.label === 'Jul';
      bars += '<div class="fi-bar-wrap"><div class="fi-bar' + (hot ? ' hot' : '') + '" style="height:' + Math.round(m.avg / max * 100) + '%"></div><div class="fi-bar-lab">' + m.label + '</div></div>';
    });
    const booked = fi.booked && fi.userPrice;
    const badge = booked
      ? '<div class="fi-badge" style="background:#e3f5e6;color:#2a7a36">' + t('fi_badge_booked') + '</div>'
      : '<div class="fi-badge">' + t('fi_badge') + '</div>';
    const firstMetric = booked
      ? '<span>' + t('fi_user') + ': <b>' + fmtMoney(fi.userPrice) + '</b></span>'
      : '<span>' + t('fi_july') + ': <b>' + fmtMoney(45000) + '</b></span>';
    const advice = booked
      ? t('fi_verdict_good').replace('{pct}', String(Math.round((fi.range.avg - fi.userPrice) / fi.range.avg * 100)))
      : t('fi_advice');
    fiEl.innerHTML = '<div class="fi-head"><div class="fi-route">✈️ ' + fi.route + '</div>' + badge + '</div>' +
      '<div class="fi-chart">' + bars + '</div>' +
      '<div class="fi-metrics">' + firstMetric +
      '<span>' + t('fi_range') + ': <b>' + fmtMoney(fi.range.low) + ' – ' + fmtMoney(fi.range.high) + '</b></span>' +
      '<span>💡 ' + advice + '</span></div>' +
      '<div class="budget-note" style="margin:8px 0 0">' + esc(getI18nObj(fi.note)) + '</div>';
  }
  /* holidays */
  const hEl = document.getElementById('holiday-list');
  if (hEl && TRIP.holidays) {
    hEl.innerHTML = TRIP.holidays.items.map(h =>
      '<div class="holiday-item' + (h.active ? ' active' : '') + '"><span class="holiday-date">' + h.date.slice(5).replace('-', '/') + '</span><span><b>' + esc(getField(h, 'name')) + '</b> · ' + esc(h.days) + '</span><span class="holiday-tip">' + esc(getField(h, 'tip')) + '</span></div>'
    ).join('');
  }
  /* confirmed */
  const cEl = document.getElementById('booking-confirmed');
  if (cEl) {
    cEl.innerHTML = bk.confirmed.map(b => {
      const done = b.status === 'confirmed';
      return '<div class="booked-card"><div class="booked-card-head"><div class="booked-card-title">' + esc(getField(b, 'title')) + '</div>' +
        '<span class="booked-badge ' + (done ? 'done' : 'pending') + '">' + t(done ? 'booking_purchased' : 'booking_pending') + '</span></div>' +
        '<div class="booked-meta">' + mi('calendar_month', 14) + ' ' + esc(getField(b, 'dates')) + '</div>' +
        '<div class="booked-meta">' + mi('payments', 14) + ' ' + esc(getField(b, 'price')) + '</div>' +
        (b.segments ? '<div style="margin-top:8px;display:flex;flex-direction:column;gap:3px">' + b.segments.map(s => '<div class="booked-meta" style="font-family:ui-monospace,monospace;font-size:.7rem">' + esc(s) + '</div>').join('') + '</div>' : '') +
        (b.owner ? '<span class="booked-owner">→ ' + esc(b.owner) + '</span>' : '') +
        (b.amenities ? '<div class="am-chips">' + b.amenities.map(a => '<span class="am-chip">' + esc(getI18nObj(a)) + '</span>').join('') + '</div>' : '') +
        (getField(b, 'note') ? '<div class="booked-note">' + esc(getField(b, 'note')) + '</div>' : '') +
        '<div class="booked-card-links">' +
        (b.url ? '<a href="' + b.url + '" target="_blank" rel="noopener">' + mi('open_in_new', 13) + ' ' + t('booking_link') + '</a>' : '') +
        (b.url2 ? '<a href="' + b.url2 + '" target="_blank" rel="noopener">' + mi('open_in_new', 13) + ' ' + esc(b.url2_label || 'Link 2') + '</a>' : '') +
        (b.maps_url ? '<a href="' + b.maps_url + '" target="_blank" rel="noopener">' + mi('location_on', 13) + ' ' + t('booking_map') + '</a>' : '') +
        '</div></div>';
    }).join('');
  }
  /* comparison */
  const cmpEl = document.getElementById('booking-comparison');
  if (cmpEl) {
    let rows = bk.comparison.map(c => {
      const cell = (key, label) => {
        const v = c.prices[key];
        if (!v || v === '—') return '<td style="color:var(--text-3)">—</td>';
        const best = c.best === key;
        return '<td>' + (best ? '<span class="best-price">' + esc(v) + ' <span class="star-mark">★</span></span>' : esc(v)) + '</td>';
      };
      return '<tr><td><div class="bt-name">' + esc(getField(c, 'name')) + '</div><div class="bt-note">' + esc(getField(c, 'name_note')) + '</div></td>' +
        cell('official') + cell('klook') + cell('kkday') +
        '<td class="bt-verdict">' + esc(getField(c, 'verdict')) + (c.url ? ' <a href="' + c.url + '" target="_blank" rel="noopener">' + mi('open_in_new', 12) + '</a>' : '') + '</td></tr>';
    }).join('');
    cmpEl.innerHTML = '<div class="booking-table-wrap"><table class="booking-table"><thead><tr><th>' + t('booking_item') + '</th><th>' + t('booking_official') + '</th><th>Klook</th><th>KKday</th><th>' + t('booking_advice') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
  }
  /* to buy */
  const tbEl = document.getElementById('booking-tobuy');
  if (tbEl) {
    tbEl.innerHTML = bk.to_buy.map(x =>
      '<div class="recommend-item"><div class="rec-name">' + esc(getField(x, 'name')) + '</div><div class="rec-note">' + esc(getField(x, 'note')) + '</div></div>'
    ).join('');
  }
}

/* ---------- budget ---------- */
function initBudget() {
  document.querySelectorAll('[data-bmode]').forEach(b => b.addEventListener('click', () => {
    budgetMode = b.getAttribute('data-bmode');
    document.querySelectorAll('[data-bmode]').forEach(x => x.classList.toggle('on', x.getAttribute('data-bmode') === budgetMode));
    renderBudget();
  }));
  document.querySelectorAll('[data-cur]').forEach(b => b.addEventListener('click', () => {
    currentCurrency = b.getAttribute('data-cur');
    document.querySelectorAll('[data-cur]').forEach(x => x.classList.toggle('on', x.getAttribute('data-cur') === currentCurrency));
    renderBudget(); renderOverview();
  }));
  renderBudget();
}
function renderBudget() {
  const isEst = budgetMode === 'est';
  const items = TRIP.budget.items;
  const actual = TRIP.budget.actual_expenses || [];
  let total, cityTotals = {}, catTotals = {};
  if (isEst) {
    total = items.reduce((s, i) => s + (i.cost_twd || 0), 0);
    items.forEach(i => {
      cityTotals[i.city] = (cityTotals[i.city] || 0) + i.cost_twd;
      catTotals[i.cat] = (catTotals[i.cat] || 0) + i.cost_twd;
    });
  } else {
    total = 0;
    items.filter(i => i.purchased).forEach(i => {
      total += i.cost_twd;
      cityTotals[i.city] = (cityTotals[i.city] || 0) + i.cost_twd;
      catTotals[i.cat] = (catTotals[i.cat] || 0) + i.cost_twd;
    });
    actual.forEach(d => d.items.forEach(i => {
      total += i.cost_twd;
      cityTotals[i.city || 'all'] = (cityTotals[i.city || 'all'] || 0) + i.cost_twd;
      catTotals[i.cat || 'other'] = (catTotals[i.cat || 'other'] || 0) + i.cost_twd;
    }));
  }
  document.getElementById('btp-label').textContent = t(isEst ? 'bud_total_est' : 'bud_total_act');
  document.getElementById('btp-amount').textContent = total > 0 ? fmtMoney(total) : '–';
  /* city bars */
  const cityMax = Math.max(1, ...Object.values(cityTotals));
  const cityOrder = ['all'].concat(CITY_KEYS).filter(c => cityTotals[c]);
  document.getElementById('budget-city-bars').innerHTML = cityOrder.map(c =>
    '<div class="h-bar-row"><span>' + getCityName(c) + '</span><div class="h-bar-track"><div class="h-bar-fill" style="width:' + Math.round(cityTotals[c] / cityMax * 100) + '%;background:' + (CITY_COLORS[c] || '#888') + '"></div></div><span class="h-bar-val">' + fmtMoney(cityTotals[c]) + '</span></div>'
  ).join('') || '<div class="budget-note">' + t('bud_noactual') + '</div>';
  /* cat bars */
  const catMax = Math.max(1, ...Object.values(catTotals));
  const catOrder = Object.keys(catTotals).sort((a, b) => catTotals[b] - catTotals[a]);
  document.getElementById('budget-cat-bars').innerHTML = catOrder.map(c =>
    '<div class="h-bar-row"><span>' + getCatName(c) + '</span><div class="h-bar-track"><div class="h-bar-fill" style="width:' + Math.round(catTotals[c] / catMax * 100) + '%;background:' + (CAT_COLORS[c] || '#888') + '"></div></div><span class="h-bar-val">' + fmtMoney(catTotals[c]) + '</span></div>'
  ).join('') || '<div class="budget-note">' + t('bud_noactual') + '</div>';
  /* detail list */
  const listEl = document.getElementById('budget-items');
  if (isEst) {
    listEl.innerHTML = '<div class="items-table-wrap"><div class="items-head"><span>' + t('bud_items') + '</span><span>' + fmtMoney(total) + '</span></div>' +
      items.map(i => '<div class="item-row"><span class="item-name">' + esc(getField(i, 'name')) + (i.purchased ? ' <span class="item-purchased">✓ ' + t('booking_purchased') + '</span>' : '') + '</span><span class="item-city">' + getCityName(i.city) + '</span><span class="item-cost">' + fmtMoney(i.cost_twd) + '</span></div>').join('') +
      '</div><div class="budget-note">' + t('bud_scope') + '</div>';
  } else {
    let html = '';
    const pre = items.filter(i => i.purchased);
    if (pre.length) {
      html += '<div class="items-table-wrap"><div class="items-head"><span>' + t('bud_prepurchased') + '</span><span>' + fmtMoney(pre.reduce((s, i) => s + i.cost_twd, 0)) + '</span></div>' +
        pre.map(i => '<div class="item-row"><span class="item-name">' + esc(getField(i, 'name')) + '</span><span class="item-city">' + getCityName(i.city) + '</span><span class="item-cost">' + fmtMoney(i.cost_twd) + '</span></div>').join('') + '</div>';
    }
    if (actual.length) {
      actual.forEach(d => {
        const dt = d.items.reduce((s, i) => s + i.cost_twd, 0);
        html += '<div class="items-table-wrap"><div class="items-head"><span>' + d.date.slice(5).replace('-', '/') + '</span><span>' + fmtMoney(dt) + '</span></div>' +
          d.items.map(i => '<div class="item-row"><span class="item-name">' + esc(getField(i, 'name')) + '</span><span class="item-city">' + getCityName(i.city || 'all') + '</span><span class="item-cost">' + fmtMoney(i.cost_twd) + '</span></div>').join('') + '</div>';
      });
    } else {
      html += '<div class="budget-note">' + t('bud_noactual') + '</div>';
    }
    listEl.innerHTML = html;
  }
}

/* ---------- time allocation ---------- */
function renderTimeAlloc() {
  const el = document.getElementById('talloc');
  if (!el) return;
  const catHours = {};
  TRIP.schedule.forEach(d => d.events.forEach(ev => {
    catHours[ev.cat] = (catHours[ev.cat] || 0) + (ev.eh - ev.sh);
  }));
  const totalH = Object.values(catHours).reduce((a, b) => a + b, 0);
  const order = Object.keys(catHours).sort((a, b) => catHours[b] - catHours[a]);
  let seg = '<div class="talloc-seg">';
  order.forEach(c => {
    const pct = catHours[c] / totalH * 100;
    seg += '<div style="width:' + pct + '%;background:' + (CAT_COLORS[c] || '#888') + '" title="' + getCatName(c) + ' ' + catHours[c].toFixed(1) + 'h">' + (pct > 9 ? getCatName(c) : '') + '</div>';
  });
  seg += '</div><div class="talloc-legend">';
  order.forEach(c => {
    seg += '<span><i style="background:' + (CAT_COLORS[c] || '#888') + '"></i>' + getCatName(c) + ' ' + catHours[c].toFixed(1) + ' ' + t('talloc_hours') + '</span>';
  });
  seg += '</div>';
  el.innerHTML = seg;
}

/* ---------- checklist ---------- */
function renderChecklist() {
  const el = document.getElementById('check-grid');
  if (!el) return;
  const saved = JSON.parse(localStorage.getItem('trip-checklist') || '{}');
  el.innerHTML = TRIP.checklist.map((g, gi) =>
    '<div class="check-group"><h3>' + esc(getI18nObj(g.title)) + '</h3>' +
    g.items.map((it, ii) => {
      const key = gi + '-' + ii;
      const done = !!saved[key];
      return '<label class="check-item' + (done ? ' done' : '') + '" data-ck="' + key + '"><input type="checkbox"' + (done ? ' checked' : '') + '><span>' + esc(getI18nObj(it)) + '</span></label>';
    }).join('') + '</div>'
  ).join('');
  el.querySelectorAll('.check-item input').forEach(cb => {
    cb.addEventListener('change', () => {
      const key = cb.closest('.check-item').getAttribute('data-ck');
      const s = JSON.parse(localStorage.getItem('trip-checklist') || '{}');
      s[key] = cb.checked;
      localStorage.setItem('trip-checklist', JSON.stringify(s));
      cb.closest('.check-item').classList.toggle('done', cb.checked);
    });
  });
}

/* ---------- retro ---------- */
function renderRetro() {
  const el = document.getElementById('retro-body');
  if (!el) return;
  const over = new Date() > new Date(TRIP.endDate + 'T23:59:59');
  const r = TRIP.retro || {};
  if (!over || (!r.changelog.length && !r.missed_pois.length)) {
    el.innerHTML = '<div class="retro-empty">' + mi('auto_stories', 34) + '<br><br>' + t('retro_empty') + '</div>';
    return;
  }
  el.innerHTML = '<div class="retro-empty">' + t('retro_empty') + '</div>';
}

/* ---------- export ---------- */
function initExport() {
  const gBtn = document.getElementById('btn-export-gmap');
  if (gBtn) gBtn.addEventListener('click', () => {
    const pts = visiblePOIs().slice(0, 10);
    if (!pts.length) return;
    const url = 'https://www.google.com/maps/dir/' + pts.map(p => p.lat + ',' + p.lng).join('/');
    window.open(url, '_blank');
  });
  const jBtn = document.getElementById('btn-export-geojson');
  if (jBtn) jBtn.addEventListener('click', () => {
    const geo = {
      type: 'FeatureCollection',
      features: TRIP.pois.map(p => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
        properties: { name: p.name, nameLocal: p.nameLocal, name_en: p.name_en, description: p.desc, category: p.cat, city: p.city }
      }))
    };
    const blob = new Blob([JSON.stringify(geo, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'trip-switzerland-2026.geojson';
    a.click();
  });
  const pBtn = document.getElementById('btn-print');
  if (pBtn) pBtn.addEventListener('click', () => window.print());
}
