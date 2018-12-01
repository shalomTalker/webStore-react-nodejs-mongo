import { DISPATCH_SEARCH_KEY } from './types'
export const dispatchSearchKey = searchKey => dispatch => {
        dispatch({
            type: DISPATCH_SEARCH_KEY,
            payload: searchKey
        })

}

