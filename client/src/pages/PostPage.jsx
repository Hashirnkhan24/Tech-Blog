import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Spinner } from 'flowbite-react'
import { CommentSection } from '../components'
// import { CallToAction } from '../components'

function PostPage() {
    const { postSlug } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [post, setPost] = useState(null)

    useEffect(() => {
        const fetchPost = async() => {
            try {
                    setLoading(true)
                    const res = await fetch(`/api/post/getposts?slug=${postSlug}`)
                    const data = await res.json()
                    if(!res.ok) {
                        setError(true)
                        setLoading(false)
                        return
                    }
                    if(res.ok) {
                        setPost(data.posts[0])
                        setError(false)
                        setLoading(false)
                    }
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchPost()
    }, [postSlug])
    
    if (loading) return (
        <div className='flex items-center justify-center min-h-screen'>
            <Spinner size={"xl"} />
        </div>
    );
    return (
        <main className='p-3 flex flex-col min-h-screen w-full max-w-7xl mx-auto'>
            <h1 className='text-3xl mt-10 p-3 text-center font-sans font-bold max-w-3xl mx-auto lg:text-4xl'>{post && post.title}</h1>
            <Link to={`/search?category=${post && post.category}`} className='self-center m-5'>
                <Button pill size={"xs"} className=' bg-gradient-to-tl from-red-700 via-red-600 to-red-800'>{post && post.category}</Button>
            </Link>
            <img src={post && post.image} alt={post.title} className='max-w-full px-10 sm:px-32 self-center rounded-sm object-cover h-auto max-h-[800px]'/>
            <div className='flex justify-between items-center px-12 sm:px-36 py-3 border-b border-slate-400 dark:border-slate-200'>
                <span className='font-mono'>{post && new Date(post.createdAt).toLocaleDateString()}</span>
                <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
            </div>
            <div className='max-w-4xl self-center post-content p-3 my-3' dangerouslySetInnerHTML={{__html: post && post.content}}>
            </div>
            {/* <div className='max-w-4xl mx-auto w-full'>
                <CallToAction />
            </div> */}
            <CommentSection postId={post._id} />
        </main>
    )
}

export default PostPage