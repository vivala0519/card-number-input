import React from 'react';
import CardNumberInput from './component/CardNumberInput';
import ExpMonthYear from './component/ExpMonthYear';
import CardCode from './component/CardCode';

function App() {
  return (
    <div style={{ display: 'flex', 'flexDirection': 'column', width: '500px'}}>
      <p style={{ textAlign: 'center' }}>Card information</p>
      <CardNumberInput />
      <div style={{ display: 'flex' }}>
        <ExpMonthYear />
        <CardCode />
      </div>
    </div>
  );
}

export default App;
