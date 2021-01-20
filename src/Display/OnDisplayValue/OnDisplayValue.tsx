import s from "../Display.module.css";
import React from "react";

type OnDisplayValueType = {
    presentCount: number
    maxCount: number
    valuesEntered: boolean
}


export function OnDisplayValue(props: OnDisplayValueType) {
    return (
        props.valuesEntered
            ? <div className={s.valueDisplay}> Enter values and press "Set" </div>
            : (props.presentCount === props.maxCount)
            ? <div className={s.valueDisplay}><h2 className={s.red}> {props.presentCount}</h2></div>
            : <div className={s.valueDisplay}> {props.presentCount} </div>
    )
}