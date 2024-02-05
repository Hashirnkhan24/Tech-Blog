import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react"
import { HiArrowSmRight, HiUser } from "react-icons/hi"
import { Link, useLocation } from "react-router-dom"

function DashSidebar() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        setTab(tabFromUrl)
    }, [location.search])
    return (
        <Sidebar className="w-full md:w-56">
            <Sidebar.ItemGroup>
                <Link to="/dashboard?tab=profile" >
                <Sidebar.Item active={tab === "profile"} icon={HiUser} label={"User"} labelColor="dark" as="div">
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar>
    )
}

export default DashSidebar