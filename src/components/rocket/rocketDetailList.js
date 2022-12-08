import React from 'react'

const RocketDetailList = ({ title, data }) => {
    const listKey = Object.keys(data)

    return (
        <div className="detailList">
            <div className="titleDetailList">
                <h3>{title}</h3>
            </div>
            <div className="detailListInfo">
                {listKey.map((item) => {
                    return (
                        <div>
                            <p>
                                <b>{item}</b>
                            </p>
                            <p>{data[item]}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RocketDetailList
