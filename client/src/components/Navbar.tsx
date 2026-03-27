import { useNavigate } from 'react-router-dom'
import { isAdmin } from '../lib/auth.ts'

const Navbar = () => {
  const navigate = useNavigate()

    return (
      <div className={'flex justify-between w-full'}>
        <div className={'nav-title'}>
          <h2 className={'text-3xl font-bold cursor-pointer text-green-800'}>
            Janni
          </h2>
        </div>
        <div
          className={'flex flex-row gap-8 justify-center items-center h-full'}
        >
          <div className={'nav-items'}>
            <h2 onClick={() => navigate('/explore')}>Explore</h2>
          </div>
          {isAdmin() && (
            <div className={'nav-items'}>
              <h2 onClick={() => navigate('/create')}>Create</h2>
            </div>
          )}
        </div>
      </div>
    )
}
export default Navbar
