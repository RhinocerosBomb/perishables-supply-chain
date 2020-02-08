const bytesStringSplit = byteString => {
  let newByteString = byteString.slice(2)
  return newByteString.match(/.{1,16}/g)
}

const byteStringSplitItem = (byteStrings, fields) => {
  let start = 0
  const newByteStrings = byteStrings.map(byteString => {
    let item = {}
    Object.keys(fields).forEach((field, i) => {
      const index = fields[field]
      const bytes = byteString.substring(start, start + index)
      start = index
      item[field] = '0x' + bytes
    })
    return item
  })

  return newByteStrings
}

export default { bytesStringSplit, byteStringSplitItem }
