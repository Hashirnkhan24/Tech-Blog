import { Button, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"

export default function Header() {
    const path = useLocation.pathname;
    return (
        <Navbar className="border-b-2 shadow-md">
            {/* Logo */}
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 bg-gradient-to-r from-red-800 via-red-700 to-red-600 mx-1 rounded-sm">Tech</span>
                Blog
            </Link>
            {/* Search Bar */}
            <form>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                    className="hidden md:inline"
                    style={{borderRadius : '2px'}}
                />
            </form>
            <Button className="rounded-sm md:hidden" color="gray">
                <AiOutlineSearch className="w-4 h-4"/>
            </Button>
            {/* Theme Toggle Button */}
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline rounded-full bg-gradient-to-r from-red-800 to-red-600">
                    <FaMoon />
                </Button>
                {/* Sign In Button */}
                <Link to="/sign-in">
                    <Button className="rounded-sm bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-r hover:from-red-800 hover:via-red-700 hover:to-red-600">
                        Sign In
                    </Button>
                </Link>
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
