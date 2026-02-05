# SHOP.CO E-commerce Case (Wibesoft)

Next.js (App Router) + TypeScript + TanStack Query v5 + Zustand + Tailwind CSS
kullanılarak geliştirilen, FakeStore API üzerinden çalışan e-commerce case uygulaması.

Bu çalışma bir **case study** olarak:

- Figma’ya görsel olarak tutarlı UI
- Temiz ve açıklanabilir mimari
- Abartısız ama doğru state yönetimi
  hedeflenerek geliştirilmiştir.

---

## 🌐 Canlı Demo

- **Live:** https://wibesoft.kudretkrbyk.com.tr

Uygulama Ubuntu VDS üzerinde **Nginx reverse proxy + SSL** ile yayınlanmıştır.

---

## 🧰 Teknolojiler

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- TanStack Query v5
- Zustand
- FakeStore API

---

## ⚙️ Lokal Kurulum

### Gereksinimler

- Node.js **LTS** (önerilen: 20.x)
- npm

> Not: Node “current” sürümleri (örn. 25.x) bazı dependency uyumsuzluklarına sebep olabildiği için LTS tercih edilmiştir.

### Kurulum

# 1) Repo'yu klonla

git clone <REPO_URL>

# 2) Proje klasörüne gir

cd <REPO_FOLDER>

# 3) Bağımlılıkları kur

npm install

# 4) Environment dosyasını oluştur (.env.example -> .env.local)

cp .env.example .env.local

# 5) Development server'ı başlat

npm run dev
