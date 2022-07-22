import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
// import fakeResponse from './../sampleOutput.json'

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async () => {

        console.log('updateNews() is called')

        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&pageSize=${props.pageSize}&page=${page}`

        setLoading(true)

        let data = await fetch(url)
        props.setProgress(50)
        let parsedData = await data.json()
        props.setProgress(80)

        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // setArticles(fakeResponse.articles)
        // setTotalResults(fakeResponse.totalResults)
        // setLoading(false)

        setTimeout(() => {
            props.setProgress(100)
        }, 300);
    }

    useEffect(() => {
        console.log('useEffect() is called')
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews()
        //eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {

        console.log('fetchMoreDate() is called')
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&pageSize=${props.pageSize}&page=${page + 1}`

        let data = await fetch(url)
        let parsedData = await data.json()

        setPage(page + 1)
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        // setArticles(fakeResponse.articles)
        // setTotalResults(fakeResponse.totalResults)
        // setLoading(false)
    }

    return (
        <>
            <h2 style={{ marginTop: '60px' }} className='text-center'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {/* {state.loading && <Spinner />} */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row ">
                        {!loading && articles.map((ele, i) => {
                            return <div className="col-md-4" key={i}>
                                <NewsItem title={ele.title ? ele.title : ""} description={ele.description ? ele.description.slice(0, 80) : ""} imgUrl={ele.urlToImage} newsUrl={ele.url} author={ele.author ? ele.author : 'Anonymous'} date={ele.publishedAt} source={ele.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News