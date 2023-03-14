import React from 'react';

const ExpMonthYear = () => {
    const inputTitle = 'Expiration Data';
    const inputStyle = {border: '0px', width: '30%', outline: 'none', textAlign: 'center'} as React.CSSProperties;
    return (
        <div className='span-2' style={{ display: 'flex', height: '30px' }}>
            <input placeholder={ inputTitle } style={{ border: '0px', width: '30%', outline: 'none', textAlign: 'center' }}/>
            <input style={ inputStyle }/>
            <span>/</span>
            <input style={ inputStyle }/>
        </div>
    );
}

export default ExpMonthYear;