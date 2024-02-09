import { Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostCard } from '../components'

export default function Home() {
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
        <div className='flex flex-col gap-6 items-center justify-center'>
            <div className="relative flex flex-col gap-6 w-full px-6 items-center justify-center mx-auto mb-4 h-screen bg-black">
                <img className="absolute inset-0 object-cover w-full h-full z-0 opacity-20 dark:opacity-10" src="https://img.freepik.com/free-psd/aerial-view-computer-laptop-wooden-table_53876-11990.jpg?w=1060&t=st=1707456073~exp=1707456673~hmac=597e871b64faeeda1d643a1c88509f46bf490afdee83fd536aa8f1b7cbfe024e" alt="blog-image" />
                <div className="relative z-10 flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-4xl font-bold md:text-6xl mb-8 text-white self-center text-center">Welcome to Tech Blog</h1>
                    <p className="text-md text-gray-200 font-semibold md:text-md text-justify sm:text-center max-w-4xl">Unlock the door to boundless knowledge and expertise in frontend and fullstack development, alongside cutting-edge technologies. Dive into a treasure trove of articles and tutorials, curated to empower your journey as a tech enthusiast. Embark on a transformative learning adventure right here, where innovation meets education.
                    </p>
                    <Link to={"/search"}>
                    <Button pill className='bg-gradient-to-tl from-red-700 via-red-500 to-red-600 hover:from-slate-700 hover:via-slate-600 hover:to-slate-800 w-32'>See all posts</Button>
                    </Link>
                </div>
            </div>
            <h1 className='text-2xl md:text-3xl font-semibold text-center self-center'>Recent Posts</h1>
            <div className=" mr-6 sm:mx-auto px-3 dark:bg-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
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
