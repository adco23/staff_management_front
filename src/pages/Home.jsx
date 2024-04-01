import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
  return (
    <section className='h-max mt-10 flex flex-col items-center w-full cursor-default font-poppins font-bold select-none drop-shadow-xl'>
      <FontAwesomeIcon icon={faHouse} className='text-9xl text-hawkes-blue-500'/>
      <h2 className='text-6xl text-hawkes-blue-500'>Welcome</h2>
    </section>
  )
}

export default Home