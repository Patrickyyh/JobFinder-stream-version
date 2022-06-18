import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { NavLinks } from './NavLinks'
import Logo from '../components/Logo'
import { useAppContext } from '../context/appContext'

export const BigSideBar = () => {
  const {showSideBar} = useAppContext();
  return (
    <Wrapper>
       <div className= { showSideBar? 'sidebar-container' : 'sidebar-container show-sidebar'}>
        
        <div className='content'>
            <header>
               <Logo />
            </header>
            <NavLinks /> 
        </div>
       </div>
    </Wrapper>
  )
}
