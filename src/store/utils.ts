export const getStoreData = <Type>(state: { data: Type }) => state.data

export const getStoreEvent = <Type>(state: Type) => state

// export const getStoreData = <Type>useShallow<{ data: Type }>(state => {
//   state.data
// })
