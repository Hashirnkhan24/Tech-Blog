import { Button, Select, TextInput, Spinner } from "flowbite-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate} from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { PostCard } from "../components"

function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    })
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                category: categoryFromUrl,
                sort: sortFromUrl,
            })
        }
        const fetchPosts = async() => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/post/getposts?${searchQuery}`)
            if(res.ok) {
                const data = await res.json()
                setPosts(data.posts)
                setLoading(false)
                if(data.posts.length === 9) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
            }
        }
        fetchPosts()
    }, [location.search])

    const handleChange = (e) => {
        if(e.target.id === 'searchTerm') {
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }
        if(e.target.id === 'sort') {
            const order = e.target.value || 'desc'
            setSidebarData({...sidebarData, sort: order})
        }
        if(e.target.id === 'category') {
            const category = e.target.value || 'uncategorized'
            setSidebarData({...sidebarData, category: category})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('category', sidebarData.category)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const handleShowMore = async() => {
        const numberOfPosts = posts.length
        const startIndex = numberOfPosts
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/post/getposts?${searchQuery}`)
        if(!res.ok) {
            return
        }
        if(res.ok) {
            const data = await res.json()
            setPosts([...posts, ...data.posts])
            if(data.posts.length === 9) {
                setShowMore(true)
            } else {
                setShowMore(false)
            }
        }
    }
    return (
        <div className="flex flex-col md:flex-row">
            <div className="border-b p-7 md:border-r md:min-h-screen border-slate-400 dark:border-slate-500 bg-gray-100 dark:bg-slate-800">
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2">
                        <label htmlFor="Search" className="whitespace-nowrap font-semibold">Search Term:</label>
                        <TextInput 
                            placeholder="Search..."
                            rightIcon={AiOutlineSearch}
                            type="text"
                            id="searchTerm"
                            style={{borderRadius: "2px"}}
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <label htmlFor="Sort" className="whitespace-nowrap font-semibold">Sort:</label>
                        <Select 
                            style={{borderRadius: "2px"}} 
                            className="w-full"
                            onChange={handleChange}
                            id="sort"
                            value={sidebarData.sort}
                            >
                            <option value="desc">Latest</option>
                            <option value="asc">Oldest</option>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <label htmlFor="Category" className="whitespace-nowrap font-semibold">Category:</label>
                        <Select 
                            style={{borderRadius: "2px"}} 
                            className="w-full"
                            onChange={handleChange}
                            id="category"
                            value={sidebarData.category}
                            >
                            <option value="uncategorized">Uncategorized</option>
                            <option value="nextjs">Next JS</option>
                            <option value="reactjs">React JS</option>
                            <option value="javascript">Javascript</option>
                            <option value="nodejs">Node JS</option>
                        </Select>
                    </div>
                    <Button type="submit" style={{borderRadius: "2px"}} className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700">Search</Button>
                </form>
            </div>
            <div className="w-full">
                <h1 className="self-center text-center sm:text-left text-2xl sm:text-3xl font-semibold sm:border-b px-3 pb-4 mt-4 border-gray-400">Post Results</h1>
                <div className="p-7 flex flex-wrap gap-4 max-w-4xl mx-auto ">
                    {
                        !loading && posts.length === 0 && (
                            <p className="text-xl text-gray-500">No posts found.</p>
                        )
                    }
                    {
                        loading && (
                            <div className='flex items-center justify-center min-h-screen w-full'>
                                <Spinner size={"sm"} /> 
                                <span className="px-3 text-md">Loading...</span>
                            </div>
                        )
                    }
                    {
                        !loading && posts && (
                            posts.map((post) => <PostCard key={post._id} post={post} />)
                        )
                    }
                    {
                        showMore && (
                            <button 
                                onClick={handleShowMore}
                                className="text-md font-medium text-blue-500 dark:text-blue-400 hover:underline w-full">
                                Show More
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Search