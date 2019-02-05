import { createAction } from 'redux-actions'

export const clickPlus = createAction('plus one')
export const clickMinus = createAction('minus one')

// export const updatePassword = ({username, password, newPassword}) => (dispatch, getState, api) => {

//   dispatch(updatepassword())

//   return api.updatePassword(username, password, newPassword).then(res => 
//     dispatch(updatePasswordSuccess()),
//     e => dispatch(updatePasswordFailed({ message: e.message || 'Failed to update password.' }))
//   )
// }