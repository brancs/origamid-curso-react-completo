import React from 'react'
import styles from './PhotoCommentsForm.module.css'
import { COMMENT_POST } from '../../Api'
import { ReactComponent as Enviar } from '../../Assets/enviar.svg'
import useFetch from '../../Hooks/useFetch'
import Error from '../Helper/Error'

const PhotoCommentsForm = ({id, setComments, single}) => {
  const token = window.localStorage.getItem('USER_TOKEN')
  const {error, request} = useFetch()
  const [comment, setComment] = React.useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const {url, options} = COMMENT_POST(id, token, {comment})
    const {response, json} = await request(url, options)
    if (response.ok) {
      setComment('')
      setComments((comments) => [...comments, json])
    }
  }

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea id='comment' name='comment' placeholder='Escreva seu comentário' className={styles.textarea} value={comment} onChange={({target}) => setComment(target.value)} />
      <button className={styles.button}><Enviar /></button>
      <Error error={error} />
    </form>
  )
}

export default PhotoCommentsForm