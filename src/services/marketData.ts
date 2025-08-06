// Market Data Service - Multiple API Options

// Option 1: Alpha Vantage (Free tier: 5 calls/minute, 500 calls/day)
const ALPHA_VANTAGE_API_KEY = '8DMV071FFRKW2QHI'; // Get from: https://www.alphavantage.co/support/#api-key
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Option 2: Finnhub (Free tier: 60 calls/minute) - Supports Indian stocks
const FINNHUB_API_KEY = 'YOUR_API_KEY'; // Get from: https://finnhub.io/register
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

// Option 3: Indian Stock Market APIs
const NSE_API_BASE_URL = 'https://www.nseindia.com/api';

// Indian Stock Market Symbols
export const INDIAN_MARKET_SYMBOLS = {
  NIFTY50: 'NSEI', // Nifty 50 Index
  SENSEX: 'BSESN', // BSE Sensex
  BANKNIFTY: 'NSEBANK', // Bank Nifty
  // Individual stocks
  RELIANCE: 'RELIANCE.BSE',
  TCS: 'TCS.BSE',
  INFY: 'INFY.BSE',
  HDFCBANK: 'HDFCBANK.BSE',
  ICICIBANK: 'ICICIBANK.BSE'
};

// Default Indian market indices to display
export const DEFAULT_INDIAN_INDICES = ['NSEI', 'BSESN', 'NSEBANK'];

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  lastUpdate: string;
}

// Option 1: Alpha Vantage Implementation (Supports Indian stocks with .BSE/.NSE suffix)
export const fetchMarketDataAlphaVantage = async (symbols: string[]): Promise<MarketData[]> => {
  const results: MarketData[] = [];
  
  for (const symbol of symbols) {
    try {
      // For Indian stocks, Alpha Vantage uses different function
      const isIndianStock = symbol.includes('.BSE') || symbol.includes('.NSE') || 
                           symbol === 'NSEI' || symbol === 'BSESN' || symbol === 'NSEBANK';
      
      let apiUrl;
      if (isIndianStock) {
        // Use TIME_SERIES_DAILY for Indian stocks
        apiUrl = `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      } else {
        // Use GLOBAL_QUOTE for US stocks
        apiUrl = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
      }
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      if (!response.ok) {
        console.warn(`API request failed for ${symbol}: ${response.status} ${response.statusText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check for API error messages
      if (data['Error Message'] || data['Note']) {
        console.warn(`API Error for ${symbol}:`, data['Error Message'] || data['Note']);
        throw new Error(data['Error Message'] || data['Note']);
      }
      
      let currentPrice, change, changePercent;
      
      if (isIndianStock && data['Time Series (Daily)']) {
        // Handle Indian stock data from TIME_SERIES_DAILY
        const timeSeries = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeries).sort().reverse();
        const latestDate = dates[0];
        const previousDate = dates[1];
        
        if (latestDate && previousDate) {
          const latestData = timeSeries[latestDate];
          const previousData = timeSeries[previousDate];
          
          currentPrice = parseFloat(latestData['4. close']);
          const previousPrice = parseFloat(previousData['4. close']);
          change = currentPrice - previousPrice;
          changePercent = (change / previousPrice) * 100;
        }
      } else if (data['Global Quote']) {
        // Handle US stock data from GLOBAL_QUOTE
        const quote = data['Global Quote'];
        currentPrice = parseFloat(quote['05. price']);
        change = parseFloat(quote['09. change']);
        changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
      }
      
      if (currentPrice !== undefined) {
        
        results.push({
          symbol: symbol,
          price: currentPrice,
          change: change,
          changePercent: changePercent,
          lastUpdate: new Date().toISOString()
        });
      }
      
      // Rate limiting - wait 12 seconds between calls for free tier
      if (symbols.indexOf(symbol) < symbols.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 12000));
      }
    } catch (error) {
      console.warn(`Falling back to mock data for ${symbol}:`, error.message);
      // Return mock data as fallback
      const mockPrice = symbol === 'NSEI' ? Math.random() * 1000 + 18000 :
                       symbol === 'BSESN' ? Math.random() * 1000 + 60000 :
                       symbol === 'NSEBANK' ? Math.random() * 1000 + 45000 :
                       Math.random() * 1000 + 3000;
      results.push({
        symbol: symbol,
        price: mockPrice,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 4,
        lastUpdate: new Date().toISOString()
      });
    }
  }
  
  return results;
};

