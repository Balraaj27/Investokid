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
  refreshInterval: number = 60000 // 60 seconds (Alpha Vantage rate limit friendly)
): UseMarketDataReturn => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const marketData = await fetchMarketData(symbols);
      setData(marketData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      console.error('Market data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up interval for periodic updates
    const interval = setInterval(fetchData, refreshInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refetch
  };
};