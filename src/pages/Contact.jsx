import React from 'react'
import { Glare } from '../components'
import "./Contact.css"
const Contact = () => {
    return (
        <div className="h-screen w-full relative font-body">
            <main className="absolute w-[80%] h-[80%] bg-stone-900 text-white shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Glare glareColor="#ffffff"
                    glareOpacity={0.3}
                    background='transparent'
                    glareAngle={-30}
                    glareSize={300}
                    transitionDuration={800}
                    playOnce={false}>
                    <section className="relative w-full h-full">
                        <p className="absolute left-20 text-center top-10 text-5xl tracking-widest">
                            Get In touch
                        </p>
                        <div className="absolute w-full px-20 text-xs top-40 flex items-start justify-between">
                            <p className="w-1/3">
                                Contact us today and let’s create something extraordinary
                                together! We’re excited to collaborate with you
                            </p>
                            <button className="footer-btn mr-40">Whatsapp</button>
                        </div>
                        <div className="border-t-2 absolute bottom-10 flex items-start pt-10 justify-around w-full">
                            <a
                                href="https://instagram.com/gloamingmistake"
                                target="_blank"
                                className="w-64 tracking-wider text-xs/5"
                            >
                                @gloamingmistake
                            </a>
                            <p className="w-64 tracking-wider text-xs/5">+62 812-3217-9590</p>
                            <p className="w-64 tracking-wider text-xs/5">
                                gloamingmistake@gmail.com
                            </p>
                        </div>
                    </section>
                </Glare>
            </main>
        </div>
    )
}

export default Contact