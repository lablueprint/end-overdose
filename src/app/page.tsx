'use client';
import React, { useState } from 'react';
import './home.css';

function Home() {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = [
        { title: 'Welcome to End Overdose!' },
        { title: 'Title 2' },
        { title: 'Title 3' },
        { title: 'Title 4' },
    ];

    const handleNext = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleArrowNavigation = (direction: string) => {
        if (direction === 'next') {
            handleNext();
        } else {
            handlePrev();
        }
    };

    return (
        <div className="onboarding-container">
            <h1 className="onboarding-title">{pages[currentPage].title}</h1>
            <div className="onboarding-placeholder-container">
                <button
                    className="arrow-button left-arrow"
                    onClick={() => handleArrowNavigation('prev')}
                    disabled={currentPage === 0}
                    aria-label="Previous"
                >
                    &#9664;
                </button>
                <div className="onboarding-placeholder">
                    Onboarding Placeholder
                </div>
                <button
                    className="arrow-button right-arrow"
                    onClick={() => handleArrowNavigation('next')}
                    disabled={currentPage === pages.length - 1}
                    aria-label="Next"
                >
                    &#9654;
                </button>
            </div>
            <div className="onboarding-pagination">
                {pages.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentPage ? 'active' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;
