import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/Testing'

// Components
import {Logo} from '../components'


// reac router 
import { Link } from 'react-router-dom'



const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo />
        </nav>
        <div className='container page'>
            {/* info */}
            <div className='info'>
                    <h1>
                        job <span>tracking</span> app 
                    </h1>
                    <p>
                       I'm baby shaman deep v health goth, echo park put a bird on it letterpress copper mug pour-over cornhole.
                       Skateboard ramps chillwave squid, put a bird on it tousled church-key pinterest listicle. Shabby chic shaman tattooed readymade pug plaid fam keytar.
                       Cliche enamel pin af austin coloring book yuccie man braid flexitarian +1 church-key.
                    </p>
                    <Link to = "/register"className='btn btn-hero'>
                        Login/Register
                    </Link>
            </div>
                <img src = {main} alt = "job hunt" className='img main-img'></img>
        </div>
    </Wrapper>
  )
}


export default Landing