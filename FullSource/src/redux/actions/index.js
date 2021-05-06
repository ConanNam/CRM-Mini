import * as Action from './actionType';

export const fetchPlaceAction = () => {
  console.log('Action_fetchPlaceAction');
  return {
    type: Action.FETCH_PLACE,
  };
};

export const fetchPlaceSuccessAction = receivedPlaces => {
  return {
    type: Action.FETCH_PLACE_SUCCESS,
    receivedPlaces,
  };
};

export const fetchPlaceFailedAction = err => {
  return {
    type: Action.FETCH_PLACE_FAILED,
    err,
  };
};

////////////////////////////////////////////////

export const fetchEarning = () => {
  return {
    type: Action.FETCH_EARNING,
  };
};

///////////////////////////////////////////////

export const fetchSpending = () => {
  return {
    type: Action.FETCH_SPENDING,
  };
};

///////////////////////////////////////////////

export const deleteSpending = () => {
  return {
    type: Action.DELETE_SPENDING,
  };
};

///////////////////////////////////////////////

export const deleteEarning = () => {
  return {
    type: Action.DELETE_EARNING,
  };
};

///////////////////////////////////////////////

export const updateSpending = () => {
  return {
    type: Action.UPDATE_SPENDING,
  };
};

////////////////////////////////////////////////

export const updateEarning = () => {
  return {
    type: Action.UPDATE_EARNING,
  };
};

export const fetchSE = () => {
  return {
    type: Action.FETCH_ALL_SE,
  };
};

export const insertSpending = data => {
  return {
    type: Action.INSERT_SPENDING,
    data: data,
  };
};

export const fetchCustomData = data => {
  return {
    type: Action.FETCH_CUSTOMDATA,
    data: data,
  };
};

/////////////////////////////
// screen list custom
export const fetchListCustomAction = () => {
  console.log('FETCH_LIST_CUSTOM');
  return {
    type: Action.FETCH_LIST_CUSTOM,
  };
};

// screen update custom
export const updateCustomAction = obj => {
  console.log('updateCustomAction run');
  return {
    type: Action.UPDATE_CUSTOM,
    obj,
  };
};

export const deleteCustomAction = id => {
  console.log('deleteCustomAction ', id);
  return {
    type: Action.DELETE_CUSTOM,
    id,
  };
};

// Screen add custom

export const addCustomAction = newCustom => {
  return {
    type: Action.ADD_CUSTOM,
    newCustom,
  };
};

// Screen list product

export const fetchListProductAction = () => {
  return {
    type: Action.FETCH_LIST_PRODUCT,
  };
};

// Screen edit product

export const addProductAction = obj => {
  return {
    type: Action.ADD_PRODUCT,
    obj,
  };
};

export const updateProductAction = obj => {
  return {
    type: Action.UPDATE_PRODUCT,
    obj,
  };
};

export const deleteProductAction = id => {
  return {
    type: Action.DELETE_PRODUCT,
    id,
  };
};

// ADD PLACE
export const addPlaceAction = newPlace => {
  return {
    type: Action.ADD_PLACE,
    newPlace,
  };
};

// delete place

export const deletePlaceAction = id => {
  return {
    type: Action.DELETE_PLACE,
    id,
  };
};

export const updatePlaceAction = updatePlace => {
  return {
    type: Action.UPDATE_PLACE,
    updatePlace,
  };
};
