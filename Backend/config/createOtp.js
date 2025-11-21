export const createOtp = () => {
  return Math.floor(10000 + Math.random()*90000)
}