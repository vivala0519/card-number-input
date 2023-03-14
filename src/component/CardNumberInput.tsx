import React, { useState, useRef, useEffect } from 'react';

const CardNumberInput: React.FC = () => {
    // State
    const [placeholderFlag, setPlaceholderFlag] = useState<boolean>(true);
    const [cardInputValues, setCardInputValues] = useState<string[]>(new Array(4).fill(''));
    const placeholderText: string = 'Card Number';
    const inputNames: string[] = ['firstInputNumber', 'secondInputNumber', 'thirdInputNumber', 'lastInputNumber'];

    // Refs
    const cardInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

    // Styles
    const divStyle: React.CSSProperties = {
        display: 'flex',
        gap: '5px',
        height: '30px',
        justifyContent: 'space-evenly'
    };

    const placeholderStyle: React.CSSProperties = {
        border: '0px',
        width: '100%',
        outline: 'none',
        textAlign: 'center'
    };

    const inputStyle: React.CSSProperties = {
        border: '0px',
        width: '20%',
        outline: 'none',
        textAlign: 'center'
    };

    // Handlers
    const onlyNumbers = (str: String) => {
        const numbers = str
          ?.match(/[\d]/g)
          ?.map(Number)
          .join('');
        const result = numbers ? numbers : '';
        return result;
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let { value } = event.target;
        value = onlyNumbers(value);
        
        setCardInputValues((inputValues) => {
            const newInputValues = [...inputValues];

            newInputValues[index] = value;
            return newInputValues;
        });
        if (value.length === 4) {
            cardInputRefs.current[index + 1]?.focus();
        }
    };

    const placeholderInputHandler = (event: React.FormEvent<HTMLInputElement> | null) => {
        if (!event) {
            let totalLength = 0;
            cardInputRefs.current.forEach((el) => {
                if (el) {
                    totalLength += el?.value.length;
                }
            })
            console.log(totalLength);
            if (totalLength === 0) {
                setPlaceholderFlag(true);
            }
        } else {
            const target = event.target as HTMLInputElement;
            const value = target.value;
    
            setPlaceholderFlag(false);
            setCardInputValues([value, '', '', '']);
        }
        
    };

    // JSX elements
    const cardInputList: JSX.Element[] = inputNames.map((item, index) => (
        <input
            key={item}
            style={inputStyle}
            value={cardInputValues[index]}
            ref={(el) => (cardInputRefs.current[index] = el)}
            onChange={(event) => handleInputChange(event, index)}
            onFocus={(event) => handleInputLocation(event, index)}
            onBlur={(event) => placeholderInputHandler(null)}
            maxLength={4}
        />
    ));

    // Effects
    useEffect(() => {
        if (!placeholderFlag) {
            cardInputRefs.current[0]?.focus();
            }
        }, [placeholderFlag]
    );

    // Render
    return (
        <div className="span-1" style={divStyle}>
            {placeholderFlag && (
                <input placeholder={placeholderText} style={placeholderStyle} onInput={placeholderInputHandler} />
            )}
            {!placeholderFlag && cardInputList}
        </div>
    );
};

export default CardNumberInput;