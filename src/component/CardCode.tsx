import React from 'react';

const CardCode = () => {
    const inputTitle = 'CVC';
    const inputStyle = {border: '0px', width: '90%', outline: 'none', textAlign: 'center'} as React.CSSProperties;
    return (
        <div>
            <p>{inputTitle}</p>
            <div style={{ border: '1px solid', borderRadius: '3px', height: '30px' }}>
                <input style={ inputStyle }/>
            </div>
        </div>
    );
}

export default CardCode;