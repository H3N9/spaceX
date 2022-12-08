import React, { useEffect, useState } from 'react'
import '../styles/styleLaunch.css'
import { fetchData } from '../tools/fetch'
import CardLaunch from '../components/launch/cardLaunch'
import { useActiveMenu } from './routePath'

const Launch = () => {
    const [launchData, setLaunchData] = useState([])
    const [displayLaunch, setDisplayLaunch] = useState([])
    const [years, setYears] = useState([])
    const [selectYear, setSelectYear] = useState('any')
    const [selectResult, setSelectResult] = useState('any')
    const [selectRocket, setSelectRocket] = useState('any')
    const [searchName, setSearchName] = useState('')
    const urlLuanch = 'https://api.spacexdata.com/v3/launches'
    const { setlaunchMenuActive } = useActiveMenu()

    const setLaunchDataPage = (launches) => {
        setLaunchData(launches)
        setDisplayLaunch(launches)
        const set = new Set(launches.map((item) => item.launch_year))
        const years = Array.from(set)
        setYears(years)
    }

    const filterLuanch = ({ year, result, name, rocket }) => {
        let newLaunches = launchData.slice()

        /* filter */
        if (
            year === 'any' &&
            result === 'any' &&
            name === '' &&
            rocket === 'any'
        ) {
        } else {
            newLaunches = newLaunches.filter((launch) => {
                let containCount = 0
                const isResult = result === 'success' ? true : false

                if (year === 'any' || launch.launch_year === year) {
                    containCount++
                }
                if (
                    result === 'any' ||
                    launch.launch_success === isResult ||
                    (launch.launch_success === null && !isResult)
                ) {
                    containCount++
                }
                if (rocket === 'any' || launch.rocket.rocket_name === rocket) {
                    containCount++
                }
                if (
                    launch.mission_name
                        .toLowerCase()
                        .includes(name.toLowerCase())
                ) {
                    containCount++
                }

                return containCount === 4
            })
        }

        setDisplayLaunch(newLaunches)
    }

    const selectYearHandle = (e) => {
        const year = e.target.value
        filterLuanch({
            year,
            result: selectResult,
            name: searchName,
            rocket: selectRocket,
        })
        setSelectYear(year)
    }

    const selectResultHandle = (e) => {
        const result = e.target.value
        filterLuanch({
            year: selectYear,
            result,
            name: searchName,
            rocket: selectRocket,
        })
        setSelectResult(result)
    }

    const searchNameHandle = (e) => {
        const name = e.target.value
        filterLuanch({
            year: selectYear,
            result: selectResult,
            name,
            rocket: selectRocket,
        })
        setSearchName(name)
    }

    const selectRocketHandle = (e) => {
        const rocket = e.target.value
        filterLuanch({
            year: selectYear,
            result: selectResult,
            name: searchName,
            rocket,
        })
        setSelectRocket(rocket)
    }

    useEffect(() => {
        setlaunchMenuActive('boxNavActive')
        fetchData(urlLuanch, setLaunchDataPage)
        return () => {
            setlaunchMenuActive('boxNav')
        }
    }, [])

    return (
        <React.Fragment>
            <div id="launch-i">
                <h1>LAUNCH</h1>
            </div>
            <div id="searchBar">
                <div className="selectBox">
                    <div className="select">
                        <select
                            name="slct"
                            id="slct"
                            onChange={selectYearHandle}
                        >
                            <option value="0" selected disabled>
                                YEAR
                            </option>
                            <option value="any">ANY YEAR</option>
                            {years.map((year, index) => (
                                <option key={index} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="select">
                        <select
                            name="slct"
                            id="slct"
                            onChange={selectResultHandle}
                        >
                            <option value="0" selected disabled>
                                RESULT
                            </option>
                            <option value="any">ANY RESULT</option>
                            <option value="success">SUCCESS</option>
                            <option value="fail">FAIL</option>
                        </select>
                    </div>
                    <div className="select">
                        <select
                            name="slct"
                            id="slct"
                            onChange={selectRocketHandle}
                        >
                            <option value="0" selected disabled>
                                ROCKET
                            </option>
                            <option value="any">ANY ROCKET</option>
                            <option value="Falcon 1">Falcon 1</option>
                            <option value="Falcon 9">Falcon 9</option>
                            <option value="Falcon Heavy">Falcon Heavy</option>
                        </select>
                    </div>
                </div>
                <div className="input">
                    <input
                        value={searchName}
                        onChange={searchNameHandle}
                        placeholder="Search name"
                    />
                </div>
            </div>
            <div id="launchDetails">
                <div id="boxDetail">
                    {displayLaunch.map((launch, index) => (
                        <CardLaunch
                            key={index}
                            id={launch.flight_number}
                            launch={launch}
                        />
                    ))}
                </div>
            </div>
            <div id="endling" />
        </React.Fragment>
    )
}

export default Launch
