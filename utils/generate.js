export const randomDartColor = () => {
  const MAX = 255
  const MIN_END = 100
  const MAX_START = 180
  let res = []
  let isPresence = false
  for (let index = 0; index < 3; index++) {
    let r
    if ((Math.random() > 0.5 && !isPresence) || (!isPresence && index === 2)) {
      r = random(MAX - MAX_START) + MAX_START
      isPresence = true
    } else {
      r = random(MIN_END)
    }
    res.push(r)
  }
  return res
}

export const random = (factor = 1) => {
  return Math.floor(Math.random() * factor)
}
