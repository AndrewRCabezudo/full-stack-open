import { useState } from 'react'


const Button = (props) => {
    return (
       <button onClick={props.onClick}>{props.text}</button>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
  })
  const [most, setMost] = useState({
    0: '',
    1: 0
  })


  const handleNextClick = () => {setSelected(Math.floor(Math.random() * anecdotes.length))}
  const handleVoteClick = () => {
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)

    let max = 0
    let anec = ''
    console.log('max is: ' + max)
    Object.entries(copy).forEach(([key, value]) => {
        console.log('value of vote: ' + anecdotes[key] + ' : '+ value)
        if (value > max) {
            max = value
            anec = key 
        }  
    })
    console.log('max final is: ' + max)
    const copyMost = {...most}
    copyMost[0] = anec
    copyMost[1] = max
    setMost(copyMost)
  }


  return (
    <div>
        <h1>
            Anecdote of the day
        </h1>
        {anecdotes[selected]}
        <br></br>
        has {votes[selected]} votes
        <br></br>
        <Button onClick={handleVoteClick} text='vote'/>
        <Button onClick={handleNextClick} text='next anecdote'/>
        <h1>
            Anecdote with the most votes
        </h1>
        {anecdotes[most[0]]}
        <br></br>
        has {most[1]} votes
        
    </div>
  )
}

export default App