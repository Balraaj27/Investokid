# 🔑 API Keys Setup Guide for Investokid Platform

## 📋 **Required API Keys**

### **1. 📈 Alpha Vantage (Market Data)**
**Purpose**: Real-time stock market data for Indian indices (Nifty, Sensex, Bank Nifty)

**How to Get:**
1. Visit: https://www.alphavantage.co/support/#api-key
2. Click "Get your free API key today"
3. Fill out the form (Name, Email, Organization)
4. Verify your email
5. Copy your API key

**Free Tier Limits:**
- ✅ 5 API calls per minute
- ✅ 500 API calls per day
- ✅ Supports Indian stock market data

**Cost**: FREE forever

**Where Used**: 
- Hero section market data
- Market overview component
- Real-time price updates

---

### **2. 📰 NewsAPI.org (Financial News)**
**Purpose**: Live financial news from Indian sources

**How to Get:**
1. Visit: https://newsapi.org/register
2. Create free account
3. Verify email
4. Go to dashboard: https://newsapi.org/account
5. Copy your API key

**Free Tier Limits:**
- ✅ 1,000 requests per day
- ✅ Indian business news
- ❌ HTTPS only in paid plans

**Cost**: FREE (Developer plan)

**Where Used**:
- Today's Trends section
- News page
- Market overview news
- Admin news management

---

### **3. 🌐 RSS2JSON (RSS Feed Converter)**
**Purpose**: Convert RSS feeds to JSON (for Google Trends and backup news)

**How to Get:**
1. Visit: https://rss2json.com/
2. No registration required for basic usage
3. For higher limits, create account

**Free Tier Limits:**
- ✅ 10,000 requests per day
- ✅ No authentication required
- ✅ CORS enabled

**Cost**: FREE

**Where Used**:
- Google Trends data
- RSS news feeds backup
- Financial news aggregation

---

### **4. 🔗 Supabase (Database & Backend)**
**Purpose**: PostgreSQL database, authentication, real-time subscriptions

**How to Get:**
1. Visit: https://supabase.com
2. Sign up with GitHub/Google
3. Create new project
4. Copy URL and API keys from Settings > API

**Free Tier Limits:**
- ✅ 500MB database
- ✅ 50,000 monthly active users
- ✅ 2GB bandwidth
- ✅ Real-time subscriptions

**Cost**: FREE (Generous free tier)

**Where Used**:
- All database operations
- User authentication
- Real-time updates
- File storage

---

## ⚙️ **Environment Variables Setup**

Create/Update your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Market Data API
VITE_ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key_here

# News API
VITE_NEWS_API_KEY=your_newsapi_key_here

# Optional: GNews API (backup)
VITE_GNEWS_API_KEY=your_gnews_key_here
```

---

## 🚀 **Quick Setup Steps**

### **Step 1: Get Alpha Vantage Key (2 minutes)**
```bash
# 1. Go to: https://www.alphavantage.co/support/#api-key
# 2. Fill form and verify email
# 3. Add to .env file
VITE_ALPHA_VANTAGE_API_KEY=YOUR_KEY_HERE
```

### **Step 2: Get NewsAPI Key (2 minutes)**
```bash
# 1. Go to: https://newsapi.org/register
# 2. Create account and verify email
# 3. Add to .env file
VITE_NEWS_API_KEY=YOUR_KEY_HERE
```

### **Step 3: Setup Supabase (5 minutes)**
```bash
# 1. Go to: https://supabase.com
# 2. Create new project
# 3. Wait for database setup
# 4. Copy credentials from Settings > API
# 5. Add to .env file
```

---

## 📊 **API Usage Optimization**

### **Current Usage Pattern:**
- **Market Data**: Called once on page load + manual refresh
- **News Data**: Called once on page load + manual refresh  
- **Database**: Real-time with Supabase (no polling)
- **Google Trends**: Called once on page load + manual refresh

### **Rate Limiting Protection:**
- ✅ 12-second delays between Alpha Vantage calls
- ✅ Fetch guards to prevent duplicate calls
- ✅ Error handling with mock data fallback
- ✅ Manual refresh buttons instead of auto-refresh

### **Cost Optimization:**
- **Alpha Vantage**: ~20 calls/day (well within 500 limit)
- **NewsAPI**: ~50 calls/day (well within 1,000 limit)
- **RSS2JSON**: ~100 calls/day (well within 10,000 limit)
- **Supabase**: Real-time (no polling needed)

---

## 🔧 **Troubleshooting**

### **If APIs Don't Work:**
1. **Check API Keys** in .env file
2. **Verify Account Status** (not suspended)
3. **Check Rate Limits** (wait if exceeded)
4. **Use Mock Data** (automatic fallback)

### **Common Issues:**
- **CORS Errors**: Use RSS2JSON proxy for RSS feeds
- **Rate Limits**: Wait 12 seconds between calls
- **Invalid Keys**: Double-check API key format
- **Network Issues**: Mock data will load automatically

---

## 💰 **Cost Summary**

| Service | Free Tier | Monthly Cost | Usage |
|---------|-----------|--------------|-------|
| Alpha Vantage | 500 calls/day | $0 | Market data |
| NewsAPI | 1,000 calls/day | $0 | Financial news |
| RSS2JSON | 10,000 calls/day | $0 | RSS conversion |
| Supabase | 500MB DB | $0 | Database & auth |
| **TOTAL** | **Generous limits** | **$0** | **Full platform** |

---

## 🎯 **Priority Setup Order**

### **1. Essential (Required for basic functionality)**
- ✅ **Supabase** - Database and backend
- ✅ **Alpha Vantage** - Market data

### **2. Important (Enhanced features)**
- ✅ **NewsAPI** - Live financial news
- ✅ **RSS2JSON** - Google Trends

### **3. Optional (Nice to have)**
- ⭐ **GNews** - Backup news source
- ⭐ **Additional APIs** - Future enhancements

---

## 📞 **Support Links**

- **Alpha Vantage Support**: https://www.alphavantage.co/support/
- **NewsAPI Support**: https://newsapi.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **RSS2JSON Docs**: https://rss2json.com/docs

---

## ✨ **Pro Tips**

1. **Start with Supabase** - Most important for backend
2. **Test with Mock Data** - Platform works without APIs
3. **Add Keys Gradually** - One service at a time
4. **Monitor Usage** - Check API dashboards regularly
5. **Use Fallbacks** - Mock data ensures reliability

Your platform will work perfectly with just Supabase connected! 🚀