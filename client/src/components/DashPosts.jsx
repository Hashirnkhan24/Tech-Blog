import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Button, Table } from 'flowbite-react'
import { Link } from 'react-router-dom'

function DashPosts() {
    const [userPosts, setUserPosts]  = useState([])
    const [showMore, setShowMore] = useState(true)
    const { currentUser } = useSelector((state) => state.user)
    
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if(res.ok) {
                    setUserPosts(data.posts)
                    if(data.posts.length < 9) {
                        setShowMore(false)
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        if(currentUser.isAdmin) {
            fetchPosts()
        }

    }, [currentUser._id, currentUser.isAdmin])
    
    const handleShowMore = async() => {
        const startIndex = userPosts.length
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`)
            const data = await res.json()
            if(res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts])
                if(data.posts.length < 9) {
                    setShowMore(false)
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 m-2 scrollbar-track-slate-100 scrollbar">
            {currentUser.isAdmin && userPosts.length > 0 
            ? <>
                <Table hoverable className="shadow-md h-screen">
                    <Table.Head>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Date Updated</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Post Image</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Post Title</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Category</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}>Delete</Table.HeadCell>
                        <Table.HeadCell style={{borderRadius : "2px"}}><span>Edit</span></Table.HeadCell>
                    </Table.Head>
                    {userPosts.map((post) => (
                        <Table.Body key={post._id} >
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-slate-800 " >
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    {new Date(post.updatedAt).toLocaleDateString()}
                                </Table.Cell >
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    <Link to={`/post/${post.slug}`}>
                                        <img src={post.image} alt={post.title} className="w-20 h-12 object-cover" />
                                    </Link>
                                </Table.Cell >
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    <Link to={`/post/${post.slug}`}>
                                        <h1 className="text-md font-medium dark:text-gray-100">{post.title}</h1>
                                    </Link>
                                </Table.Cell>
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    {post.category}
                                </Table.Cell>
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    <span className="text-red-500 font-medium hover:underline hover:cursor-pointer">Delete</span>
                                </Table.Cell>
                                <Table.Cell style={{borderRadius : "2px"}}>
                                    <Link to={`/update-post/${post._id}`}>
                                        <span className="text-blue-500 font-medium hover:underline">Edit</span>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
                {showMore && (
                    <button onClick={handleShowMore} className="w-full self-center text-blue-500 py-4 text-md hover:underline">Show More</button>
                )}
            </>
            : (<p>You have no posts yet</p>)
        }
        </div>
    )
}

export default DashPosts