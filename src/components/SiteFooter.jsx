import React from 'react';

const SiteFooter = ({
    instagram = 'reignite.district',
    email = 'reignitedistrict@gmail.com',
    phone = '+62 878-5168-2131',
    whatsapp = 'https://wa.me/6287851682131',
}) => {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t-2 border-ink bg-paper">
            <div className="hazard-stripe h-3 w-full" aria-hidden="true" />

            <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-ink">
                <div className="lg:col-span-8 p-5 md:p-10 border-b lg:border-b-0 lg:border-r border-ink">
                    <p className="micro mb-6">[ SEC. 99 ] — TRANSMISSION / OPEN CHANNEL</p>
                    <h2 className="macro text-[clamp(3.5rem,11vw,11rem)]">
                        Get in<br />
                        touch<span className="text-hazard">.</span>
                    </h2>
                </div>
                <div className="lg:col-span-4 p-5 md:p-10 flex flex-col justify-between gap-10">
                    <p className="text-sm leading-relaxed">
                        Contact us today and let&rsquo;s create something extraordinary together.
                        We&rsquo;re excited to collaborate with you.
                    </p>
                    <a
                        href={whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ink w-full justify-between"
                    >
                        <span>Open WhatsApp</span>
                        <span aria-hidden="true">&gt;&gt;&gt;</span>
                    </a>
                </div>
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink border-b border-ink">
                <div className="bg-paper p-5 md:px-10">
                    <dt className="micro opacity-60 mb-2">01 / Instagram</dt>
                    <dd>
                        <a
                            href={`https://instagram.com/${instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold hover:text-hazard"
                        >
                            @{instagram}
                        </a>
                    </dd>
                </div>
                <div className="bg-paper p-5 md:px-10">
                    <dt className="micro opacity-60 mb-2">02 / Line</dt>
                    <dd className="text-sm font-bold">{phone}</dd>
                </div>
                <div className="bg-paper p-5 md:px-10">
                    <dt className="micro opacity-60 mb-2">03 / Mail</dt>
                    <dd className="text-sm font-bold break-all">{email}</dd>
                </div>
            </dl>

            <div className="flex flex-wrap items-center justify-between gap-4 px-5 md:px-10 py-4 micro">
                <span>© {year} Reignite District®</span>
                <span className="hidden md:inline">Malang / ID — 7.98°S 112.63°E</span>
                <span className="barcode h-5 w-28" aria-hidden="true" />
            </div>
        </footer>
    );
};

export default SiteFooter;
