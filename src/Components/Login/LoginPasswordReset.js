import React from 'react'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import { PASSWORD_RESET_POST } from '../../Api'
import Error from '../Helper/Error'
import { useNavigate } from 'react-router-dom'
import Head from '../Helper/Head'

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState('')
  const [key, setKey] = React.useState('')
  const {error, loading, request} = useFetch()
  const password = useForm()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    if (password.validate()) {
      const {url, options} = PASSWORD_RESET_POST({
        login, 
        key,
        password: password.value, 
      })
      const {response} = await request(url, options)
      if (response.ok) {
        navigate('/login')
      }
    }
  }

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const key = params.get('key')
    const login = params.get('login')

    if (key) {
      setKey(key)
    }

    if (login) {
      setLogin(login)
    }
  }, [])

  return (
    <section className='animationLeft'>
      <Head title={'Redefina sua senha'} />
      <h1 className='title'>Redefina a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input label={'Nova senha'} type="password" name="password" {...password} />
        {loading ? <Button disabled>Redefinindo...</Button> : <Button>Redefinir</Button>}
      </form>
      <Error error={error} />
    </section>
  )
}

export default LoginPasswordReset