import {FETCH_LIST_CUSTOM, FETCH_LIST_CUSTOM_FAILED, FETCH_LIST_CUSTOM_SUCCESS,
DELETE_CUSTOM_SUCCESS} from '../actions/actionType'

const initStateListCustom = {
    dataListCustom  : [],
    len: 0
}

const ListCustomReducer =(state = initStateListCustom, action)=>{
    switch (action.type){
        case  FETCH_LIST_CUSTOM_SUCCESS:
            state.dataListCustom = action.data;
            return {...state}
        case FETCH_LIST_CUSTOM_FAILED:
            return state.dataListCustom = [];
        case DELETE_CUSTOM_SUCCESS:
            state.len= action.len;
            return {...state}
        default:  return state
    }

}
export default ListCustomReducer;