import React from 'react';

const CardCode = () => {
    const inputTitle = 'CVC';
    const inputStyle = {border: '0px', width: '90%', outline: 'none', textAlign: 'center'} as React.CSSProperties;
    return (
        <div className="span-2" style={{ height: '30px' }}>
            <input placeholder={ inputTitle } style={ inputStyle }/>
        </div>
    );
}

export default CardCode;