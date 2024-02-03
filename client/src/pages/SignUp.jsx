import { Button, Label, TextInput } from "flowbite-react"
import { Link } from "react-router-dom"

export default function SignUp() {
    return (
        <section className="min-h-screen">
            <div className="flex flex-col p-3 max-w-3xl mx-auto sm:flex-row md:items-center">

                {/* left */}
                <div className="flex-1 mr-2 pt-32">
                    <Link to="/" className="font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-red-800 via-red-700 to-red-600 mx-1 rounded-sm text-white">Tech</span>
                        Blog
                    </Link>
                    <p className="text-sm mt-5">This a demo blog, you can signup using email and password or sign up with Google.</p>
                </div>
                {/* right */}
                <div className="flex-1 ml-2 pt-32">
                    <form className="flex flex-col gap-4">
                        <div>
                            <Label value="Username"/>
                            <TextInput 
                                type="text" 
                                placeholder="Username"
                                id="username"
                                style={{borderRadius: "2px"}}
                            />
                        </div>
                        <div>
                            <Label value="Email"/>
                            <TextInput 
                                type="text" 
                                placeholder="Email"
                                id="email"
                                style={{borderRadius: "2px"}}
                            />
                        </div>
                        <div>
                            <Label value="Password"/>
                            <TextInput 
                                type="text" 
                                placeholder="Password"
                                id="password"
                                style={{borderRadius: "2px"}}
                            />
                        </div>
                            <Button className="rounded-sm bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-r hover:from-red-800 hover:via-red-700 hover:to-red-600" >
                                Sign Up
                            </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-3">
                        <span>Have an account?</span>
                        <Link to={"/sign-in"} className="text-blue-600">Sign In</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
