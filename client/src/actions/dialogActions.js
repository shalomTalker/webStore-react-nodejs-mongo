import { OPEN_DIALOG, CLOSE_DIALOG} from './types';


export const openDialog = () => dispatch => {
    dispatch({
        type: OPEN_DIALOG,
        payload: { ariaHide: true}
    });
}

export const closeDialog = () => dispatch => {
    dispatch({
        type: CLOSE_DIALOG,
        payload: { ariaHide: false}
    });
}

