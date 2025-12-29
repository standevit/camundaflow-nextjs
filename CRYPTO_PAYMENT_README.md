# 💳 Crypto Payment System - Quick Start (CoinGate)

## ✅ Šta je implementirano?

### 1. **Project Request Form na Dashboard-u**
- Korisnik klikne "Projekt anfragen"
- Pop-up modal sa detaljnim formularom:
  - Projekt naziv
  - Tip projekta (Camunda Workflow, Microservices, AI Agents, itd.)
  - Detaljna deskr ipcija
  - Tehničke specifications
  - Deadline (opciono)

### 2. **Custom Payment Page (`/payment`)**
- Prikazuje sve detalje projekta
- 3 sugerisane cijene:
  - **Starter**: €299 - Za manje projekte
  - **Professional**: €999 - Za srednje projekte
  - **Enterprise**: €2499 - Za velike projekte
- **Custom amount input** - korisnik unosi svoju cijenu (min €50)
- Integracija sa CoinGate

### 3. **CoinGate Integration**
- API ruta: `/api/payment/create-charge`
- Podržane kriptovalute:
  - Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC)
  - Tether (USDT), USD Coin (USDC)
  - Dogecoin (DOGE), Binance Coin (BNB)
  - **50+ drugih coins!**
- Automatski redirect na CoinGate hosted checkout page
- Sandbox mode za testiranje

### 4. **Success Page (`/payment/success`)**
- Potvrda uspješne uplate
- Informacije o sljedećim koracima
- Link nazad na dashboard

---

## 🚀 Setup Upute

### Korak 1: CoinGate API Token

1. Idi na https://coingate.com/
2. Registruj se / prijavi se
3. Verify email
4. Idi na **Account** → **API**
5. Klikni **Generate API Auth Token**
6. Kopiraj API token

### Korak 2: Environment Varijable

Dodaj u `.env.local`:

```bash
# CoinGate
COINGATE_API_KEY=your-api-token-here
COINGATE_ENVIRONMENT=sandbox  # 'sandbox' za test, 'live' za production

# Base URL (obavezno za redirects!)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Ostale postojeće varijable...
AUTH_SECRET=...
AUTH_GITHUB_ID=...
AUTH_GITHUB_SECRET=...
OPENAI_API_KEY=...
```

### Korak 3: Testiranje lokalno

```bash
# Postavi local URL za testiranje
NEXT_PUBLIC_BASE_URL=http://localhost:3000
COINGATE_ENVIRONMENT=sandbox

npm run dev
```

1. Logiraj se sa GitHub-om
2. Idi na Dashboard
3. Klikni "Projekt anfragen"
4. Popuni form i klikni "Weiter zur Zahlung"
5. Odaberi iznos
6. Klikni "Mit Krypto bezahlen"
7. Redirect na CoinGate → uplati (sandbox automatski potvrđuje)

---

## 📊 User Flow

```
┌─────────────────────┐
│   User Dashboard    │
└──────────┬──────────┘
           │
           ▼
   ┌───────────────┐
   │ "Projekt      │
   │  anfragen"    │
   └───────┬───────┘
           │
           ▼
   ┌───────────────┐
   │ Modal Form    │
   │ (Project      │
   │  Details)     │
   └───────┬───────┘
           │
           ▼
   ┌───────────────┐
   │ /payment      │
   │ (Choose       │
   │  Amount)      │
   └───────┬───────┘
           │
           ▼
   ┌────────────────┐
   │   CoinGate     │
   │ (Crypto Pay)   │
   └────────┬───────┘
           │
           ▼
   ┌────────────────┐
   │ /payment/      │
   │  success       │
   └────────────────┘
```

---

## 💰 Fees & Pricing

- **CoinGate**: 1% po transakciji (niže za veći volume)
- **Gas fees**: Plaća kupac (ovisi o blockchainu)
- **Minimalni iznos**: €50
- **Valuta**: EUR (automatska konverzija u crypto)
- **Settlement**: SEPA direktno na bankovni račun (EUR)

---

## 🔒 Sigurnost

- ✅ Sve sensitive podatke šalje CoinGate, ne tvoj server
- ✅ API token se čuva u environment variables (ne commituje u Git)
- ✅ Project request details se čuvaju u `sessionStorage` (automatski se briše)
- ✅ Redirect URLs su whitelisted u CoinGate dashboardu
- ✅ EU kompanija sa GDPR compliance

---

## 🧪 Testing

**Sandbox Mode:**
```bash
COINGATE_ENVIRONMENT=sandbox
```
- Sve transakcije su test transakcije
- Automatski se označavaju kao "paid"
- Nema stvarnog transfera crypto
- Idealno za development

**Production Mode:**
```bash
COINGATE_ENVIRONMENT=live
```
- Stvarne transakcije
- KYC verifikacija potrebna
- Stvarni transfer crypto

---

## 📧 Notification System (Opciono - za kasnije)

Možeš dodati webhook za automatske email notifikacije:

1. U CoinGate: **Account** → **API** → **Webhooks**
2. Dodaj webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Eventi: `order.paid`, `order.confirmed`
4. Implementiraj `/api/payment/webhook/route.ts` (za kasnije)

---

## 🐛 Troubleshooting

### "Payment system not configured"
- Provjeri da li je `COINGATE_API_KEY` set u `.env.local`
- Restart dev server nakon dodavanja env varijable

### Redirect ne radi nakon uplate
- Provjeri `NEXT_PUBLIC_BASE_URL` u `.env.local`
- Za production: mora biti HTTPS domain
- Za development: može biti `http://localhost:3000`

### 401 Unauthorized error
- Provjeri da li je API token tačan
- Provjeri da li koristiš sandbox token sa sandbox environment

### Ne prima payment
- Provjeri u CoinGate dashboard da li je order kreiran
- Pogledaj network tab u browseru za API errors
- Provjeri server logs: `npm run dev`

---

## 🎯 Next Steps (Opciono)

1. **Email Notifications**: Pošalji email korisniku nakon uspješne uplate
2. **Admin Dashboard**: Panel za pregled svih project requests
3. **Database Integration**: Spremi requests u Supabase/PostgreSQL
4. **Invoice Generation**: Automatski generiši PDF invoice
5. **Project Tracking**: Omogući korisniku da prati status projekta
6. **Auto-settlement**: Automatska konverzija crypto u EUR

---

## 🌍 Zašto CoinGate?

### Prednosti za EU/Njemačku:
- ✅ **EU kompanija** (Lithuania) - bolji compliance
- ✅ **50+ kriptovaluta** vs 4 kod Coinbase
- ✅ **SEPA isplate** direktno na bankovni račun
- ✅ **Sandbox mode** za besplatno testiranje
- ✅ **Niži fees** za veći volume
- ✅ **EUR native** - bez dodatne konverzije
- ✅ **Automatski tax reporting** za EU

---

## 📞 Support

Za pitanja ili pomoć:
- **Email**: post@camundaflow.de
- **CoinGate Support**: support@coingate.com
- **Documentation**: https://developer.coingate.com/

---

**Gotovo! 🎉 CoinGate payment sistem je spreman za upotrebu!**
