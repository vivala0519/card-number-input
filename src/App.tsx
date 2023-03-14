import React from 'react';
import CardNumberInput from './component/CardNumberInput';
import ExpMonthYear from './component/ExpMonthYear';
import CardCode from './component/CardCode';
import './App.css';

function App() {
  return (
    <div className="grid-container">
      <CardNumberInput />
      <ExpMonthYear />
      <CardCode />
    </div>
  );
}

export default App;