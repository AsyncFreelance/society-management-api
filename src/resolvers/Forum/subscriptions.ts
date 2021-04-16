export const constants = {
    "MESSAGE_UPDATED": "MESSAGE_UPDATED",
}

export const getSubscriber = (pubsub: any) => {
    return () => pubsub.asyncIterator([constants.MESSAGE_UPDATED])
}