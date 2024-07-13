import React, { createContext, useEffect, useState } from 'react'
import Axios from 'axios'

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const [moderators, setModerators] = useState([]);
    const [admins, setAdmins] = useState([]);


    const getAllModerators = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/api/v1/auth/get_all_moderator', {
                withCredentials: true,
            });
            const getModerators = response?.data?.data || [];
            // assign sequential id
            const moderatorsWithId = getModerators.map((item, index) => ({ ...item, id: index + 1 }));
            setModerators(moderatorsWithId);
        } catch (error) {
            console.error("Error Fetching Data", error);
        }
    };

    const getAllAdmins = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/api/v1/auth/get_all_admin', {
                withCredentials: true,
            });
            const getAdmins = response?.data?.data || [];
            //assign sequential id
            const adminsWithId = getAdmins.map((item, index) => ({ ...item, id: index + 1 }));
            setAdmins(adminsWithId);
        } catch (error) {
            console.error("Error Fetching Data", error);
        }
    };

    useEffect(() => {
        getAllModerators();
        getAllAdmins();
    }, [])



    return (
        <ProfileContext.Provider value={{
            moderators, setModerators, getAllModerators,
            admins, setAdmins, getAllAdmins
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider