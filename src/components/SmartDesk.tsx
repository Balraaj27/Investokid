import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Home, 
  Receipt, 
  DollarSign, 
  BookOpen, 
  TrendingUp, 
  PieChart, 
  Coins,
  X,
  Plus,
  Trash2,
  Download,
  RefreshCw,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  Shield,
  Award,
  Users,
  BarChart3,
  Activity
} from 'lucide-react';

const SmartDesk: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<any>({});
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesLastUpdated, setRatesLastUpdated] = useState<Date | null>(null);

  // Portfolio Tracker State
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [newStock, setNewStock] = useState({ symbol: '', quantity: '', buyPrice: '' });

  // Calculator States
  const [sipData, setSipData] = useState({ amount: '', years: '', rate: '' });
  const [emiData, setEmiData] = useState({ principal: '', rate: '', tenure: '' });
  const [taxData, setTaxData] = useState({ income: '', regime: 'new' });
  const [currencyData, setCurrencyData] = useState({ from: 'USD', to: 'INR', amount: '' });
  const [mfData, setMfData] = useState({ amount: '', years: '', rate: '' });
  const [dividendData, setDividendData] = useState({ stocks: [] as any[] });

  const tools = [
    {
      id: 'sip',
      title: 'SIP Calculator',
      description: 'Calculate your SIP returns with compound interest',
      icon: Calculator,
      color: 'from-blue-600 via-blue-500 to-cyan-400',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      iconBg: 'from-blue-500 to-cyan-500',
      category: 'Investment'
    },
    {
      id: 'emi',
      title: 'EMI Calculator',
      description: 'Calculate loan EMI and total interest payable',
      icon: Home,
      color: 'from-emerald-600 via-green-500 to-teal-400',
      bgPattern: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      iconBg: 'from-emerald-500 to-teal-500',
      category: 'Loans'
    },
    {
      id: 'tax',
      title: 'Income Tax Calculator',
      description: 'Calculate tax liability under both regimes',
      icon: Receipt,
      color: 'from-orange-600 via-amber-500 to-yellow-400',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-yellow-50',
      iconBg: 'from-orange-500 to-yellow-500',
      category: 'Tax Planning'
    },
    {
      id: 'currency',
      title: 'Currency Converter',
      description: 'Real-time currency conversion rates',
      icon: DollarSign,
      color: 'from-purple-600 via-violet-500 to-indigo-400',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-indigo-50',
      iconBg: 'from-purple-500 to-indigo-500',
      category: 'Trading'
    },
    {
      id: 'glossary',
      title: 'Financial Glossary',
      description: 'Essential financial terms and definitions',
      icon: BookOpen,
      color: 'from-rose-600 via-pink-500 to-red-400',
      bgPattern: 'bg-gradient-to-br from-rose-50 to-red-50',
      iconBg: 'from-rose-500 to-red-500',
      category: 'Education'
    },
    {
      id: 'mutual-fund',
      title: 'Mutual Fund Calculator',
      description: 'Calculate mutual fund investment returns',
      icon: TrendingUp,
      color: 'from-teal-600 via-cyan-500 to-blue-400',
      bgPattern: 'bg-gradient-to-br from-teal-50 to-blue-50',
      iconBg: 'from-teal-500 to-blue-500',
      category: 'Investment'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Tracker',
      description: 'Track your stock portfolio performance',
      icon: PieChart,
      color: 'from-indigo-600 via-purple-500 to-pink-400',
      bgPattern: 'bg-gradient-to-br from-indigo-50 to-pink-50',
      iconBg: 'from-indigo-500 to-pink-500',
      category: 'Portfolio'
    },
    {
      id: 'dividend',
      title: 'Dividend Tracker',
      description: 'Track dividend income from your investments',
      icon: Coins,
      color: 'from-green-600 via-emerald-500 to-cyan-400',
      bgPattern: 'bg-gradient-to-br from-green-50 to-cyan-50',
      iconBg: 'from-green-500 to-cyan-500',
      category: 'Income'
    }
  ];

  const stats = [
    { 
      icon: Users, 
      value: '2M+', 
      label: 'Active Users',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    { 
      icon: BarChart3, 
      value: '₹50,000Cr+', 
      label: 'Assets Tracked',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50'
    },
    { 
      icon: Activity, 
      value: '10M+', 
      label: 'Calculations Done',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50'
    },
    { 
      icon: Award, 
      value: '99.9%', 
      label: 'Accuracy Rate',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-50 to-yellow-50'
    }
  ];

  const categories = ['All', 'Investment', 'Loans', 'Tax Planning', 'Trading', 'Education', 'Portfolio', 'Income'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  // Fetch exchange rates
  const fetchExchangeRates = async () => {
    setRatesLoading(true);
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
      setRatesLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      // Fallback rates
      setExchangeRates({
        USD: 1, INR: 83.12, EUR: 0.85, GBP: 0.73,
        JPY: 110.25, AUD: 1.35, CAD: 1.25, CHF: 0.92
      });
    } finally {
      setRatesLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTool === 'currency' && Object.keys(exchangeRates).length === 0) {
      fetchExchangeRates();
    }
  }, [selectedTool]);

  // Portfolio functions
  const addStock = () => {
    if (newStock.symbol && newStock.quantity && newStock.buyPrice) {
      const stock = {
        id: Date.now(),
        symbol: newStock.symbol.toUpperCase(),
        quantity: parseFloat(newStock.quantity),
        buyPrice: parseFloat(newStock.buyPrice),
        currentPrice: parseFloat(newStock.buyPrice) * (0.9 + Math.random() * 0.2) // Mock current price
      };
      setPortfolio([...portfolio, stock]);
      setNewStock({ symbol: '', quantity: '', buyPrice: '' });
      
      if ((window as any).showNotification) {
        (window as any).showNotification({
          type: 'success',
          message: `${stock.symbol} added to portfolio successfully!`
        });
      }
    }
  };

  const removeStock = (id: number) => {
    setPortfolio(portfolio.filter(stock => stock.id !== id));
    if ((window as any).showNotification) {
      (window as any).showNotification({
        type: 'info',
        message: 'Stock removed from portfolio'
      });
    }
  };

  const clearPortfolio = () => {
    setPortfolio([]);
    if ((window as any).showNotification) {
      (window as any).showNotification({
        type: 'info',
        message: 'Portfolio cleared successfully'
      });
    }
  };

  const exportPortfolio = () => {
    const dataStr = JSON.stringify(portfolio, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio.json';
    link.click();
  };

  const loadDemoPortfolio = () => {
    const demoStocks = [
      { id: 1, symbol: 'RELIANCE', quantity: 10, buyPrice: 2500, currentPrice: 2650 },
      { id: 2, symbol: 'TCS', quantity: 5, buyPrice: 3200, currentPrice: 3350 },
      { id: 3, symbol: 'INFY', quantity: 8, buyPrice: 1450, currentPrice: 1520 }
    ];
    setPortfolio(demoStocks);
  };

  // Calculator functions
  const calculateSIP = () => {
    const P = parseFloat(sipData.amount) || 0;
    const r = (parseFloat(sipData.rate) || 0) / 100 / 12;
    const n = (parseFloat(sipData.years) || 0) * 12;
    
    if (P && r && n) {
      const futureValue = P * (((1 + r) ** n - 1) / r) * (1 + r);
      const totalInvestment = P * n;
      const returns = futureValue - totalInvestment;
      
      return {
        futureValue: futureValue.toFixed(0),
        totalInvestment: totalInvestment.toFixed(0),
        returns: returns.toFixed(0)
      };
    }
    return { futureValue: '0', totalInvestment: '0', returns: '0' };
  };

  const calculateEMI = () => {
    const P = parseFloat(emiData.principal) || 0;
    const r = (parseFloat(emiData.rate) || 0) / 100 / 12;
    const n = (parseFloat(emiData.tenure) || 0) * 12;
    
    if (P && r && n) {
      const emi = (P * r * (1 + r) ** n) / ((1 + r) ** n - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - P;
      
      return {
        emi: emi.toFixed(0),
        totalAmount: totalAmount.toFixed(0),
        totalInterest: totalInterest.toFixed(0)
      };
    }
    return { emi: '0', totalAmount: '0', totalInterest: '0' };
  };

  const calculateTax = () => {
    const income = parseFloat(taxData.income) || 0;
    let tax = 0;
    
    if (taxData.regime === 'old') {
      // Old regime with standard deduction
      const taxableIncome = Math.max(0, income - 50000);
      if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.3;
      if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.2;
      if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
    } else {
      // New regime
      if (income > 1500000) tax += (income - 1500000) * 0.3;
      if (income > 1200000) tax += Math.min(income - 1200000, 300000) * 0.25;
      if (income > 900000) tax += Math.min(income - 900000, 300000) * 0.2;
      if (income > 600000) tax += Math.min(income - 600000, 300000) * 0.15;
      if (income > 300000) tax += Math.min(income - 300000, 300000) * 0.1;
      if (income > 250000) tax += Math.min(income - 250000, 50000) * 0.05;
    }
    
    const cess = tax * 0.04; // 4% Health & Education Cess
    const totalTax = tax + cess;
    const netIncome = income - totalTax;
    
    return {
      tax: tax.toFixed(0),
      cess: cess.toFixed(0),
      totalTax: totalTax.toFixed(0),
      netIncome: netIncome.toFixed(0)
    };
  };

  const convertCurrency = () => {
    const amount = parseFloat(currencyData.amount) || 0;
    const fromRate = exchangeRates[currencyData.from] || 1;
    const toRate = exchangeRates[currencyData.to] || 1;
    
    const convertedAmount = (amount / fromRate) * toRate;
    const exchangeRate = toRate / fromRate;
    
    return {
      convertedAmount: convertedAmount.toFixed(2),
      exchangeRate: exchangeRate.toFixed(4)
    };
  };

  const calculateMutualFund = () => {
    const P = parseFloat(mfData.amount) || 0;
    const r = (parseFloat(mfData.rate) || 0) / 100;
    const t = parseFloat(mfData.years) || 0;
    
    if (P && r && t) {
      const futureValue = P * (1 + r) ** t;
      const returns = futureValue - P;
      
      return {
        futureValue: futureValue.toFixed(0),
        returns: returns.toFixed(0),
        totalInvestment: P.toFixed(0)
      };
    }
    return { futureValue: '0', returns: '0', totalInvestment: '0' };
  };

  const glossaryTerms = [
    { term: 'SIP', definition: 'Systematic Investment Plan - A method of investing in mutual funds through regular installments' },
    { term: 'EMI', definition: 'Equated Monthly Installment - Fixed payment amount made by a borrower to a lender' },
    { term: 'P/E Ratio', definition: 'Price-to-Earnings ratio - Valuation ratio comparing company\'s current share price to earnings per share' },
    { term: 'Dividend', definition: 'Payment made by corporations to shareholders as distribution of profits' },
    { term: 'Market Cap', definition: 'Market Capitalization - Total value of company\'s shares in the stock market' },
    { term: 'NAV', definition: 'Net Asset Value - Per-share value of mutual fund calculated by dividing total assets by shares outstanding' },
    { term: 'Bull Market', definition: 'Financial market condition where prices are rising or expected to rise' },
    { term: 'Bear Market', definition: 'Financial market condition where prices are falling or expected to fall' },
    { term: 'Volatility', definition: 'Degree of variation in trading price series over time, measured by standard deviation' },
    { term: 'Liquidity', definition: 'Ease with which an asset can be converted into cash without affecting its market price' }
  ];

  const renderToolContent = () => {
    const tool = tools.find(t => t.id === selectedTool);
    if (!tool) return null;

    switch (selectedTool) {
      case 'sip':
        const sipResults = calculateSIP();
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">SIP Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly SIP Amount (₹)</label>
                    <input
                      type="number"
                      value={sipData.amount}
                      onChange={(e) => setSipData({...sipData, amount: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter monthly SIP amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Period (Years)</label>
                    <input
                      type="number"
                      value={sipData.years}
                      onChange={(e) => setSipData({...sipData, years: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter investment period"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      value={sipData.rate}
                      onChange={(e) => setSipData({...sipData, rate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter expected return rate"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Investment Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="text-xl font-bold text-gray-900">₹{parseInt(sipResults.totalInvestment).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Expected Returns</span>
                    <span className="text-xl font-bold text-green-600">₹{parseInt(sipResults.returns).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg">
                    <span className="font-semibold">Future Value</span>
                    <span className="text-2xl font-bold">₹{parseInt(sipResults.futureValue).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'emi':
        const emiResults = calculateEMI();
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">EMI Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount (₹)</label>
                    <input
                      type="number"
                      value={emiData.principal}
                      onChange={(e) => setEmiData({...emiData, principal: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter loan amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (% per annum)</label>
                    <input
                      type="number"
                      value={emiData.rate}
                      onChange={(e) => setEmiData({...emiData, rate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter interest rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Tenure (Years)</label>
                    <input
                      type="number"
                      value={emiData.tenure}
                      onChange={(e) => setEmiData({...emiData, tenure: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Enter loan tenure"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">EMI Breakdown</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg">
                    <span className="font-semibold">Monthly EMI</span>
                    <span className="text-2xl font-bold">₹{parseInt(emiResults.emi).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-xl font-bold text-gray-900">₹{parseInt(emiResults.totalAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="text-xl font-bold text-red-600">₹{parseInt(emiResults.totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tax':
        const taxResults = calculateTax();
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Income Tax Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Annual Income (₹)</label>
                    <input
                      type="number"
                      value={taxData.income}
                      onChange={(e) => setTaxData({...taxData, income: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter annual income"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Regime</label>
                    <select
                      value={taxData.regime}
                      onChange={(e) => setTaxData({...taxData, regime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    >
                      <option value="new">New Tax Regime</option>
                      <option value="old">Old Tax Regime</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Tax Calculation</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Income Tax</span>
                    <span className="text-xl font-bold text-gray-900">₹{parseInt(taxResults.tax).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Health & Education Cess</span>
                    <span className="text-xl font-bold text-gray-900">₹{parseInt(taxResults.cess).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-lg">
                    <span className="font-semibold">Total Tax</span>
                    <span className="text-2xl font-bold">₹{parseInt(taxResults.totalTax).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg">
                    <span className="font-semibold">Net Income</span>
                    <span className="text-2xl font-bold">₹{parseInt(taxResults.netIncome).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'currency':
        const currencyResults = convertCurrency();
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Currency Converter</h3>
                  <button
                    onClick={fetchExchangeRates}
                    disabled={ratesLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    <RefreshCw className={`h-4 w-4 ${ratesLoading ? 'animate-spin' : ''}`} />
                    Refresh Rates
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      value={currencyData.amount}
                      onChange={(e) => setCurrencyData({...currencyData, amount: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">From</label>
                      <select
                        value={currencyData.from}
                        onChange={(e) => setCurrencyData({...currencyData, from: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="AUD">AUD</option>
                        <option value="CAD">CAD</option>
                        <option value="CHF">CHF</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">To</label>
                      <select
                        value={currencyData.to}
                        onChange={(e) => setCurrencyData({...currencyData, to: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="AUD">AUD</option>
                        <option value="CAD">CAD</option>
                        <option value="CHF">CHF</option>
                      </select>
                    </div>
                  </div>
                  {ratesLastUpdated && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      Last updated: {ratesLastUpdated.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Conversion Result</h4>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl shadow-lg">
                    <div className="text-sm opacity-90 mb-2">{currencyData.amount} {currencyData.from} =</div>
                    <div className="text-3xl font-bold">{currencyResults.convertedAmount} {currencyData.to}</div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Exchange Rate</span>
                    <span className="text-lg font-bold text-gray-900">1 {currencyData.from} = {currencyResults.exchangeRate} {currencyData.to}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'glossary':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Financial Glossary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {glossaryTerms.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-rose-50 to-red-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{item.term}</h4>
                  <p className="text-gray-700 leading-relaxed">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'mutual-fund':
        const mfResults = calculateMutualFund();
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mutual Fund Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Amount (₹)</label>
                    <input
                      type="number"
                      value={mfData.amount}
                      onChange={(e) => setMfData({...mfData, amount: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Enter investment amount"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Period (Years)</label>
                    <input
                      type="number"
                      value={mfData.years}
                      onChange={(e) => setMfData({...mfData, years: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Enter investment period"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Annual Return (%)</label>
                    <input
                      type="number"
                      value={mfData.rate}
                      onChange={(e) => setMfData({...mfData, rate: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Enter expected return rate"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Investment Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="text-xl font-bold text-gray-900">₹{parseInt(mfResults.totalInvestment).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm">
                    <span className="text-gray-600">Expected Returns</span>
                    <span className="text-xl font-bold text-green-600">₹{parseInt(mfResults.returns).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-xl shadow-lg">
                    <span className="font-semibold">Future Value</span>
                    <span className="text-2xl font-bold">₹{parseInt(mfResults.futureValue).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        const totalInvestment = portfolio.reduce((sum, stock) => sum + (stock.quantity * stock.buyPrice), 0);
        const currentValue = portfolio.reduce((sum, stock) => sum + (stock.quantity * stock.currentPrice), 0);
        const totalPL = currentValue - totalInvestment;
        const totalPLPercent = totalInvestment > 0 ? (totalPL / totalInvestment) * 100 : 0;

        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Portfolio Tracker</h3>
              <div className="flex gap-3">
                {portfolio.length > 0 && (
                  <>
                    <button
                      onClick={exportPortfolio}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </button>
                    <button
                      onClick={clearPortfolio}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear All
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Add Stock Form */}
            <div className="bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Add New Stock</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  value={newStock.symbol}
                  onChange={(e) => setNewStock({...newStock, symbol: e.target.value.toUpperCase()})}
                  onKeyPress={(e) => e.key === 'Enter' && addStock()}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Stock Symbol (e.g., RELIANCE)"
                />
                <input
                  type="number"
                  value={newStock.quantity}
                  onChange={(e) => setNewStock({...newStock, quantity: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && addStock()}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Quantity"
                />
                <input
                  type="number"
                  value={newStock.buyPrice}
                  onChange={(e) => setNewStock({...newStock, buyPrice: e.target.value})}
                  onKeyPress={(e) => e.key === 'Enter' && addStock()}
                  className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Buy Price (₹)"
                />
                <button
                  onClick={addStock}
                  disabled={!newStock.symbol || !newStock.quantity || !newStock.buyPrice}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  Add Stock
                </button>
              </div>
              {(!newStock.symbol || !newStock.quantity || !newStock.buyPrice) && (
                <p className="text-sm text-gray-500 mt-2">Please fill all fields to add a stock</p>
              )}
            </div>

            {/* Portfolio Summary */}
            {portfolio.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-sm text-gray-600 mb-1">Total Investment</div>
                  <div className="text-2xl font-bold text-gray-900">₹{totalInvestment.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-sm text-gray-600 mb-1">Current Value</div>
                  <div className="text-2xl font-bold text-gray-900">₹{currentValue.toLocaleString('en-IN')}</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-sm text-gray-600 mb-1">Total P&L</div>
                  <div className={`text-2xl font-bold ${totalPL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalPL >= 0 ? '+' : ''}₹{Math.abs(totalPL).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="text-sm text-gray-600 mb-1">Total Return</div>
                  <div className={`text-2xl font-bold ${totalPLPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalPLPercent >= 0 ? '+' : ''}{totalPLPercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Holdings */}
            {portfolio.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((stock) => {
                  const investment = stock.quantity * stock.buyPrice;
                  const currentVal = stock.quantity * stock.currentPrice;
                  const pl = currentVal - investment;
                  const plPercent = (pl / investment) * 100;

                  return (
                    <div key={stock.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-900">{stock.symbol}</h4>
                        <button
                          onClick={() => removeStock(stock.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-semibold">{stock.quantity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Buy Price:</span>
                          <span className="font-semibold">₹{stock.buyPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current Price:</span>
                          <span className="font-semibold">₹{stock.currentPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Investment:</span>
                          <span className="font-semibold">₹{investment.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current Value:</span>
                          <span className="font-semibold">₹{currentVal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                          <span className="text-sm text-gray-600">P&L:</span>
                          <div className="text-right">
                            <div className={`font-bold ${pl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {pl >= 0 ? '+' : ''}₹{Math.abs(pl).toLocaleString('en-IN')}
                            </div>
                            <div className={`text-sm ${pl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              ({pl >= 0 ? '+' : ''}{plPercent.toFixed(2)}%)
                            </div>
                          </div>
                        </div>
                        {/* Performance Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${pl >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                            style={{ width: `${Math.min(Math.abs(plPercent), 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                <PieChart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">No Stocks in Portfolio</h4>
                <p className="text-gray-600 mb-6">Add your first stock to start tracking your portfolio performance</p>
                <button
                  onClick={loadDemoPortfolio}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-pink-600 transition-all"
                >
                  Load Demo Portfolio
                </button>
              </div>
            )}
          </div>
        );

      case 'dividend':
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Dividend Tracker</h3>
            <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-2xl p-8">
              <div className="text-center">
                <Coins className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Track Your Dividend Income</h4>
                <p className="text-gray-600 mb-6">Monitor dividend payments from your stock investments</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="text-2xl font-bold text-green-600 mb-2">₹12,450</div>
                    <div className="text-sm text-gray-600">This Year</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">₹1,037</div>
                    <div className="text-sm text-gray-600">This Month</div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="text-2xl font-bold text-purple-600 mb-2">4.2%</div>
                    <div className="text-sm text-gray-600">Avg. Yield</div>
                  </div>
                </div>

                <div className="mt-8 text-left">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Recent Dividend Payments</h5>
                  <div className="space-y-3">
                    {[
                      { company: 'RELIANCE', amount: '₹850', date: 'Dec 15, 2024', yield: '2.1%' },
                      { company: 'TCS', amount: '₹1,200', date: 'Dec 10, 2024', yield: '3.2%' },
                      { company: 'HDFC BANK', amount: '₹675', date: 'Dec 5, 2024', yield: '1.8%' }
                    ].map((dividend, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                        <div>
                          <div className="font-semibold text-gray-900">{dividend.company}</div>
                          <div className="text-sm text-gray-600">{dividend.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{dividend.amount}</div>
                          <div className="text-sm text-gray-600">{dividend.yield}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="smart-desk" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg">
            <Sparkles className="h-5 w-5 text-blue-600" />
            Professional Financial Tools
            <Zap className="h-5 w-5 text-purple-600" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Smart Desk
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Comprehensive suite of professional-grade financial calculators and tools designed for modern investors, 
            traders, and financial planners.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              onClick={() => setSelectedTool(tool.id)}
              className={`group relative ${tool.bgPattern} rounded-3xl p-8 cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/50 backdrop-blur-sm`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Tool Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.iconBg} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <tool.icon className="h-8 w-8 text-white" />
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${tool.color} text-white shadow-lg`}>
                  {tool.category}
                </span>
              </div>

              {/* Tool Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between">
                  <button className={`px-6 py-3 bg-gradient-to-r ${tool.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 group-hover:gap-3`}>
                    Open Calculator
                    <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted by Financial Professionals Worldwide
              </h3>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Join millions of investors, traders, and financial advisors who rely on our tools for accurate calculations and insights
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-blue-200 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Bank-Grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <span className="font-medium">Real-Time Calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="font-medium">Industry Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">24/7 Availability</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTool && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTool(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${tools.find(t => t.id === selectedTool)?.color} p-6 rounded-t-3xl`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {React.createElement(tools.find(t => t.id === selectedTool)?.icon || Calculator, {
                      className: "h-6 w-6 text-white"
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {tools.find(t => t.id === selectedTool)?.title}
                    </h2>
                    <p className="text-white/80">
                      {tools.find(t => t.id === selectedTool)?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {renderToolContent()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SmartDesk;