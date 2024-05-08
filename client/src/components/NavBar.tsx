import React from 'react'
import { Outlet } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
        <div>Hallo</div>
        <Outlet />
        </>
       
    )
}

export default NavBar