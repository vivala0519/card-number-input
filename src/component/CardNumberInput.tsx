import React from 'react';

const CardNumberInput = () => {
    const inputTitle = 'Card Number';
    const inputStyle = {border: '0px', width: '20%', outline: 'none', textAlign: 'center'} as React.CSSProperties;

    return (
        <div>
            <p>{inputTitle}</p>
            <div style={{display: 'flex', gap: '5px', border: '1px solid', borderRadius: '3px', height: '30px'}}>
                <input placeholder='Card Number' style={ inputStyle }/>
                <input style={ inputStyle }/>
                <input style={ inputStyle }/>
                <input style={ inputStyle }/>
                <input style={ inputStyle }/>
            </div>
        </div>
    );
}

export default CardNumberInput;