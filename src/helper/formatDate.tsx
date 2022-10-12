export const formatDate = (date: Date) => {
  if (date) {
    const stringDate = date.toString()
    const newDate = stringDate.substring(0, 10).split('-').reverse().join("-")

    return newDate
  }
}