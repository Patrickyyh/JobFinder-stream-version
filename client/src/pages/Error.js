import React from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'




export const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
            <img src = {img} alt = "not found"></img>
            <h3>text</h3>
            <p> text</p>
            <Link to = '/'>Click here to return the main page </Link>
        </div>
    </Wrapper>
  )
}
