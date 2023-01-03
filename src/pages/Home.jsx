import { useState,useEffect } from 'react'
import supabase from '../config/supabaseConfig'
import SmoothieCard from '../components/SmoothieCard'

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data: read_smoothies, error } = await supabase
        .from('smoothies')
        .select('*')

      if (error) {
        setFetchError("Couldn't find smoothies")
        setSmoothies(null)
        console.error(error)
      }
      if (read_smoothies) {
        setSmoothies(read_smoothies)
        setFetchError(null)
      }
    }
    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      { fetchError && (<p>{ fetchError }</p>) }
      { smoothies && (
        <div className='smoothies'>
          {/* Order By Buttons */}
          <div className="smoothie-grid">
            { smoothies.map(smoothie => (
              <SmoothieCard key={ smoothie.id } smoothie={ smoothie } />
            )) }
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
