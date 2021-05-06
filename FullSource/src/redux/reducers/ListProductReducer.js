import {FETCH_PLACE, FETCH_LIST_PRODUCT_FAILED, FETCH_LIST_PRODUCT_SUCCESS} from '../actions/actionType'

const initStateListPlace = { 
    indexTab : 1,
    dataListProduct : [
    ],
}
const ListProductReducer =(state = initStateListPlace, action) =>{
    // console.log(`state`, action);
    switch (action.type) {
        case FETCH_LIST_PRODUCT_SUCCESS:
            state.dataListProduct = action.data;
            return{...state}
        case FETCH_LIST_PRODUCT_FAILED:
            return state.dataListProduct = [];
        default: 
            return state;
    }
} 

export default  ListProductReducer;