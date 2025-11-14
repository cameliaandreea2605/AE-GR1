import React, { useState, useEffect } from 'react';
import { getProfile } from '../api/user.routes';
import LoadingSpinner from '../components/LoadingSpinner';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                if (response.success) {
                    setUser(response.data);
                } else {
                    setError(response.message);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="text-red-500 text-lg">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="flex justify-center">
                        <UserCircleIcon className="h-24 w-24 text-gray-500" />
                    </div>
                    <div className="text-center mt-4">
                        <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                        <p className="text-sm text-gray-600">Your personal details</p>
                    </div>
                    {user && (
                        <div className="mt-8">
                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

