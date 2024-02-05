import { useSelector } from "react-redux"
import { Button, TextInput } from "flowbite-react"
function DashProfile() {
    const { currentUser } = useSelector((state) => state.user)

    return (
        <div className="max-w-lg mx-auto w-full">
            <h1 className="mb-6 mt-8 text-2xl text-center font-semibold">Profile</h1>
            <form className="flex flex-col gap-2">
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mb-4">
                    <img src={currentUser.profilePicture} alt="user" className="rounded-full border-4 border-gray-200 object-cover w-full h-full" />
                </div>
                <TextInput 
                    type="text" 
                    placeholder="username" 
                    id="username" 
                    defaultValue={currentUser.username} 
                    style={{borderRadius: "2px"}}
                    className="shadow-md"
                />
                <TextInput 
                    type="email" 
                    placeholder="email" 
                    id="email" 
                    defaultValue={currentUser.email} 
                    style={{borderRadius: "2px"}}
                    className="shadow-md"
                />
                <TextInput 
                    type="password" 
                    placeholder="password"  
                    id="password" 
                    style={{borderRadius: "2px"}}
                    className="shadow-md"
                />
                <Button type="submit" className="rounded-sm bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 hover:bg-gradient-to-r hover:from-red-800 hover:via-red-700 hover:to-red-800 mt-2" >Update</Button>
            </form>
            <div className="flex justify-between text-red-500 mt-3">
                <span className="hover:underline">Delete Account</span>
                <span className="hover:underline">Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile