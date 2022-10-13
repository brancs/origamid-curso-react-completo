import React from 'react'
import styles from './FeedPhotos.module.css'
import useFetch from '../../Hooks/useFetch'
import FeedPhotoItem from './FeedPhotoItem'
import { PHOTOS_GET } from '../../Api'
import Error from '../Helper/Error'
import Loading from '../Helper/Loading'

const FeedPhotos = ({page, user, setModalPhoto, setInfinite}) => {
  const {data, error, loading, request} = useFetch()

  React.useEffect(() => {
    const total = 6
    async function fetchPhotos() {
      const {url, options} = PHOTOS_GET({page, total, user})
      const {response, json} = await request(url, options)
      
      if (response && response.ok && json.length < total) {
        setInfinite(false)
      }
    }

    fetchPhotos()
  }, [request, user, page, setInfinite])

  if (error) {
    return <Error error={error} />
  }

  if (loading) {
    return <Loading />
  }

  if (data) {
    return (
      <ul className={`animationLeft ${styles.feed}`}>
        {data.map((photo) => <FeedPhotoItem key={photo.id} photo={photo} setModalPhoto={setModalPhoto} />)}
      </ul>
    )
  } else {
    return null
  }
}

export default FeedPhotos