import React, { useEffect, useState } from 'react'
import '../styles/stylesHome.css'
import { fetchData } from '../tools/fetch'
import CardHis from '../components/home/cardHis'
import Logo from '../images/home/logo.png'
import { useActiveMenu } from './routePath'

const Home = () => {
    const [jsonInfo, setJsonInfo] = useState({})
    const [jsonHis, setJsonHis] = useState([])
    const [viewScroll, setViewScroll] = useState(1)
    const urlInfo = 'https://api.spacexdata.com/v3/info'
    const urlHis = 'https://api.spacexdata.com/v3/history'
    const { sethomeMenuActive } = useActiveMenu()

    useEffect(() => {
        sethomeMenuActive('boxNavActive')
        fetchData(urlInfo, setJsonInfo)
        fetchData(urlHis, setJsonHis)
        return () => {
            sethomeMenuActive('boxNav')
        }
    }, [])

    const scrollHandle = (event) => {
        const element = event.target
        const scrollCurrent = element.scrollTop
        if (scrollCurrent > 0) {
            setViewScroll(0)
        } else if (scrollCurrent === 0) {
            setViewScroll(1)
        }
    }

    return (
        <React.Fragment>
            {/*Image with text on home page*/}
            <div className="boxImage">
                <div id="opcitryWrapI" />
                <img id="name-i-image" src={Logo} alt="SpaceX_logo" />
                <p id="detail-i-image">{jsonInfo.summary}</p>
            </div>

            <div id="boxHistories">
                <div id="box-h-text">
                    <h1>HISTORIES</h1>
                    <p>
                        "I think it is possible for ordinary people to choose to
                        be extraoridnay." - Elon Musk
                    </p>
                </div>
                <div id="gradientColor" />
            </div>

            {/*card*/}
            <div id="boxCard">
                <div id="boxCard-C-G">
                    <div id="viewMore" style={{ opacity: viewScroll }}>
                        <div className="boxView">
                            <p>VIEW MORE DETAILS</p>
                        </div>
                        <div className="boxView">
                            <div id="triangleMore" className="shapes" />
                        </div>
                    </div>
                    <div id="gradientColor-U" />
                    <div id="boxCardContent" onScroll={scrollHandle}>
                        {jsonHis.map((history, index) => (
                            <CardHis
                                key={history.id}
                                id={index}
                                length={jsonHis.length}
                                history={history}
                            />
                        ))}
                        {viewScroll && <div />}
                    </div>
                    <div id="gradientColor-D" />
                </div>
            </div>

            <div id="endingLine"></div>
        </React.Fragment>
    )
}

export default Home
