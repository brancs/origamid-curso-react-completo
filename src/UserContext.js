import React from 'react'
import { TOKEN_POST, TOKEN_VALIDATE, USER_GET } from './Api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({children}) => {
  const [data, setData] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const navigate = useNavigate()

  const userLogout = React.useCallback(async function () {
    setLogin(false)
    setData(null)
    setError(null)
    setLoading(false)
    window.localStorage.removeItem('USER_TOKEN')
    navigate('/login')
  }, [navigate])

  async function getUser(token) {
    const {url, options} = USER_GET(token);
    const response = await fetch(url, options)
    const json = await response.json()
    setData(json)
    setLogin(true)
  }

  async function userLogin(username, password) {
    try {
      setError(null)
      setLoading(true)
      const {url, options} = TOKEN_POST({username, password});
      const tokenResponse = await fetch(url, options);
      if (!tokenResponse.ok) {
        throw new Error(`Erro: ${tokenResponse.statusText}`)
      }
      const { token } = await tokenResponse.json();
      window.localStorage.setItem('USER_TOKEN', token)
      await getUser(token)
      navigate('/conta')
    } catch (exception) {
      setError(exception.message)
      setLogin(false)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('USER_TOKEN')
      if (token) {
        try {
          setError(null)
          setLoading(true)
          const {url, options} = TOKEN_VALIDATE(token);
          const response = await fetch(url, options)
          
          if (!response.ok) {
            throw new Error('Token inválido')
          }
          
          await getUser(token)
        } catch (exception) {
          setError(exception.message)
          userLogout()
        } finally {
          setLoading(false)
        }
      } else {
        setLogin(false)
      }
    }
    autoLogin()
  }, [userLogout])

  return (
    <UserContext.Provider value={{ userLogin, userLogout, data, error, loading, login }}>
      {children}
    </UserContext.Provider>
  )
}