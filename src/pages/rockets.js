import React, { useEffect, useState } from 'react'
import { fetchData } from '../tools/fetch'
import RocketBox from '../components/rocket/rocketBox'
import { useActiveMenu } from './routePath'
import '../styles/stylesRocketPage.css'

const Rockets = () => {
    const [rockets, setRockets] = useState([])
    const { setRocketMenuActive } = useActiveMenu()

    useEffect(() => {
        setRocketMenuActive('boxNavActive')
        fetchData('https://api.spacexdata.com/v3/rockets', setRockets)
        return () => {
            setRocketMenuActive('boxNav')
        }
    }, [])

    return (
        <React.Fragment>
            <div id="rocket-i">
                <div>
                    <h1>ROCKET</h1>
                </div>
                <div className="gradientColor"></div>
            </div>
            <div className="container">
                {rockets.map((rocket) => {
                    return <RocketBox key={rocket.rocket_id} rocket={rocket} />
                })}
            </div>
        </React.Fragment>
    )
}

export default Rockets
