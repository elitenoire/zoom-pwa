//

export default (state = {}, { type }) => {
    switch(type) {
        case 'FETCH_ARTICLES' :
            return { articles: ['test']}
        default :
            return { articles : []}
    }
}