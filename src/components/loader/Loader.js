import loadingImg from '../../assets/loading.jpg'
import LoadingSass from './Loader.module.sass'
import ReactDOM from 'react-dom'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={LoadingSass.wrapper}>
        <div className={LoadingSass.loader}>
        <img src={loadingImg} alt='Loading' />
        </div>
    </div>,
    document.getElementById('loader')
  )
}

export default Loader
