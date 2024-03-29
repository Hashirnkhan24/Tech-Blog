import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiArrowSmRight, HiChat, HiDocumentSearch, HiDocumentText, HiUser, HiUserGroup } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"
import { signOutSuccess } from "../redux/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

function DashSidebar() {
    const { currentUser } = useSelector((state) => state.user)
    const location = useLocation()
    const dispatch = useDispatch()
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        setTab(tabFromUrl)
    }, [location.search])

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

    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.ItemGroup className="flex flex-col gap-2">
                <Link to="/dashboard?tab=profile" >
                <Sidebar.Item active={tab === "profile"} icon={HiUser} label={currentUser.isAdmin ? "Admin" : "User"} labelColor="dark" as="div">
                    Profile
                </Sidebar.Item>
                </Link>
                {currentUser.isAdmin && 
                <>  
                    <Link to="/dashboard?tab=posts" >
                    <Sidebar.Item active={tab === "posts"} icon={HiDocumentText} as="div">
                        Posts
                    </Sidebar.Item>
                    </Link>

                    <Link to="/dashboard?tab=dash" >
                    <Sidebar.Item active={tab === "dash" || !tab} icon={HiDocumentSearch} as="div">
                        Dashboard
                    </Sidebar.Item>
                    </Link>

                    <Link to="/dashboard?tab=users" >
                    <Sidebar.Item active={tab === "users"} icon={HiUserGroup} as="div">
                        Users
                    </Sidebar.Item>
                    </Link>

                    <Link to="/dashboard?tab=comments" >
                    <Sidebar.Item active={tab === "comments"} icon={HiChat} as="div">
                        Comments
                    </Sidebar.Item>
                    </Link>
                </>
                }
                <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut} className="cursor-pointer" >
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar>
    )
}

export default DashSidebar