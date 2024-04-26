export const getStoreData = <Type>(state: { data: Type }) => state.data

export const getStoreEvent = <Type>(state: Type) => state
