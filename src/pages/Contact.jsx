import React, { useState } from 'react'
import "./Contact.css"

const Contact = () => {

    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Hello GLOAM,%0A%0AMy name is *${form.name}* (%0AEmail: ${form.email}%0A)%0A%0A${form.message}%0A%0A— Sent from the website contact form`;
        const url = `https://api.whatsapp.com/send?phone=6281232179590&text=${text}`;
        window.open(url, "_blank");
        setSubmitted(true);
    };
    return (
        <>
            <main className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col items-center justify-center p-10 md:p-20 font-body">
                {/* Title */}
                <section className="text-center mb-10">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Contact Us</h1>
                    <p className="text-sm md:text-base text-neutral-400 mt-3">
                        Let’s collaborate, connect, or create something that lasts.
                    </p>
                </section>

                {/* Contact Info */}
                <div className="grid md:grid-cols-3 gap-10 w-full max-w-5xl mb-16 text-center">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Visit Us</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Jl. Cempaka, Pesanggrahan<br />Malang, East Java, Indonesia
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Email</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">gloamingmistake@gmail.com</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Instagram</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">@gloamingmistake</p>
                    </div>
                </div>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-3xl bg-neutral-800 p-10 rounded-2xl shadow-lg flex flex-col gap-5"
                >
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-neutral-700 text-white px-5 py-3 rounded-md outline-none focus:ring-2 focus:ring-white/20"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        className="bg-neutral-700 text-white px-5 py-3 rounded-md outline-none focus:ring-2 focus:ring-white/20"
                        required
                    />
                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        rows="6"
                        className="bg-neutral-700 text-white px-5 py-3 rounded-md outline-none focus:ring-2 focus:ring-white/20"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-white text-black px-8 py-3 rounded-md font-semibold tracking-wide hover:bg-neutral-200 transition-all"
                    >
                        {submitted ? 'Message Sent ✅' : 'Send Message'}
                    </button>
                </form>

                <p className="text-xs text-neutral-500 mt-10 tracking-widest">
                    © {new Date().getFullYear()} GLOAM — Crafted for imperfect hours.
                </p>
            </main>
        </>

    )
}

export default Contact