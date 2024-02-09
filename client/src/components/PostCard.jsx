import { Link } from "react-router-dom"

function PostCard({post}) {
    return (
        <div className="group relative max-w-4xl w-full border border-gray-200 dark:border-gray-700 shadow-md m-3 hover:border-2 h-[350px] overflow-hidden rounded-lg sm:w-[380px] transition-all">
            <Link to={`/post/${post.slug}`} >
                <img src={post.image} alt="post cover" className="sm:h-[260px] h-[220px] mb-2 w-full object-cover bg-gray-500 group-hover:h-[200px] group-hover:opacity-40 transition-all duration-200 z-20" />
            </Link>
            <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold text-center self-center">{post.title}</p>
                <span className=" italic text-sm self-center">{post.category}</span>
                <Link className="z-10 group-hover:bottom-6 absolute bottom-[-200px] left-0 right-0 border border-blue-500 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white transition-all duration-200 text-center py-2 rounded-sm !rounded-tl-none m-2" to={`/post/${post.slug}`}>
                    Read Article
                </Link>
            </div>
        </div>
    )
}

export default PostCard