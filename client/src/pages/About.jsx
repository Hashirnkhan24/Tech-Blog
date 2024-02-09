export default function About() {
    return (
        <div className="relative flex flex-col gap-6 w-full px-6 items-center justify-center mx-auto mb-4 h-screen bg-black">
                <img className="absolute inset-0 object-cover w-full h-full z-0 opacity-20 dark:opacity-10" src="https://cdn.pixabay.com/photo/2015/05/31/10/55/man-791049_1280.jpg" alt="blog-image" />
                <div className="relative z-10 flex flex-col gap-4 justify-center items-center">
                    <h1 className="text-3xl font-bold md:text-5xl mb-6 text-white self-center text-center">About Tech Blog</h1>
                    <p className="text-md text-gray-200 font-semibold md:text-md text-justify sm:text-center max-w-4xl">Welcome to TechBlog, your go-to destination for all things technology and full-stack development! Whether you're a seasoned developer looking to stay updated on the latest trends or a curious enthusiast eager to explore the wonders of the digital world, we've got you covered. From in-depth tutorials on mastering programming languages to insightful analyses of cutting-edge technologies shaping our future, TechBlog is your ultimate resource for staying ahead in the rapidly evolving tech landscape. Join us on this exciting journey as we delve into the realms of artificial intelligence, blockchain, cybersecurity, and everything in between. Let's embark on a quest to unlock the limitless possibilities of the digital age together!
                    </p>
                </div>
            </div>
    )
}
