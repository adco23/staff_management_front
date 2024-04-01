import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className='h-max mt-10 flex flex-col items-center w-full cursor-default font-poppins font-bold select-none drop-shadow-xl'>
      <FontAwesomeIcon icon={faLock} className='text-9xl text-hawkes-blue-500'/>
      <h1 className='text-9xl text-hawkes-blue-500'>401</h1>
      <h2 className='text-6xl text-hawkes-blue-500'>Unauthorized</h2>
      <div className="">
                <button onClick={goBack}>Go Back</button>
            </div>
    </section>
  )
}

export default Unauthorized