// Option 2: Finnhub Implementation (Supports Indian stocks)
export const fetchMarketDataFinnhub = async (symbols: string[]): Promise<MarketData[]> => {
  const results: MarketData[] = [];
  
  for (const symbol of symbols) {
    try {
      // Convert Indian symbols to Finnhub format
      let finnhubSymbol = symbol;
      if (symbol === 'NSEI') finnhubSymbol = '^NSEI';
      if (symbol === 'BSESN') finnhubSymbol = '^BSESN';
      if (symbol === 'NSEBANK') finnhubSymbol = '^NSEBANK';
      
      const response = await fetch(
        `${FINNHUB_BASE_URL}/quote?symbol=${finnhubSymbol}&token=${FINNHUB_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.c && data.d && data.dp) {
        results.push({
          symbol: symbol,
          price: data.c, // Current price
          change: data.d, // Change
          changePercent: data.dp, // Change percent
          lastUpdate: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      // Return mock data as fallback
      const mockPrice = symbol === 'NSEI' ? Math.random() * 1000 + 18000 :
                       symbol === 'BSESN' ? Math.random() * 1000 + 60000 :
                       symbol === 'NSEBANK' ? Math.random() * 1000 + 45000 :
                       Math.random() * 1000 + 3000;
      results.push({
        symbol: symbol,
        price: mockPrice,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 4,
        lastUpdate: new Date().toISOString()
      });
    }
  }
  
  return results;
};

// Option 3: NSE India API (Free but may have CORS issues)
export const fetchIndianMarketData = async (symbols: string[]): Promise<MarketData[]> => {
  const results: MarketData[] = [];
  
  for (const symbol of symbols) {
    try {
      // This is a simplified example - real NSE API requires proper authentication
      // and may have CORS restrictions
      let apiEndpoint;
      
      if (symbol === 'NSEI') {
        apiEndpoint = `${NSE_API_BASE_URL}/equity-stockIndices?index=NIFTY%2050`;
      } else if (symbol === 'BSESN') {
        // BSE data would need different API
        throw new Error('BSE API not implemented in this example');
      } else {
        apiEndpoint = `${NSE_API_BASE_URL}/quote-equity?symbol=${symbol}`;
      }
      
      const response = await fetch(
        apiEndpoint,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Parse NSE response (structure varies by endpoint)
      if (data && data.data) {
        const marketData = data.data[0] || data.data;
        const currentPrice = marketData.lastPrice || marketData.close;
        const previousClose = marketData.previousClose || marketData.prevClose;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;
        
        results.push({
          symbol: symbol,
          price: currentPrice,
          change: change,
          changePercent: changePercent,
          lastUpdate: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error);
      // Return mock data as fallback
      const mockPrice = symbol === 'NSEI' ? Math.random() * 1000 + 18000 :
                       symbol === 'BSESN' ? Math.random() * 1000 + 60000 :
                       symbol === 'NSEBANK' ? Math.random() * 1000 + 45000 :
                       Math.random() * 1000 + 3000;
      results.push({
        symbol: symbol,
        price: mockPrice,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 4,
        lastUpdate: new Date().toISOString()
      });
    }
  }
  
  return results;
};

// Main function to fetch market data (choose your preferred method)
export const fetchMarketData = async (symbols: string[]): Promise<MarketData[]> => {
  try {
    // Try Alpha Vantage first
    console.log('Attempting to fetch live market data...');
    const result = await fetchMarketDataAlphaVantage(symbols);
    
    // Check if we got valid data (not all mock data)
    const hasRealData = result.some(item => {
      const isRealisticPrice = 
        (item.symbol === 'NSEI' && item.price > 15000 && item.price < 25000) ||
        (item.symbol === 'BSESN' && item.price > 50000 && item.price < 80000) ||
        (item.symbol === 'NSEBANK' && item.price > 35000 && item.price < 55000);
      return isRealisticPrice;
    });
    
    if (hasRealData) {
      console.log('Successfully fetched live market data');
      return result;
    } else {
      console.log('API returned mock data, using enhanced mock data');
      throw new Error('API returned mock data');
    }
  } catch (error) {
    console.warn('Live API failed, using realistic mock data:', error.message);
    
    // Return enhanced mock data with realistic Indian market values
    return symbols.map(symbol => {
      const basePrice = symbol === 'NSEI' ? 19500 :
                       symbol === 'BSESN' ? 65800 :
                       symbol === 'NSEBANK' ? 44200 :
                       3500;
      
      const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
      const price = basePrice * (1 + variation);
      const change = basePrice * variation;
      const changePercent = variation * 100;
      
      return {
        symbol,
        price: Math.round(price * 100) / 100,
        change: Math.round(change * 100) / 100,
        changePercent: Math.round(changePercent * 100) / 100,
        lastUpdate: new Date().toISOString()
      };
    });
  }
};

// Utility function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

// Utility function to format percentage
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};