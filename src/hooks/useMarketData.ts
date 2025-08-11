import { useState, useEffect, useCallback } from 'react';
import { fetchMarketData, MarketData } from '../services/marketData';

interface UseMarketDataReturn {
  data: MarketData[];
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
  refetch: () => void;
}

export const useMarketData = (
  symbols: string[] = ['NSEI', 'BSESN', 'NSEBANK'], // Default to Indian indices
  refreshInterval: number = 0 // Disabled auto-refresh
): UseMarketDataReturn => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);

  const fetchData = useCallback(async () => {
    // CRITICAL: Prevent infinite API calls
    if (hasAttemptedFetch) {
      console.log('🛑 Market data already fetched, skipping...');
      return;
    }
    
    try {
      console.log('🔄 Fetching market data for:', symbols);
      setLoading(true);
      setError(null);
      
      const marketData = await fetchMarketData(symbols);
      setData(marketData);
      setLastUpdate(new Date());
      setHasAttemptedFetch(true);
      console.log('✅ Market data fetched successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      console.error('Market data fetch error:', err);
      setHasAttemptedFetch(true);
      
      // Set mock data as fallback
      const mockData = symbols.map(symbol => ({
        symbol,
        price: symbol === 'NSEI' ? 19567.89 : symbol === 'BSESN' ? 65432.10 : 45123.45,
        change: (Math.random() - 0.5) * 200,
        changePercent: (Math.random() - 0.5) * 3,
        lastUpdate: new Date().toISOString()
      }));
      setData(mockData);
      setLastUpdate(new Date());
    } finally {
      setLoading(false);
    }
  }, [symbols, hasAttemptedFetch]);

  const refetch = useCallback(() => {
    console.log('🔄 Manual refetch triggered');
    setHasAttemptedFetch(false);
    setHasAttemptedFetch(false);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    console.log('🎯 useMarketData effect triggered');
    fetchData();
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refetch
  };
};