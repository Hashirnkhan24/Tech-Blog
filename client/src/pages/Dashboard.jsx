import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DashProfile, DashSidebar, DashPosts, DashUsers, DashComments, DashBoardComp } from '../components'

export default function Dashboard() {
    const location = useLocation()
    const [tab, setTab] = useState('')

    useEffect(() =>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        console.log(tabFromUrl);
        setTab(tabFromUrl)
    }, [location.search])
    
    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* sidebar */}
                <DashSidebar />
            </div>
            {/* profile */}
            {tab === 'profile' && <DashProfile />}
            {/* posts */}
            {tab === 'posts' && <DashPosts />}
            {/* users */}
            {tab === 'users' && <DashUsers />}
            {/* comments */}
            {tab === 'comments' && <DashComments />}
            {/* dashboard */}
            {(tab === 'dash' || !tab) && <DashBoardComp />}
        </div>
    )
}
