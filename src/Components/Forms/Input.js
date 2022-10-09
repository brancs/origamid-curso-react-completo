import React from 'react'
import styles from './Input.module.css'

const Input = ({name, label, type, value, onChange, onBlur, error}) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>{ label }</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur} className={styles.input} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default Input