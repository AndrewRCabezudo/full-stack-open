// import { handle } from 'express/lib/application'
import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.text}
      </h1>
    </div>
  )
}
const Button = (props) => {
  return (
      <button onClick={props.onClick}>
        {props.name}
      </button>
  )
}
const StatisticsLine = (props) => {
  return (
      <tr>
        <td>
          {props.text}
        </td>
        <td>
          {props.value}
        </td>
      </tr>
  )
}
const Statistics = (props) => {
  let clicked = props.good > 0 || props.bad > 0 || props.neutral > 0  
  return (
    clicked ?
    (<div>
      <h1>
        statistics
      </h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={props.good}/>
          <StatisticsLine text="neutral" value={props.neutral}/>
          <StatisticsLine text="bad" value={props.bad}/>
          <StatisticsLine text="all" value={props.total}/>
          <StatisticsLine text="average" value={(props.good - props.bad) / props.total} />
          <StatisticsLine text="positive" value={((props.good * 100) / props.total) + ' %'} />
        </tbody>
      </table>
    </div>) : 
    <div>
    <h1>statistics</h1>
    <p>
      No feedback given
    </p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {setGood(good + 1)}
  const handleNeutralClick = () => {setNeutral(neutral + 1)}
  const handleBadClick = () => {setBad(bad + 1)}

  let total = good + bad + neutral

  return (
    <div>
      <Header text='give feedback'/>
      <Button name='good' onClick={handleGoodClick}/>
      <Button name='neutral' onClick={handleNeutralClick}/>
      <Button name='bad' onClick={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg = {total / 3}/>
    </div>
  )
}

export default App
