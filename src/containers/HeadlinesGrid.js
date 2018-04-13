import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHeadlines, fetchSources } from '../actions'

import { GridLayout } from '@egjs/react-layout'
// import Masonry from 'react-masonry-component';
// import Masonry from '../components/Masonry';
import ContentLoader from '../components/ContentLoader'
import HeadlineCard from '../components/HeadlineCard'

class HeadlinesGrid extends Component {
    componentDidMount(){
        this.props.fetchHeadlines()
    }

    render() {
        const { isFetching, headlines } = this.props
        return (
            <div style={{position: 'relative'}}>
                {isFetching && <ContentLoader />}
                {!isFetching && !!headlines && (
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
                                urlImage={urlToImage}
                                date={publishedAt}
                            />
                        )
                        })}
                    </GridLayout>
                )}
            </div>
        );
    }
}

export default connect(
    ({ headlines: { headlines, isFetching } }) => ({ headlines: headlines.articles, isFetching }),
    { fetchHeadlines, fetchSources }
)(
    HeadlinesGrid
)

//  <Masonry
//     items={this.props.headlines}
//     itemComponent={MyMasonryItem}
//     alignCenter
//     containerClassName="masonry"
//     layoutClassName="masonry-view"
//     pageClassName="masonry-page"
//     loadingElement={<span>Loading...</span>}
//     columnWidth={columnWidth}
//     columnGutter={columnGutter}
//     hasMore={this.props.hasMore}
//     isLoading={this.props.isFetching}
//     onInfiniteLoad={this.onFetch}
//     getState={this.props.getState}
//   />