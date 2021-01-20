import s from "./Display.module.css";
import {Button} from "../Button/Button";
import React from "react";
import {OnDisplayValue} from "./OnDisplayValue/OnDisplayValue";

type DisplayType = {
    error: boolean
    maxCount: number
    incReset: boolean
    presentCount: number
    resetDisabled: boolean
    valuesEntered: boolean
    setPresentCountCallback: (presentCount: number) => void
    setInitialValue: () => void
}


export const Display: git remot DisplayType> = (props) => {

    const setPresentCountCallback = () => {
        props.setPresentCountCallback(props.presentCount)
    }

    const setInitialValue = () => {
        props.setInitialValue()
    }

    return (
        <div className={s.display}>
            {props.error
                ? <div className={s.valueDisplay}><h3 className={s.red}> Incorrect Value</h3></div>
                : <OnDisplayValue
                    presentCount={props.presentCount}
                    maxCount={props.maxCount}
                    valuesEntered={props.valuesEntered}
                />}

            <div className={s.button}>
                <Button buttonName="Inc"
                        onClickHandler={setPresentCountCallback}
                        disabled={props.incReset}/>
                <Button buttonName="reset"
                        onClickHandler={setInitialValue}
                        disabled={props.resetDisabled}/>
            </div>
        </div>
    )
}

