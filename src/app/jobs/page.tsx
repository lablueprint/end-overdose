'use client';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './jobs.css';

export default function Jobs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState<
        { name: string; description: string; tags: string[]; link: string }[]
    >([]);
    const [filteredJobs, setFilteredJobs] = useState<
        { name: string; description: string; tags: string[]; link: string }[]
    >([]);

    useEffect(() => {
        // TODO: replace placeholders with API call to fetch actual jobs
        const exampleJobs = [
            {
                name: 'Software Engineer',
                description: 'Develop and maintain software applications.',
                tags: ['Full-time', 'Remote'],
                link: '#',
            },
            {
                name: 'UI/UX Designer',
                description: 'Design user interfaces and experiences.',
                tags: ['Contract', 'Design'],
                link: '#',
            },
            {
                name: 'Project Manager',
                description: 'Manage project timelines and deliverables.',
                tags: ['Full-time', 'On-site'],
                link: '#',
            },
        ];
        setJobs(exampleJobs);
        setFilteredJobs(exampleJobs);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = jobs.filter(
            (job) =>
                job.name.toLowerCase().includes(value.toLowerCase()) ||
                job.description.toLowerCase().includes(value.toLowerCase()) ||
                job.tags.some((tag) =>
                    tag.toLowerCase().includes(value.toLowerCase())
                )
        );
        setFilteredJobs(filtered);
    };

    return (
        <div className="jobs-container">
            <h1 className="page-title">Jobs</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="jobs-content">
                <div className="filters">
                    <h2 className="filters-title">Filters</h2>
                    <p>TODO: add filters here</p>
                </div>
                <div className="divider"></div>
                <div className="job-listings">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job, index) => (
                            <div key={index} className="job-item">
                                <h2 className="job-title">{job.name}</h2>
                                <p>{job.description}</p>
                                <div className="tags">
                                    {job.tags.map((tag, idx) => (
                                        <span key={idx} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Button
                                    variant="contained"
                                    size="small"
                                    href={job.link}
                                    className="learn-more"
                                >
                                    Learn More
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No jobs found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
