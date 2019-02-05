import PATHS from '../../conf'

export const API_URL = 
    process.env.NODE_ENV === 'development'
        ? 'https://' + PATHS.HOST
        : 'https://' + PATHS.HOST_PROD

export const API_URL_AUTH = 
    process.env.NODE_ENV === 'development'
        ? 'https://' + PATHS.HOST + '/message/auth'
        : 'https://' + PATHS.HOST_PROD + '/message/auth'