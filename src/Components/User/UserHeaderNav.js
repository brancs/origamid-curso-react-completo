import React from 'react'
import styles from './UserHeaderNav.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { ReactComponent as MinhasFotos } from '../../Assets/feed.svg'
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg'
import { ReactComponent as AdicionarFotos } from '../../Assets/adicionar.svg'
import { ReactComponent as Sair } from '../../Assets/sair.svg'
import useMedia from '../../Hooks/useMedia'

const UserHeaderNav = () => {
  const {userLogout} = React.useContext(UserContext)
  const mobile = useMedia('(max-width: 40rem)')
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const {pathname} = useLocation()

  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {mobile && <button aria-label='menu' className={`${styles.mobileButton} ${mobileMenuOpen && styles.mobileButtonActive}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}></button>}
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenuOpen && styles.navMobileActive}`}>
        <NavLink to={'/conta'} end>
          <MinhasFotos />
          {mobile && 'Minhas fotos'}
        </NavLink>
        <NavLink to={'/conta/estatisticas'}>
          <Estatisticas />
          {mobile && 'Estatísticas'}
        </NavLink>
        <NavLink to={'/conta/postar'}>
          <AdicionarFotos />
          {mobile && 'Adicionar foto'}
        </NavLink>
        <button onClick={userLogout}>
          <Sair />
          {mobile && 'Sair'}
        </button>
      </nav>
    </>
  )
}

export default UserHeaderNav