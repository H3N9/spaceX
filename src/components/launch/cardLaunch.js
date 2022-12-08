import React from 'react'
import '../../styles/styleLaunCom.css'
import { Link } from 'react-router-dom'

const CardLaunch = ({ launch, id }) => {
    const { links, launch_year, mission_name, launch_success, rocket } = launch
    const resultLaunch = launch_success ? 'LAUNCH SUCCESS' : 'LAUNCH FAIL'
    const logo = links.mission_patch_small
    const reusltMission = launch_success ? 'success' : 'fail'
    return (
        <Link
            className="cardLaunch"
            to={{
                pathname: `/launchDetail/${id}`,
                state: launch,
            }}
        >
            <img src={logo} className="image-launch" alt={'Image logo'} />

            <div className="titleLuanch boxCenter">
                <h1 className="text">{mission_name}</h1>
            </div>

            <div className="titleLuanch boxCenter">
                <h2 className="text">{rocket.rocket_name}</h2>
            </div>
            <div className="yearLaunch">
                <p className="text">{launch_year}</p>
            </div>

            <div className={`resultLaunch ${reusltMission}`}>
                <h3 className="text">{resultLaunch}</h3>
            </div>
        </Link>
    )
}

export default CardLaunch
