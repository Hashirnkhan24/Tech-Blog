import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon, FaSun } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../redux/theme/themeSlice"
import { signOutSuccess } from '../redux/user/userSlice'
import { useEffect, useState } from "react"

export default function Header() {
    const { currentUser } = useSelector(state => state.user)
    const { theme } = useSelector(state => state.theme)
    const path = useLocation.pathname;
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    
    const handleSignOut = async() => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            })
            const data = await res.json()
            if(!res.ok){
                console.log(data.message)
            } else {
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    }, [location.search])

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    return (
        <Navbar className="border-b-2 shadow-sm">
            {/* Logo */}
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 text-white bg-gradient-to-r from-red-800 via-red-700 to-red-600 mx-1 rounded-sm">Tech</span>
                Blog
            </Link>
            {/* Search Bar */}
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    className="hidden md:inline"
                    style={{borderRadius : '2px'}}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <Button onClick={() => navigate("/search")} className="rounded-sm md:hidden" color="gray">
                <AiOutlineSearch className="w-4 h-4"/>
            </Button>
            {/* Theme Toggle Button */}
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline rounded-full bg-gradient-to-r from-red-800 to-red-600" onClick={() => dispatch(toggleTheme())}>
                    {theme === "light" ? <FaSun />: <FaMoon />}
                </Button>
                {/* Sign In Button */}
                {currentUser 
                ? (<Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar 
                            alt='user'
                            img={currentUser.profilePicture}
                            rounded
                        />
                    }
                    >
                        <Dropdown.Header>
                            <span className="text-md font-bold">@{currentUser.username}</span>
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile">
                            <Dropdown.Item>
                                <span>Profile</span>
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignOut} className="cursor-pointer">
                            Sign Out
                        </Dropdown.Item>
                </Dropdown>)
                :(<Link to="/sign-in">
                    <Button className="rounded-sm bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-r hover:from-red-800 hover:via-red-700 hover:to-red-600">
                        Sign In
                    </Button>
                </Link>)}
                
                {/* Hamburger Nav */}
                <Navbar.Toggle />
            </div>
            {/* Navbar */}
            <Navbar.Collapse>
                <Navbar.Link active={path === "/"} as={'div'}>
                    <Link to="/">
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/about"}  as={'div'}>
                    <Link to="/about">
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === "/articles"}  as={'div'}>
                    <Link to="/articles">
                        Articles
                    </Link>
                </Navbar.Link>
                </Navbar.Collapse>
        </Navbar>
    )
}
