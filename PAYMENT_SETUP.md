# 🚀 Crypto Payment Setup Guide

## CoinGate Integration

### 1. Registracija na CoinGate

1. Idi na [https://coingate.com/](https://coingate.com/)
2. Klikni **Sign Up** (ili prijavi se ako već imaš account)
3. Verifikuj email adresu
4. Kompletuj KYC verifikaciju (potrebno za production)

### 2. Kreiranje API Keya

1. U CoinGate dashboardu, idi na **Account** → **API**
2. Klikni **Generate API Auth Token**
3. Kopiraj API token (prikazuje se samo jednom!)
4. Dodaj u `.env.local`:
   ```
   COINGATE_API_KEY=your-api-token-here
   COINGATE_ENVIRONMENT=sandbox
   ```

### 3. Test Mode (Sandbox)

Za testiranje bez stvarnih transakcija:

1. Koristi **Sandbox mode**:
   ```bash
   COINGATE_ENVIRONMENT=sandbox
   ```
2. Test payments možeš praviti na: https://sandbox.coingate.com
3. Za production promijeni u:
   ```bash
   COINGATE_ENVIRONMENT=live
   ```

### 4. Environment Varijable

Kreiraj `.env.local` fajl u root direktoriju:

```bash
# CoinGate
COINGATE_API_KEY=your-coingate-api-token
COINGATE_ENVIRONMENT=sandbox  # ili 'live' za production

# Base URL (za production stavi pravi domain)
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# NextAuth (već postoji)
AUTH_SECRET=your-auth-secret
AUTH_GITHUB_ID=your-github-id
AUTH_GITHUB_SECRET=your-github-secret

# OpenAI (za chat widget)
OPENAI_API_KEY=your-openai-key
OPENAI_MODEL=gpt-4o-mini
```

### 5. Prihvaćene Kriptovalute

CoinGate prihvata **50+ kriptovaluta**:
- Bitcoin (BTC)
- Ethereum (ETH)
- Litecoin (LTC)
- Bitcoin Cash (BCH)
- Ripple (XRP)
- Tether (USDT)
- USD Coin (USDC)
- Dogecoin (DOGE)
- Tron (TRX)
- Binance Coin (BNB)
- ...i mnoge druge!

Korisnik može da bira koji coin želi da koristi tokom checkout-a.

### 6. Fees

- **CoinGate**: 1% po transakciji (može biti niže za veće volume)
- **Gas fees**: Plaća kupac (zavisi od blockchain network-a)
- **Settlement**: Automatska konverzija u EUR ili držanje u crypto

### 7. Testing

**Sandbox Testing:**
1. Postavi `COINGATE_ENVIRONMENT=sandbox`
2. Koristi sandbox API credentials
3. Test payments na https://sandbox.coingate.com
4. Automatski se označava kao "paid" bez stvarnog plaćanja

**Production:**
1. Promijeni u `COINGATE_ENVIRONMENT=live`
2. Koristi production API key
3. Završi KYC verifikaciju

### 8. Payment Flow

```
User fills project request form
         ↓
Chooses amount (EUR)
         ↓
API creates CoinGate order
         ↓
User redirects to CoinGate payment page
         ↓
User selects crypto & pays
         ↓
CoinGate confirms payment
         ↓
User redirects to /payment/success
         ↓
Webhook notification (opciono)
```

### 9. Napomene za EU/Njemačku

- ✅ CoinGate je EU kompanija (Lithuania)
- ✅ EUR je native currency
- ✅ SEPA isplate direktno na bankovni račun
- ✅ Automatska tax reporting za EU
- ⚠️ Potrebna Business verifikacija za veće amounts
- ⚠️ Preporučeno: Konsultuj poreskog savjetnika za crypto income reporting

### 10. Webhook Setup (Opciono ali preporučeno)

Webhooks omogućavaju automatsku notifikaciju kada je plaćanje završeno:

1. U CoinGate → **Account** → **API** → **Webhooks**
2. Dodaj webhook URL: `https://yourdomain.com/api/payment/webhook`
3. Eventi: Order Paid, Order Confirmed
4. Implementiraj webhook handler (za kasnije)

### 11. Go Live Checklist

- [ ] CoinGate account verifikovan i KYC završen
- [ ] API key kreiran
- [ ] Environment postavljen na `live`
- [ ] NEXT_PUBLIC_BASE_URL postavljen na pravi HTTPS domain
- [ ] Test transakcija uspješna u sandbox mode
- [ ] Webhook konfigurisan (opciono)
- [ ] Bank account povezan za settlement

## 📧 Support

Za pitanja o CoinGate: [support@coingate.com](mailto:support@coingate.com)

Za pitanja o ovoj implementaciji: [post@camundaflow.de](mailto:post@camundaflow.de)

## 🎯 CoinGate vs Coinbase Commerce

**Prednosti CoinGate:**
- ✅ EU kompanija (bolji compliance za EU businesses)
- ✅ Više podržanih coins (50+ vs 4)
- ✅ Sandbox mode za testiranje
- ✅ Direktne SEPA isplate
- ✅ Niži fees za veći volume
- ✅ Bolji customer support za EU

**CoinGate je idealan izbor za EU/Njemačku!**
