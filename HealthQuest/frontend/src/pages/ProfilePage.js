import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile } from '../services/profileService';
import './ProfilePage.css'; // Import the scoped CSS file

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        profilePicture: '',
        bio: '',
        goals: { calories: 2000, hydration: 8 },
    });
    const [profilePicture, setProfilePicture] = useState('');
    const [profilePicturePreview, setProfilePicturePreview] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile(token)
                .then((data) => {
                    setProfile(data);
                    setProfilePicturePreview(`http://localhost:5000${data.profilePicture}`);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching profile:', error);
                    setLoading(false);
                });
        } else {
            console.error('No token found');
            setLoading(false);
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleGoalChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, goals: { ...profile.goals, [name]: value } });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setProfilePicturePreview(URL.createObjectURL(file));
            setProfilePicture(file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const updatedProfile = await updateUserProfile(
                {
                    profilePicture,
                    bio: profile.bio,
                    goals: profile.goals,
                },
                token
            );
            setProfile(updatedProfile);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to update profile.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Profile Picture:
                        <input type="file" onChange={handleFileChange} />
                    </label>
                    {profilePicturePreview && (
                        <img
                            src={profilePicturePreview}
                            alt="Preview"
                        />
                    )}
                </div>
                <div>
                    <label>
                        Bio:
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Daily Calorie Goal:
                        <input
                            type="number"
                            name="calories"
                            value={profile.goals.calories}
                            onChange={handleGoalChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Daily Hydration Goal (glasses):
                        <input
                            type="number"
                            name="hydration"
                            value={profile.goals.hydration}
                            onChange={handleGoalChange}
                        />
                    </label>
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
