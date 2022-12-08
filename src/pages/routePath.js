import React, {
    useCallback,
    useEffect,
    useState,
    useContext,
    createContext,
} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import NavBar from '../components/navBar'
import Launch from './launch'
import Rockets from './rockets'
import Home from './home'
import RocketDetail from './rocketDetail'
import '../styles/stylesHome.css'
import LaunchDetail from './launchDetail'

const screenHeight = window.innerHeight
const ActiveMenuContext = createContext()

const RoutePath = () => {
    const [stylePacks, setStylePacks] = useState(defaultStlyes)
    const [homeMenuActive, sethomeMenuActive] = useState('boxNav')
    const [rocketMenuActive, setRocketMenuActive] = useState('boxNav')
    const [launchMenuActive, setlaunchMenuActive] = useState('boxNav')

    const handleScroll = useCallback(() => {
        const stylesChange = { ...stylePacks }
        const scrollY = (window.pageYOffset / screenHeight) * 100 + 100 //percent pageYOffset percent from screen window

        if (scrollY > 110 && stylePacks.navBar === defaultStlyes.navBar) {
            stylesChange.navBar = scrollStyles.navBar
        } else {
            stylesChange.navBar = defaultStlyes.navBar
        }

        setStylePacks(stylesChange)
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Router>
            <ActiveMenuContext.Provider
                value={{
                    homeMenuActive,
                    sethomeMenuActive,
                    rocketMenuActive,
                    setRocketMenuActive,
                    launchMenuActive,
                    setlaunchMenuActive,
                }}
            >
                <NavBar addColor={stylePacks.navBar} />
                <div id="content">
                    <Switch>
                        <Route exact path="/CheapApp">
                            <Home />
                        </Route>
                        <Route path="/launch">
                            <Launch />
                        </Route>
                        <Route path="/rockets">
                            <Rockets />
                        </Route>
                        <Route path="/rocketsDetail/:rocketId">
                            <RocketDetail />
                        </Route>
                        <Route path="/launchDetail/:launchId">
                            <LaunchDetail />
                        </Route>
                    </Switch>
                </div>
            </ActiveMenuContext.Provider>
        </Router>
    )
}

const defaultStlyes = {
    navBar: 'navBar',
}
const scrollStyles = {
    navBar: 'navBar addColor',
}

export default RoutePath

export const useActiveMenu = () => useContext(ActiveMenuContext)
