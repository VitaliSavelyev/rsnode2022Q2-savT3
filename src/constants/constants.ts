export const HTTP_STATUS_CODE = {
    ERROR: {
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        INTERNAL_SERVER_ERROR: 500
    },
    COMPLETE: {
        OK: 200,
        CREATED: 201,
        NO_CONTENT: 204,
    }
}

export const ERROR_MESSAGE = {
    NOT_FOUND: {
        PAGE: () => ({ message: 'Page not found' }),
        ELEM_ID: (id: string) => ({ message: `Your id (${id}) not found` })
    },
    BAD_REQUEST: {
        VALID_ID: (id:string) => ({message: `Your id (${id}) not valid`}),
        VALID_ELEM: () => ({message: `Your request has not all required field`}),
        VALID_TYPE_ELEM: () => ({message: `Your request has not valid type field`})
    } ,
    INTERNAL_SERVER_ERROR: () => ({ message: 'The page cannot be displayed because an internal server error has occurred' })
}
