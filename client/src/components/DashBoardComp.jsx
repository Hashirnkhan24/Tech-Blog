import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import { HiAnnotation, HiArrowNarrowUp, HiDocumentText, HiOutlineUserGroup } from 'react-icons/hi'
import { Table, Button } from "flowbite-react"
import { Link } from "react-router-dom"

function DashBoardComp() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthsPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUsers = async() => {
            try {
                const res = await fetch(`/api/user/getusers/?limit=5`)
                const data = await res.json()
                if(res.ok) {
                    setUsers(data.users)
                    setTotalUsers(data.totalUsers)
                    setLastMonthUsers(data.lastMonthUsers)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const fetchPosts = async() => {
            try {
                const res = await fetch(`/api/post/getposts/?limit=5`)
                const data = await res.json()
                if(res.ok) {
                    setPosts(data.posts)
                    setTotalPosts(data.totalPosts)
                    setLastMonthPosts(data.lastMonthsPosts)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        const fetchComments = async() => {
            try {
                const res = await fetch(`/api/comment/getcomments/?limit=5`)
                const data = await res.json()
                if(res.ok) {
                    setComments(data.comments)
                    setTotalComments(data.totalComments)
                    setLastMonthComments(data.lastMonthComments)
                }
            } catch (error) {
                console.log(error)
            }
        }

        if(currentUser.isAdmin) {
            fetchUsers()
            fetchPosts()
            fetchComments()
        }
    }, [currentUser])

    return (
        <div className="'p-3 mx-2 md:mx-auto w-full">
            <div className="flex flex-wrap gap-4 justify-center m-3">
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-sm shadow-md font-semibold mb-2">
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 dark:text-gray-200 text-md uppercase'>Total Users</h3>
                        <p className='text-2xl'>{totalUsers}</p>
                    </div>
                    <HiOutlineUserGroup className='bg-blue-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex  gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthUsers}
                    </span>
                    <div className='text-gray-500 dark:text-gray-200'>Last Month</div>
                </div>
            </div>
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-sm shadow-md font-semibold mb-2">
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 dark:text-gray-200 text-md uppercase'>Total Posts</h3>
                        <p className='text-2xl'>{totalPosts}</p>
                    </div>
                    <HiDocumentText className='bg-red-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex  gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthsPosts }
                    </span>
                    <div className='text-gray-500 dark:text-gray-200'>Last Month</div>
                </div>
            </div>
            <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-sm shadow-md font-semibold mb-2">
                <div className='flex justify-between'>
                    <div className=''>
                        <h3 className='text-gray-500 dark:text-gray-200 text-md uppercase'>Total Comments</h3>
                        <p className='text-2xl'>{totalComments}</p>
                    </div>
                    <HiAnnotation className='bg-green-600  text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex  gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                        <HiArrowNarrowUp />
                        {lastMonthComments}
                    </span>
                    <div className='text-gray-500 dark:text-gray-200'>Last Month</div>
                </div>
            </div>
            </div>

            <div className="grid grid-cols-1 m-3">
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-sm dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
              <h1 className='text-center p-2 text-md'>Recent Posts</h1>
              <Button className="bg-gradient-to-r from-red-700 via-red-600 to-red-700" style={{borderRadius: "2px"}}>
                <Link to={'/dashboard?tab=posts'}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell style={{borderRadius: "2px"}}>Post Cover</Table.HeadCell>
                <Table.HeadCell style={{borderRadius: "2px"}}>Title</Table.HeadCell>
              </Table.Head>
              {posts &&
                posts.map((post) => (
                  <Table.Body key={post._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img
                          src={post.image}
                          alt='user'
                          className='w-10 h-10 rounded-full bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell className="text-md font-semibold">
                        <Link to={`/post/${post.slug}`}>
                        {post.title}
                        </Link>
                        </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mx-3 mb-3">

            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-sm dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
              <h1 className='text-center p-2 text-md'>Recent users</h1>
              <Button className="bg-gradient-to-r from-red-700 via-red-600 to-red-700" style={{borderRadius: "2px"}}>
                <Link to={'/dashboard?tab=users'}>See all</Link>
              </Button>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell style={{borderRadius: "2px"}}>User image</Table.HeadCell>
                <Table.HeadCell style={{borderRadius: "2px"}}>Username & Email</Table.HeadCell>
              </Table.Head>
              {users &&
                users.map((user) => (
                  <Table.Body key={user._id} className='divide-y'>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img
                          src={user.profilePicture}
                          alt='user'
                          className='w-10 h-10 rounded-full bg-gray-500'
                        />
                      </Table.Cell>
                      <Table.Cell className="text-md font-semibold">{user.username}<br /> {user.email}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
            </div>
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-sm dark:bg-gray-800'>
            <div className='flex justify-between  p-3 text-sm font-semibold'>
              <h1 className='text-center p-2 text-md'>Recent Comments</h1>
            </div>
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell style={{borderRadius: "2px"}}>Comment Content</Table.HeadCell>
                <Table.HeadCell style={{borderRadius: "2px"}}>Likes</Table.HeadCell>
              </Table.Head>
              {comments &&
                comments.map((comment) => (
                  <Table.Body key={comment._id} className='divide-y '>
                    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className="pb-4 text-md">
                        {comment.content}
                      </Table.Cell>
                      <Table.Cell className="text-md font-semibold pb-4">
                      {comment.numberOfLikes}
                        </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
            </Table>
            </div>
            </div>
        </div>
    )
}

export default DashBoardComp