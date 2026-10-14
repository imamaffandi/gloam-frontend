import React, { useState, useEffect } from 'react';

const ImageCarousel = ({ images, interval = 5000, className = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={`relative w-full h-full overflow-hidden bg-paper-2 ${className}`}>
            {/* Images */}
            <div className="absolute inset-0 halftone">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Carousel slide ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover print-img transition-opacity duration-300 ease-linear ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>

            {/* Frame counter */}
            <div className="absolute top-0 left-0 z-20 bg-ink text-paper micro px-2 py-1">
                FRM {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </div>

            {/* Segment Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 z-20 flex border-t border-ink bg-paper">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`flex-1 h-7 micro border-r border-ink last:border-r-0 cursor-pointer transition-colors duration-100 ${index === currentIndex
                                ? 'bg-ink text-paper'
                                : 'hover:bg-paper-2'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageCarousel;
