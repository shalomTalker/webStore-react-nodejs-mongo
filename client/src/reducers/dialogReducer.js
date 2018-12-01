import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions/types';

const initialState = {
    ariaHide: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                ariaHide: action.payload.ariaHide
            }
            case CLOSE_DIALOG:
            return {
                ariaHide: action.payload.ariaHide
            }
        default:
            return state
    }
}