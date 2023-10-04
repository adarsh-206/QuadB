import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [results, setResults] = useState([]);
    const [selectedJob, setSelectedJob] = useState({}); // Initialize as an empty object

    useEffect(() => {
        if (selectedJob.job_id) { // Check if job_id exists before making the API call
            const options = {
                method: 'GET',
                url: 'https://jsearch.p.rapidapi.com/job-details',
                params: {
                    job_id: selectedJob.job_id,
                    extended_publisher_details: 'true',
                },
                headers: {
                    'X-RapidAPI-Key': '2ddfcf3176mshabe0b7a7cf2fb82p12e897jsn7f682ac632ac',
                    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
                },
            };

            axios
                .request(options)
                .then((response) => {
                    setSelectedJob(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [selectedJob]);

    const handleSearch = async () => {
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: `${keywords} in ${location}`,
                page: '1',
                num_pages: '1',
            },
            headers: {
                'X-RapidAPI-Key': '2ddfcf3176mshabe0b7a7cf2fb82p12e897jsn7f682ac632ac',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
            },
        };

        try {
            const response = await axios.request(options);
            setResults(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-semibold">Job Search</h1>
            </div>
            <div className="flex items-center justify-center space-x-4">
                <input
                    type="text"
                    placeholder="Keywords"
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((job, index) => (
                    <Link to={`/job/${job.job_id}`} key={index}>
                        <div className="bg-white p-3 rounded-lg cursor-pointer">
                            <div className="font-semibold">Job Title: {job.job_title}</div>
                            <div>Company Name: {job.employer_name}</div>
                            <div>Location: {job.job_city}, {job.job_country}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;