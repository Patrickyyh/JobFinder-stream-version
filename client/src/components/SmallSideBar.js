import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import links from '../utils/links.js'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { NavLinks } from './NavLinks'


export const SmallSideBar = () => {

  const {showSideBar,toggleSidebar} = useAppContext();
  

  return (
    <Wrapper>
        <div className={showSideBar? 'sidebar-container show-sidebar': 'sidebar-container '}>
            <div className='content'>
             <button className='close-btn' onClick={toggleSidebar}>
                 <FaTimes />
             </button>
             <header>
                 <Logo /> 
             </header>
             <NavLinks toggleSidebar ={toggleSidebar} ></NavLinks>
            </div>
        </div>

    </Wrapper>
  )
}
