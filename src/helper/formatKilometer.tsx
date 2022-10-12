export const formatKilometer = (kilometer: number | string = 0) => {
  const kilometer_string = kilometer.toString()

  if (kilometer_string.length < 4) {
    return kilometer_string
  } else if (kilometer_string.length === 4) {
    return addDote(kilometer_string, 1)
  } else if (kilometer_string.length === 5) {
    return addDote(kilometer_string, 2)
  } else {
    return addDote(kilometer_string, 3)
  }
}

const addDote = (kilometer, position) => {
  return kilometer.substring(0, position) + "." + kilometer.substring(position, kilometer.length)
}