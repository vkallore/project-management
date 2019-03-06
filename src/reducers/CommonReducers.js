import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_AJAX_PROCESSING
} from '../constants/AppConstants'

const initialState = {
  modal: {
    showModal: false,
    showCloseBtn: true,
    backDrop: false,
    modalTitle: null,
    modalBody: null,
    primaryBtnText: 'Okay',
    showSecondaryBtn: false,
    secondaryBtnText: 'Cancel'
  },
  ajaxProcessing: false,
  loggedIn: false
}

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return showModal(state, action)
    case HIDE_MODAL:
      return hideModal(state, action)
    case SET_AJAX_PROCESSING:
      return setAjaxProcessing(state, action)
    default:
      return state
  }
}

/**
 * Show modal
 * @param {*} state
 * @param {*} action
 */
const showModal = (state, action) => {
  return {
    ...state,
    modal: {
      ...action.modal
    }
  }
}

/**
 * Hide modal
 * @param {*} state
 * @param {*} action
 */
const hideModal = (state, action) => {
  return {
    ...state,
    modal: initialState.modal
  }
}

/**
 * Set state as ajax processing is ON/OFF
 * @param {*} state
 * @param {*} action
 */
const setAjaxProcessing = (state, action) => {
  return {
    ...state,
    ajaxProcessing: action.ajaxProcessing
  }
}
