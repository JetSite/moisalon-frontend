const nameRedact = str => {
  if (!str) return ''
  if (str.includes('@')) {
    let arr = str.split('')
    let newStr = ''
    for (let i = 0; i < arr.length; i++) {
      if (i < 2) {
        newStr += arr[i]
      } else {
        newStr += '*'
      }
    }
    return newStr
  } else if (str.includes('+') || str.includes('8') || str.includes('9')) {
    let arr = str.split('')
    let newStr = ''
    for (let i = 0; i < arr.length; i++) {
      if (i === arr.length - 2 || i === arr.length - 1) {
        newStr += arr[i]
      } else {
        newStr += '*'
      }
    }
    return newStr
  } else {
    return str
  }
}

export default nameRedact
