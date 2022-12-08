import React, { useEffect, useState } from 'react'
import BoxNav from './boxNav'
import { useActiveMenu } from '../pages/routePath'
import '../styles/stylesComponentHome.css'

const NavBar = ({ addColor }) => {
    const {
        homeMenuActive,
        rocketMenuActive,
        launchMenuActive,
    } = useActiveMenu()
    const [homeImg ,setHomeImg] = useState(true)
    const reSize = () => {
        if(window.innerWidth < 500){
            setHomeImg(false)
        }
        else{
            setHomeImg(true)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', reSize)
        return () => {
            window.removeEventListener('resize', reSize)
        }
    }, [])
    return (
        <div className={addColor}>
            <BoxNav
                text={'image'}
                path="/CheapApp"
                menuActive={"boxNav"}
            />
            {homeImg && (<BoxNav
                text={'Home'}
                path="/CheapApp"
                menuActive={homeMenuActive}
            />)}
            <BoxNav
                text={'Rockets'}
                path="/rockets"
                menuActive={rocketMenuActive}
            />
            <BoxNav
                text={'Launches'}
                path="/launch"
                menuActive={launchMenuActive}
            />
        </div>
    )
}

export default NavBar
