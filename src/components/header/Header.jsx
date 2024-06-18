
import './header.css'
import logoImg from '/src/assets/star-medal.jpg'

function Header() {

  return (
    <>
      <div className='logo-container'>
        <img src={logoImg} alt="Star Medal" />
      </div>
      <div className='title'>
        <h1>KUDOSBOARD</h1>
      </div>
    </>
  )
}

export default Header
