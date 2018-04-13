export const sourcesMapper = sources => {
    return sources.map(source => ({
        text: source.name,
        value: source.id,
        marker: source.name[0].toUpperCase()
    }))
}

export const sourcesFlatten = sources => {
    return Object.keys(sources).reduce((flattenedSources, category) => {
        flattenedSources.push(...sources[category])
        return flattenedSources
    }, [])
}