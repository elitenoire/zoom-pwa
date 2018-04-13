
// Determine url fetch params depending on endpoint

const NEWS_API = 'https://newsapi.org/v2'

export const getHeadlinesUrlEndpoint = ({country, sources}) => {
    let params = ''

    if(country){
        // Expect single country iso code
        // if(countryIso.length !== 0){
            params = `country=${country.iso}`
            // params= 'county=n'
        // }
    }
    // Single source string. Might match for empty strings too
    else if(sources && typeof sources === 'string'){
        params = `sources=${sources}`
    }
    // Expect single or multiple sources as an array
    else if(Array.isArray(sources) && sources.length !== 0){
        params = `sources=${sources.join()}`
    }

    return new URL(`${NEWS_API}/top-headlines/?${params}`)
}

export const getSourcesUrlEndpoint = () => {
    return new URL(`${NEWS_API}/sources`)
}

export const setApiKey = () => {
    const headers = {
        'X-Api-Key': process.env.REACT_APP_APKEY_NEWS
    }
    return { headers }
}