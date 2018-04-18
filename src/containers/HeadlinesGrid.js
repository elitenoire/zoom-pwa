import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHeadlines, fetchSources } from '../actions'

import { GridLayout } from '@egjs/react-layout'
import ContentLoader from '../components/ContentLoader'
import HeadlineCard from '../components/HeadlineCard'

import Page from '../components/Page'

import imagePlaceholder from '../assets/placeholder-headlines.png'

class HeadlinesGrid extends Component {
    componentDidMount(){
        this.props.fetchHeadlines()
    }

    render() {
        const { isFetching, data, error } = this.props
        const { message, articles:headlines } = data

        return (
            <div style={{position: 'relative'}}>
            {
                isFetching ?
                <ContentLoader /> :
                !isFetching && !!headlines && headlines.length!==0 ? (
                <GridLayout
                tag="div"
                margin={16}
                align="center"
                isEqualSize={false}
                >
                    {headlines.map((headline, index) => {
                    const { title, author, description, url, urlToImage, publishedAt, source} = headline
                    return (
                        <HeadlineCard
                            key={index + '-' + title}
                            title={title}
                            source={source.name}
                            author={author || source.name || 'Anonymous'}
                            url={url}
                            description={description}
                            urlImage={urlToImage || imagePlaceholder}
                            date={publishedAt}
                        />
                    )
                    })}
                </GridLayout>
                ) :
                <Page message={error || message || 'Nothing Found.'} />
            }
            </div>
        );
    }
}

export default connect(
    ({ headlines: { headlines, isFetching, error } }) => ({ data:headlines, isFetching, error }),
    { fetchHeadlines, fetchSources }
)(
    HeadlinesGrid
)
