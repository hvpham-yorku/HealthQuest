import axios from 'axios';

export const fetchUserProfile = async (token) => {
    const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateUserProfile = async (profileData, token) => {
    const formData = new FormData();
    formData.append('profilePicture', profileData.profilePicture);
    formData.append('bio', profileData.bio);
    formData.append('goals', JSON.stringify(profileData.goals));

    const response = await axios.put('http://localhost:5000/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};
