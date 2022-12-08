import React from 'react'
import '../../styles/styleLaunchDetail.css'
import { Link } from 'react-router-dom'

const BoxTextDetail = ({ leftText, rightText, title, success, button, id }) => {
    const styleTitle = title ? 'title' : ''
    const styleSuccess = success
        ? 'success'
        : success === undefined
        ? ''
        : 'fail'
    return (
        <div className="boxTextDetail">
            <div className="leftText">
                <h1 className={`detailText ${styleTitle} ${styleSuccess}`}>
                    {leftText}
                </h1>
            </div>
            <div className="rightText">
                {!button && (
                    <h1 className={`detailText ${styleTitle} ${styleSuccess}`}>
                        {rightText}
                    </h1>
                )}
                {button && (
                    <Link id="buttonRocket" to={`/rocketsDetail/${id}`}>
                        {rightText}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default BoxTextDetail
