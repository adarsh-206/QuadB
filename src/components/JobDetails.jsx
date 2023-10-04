import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import ApplicationSuccess from './ApplicationSuccess';

const JobDetails = () => {
    const { jobId } = useParams();
    const [jobDetails, setJobDetails] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        coverLetter: '',
        resume: null,
    });

    useEffect(() => {
        // Fetch job details when the component mounts
        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/job-details',
            params: {
                job_id: jobId,
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
                setJobDetails(response.data.data[0]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [jobId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, resume: file });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setIsSubmitted(true);
        closeModal();
    };

    if (isSubmitted) {
        // If the form is submitted, render the success component
        return <ApplicationSuccess formData={formData} />;
    }

    if (!jobDetails) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-semibold">Job Details</h1>
                </div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-semibold">Job Details</h1>
            </div>
            <div className="bg-white p-3 rounded-lg">
                <div><strong>Job Title:</strong> {jobDetails.job_title}</div>
                <div><strong>Company Name:</strong> {jobDetails.employer_name}</div>
                <div><strong>Location:</strong> {jobDetails.job_city}, {jobDetails.job_country}</div>
                <div>
                    <strong>Job Description:</strong>
                    {jobDetails.job_description.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </div>
            <button onClick={openModal} className="mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg">
                Apply
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Apply Modal"
            >
                <h2 className="text-xl font-semibold mb-2 text-center">Apply for Job</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="coverLetter" className="block font-semibold">Cover Letter:</label>
                        <textarea
                            id="coverLetter"
                            name="coverLetter"
                            value={formData.coverLetter}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="resume" className="block font-semibold">Resume:</label>
                        <input
                            type="file"
                            id="resume"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg mr-4"
                    >
                        Submit Application
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-500 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default JobDetails;