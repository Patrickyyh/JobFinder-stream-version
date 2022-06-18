import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, SmallSideBar, BigSideBar } from '../../components'

export const SharedLayout = () => {
  return (
    <Wrapper>
        <main className='dashboard'>
            <SmallSideBar/>
            <BigSideBar/>
            <div>
              <Navbar/>
                <div className='dashboard-page'>
                    <Outlet />
                </div>
            </div>
        </main>

    </Wrapper>   
 )

}
