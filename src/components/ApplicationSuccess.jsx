import React from 'react';

const ApplicationSuccess = ({ formData }) => {
    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-4">
                <h1 className="text-3xl font-semibold">Application Submitted Successfully</h1>
            </div>
            <div className="bg-white p-3 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Application Details:</h2>
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Cover Letter:</strong> {formData.coverLetter}</div>
                {/* You can display other submitted details here */}
            </div>
        </div>
    );
};

export default ApplicationSuccess;
