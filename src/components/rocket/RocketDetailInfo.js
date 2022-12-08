import React, { useEffect } from 'react'
import RocketDetailList from './rocketDetailList'

const RocketDetailInfo = ({ rocket }) => {
    const payload_weights = rocket.payload_weights
    const engines = rocket.engines
    const firstStage = rocket.first_stage
    const secondStage = rocket.second_stage
    const image1 = rocket.flickr_images[0]

    const size = {
        height: `${rocket.height.meters} m (${rocket.height.feet} ft)`,
        diameter: `${rocket.diameter.meters} m (${rocket.diameter.feet} ft)`,
        mass: `${rocket.mass.kg} kg (${rocket.mass.lb} lb)`,
    }

    const payloadWeights = payload_weights.reduce((acc, curr) => {
        return { ...acc, [curr.name]: `${curr.kg} kg (${curr.lb} lb)` }
    }, {})

    const sea_level = {
        isp: engines.isp.sea_level,
        thrust: `${engines.thrust_sea_level.kN} kN (${engines.thrust_sea_level.lbf} lbf)`,
    }

    const vacuum = {
        isp: engines.isp.vacuum,
        thrust: `${engines.thrust_vacuum.kN} kN (${engines.thrust_vacuum.lbf} lbf)`,
    }

    const firstStageSeaLevel = {
        thrust: `${firstStage.thrust_sea_level.kN} kN (${engines.thrust_sea_level.lbf} lbf)`,
    }

    const firstStageVacuum = {
        thrust: `${firstStage.thrust_vacuum.kN} kN (${engines.thrust_vacuum.lbf} lbf)`,
    }

    const secondStageThrust = {
        thrust: `${secondStage.thrust.kN} kN (${secondStage.thrust.lbf} lbf)`,
    }

    const secondStagePayload = {
        option1: secondStage.payloads.option_1 || '-',
        option2: secondStage.payloads.option_2 || '-',
    }

    const compositeFairing = secondStage.payloads.composite_fairing

    const secondStageCompositeFairing = {
        height: `${compositeFairing.height.meters} m (${compositeFairing.height.feet} ft)`,
        diameter: `${compositeFairing.diameter.meters} m (${compositeFairing.diameter.feet} ft)`,
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="containerDetail">
                <div className="detail" id="titleDetail">
                    <h1>{rocket.rocket_name}</h1>
                    <p>{rocket.description}</p>
                </div>
                <div className="detail" id="aboutDetail">
                    <div className="detailLeft">
                        <div className="detailLeftInfo">
                            <h2>engines</h2>
                            <p>
                                <b>type :</b> {engines.type}
                            </p>
                            <p>
                                <b>number :</b> {engines.number}
                            </p>
                            <div className="detailListRow">
                                <RocketDetailList
                                    title="sea level"
                                    data={sea_level}
                                />
                                <RocketDetailList
                                    title="vacuum"
                                    data={vacuum}
                                />
                            </div>
                        </div>
                        <div className="detailLeftInfo">
                            <h2>first stage</h2>
                            <p>
                                <b>fuel amount tons : </b>{' '}
                                {firstStage.fuel_amount_tons}
                            </p>
                            <p>
                                <b>burn time sec : </b>{' '}
                                {firstStage.burn_time_sec}
                            </p>
                            <div className="detailListRow">
                                <RocketDetailList
                                    title="sea level"
                                    data={firstStageSeaLevel}
                                />
                                <RocketDetailList
                                    title="vacuum"
                                    data={firstStageVacuum}
                                />
                            </div>
                        </div>
                        <div className="detailLeftInfo">
                            <h2>second stage</h2>
                            <p>
                                <b>fuel amount tons : </b>{' '}
                                {secondStage.fuel_amount_tons}
                            </p>
                            <p>
                                <b>burn time sec : </b>{' '}
                                {secondStage.burn_time_sec}
                            </p>
                            <div className="detailListRow">
                                <RocketDetailList
                                    title="thrust"
                                    data={secondStageThrust}
                                />
                                <RocketDetailList
                                    title="payload"
                                    data={secondStagePayload}
                                />
                            </div>
                            <div className="detailListCol">
                                <RocketDetailList
                                    title="payload composite fairing"
                                    data={secondStageCompositeFairing}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="detailRight">
                        <div className="detailImage">
                            <img src={image1} width="100%" />
                        </div>
                        <div className="detailLeftInfo">
                            <h2>About</h2>
                            <p>
                                <b>first flight :</b> {rocket.first_flight}
                            </p>
                            <p>
                                <b>rocket_type:</b> {rocket.rocket_type}
                            </p>
                            <p>
                                <b>country :</b> {rocket.country}
                            </p>
                            <p>
                                <b>company :</b> {rocket.company}
                            </p>
                        </div>
                        <RocketDetailList title="size" data={size} />
                        <RocketDetailList
                            title="payload weights"
                            data={payloadWeights}
                        />
                        <div className="detailImage">
                            {rocket.flickr_images.slice(1).map((image) => (
                                <div key={image}>
                                    <img src={image} width="100%" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RocketDetailInfo
