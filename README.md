# 瑞士 8 天旅遊網站 · Switzerland Trip 2026

互動式旅遊指南 — 2026/7/18–7/25，蘇黎世 → 琉森 → Stoos → 因特拉肯 → 格林德瓦 → 策馬特（4 位大人）。

## 本機預覽

```bash
python3 serve.py
# 開啟 http://localhost:8765
```

（直接雙擊 `index.html` 也可以，內建 file:// 資料備援。）

## 內容

- **概覽** — 倒數計時、今日行程卡、8 天天氣
- **行程** — Google Calendar 式週檢視（桌機）＋清單（手機），即時「現在」紅線與雙時區時鐘
- **票券** — 機票行情、住宿訂位進度（Dina/Andy/Iris 分工）、STP 與纜車比價、建議購買
- **花費** — 每人預估 vs 實際記帳，TWD/CHF 切換
- **景點** — Leaflet 互動地圖＋40 個 POI，可匯出 Google Maps / GeoJSON
- **清單** — 行前清單（勾選會存在瀏覽器）
- 語言：繁體中文 / English / Deutsch

## 更新資料

行程資料在 `data/trip.json`。改完後執行以下指令同步到 index.html 的內嵌備援：

```bash
python3 -c "
import json, re
data = open('data/trip.json', encoding='utf-8').read().strip()
html = open('index.html', encoding='utf-8').read()
html = re.sub(r'(<script id=\"trip-data\" type=\"application/json\">).*?(</script>)', lambda m: m.group(1) + data + m.group(2), html, flags=re.S)
open('index.html', 'w', encoding='utf-8').write(html)
"
```

## 部署到 GitHub Pages

1. 在 GitHub 建立新 repo（Public）
2. 上傳此資料夾所有檔案
3. Settings → Pages → Deploy from branch（main / root）
4. 網址：`https://<username>.github.io/<repo-name>/`
