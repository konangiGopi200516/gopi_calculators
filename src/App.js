import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BasicCalculator from './components/BasicCalculator';
import AgeCalculator from './components/AgeCalculator';
import InterestCalculator from './components/InterestCalculator';
import SimpleInterestCalculator from './components/SimpleInterestCalculator';
import DiscountCalculator from './components/DiscountCalculator';
import PDFConverter from './components/PDFConverter';
import TextToDiagrams from './components/TextToDiagrams';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/basic-calculator" element={<BasicCalculator />} />
        <Route path="/age-calculator" element={<AgeCalculator />} />
        <Route path="/interest-calculator" element={<InterestCalculator />} />
        <Route path="/simple-interest-calculator" element={<SimpleInterestCalculator />} />
        <Route path="/discount-calculator" element={<DiscountCalculator />} />
        <Route path="/pdf-converter" element={<PDFConverter />} />
        <Route path="/text-diagrams" element={<TextToDiagrams />} />
      </Routes>
    </Router>
  );
}

export default App;
