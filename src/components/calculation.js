import { Statistic, Row, Col, Form, Input } from 'antd';
import { useEffect, useState, useRef } from 'react'
import _ from 'lodash'


export const Calculation = () => {
    const actions = ['+', "-"]
    const [firstNum, setFirstNum] = useState(0)
    const [secondNum, setSecondNum] = useState(0)
    const [action, setAction] = useState()
    const [answer, setAnswer] = useState(0)
    const [isCorrect, setIsCorrect] = useState(true)
    const inputRef = useRef(null)

    useEffect(() => {
        generateNum()
    }, [])

    const [form] = Form.useForm();

    function generateNum() {
        setAction(actions[_.random(0, 1)])
        setFirstNum(_.random(0, 999))
        setSecondNum(_.random(0, 999))
    }

    function onSubmit(value) {
        const {answer} = value
        const correctAnswer = eval(`${firstNum + action + secondNum}`)
        const isCorrect = parseInt(answer) === correctAnswer
        setIsCorrect(isCorrect)
        let questions = JSON.parse(localStorage.getItem("questions") || '[]')
        localStorage.setItem("questions", JSON.stringify([...questions, {
            firstNum,
            secondNum,
            isCorrect,
            answer,
            correctAnswer
        }]))
        form.resetFields()
        generateNum()
        inputRef.current.focus()
    }

    return (
        <Form onFinish={onSubmit} form={form}>
            <Form.Item name="answer" rules={[{ required: true }]} label={`${firstNum + action + secondNum} = `}>
                <Input type="number" ref={inputRef} value={answer}></Input>
            </Form.Item>
        </Form>
    )
}