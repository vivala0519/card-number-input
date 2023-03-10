import React from 'react';

const ExpMonthYear = () => {
    const inputTitle = 'Expiration Data';
    const inputStyle = {border: '0px', width: '45%', outline: 'none', textAlign: 'center'} as React.CSSProperties;
    return (
        <div>
            <p>{inputTitle}</p>
            <div style={{ display: 'flex', border: '1px solid', borderRadius: '3px', height: '30px' }}>
                <input style={ inputStyle }/>
                <span>/</span>
                <input style={ inputStyle }/>
            </div>
        </div>
    );
}

export default ExpMonthYear;