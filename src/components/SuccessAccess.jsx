import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const SuccessAccess = () => {
  return (
    <section className='h-max mt-10 flex flex-col items-center w-full cursor-default font-poppins font-bold select-none drop-shadow-xl'>
      <FontAwesomeIcon icon={faCheckCircle} className='text-9xl text-hawkes-blue-500'/>
      <h1 className='text-9xl text-hawkes-blue-500'>200</h1>
      <h2 className='text-6xl text-hawkes-blue-500'>Success Access</h2>
    </section>
  )
}

export default SuccessAccess