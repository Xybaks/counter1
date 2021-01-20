import {Display} from "../Display/Display";
import s from "./Header.module.css";
import {EnterDisplay} from "../EnterDisplay/EnterDisplay";
import React, {useState} from "react";

export const Header = () => {
    // создаем переменные минимального, максимального и текущего значения, используем useState
    const [minCount, setMinCount] = useState<number>((Number(localStorage.getItem("minCount"))))
    const [maxCount, setMaxCount] = useState<number>(Number(localStorage.getItem("maxCount")))
    const [presentCount, setPresentCount] = useState<number>(minCount)
    // переменная , отвечающая, данные введены и нажат SET
    const [valuesEntered, setValuesEntered] = useState<boolean>(false)
    // переменная ошибки ввода
    const [error, setError] = useState<boolean>(false)
    //переменная дективации кнопки SET
    let setDisabled = true
    if (valuesEntered && !error) {
        setDisabled = false
    }
// переменная деактивации кнопки Reset
    let resetDisabled = false
    if (error ||valuesEntered) {
        resetDisabled = true
    }
// переменная деактивации кнопки Inc
    let incReset:boolean=false
    if (error||valuesEntered || maxCount===presentCount){
        incReset=true
    }
    //  функция изменения минимального значения
    const setMinCountCallback = (minCount: number) => {
        if (minCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
            minCount % 1 !== 0 ||   //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
            minCount < 0 || // проверка на то, что число больше нуля
            minCount >= maxCount) {  // проверка на то, что   введенное число число меньше _maxCount
            setError(true)
            setMinCount(minCount)
        } else {
            setError(false)
            setMinCount(minCount)
            setValuesEntered(true)
        }
    }
    //  функция изменения максимального значения
    const setMaxCountCallback = (maxCount: number) => {
        if (maxCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
            maxCount % 1 !== 0 || //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
            maxCount < 0 || // проверка на то, что число больше нуля
            maxCount <= minCount  // проверка на то, что   введенное число число больше _mimCount
        ) {
            setError(true)
            setMaxCount(maxCount)
        } else {
            setError(false)
            setMaxCount(maxCount)
            setPresentCount(minCount)
            setValuesEntered(true)
        }
    }
    //  функция изменения текущего значения
    const setPresentCountCallback = (presentCount: number) => {
        if (presentCount > Number.MAX_SAFE_INTEGER ||  //  проверка на   самое большое целое число JS
            presentCount % 1 !== 0 || //проверка на то, что число целое ( можно было сделать через Number.isInteger(число))
            presentCount < 0 || // проверка на то, что число больше нуля
            presentCount < minCount || // проверка на то, что   введенное число число больше _mimCount
            presentCount > maxCount
        ) {
            setPresentCount(minCount)
        } else if (presentCount === maxCount - 1) {
            setPresentCount(presentCount + 1)
        } else
            setPresentCount(presentCount + 1)
    }
// функция установки начального значения счетчика на минимальное
    const setInitialValue = () => {
        setPresentCount(minCount)
        setValuesEntered(false)
    }
// функция установки мин/макс значения в локалсторедж
    const setCounts = (_minCount: number, _maxCount: number) => {
        localStorage.setItem("minCount", _minCount.toString())
        localStorage.setItem("maxCount", _maxCount.toString())
        setInitialValue()
    }


    return (
        <div>
            <h1> Counter v1: with 2 displays</h1>
            <div className={s.displays}>
                <EnterDisplay
                    error={error}
                    minCount={minCount}
                    maxCount={maxCount}
                    setCounts={setCounts}
                    setDisabled={setDisabled}
                    presentCount={presentCount}
                    valuesEntered={valuesEntered}
                    setMinCountCallback={setMinCountCallback}
                    setMaxCountCallback={setMaxCountCallback}
                />
                <Display
                    error={error}
                    maxCount={maxCount}
                    incReset={incReset}
                    presentCount={presentCount}
                    resetDisabled={resetDisabled}
                    valuesEntered={valuesEntered}
                    setInitialValue={setInitialValue}
                    setPresentCountCallback={setPresentCountCallback}
                />
            </div>
        </div>
    )
}
