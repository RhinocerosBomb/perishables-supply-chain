const bytesStringSplit = byteString => {
  let newByteString = byteString.slice(2)
  return newByteString.match(/.{1,16}/g)
}

const byteStringSplitItem = (byteStrings, fields) => {
  const newByteStrings = byteStrings.map(byteString => {
    let start = 0
    let item = {}
    Object.keys(fields).forEach((field, i) => {
      const index = fields[field]
      const bytes = byteString.substring(start, start + index)
      start += index
      item[field] = '0x' + bytes
    })
    return item
  })

  return newByteStrings
}

export default { bytesStringSplit, byteStringSplitItem }
