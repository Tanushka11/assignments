import React from 'react'

function Card(props) {
  return (
    <div className=' w-full h-screen px-6 py-4 '>
        <div className=' m-4 px-3 py-2shadow-lg shadow-red-500 md:shadow-xl grid place-items-center'>
        <h1 className='font-bold'>{props.name}</h1>
        <p>{props.data.description}</p>
        <h2 className='font-bold'>Intrests</h2>
        <ul >
          {props.Interests.map((interest) => (
            <li key={interest} >
              {interest}
            </li>
          ))}
          </ul>
        <div className='flex m-2' >
          <a className='px-3 m-2 bg-blue-400 rounded-md' href={props.Linkedin} target='_blanks'>Linkedin</a>
          <a className='px-3 m-2 bg-blue-400 rounded-md' href={props.Twitter} target='_blanks'>Twitter</a>
        
        </div>
       
        </div>
    </div>
  )
}

export default Card