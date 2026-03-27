export const isAdmin = () => {
  return !!localStorage.getItem('token')
}
