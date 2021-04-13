interface ErrorType {
    type: number
    message: string
}

export const getError = (type: number, message: string) => {
    return formatError({ type, message })
}

export const formatError = (error: ErrorType) => {
    // tslint:disable-next-line: no-console
    console.error(error)
    return { error }
}