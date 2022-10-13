import React from 'react'
import Image from '../Helper/Image'
import styles from './FeedPhotosItem.module.css'

const FeedPhotoItem = ({photo, setModalPhoto}) => {
  
  function handleClick() {
    setModalPhoto(photo)
  }

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image alt={photo.title} src={photo.src} />
      <span className={styles.views}>{photo.acessos}</span>
    </li>
  )
}

export default FeedPhotoItem