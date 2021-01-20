import s from "./EnterDisplay.module.css";
import {Button} from "../Button/Button";
import React, {ChangeEvent} from "react";
import {NumberInput} from "./NumberInput/NumberInput";



type EnterDisplayType = {
    error: boolean
    minCount: number
    maxCount: number
    presentCount: number
    setDisabled: boolean
    valuesEntered: boolean
    setMinCountCallback: (minCount: number) => void
    setMaxCountCallback: (maxCount: number) => void
    setCounts: (minCount: number, maxCount: number) => void
}

export const EnterDisplay: React.FC<EnterDisplayType> = (props) => {
// переменная ошибки максимального числа, &&props.minCount>-1 чтобы не загоралась ошибка на махCount
    // при увеличении minCount
    let maxCountError=props.error&&props.minCount>-1
    // handler нажатия на кнопку SET
    const setCounts = () => {
        props.setCounts(props.minCount, props.maxCount)
    }

    return (
        <div className={s.display}>
            <div className={s.valueDisplay}>
                <NumberInput
                    title="max value"
                    error={maxCountError}
                    value={props.maxCount}
                    onChangeHandler={props.setMaxCountCallback}/>
                <NumberInput
                    error={props.error}
                    title="min value"
                    value={props.minCount}
                    onChangeHandler={props.setMinCountCallback}/>
            </div>
            <div className={s.buttonBackSide}>
            <div className={s.button} >
                <Button
                    buttonName="set"
                    onClickHandler={setCounts}
                    disabled={props.setDisabled}/>
            </div>
        </div>
        </div>
    )
}

