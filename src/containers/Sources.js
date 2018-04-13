import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchSources from '../components/SearchSources'
import PinnedSources from '../components/PinnedSources'

import { fetchSources, setSources } from '../actions'

import staticSources from '../data/sources.json'
import { sourcesFlatten, sourcesMapper } from '../utils/parser'

class Sources extends Component {

    componentWillMount() {
        this.props.fetchSources()
    }

    render() {
        const { sources, setSources } = this.props
        return (
            <div>
                <SearchSources
                    sources={sources || sourcesMapper(sourcesFlatten(staticSources))}
                    setSources={setSources}
                />
                <PinnedSources
                    sources={staticSources}
                    setSources={setSources}
                />
            </div>
        )
    }
}


export default connect(
    ({ sources: { sources, isFetching, error } }) => ({ sources, isFetching, error }),
    { fetchSources, setSources }
)(Sources)