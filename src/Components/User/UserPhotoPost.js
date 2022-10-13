import React from 'react'
import styles from './UserPhotoPost.module.css'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import {PHOTO_POST} from "../../Api"
import Error from '../Helper/Error'
import { useNavigate } from 'react-router-dom'
import Head from "../Helper/Head";

const UserPhotoPost = () => {
  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [img, setImg] = React.useState({})
  const {data, error, loading, request} = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) {
      navigate('/conta')
    }
  }, [data, navigate])

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)
    formData.append('img', img.raw)
    const token = window.localStorage.getItem('USER_TOKEN')
    const {url, options} = PHOTO_POST(token, formData)
    request(url, options)
  }

  function handleOnChange({target}) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0]
    })
  }

  return (
    <section className={`${styles.photoPost} animationLeft`}>
      <Head title={"Poste sua foto"} />
      <form onSubmit={handleSubmit}>
        <Input label={'Nome'} type={'text'} name={'nome'} {...nome} />
        <Input label={'Peso'} type={'number'} name={'peso'} {...peso} />
        <Input label={'Idade'} type={'number'} name={'idade'} {...idade} />
        <input type="file" name='img' id='img' className={styles.img} onChange={handleOnChange} />
        {loading ? <Button disabled>Postando...</Button> : <Button>Postar</Button>}
        <Error error={error} />
      </form>
      <div>
        {img.preview && <div className={styles.preview} style={{backgroundImage: `url('${img.preview}')`}}></div>}
      </div>
    </section>
  )
}

export default UserPhotoPost