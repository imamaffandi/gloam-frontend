import React from 'react';

const SectionHeader = ({ index, label, title, meta }) => (
    <header className="grid grid-cols-12 border-y-2 border-ink">
        <div className="col-span-3 md:col-span-2 border-r border-ink p-3 md:p-5 flex items-end">
            <span className="macro text-[clamp(2.5rem,6vw,5.5rem)] text-hazard">{index}</span>
        </div>
        <div className="col-span-9 md:col-span-10 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4 border-b border-ink px-3 md:px-5 py-2 micro">
                <span>[ {label} ]</span>
                {meta && <span className="opacity-60">{meta}</span>}
            </div>
            <h2 className="macro text-[clamp(2.25rem,7vw,7rem)] px-3 md:px-5 py-3 md:py-4">{title}</h2>
        </div>
    </header>
);

export default SectionHeader;
