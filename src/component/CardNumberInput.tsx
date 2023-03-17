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

    /**
     * @description filter only number from string
     * @param str
     * @returns result: String
     */
    const acceptOnlyNumber = (str: String) => {
        const numbers = str
          ?.match(/[\d]/g)
          ?.map(Number)
          .join('');
        const result = numbers ? numbers : '';
        return result;
    };
    
    /**
     * @description onInput at cardNumber input
     * @param event, index
     */
    const cardNumberInputHandler = (event: React.FormEvent<HTMLInputElement>, index: number) => {
        let value = (event.target as HTMLInputElement).value;
        
        value = acceptOnlyNumber(value);
        
        // update value
        setCardInputValues((inputValues) => {
            const newInputValues = [...inputValues];

            newInputValues[index] = value;
            return newInputValues;
        });

        // focus at last text. Automatically trigger the 'focusLocationHandler' method
        if (value.length === 4) {
            cardInputRefs.current[3]?.focus();
        }
    };

    /**
     * @description Auto focusing. onFocus at card number input
     * @param event, index
     */
    const focusLocationHandler = (event: React.FocusEvent<HTMLInputElement>, index: number) => {
        if (event.target.value.length === 0 && cardInputRefs.current[index - 1]?.value.length !== 4) {
            cardInputRefs.current[index - 1]?.focus();
        }
    }
    
    /**
     * @description Pasted text from onInput(cardNumber input), placeholderInputHandler
     * @param event, index, atPlaceholder
     */
    const pasteHandler = (event: React.ClipboardEvent<HTMLInputElement> | null, index: number, atPlaceholder: String) => {
        let chunks: any[] | null = [];

        // is it from placeholder input?
        if (atPlaceholder) {
            chunks = acceptOnlyNumber(atPlaceholder).match(/.{1,4}/g);
        } else { // from card number input
            const clipboardData = event?.clipboardData;
            const pastedText = clipboardData?.getData("text");
            const existedText = cardInputValues[index];
            chunks = acceptOnlyNumber(existedText + pastedText).match(/.{1,4}/g);
        }
      
        // Break it up into 4 characters and put them in respective input
        if (chunks) {
          for (let toPasteIndex = index; toPasteIndex < 4; toPasteIndex++) {
            const currentChunkIndex = toPasteIndex - index;
            
            setCardInputValues((inputValues) => {
              const newInputValues = [...inputValues];
              
              newInputValues[toPasteIndex] = chunks && chunks[currentChunkIndex];
              
              return newInputValues;
            });
          }
        }
      };

    /**
     * @description handler from onBlur at cardNumber input, onInput at placeholder input
     * @param event
     */
    const placeholderInputHandler = async (event: React.FormEvent<HTMLInputElement> | null) => {
        // when blur at cardNumber input
        if (!event) {
            let totalLength = 0;
            cardInputRefs.current.forEach((el) => {
                totalLength += el?.value.length ?? 0;
            })
            // placeholder flag as inputText
            setPlaceholderFlag(!totalLength);

        } else { // when input at placeholder input
            // copied text
            if ((event.nativeEvent as InputEvent).inputType === 'insertFromPaste') {
                
                const pastedText = await navigator.clipboard.readText();
                pasteHandler(null, 0, pastedText);
            } else { // text from typing
                const target = event.target as HTMLInputElement;
                const value = target.value;
                setCardInputValues([value, '', '', '']);
            }
    
            setPlaceholderFlag(false);
        }
    };

    // JSX elements
    const cardInputList: JSX.Element[] = inputNames.map((item, index) => (
        <input
            key={item}
            type='text'
            style={inputStyle}
            value={cardInputValues[index]}
            ref={(el) => (cardInputRefs.current[index] = el)}
            onInput={(event) => cardNumberInputHandler(event as React.FormEvent<HTMLInputElement>, index)}
            onFocus={(event) => focusLocationHandler(event, index)}
            onBlur={() => placeholderInputHandler(null)}
            onPaste={(event) => pasteHandler(event, index, '')}
            maxLength={4}
        />
    ));

    // Effects
    useEffect(() => {
        if (!placeholderFlag) {
            cardInputRefs.current[3]?.focus();
            }
        }, [placeholderFlag]
    );

    // Render
    return (
        <div className="span-1" style={divStyle}>
            {placeholderFlag && (
                <input 
                    placeholder={placeholderText}
                    style={placeholderStyle}
                    onInput={placeholderInputHandler}
                    maxLength={4}/>
            )}
            {!placeholderFlag && cardInputList}
        </div>
    );
};

export default CardNumberInput;