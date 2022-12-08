import React from 'react'

const CardHis = ({ history, id, length }) => {
    const { title, details, event_date_utc } = history
    const dateTime = new Date(event_date_utc)
    const lastId = length - 1
    const firstId = 0
    const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ]
    const date = dateTime.getDate()
    const month = months[dateTime.getMonth()]
    const year = dateTime.getFullYear()

    return (
        <div className="card">
            {id === firstId ? (
                <div className="boxLines">
                    <div className="cycleLine" />
                    <div className="breakLine" />
                </div>
            ) : (
                <></>
            )}
            <div className="detail">
                <div className="dateCard">
                    <h1>{date}</h1>
                    <h1>{month}</h1>
                    <h1>{year}</h1>
                </div>

                <div className="textCard">
                    <h1 className="titleCard">{title}</h1>
                    <p className="detailCard">{details}</p>
                </div>
            </div>
            <div className="boxLines">
                <div className="breakLine" />
                {id === lastId ? <div className="cycleLine" /> : <></>}
            </div>
        </div>
    )
}

export default CardHis
