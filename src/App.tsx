import React from 'react';
import './App.css';
import CardNumberInput from './component/CardNumberInput';
import ExpMonthYear from './component/ExpMonthYear';
import CardCode from './component/CardCode';

function App() {
  return (
    <div className="App">
      <CardNumberInput />
      <CardCode />
      <ExpMonthYear />
    </div>
  );
}

export default App;
