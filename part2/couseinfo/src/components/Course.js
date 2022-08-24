const Header = ({ course }) => {     
    return (
        <h2>{course}</h2>
    )
}
const Total = ({ sum }) => {
    return (
        <b>total of {sum} exercises</b>
    )
}

const Part = ({ part }) => 
<p>
    {part.name} {part.exercises}
</p>

const Content = ({ parts }) => 
<div>
{parts.map(part =>
    <Part key={part.id} part={part} />
)}

</div>

const Course = ({course}) => {
    const total = course.parts.reduce((acc = {}, currPart = {}) => {
        acc.total = currPart.exercises + acc.total
        return acc
    },
    {
        total: 0
    })
    console.log(course.name)
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total sum={total.total} />
        </div>
    )
}

export default Course