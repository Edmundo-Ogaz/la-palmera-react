export const getSession = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || null)
  return session || null
}

export const getUser = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || null)
  if (session) return session.user || null
  else return null;
}

export const getToken = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || null)
  if (session) return session.token || null
  else return null
}

export const getEspiration = () => {
  const session = JSON.parse(sessionStorage.getItem('session') || null)
  if (session) return session.expiration || null
  else return null
}

export const removeSession = () => {
  sessionStorage.removeItem('session');
}

export const setUserSession = (token, user, expiration) => {
  sessionStorage.setItem('session', JSON.stringify({ token, user: JSON.stringify(user), expiration }))
}