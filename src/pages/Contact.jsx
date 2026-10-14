import React, { useState, useEffect } from 'react'
import { useLoading } from '../context/LoadingContext';

const Contact = () => {
    const { setIsLoading } = useLoading();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    // Ensure loading is off when Contact page mounts
    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = `Hello Reignite Admin,%0A%0AMy name is *${form.name}* (%0AEmail: ${form.email}%0A)%0A%0A${form.message}%0A%0A— Sent from the website contact form`;
        const url = `https://api.whatsapp.com/send?phone=6281232179590&text=${text}`;
        window.open(url, "_blank");
        setSubmitted(true);
    };
    return (
        <main className="min-h-screen bg-paper text-ink pt-12 font-body flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-ink micro">
                <span className="px-4 py-2 border-r border-ink">[ Contact ]</span>
                <span className="px-4 py-2 md:border-r border-ink">Doc / RD-CNT</span>
                <span className="hidden md:block px-4 py-2 border-r border-ink">Channel / WhatsApp</span>
                <span className="hidden md:block px-4 py-2 text-right">Status / Open</span>
            </div>

            {/* Title */}
            <section className="p-4 md:p-8 border-b-2 border-ink">
                <h1 className="macro text-[clamp(4rem,14vw,16rem)]">
                    Contact<span className="text-hazard">.</span>
                </h1>
                <p className="micro mt-6">
                    /// Let’s collaborate, connect, or create something that lasts.
                </p>
            </section>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
                {/* Contact Info */}
                <dl className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-ink">
                    <div className="p-4 md:p-8 border-b border-ink">
                        <dt className="micro opacity-60 mb-2">01 / Visit Us</dt>
                        <dd className="text-sm leading-relaxed font-bold">
                            Jl. Cempaka, Pesanggrahan<br />Malang, East Java, Indonesia
                        </dd>
                    </div>
                    <div className="p-4 md:p-8 border-b border-ink">
                        <dt className="micro opacity-60 mb-2">02 / Email</dt>
                        <dd className="text-sm font-bold break-all">reignitedistrict@gmail.com</dd>
                    </div>
                    <div className="p-4 md:p-8">
                        <dt className="micro opacity-60 mb-2">03 / Instagram</dt>
                        <dd className="text-sm font-bold">@reignite.district</dd>
                    </div>
                </dl>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="lg:col-span-8 p-4 md:p-8 flex flex-col gap-8"
                >
                    <p className="micro">[ Form / Outbound Message ]</p>
                    <label className="flex flex-col gap-1">
                        <span className="micro opacity-60">A — Name</span>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="field"
                            required
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="micro opacity-60">B — Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            className="field"
                            required
                        />
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className="micro opacity-60">C — Message</span>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            rows="6"
                            className="field resize-none"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="btn-ink justify-between"
                    >
                        <span>{submitted ? '[ ✓ ] Message Sent' : 'Send Message'}</span>
                        <span aria-hidden="true">&gt;&gt;&gt;</span>
                    </button>
                </form>
            </div>

            <div className="hazard-stripe h-3 w-full border-t border-ink" aria-hidden="true" />
            <p className="micro px-4 md:px-8 py-4">
                © {new Date().getFullYear()} REIGNITE DISTRICT® — Crafted for imperfect hours.
            </p>
        </main>
    )
}

export default Contact
