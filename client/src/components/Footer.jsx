import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
    return (
        <Footer className=" border-t border-slate-900 p-2 rounded-none">
            <div className="w-full max-w-7xl mx-auto">
            <div className="'grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
                <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 text-white bg-gradient-to-r from-red-800 via-red-700 to-red-600 mx-1 rounded-sm">Tech</span>
                Blog
            </Link>
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                <div>
                    <Footer.Title title="About"/>
                    <Footer.LinkGroup col>
                    <Footer.Link
                        href="https://codingtales.hashnode.dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Coding Tales
                    </Footer.Link>
                    <Footer.Link
                        href="https://www.youtube.com/@infokaksha8082"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Infokaksha
                    </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title="Articles"/>
                    <Footer.LinkGroup col>
                    <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Article 1
                    </Footer.Link>
                    <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Article 2
                    </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title="Articles"/>
                    <Footer.LinkGroup col>
                    <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </Footer.Link>
                    <Footer.Link
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Contact
                    </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                </div>
            </div>
            
            <Footer.Divider />
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright 
                    href="#"
                    year={new Date().getFullYear()}
                    by="Tech Blog"
                />
            </div>
            <div>
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/sahandghavidel' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
            </div>
            </div>
        </Footer>
    )
}
