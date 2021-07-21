import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef, useMemo } from 'react'
import { Statistic, Row, Col, Form, Input, Card } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Calculation } from './components/calculation'
import _ from 'lodash';
const { Countdown } = Statistic;

const App = () => {

  const [correctNum, setCorrectNum] = useState(0)


  function onFinish() {
    console.log('finished!');
    let questions = JSON.parse(localStorage.getItem("questions") || '[]')
    setCorrectNum(_.filter(questions, { isCorrect: true }).length)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Row gutter={16}>
          <Col span={12}>
            <Countdown title="倒计时" value={Date.now() + 5 * 1000} format="mm:ss" suffix="秒" onFinish={onFinish} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Calculation />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="正确： "
                value={correctNum}
                valueStyle={{ color: '#3f8600' }}
                prefix={<CheckOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="错误： "
                value={100 - correctNum}
                valueStyle={{ color: '#cf1322' }}
                prefix={<CloseOutlined />}
              />
            </Card>
          </Col>
        </Row>
      </header>

    </div>
  );
}

export default App;
