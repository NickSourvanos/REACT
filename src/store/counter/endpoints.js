import {axiosAuth} from '../../helpers'

export const signin = (username, password) => 
    axiosAuth
        .post('/signin/',{
            email:username,
            password
        })
        .then(
            res => res.data,
            e => { throw new Error('Failed to login.') }
        )