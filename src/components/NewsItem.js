import React from 'react'

const NewsItem = (props) => {
    let { title, description, imgUrl, newsUrl, author, date, source } = props
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'absolute',
                    right: 0
                }}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                <img src={imgUrl ? imgUrl : 'https://medicaldialogues.in/h-upload/2022/05/24/176984-image.jpg'} className="card-img-top" alt='' />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text">By-{author}, On: {new Date(date).toLocaleString()}</p>
                    <a href={newsUrl} target='_blank' rel='noreferrer' className="btn btn-dark">Read more...</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem