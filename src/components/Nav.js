import {useCallback, useContext} from 'react'
import { Navbar, Dropdown } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import logoImage from '../assets/images/moringalogo.png'
import Swal from 'sweetalert2'

function Nav() {
  const {currentUser, setCurrentUser, setAuthToken, apiEndpoint} = useContext(UserContext)
  const navigate = useNavigate()


  const logout = useCallback(()=> {
    fetch(`${apiEndpoint}/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    }).then((response) => {
      if (response.ok) {
        sessionStorage.removeItem('authToken')
        setCurrentUser(null)
        setAuthToken(null)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout successful',
          showConfirmButton: false,
          timer: 1500,
        })
        navigate('/')
      } else {
            navigate('/')
            sessionStorage.removeItem('authToken')
            setCurrentUser(null)
            setAuthToken(null)
    }
    })
  },[navigate, apiEndpoint, setAuthToken, setCurrentUser])

  return (
    <header className="shadow-bs-light">
      <Navbar className="-full mx-auto max-w-7xl" fluid rounded>
        <Navbar.Brand className="mr-auto">
        <img
        src={logoImage}
        alt="M.A.S Logo"
        // className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        style={{ maxHeight: '40px' }}
      />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <img
                alt="User settings"
                src={
                  currentUser?.avatar_url
                    ? `${apiEndpoint}/${currentUser.avatar_url}`
                    : `${apiEndpoint}/media/blank-profile-picture.webp`
                }
                className="rounded w-8 h-8 object-cover object-top"
              />
            }>
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">
                {currentUser?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Link to="/profile">Profile</Link>
            </Dropdown.Item>
          </Dropdown>
          <button
            onClick={logout}
            className="text-blue-800 font-semibold border-l-2 border-neutral-300 pl-2 ml-2 font-poppins">
            Logout
          </button>
          {/* <Navbar.Toggle /> */}
        </div>
        <Navbar.Collapse>
          {/* <Navbar.Link
            className="ml-auto hover:bg-orange-200 hover:text-m-orange"
            href="#">
            Students
          </Navbar.Link> */}
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Nav
