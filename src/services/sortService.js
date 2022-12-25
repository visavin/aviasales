export const comparePrice = (a, b) => {
  if (a.price < b.price) return -1
  if (a.price > b.price) return 1
  return 0
}

export const compareTime = (a, b) => {
  if (a.segments[0].duration + a.segments[1].duration < b.segments[0].duration + b.segments[1].duration) return -1
  if (a.segments[0].duration + a.segments[1].duration > b.segments[0].duration + b.segments[1].duration) return 1
  return 0
}

export const compareOptimal = (a, b) => {
  if (
    (a.segments[0].duration + a.segments[1].duration) * a.price <
    (b.segments[0].duration + b.segments[1].duration) * b.price
  )
    return -1
  if (
    (a.segments[0].duration + a.segments[1].duration) * a.price >
    (b.segments[0].duration + b.segments[1].duration) * b.price
  )
    return 1
  return 0
}
