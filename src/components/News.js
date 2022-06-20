import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }
    async updateNews() {
        console.log(this.state.page);

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`
        let data = await fetch(url)
        let parsedData = await data.json()

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
        console.log(this.state.articles.length, parsedData.totalResults);
    }
    async componentDidMount() {
        console.log('componentDidMount() is called');
        this.props.setProgress(10)
        // await this.updateNews()
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apikey}&pageSize=${this.props.pageSize}&page=${this.state.page}`
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        setTimeout(() => {
            this.props.setProgress(100)
        }, 1000);
        console.log(this.state.articles.length, parsedData.totalResults);
    }
    fetchMoreData = async () => {
        console.log('fetchMoreData() is called');
        await this.updateNews()
        this.setState({ page: this.state.page + 1 })
    }
    render() {
        return (
            <>
                <h2 style={{ margin: '35px 0px' }} className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {/* {this.state.loading && <Spinner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row ">
                            {!this.state.loading && this.state.articles.map((ele, i) => {
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
}

export default News