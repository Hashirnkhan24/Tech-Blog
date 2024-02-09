import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostCard } from '../components'
import { Button } from 'flowbite-react'


export default function Articles() {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const fetchPosts = async() => {
            const res = await fetch(`/api/post/getposts`)
            const data = await res.json()
            setPosts(data.posts)
        }
        fetchPosts()
    }, [])
    return (
        <div className='flex flex-col items-center justify-center gap-3 m-4'>
            <div className="w-full max-w-7xl flex flex-wrap mx-auto">
                {
                    posts.map((post) => (
                        <PostCard className="self-center" key={post._id} post={post}/>
                    ))
                }

            </div>
            <Link to={"/search"} className='mb-4'>
                <Button style={{borderRadius: "2px"}} className='bg-gradient-to-tl from-red-700 via-red-500 to-red-600 hover:from-slate-700 hover:via-slate-600 hover:to-slate-800 w-32'>See all posts</Button>
            </Link>
        </div>
    )
}
