import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Learnings from './components/Learnings';
import TodaysTrends from './components/TodaysTrends';
import SmartDesk from './components/SmartDesk';
import Videos from './components/Videos';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';
import InvestmentBasics from './pages/InvestmentBasics';
import TechnicalAnalysis from './pages/TechnicalAnalysis';
import FinancialPlanning from './pages/FinancialPlanning';
import Cryptocurrency from './pages/Cryptocurrency';
import BlogPost from './pages/BlogPost';
import NewsPage from './pages/NewsPage';
import InvestokidUpdates from './pages/InvestokidUpdates';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

function App() {
  return (
    <div className="min-h-screen">
      {/* Persistent Navbar on all pages */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Learnings />
            <TodaysTrends />
            <SmartDesk />
            <Videos />
            <Footer />
          </>
        } />
        <Route path="/investment-basics" element={
          <>
            <InvestmentBasics />
            <Footer />
          </>
        } />
        <Route path="/technical-analysis" element={
          <>
            <TechnicalAnalysis />
            <Footer />
          </>
        } />
        <Route path="/financial-planning" element={
          <>
            <FinancialPlanning />
            <Footer />
          </>
        } />
        <Route path="/cryptocurrency" element={
          <>
            <Cryptocurrency />
            <Footer />
          </>
        } />
        <Route path="/blog/:slug" element={
          <>
            <BlogPost />
            <Footer />
          </>
        } />
        <Route path="/news" element={
          <>
            <NewsPage />
            <Footer />
          </>
        } />
        <Route path="/investokid-updates" element={
          <>
            <InvestokidUpdates />
            <Footer />
          </>
        } />
        <Route path="/admin/login" element={<AdminLogin />} />
   
      </Routes>
      
      {/* Persistent Notification System */}
      <NotificationSystem />
    </div>
  );
}

export default App;