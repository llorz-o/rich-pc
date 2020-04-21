export const createTime = (time) => {
  time = time || new Date()
  if (typeof time === 'string') time = new Date(time)
  if ((time).toString() === 'Invalid Date') throw new Error("createTime 需要一个合法的时间参数?:string|date")
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
