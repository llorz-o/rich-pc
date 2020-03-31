export const createTime = (time) => {
  time = time || new Date()
  let [hours, millisecond, second] = time
    .toTimeString()
    .slice(0, 8)
    .split(':')

  let year = time.getFullYear(),
    month = time.getMonth() + 1,
    day = time.getDate()

  return {
    year,
    month,
    day,
    hours,
    millisecond,
    second
  }
}
