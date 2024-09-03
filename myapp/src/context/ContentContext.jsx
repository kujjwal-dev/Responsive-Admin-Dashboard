// context/ContentContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
    const [contentSeries, setContentSeries] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/content/get_series', { withCredentials: true });
                if (response.data.success) {
                    setContentSeries(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching series:', error);
            }
        };

        fetchSeries();
    }, []);

    const addSeries = async (newSeries) => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/content/create_series', newSeries, { withCredentials: true });
            if (response.data.success) {
                const createdSeries = response.data.data;
                if (createdSeries && createdSeries.series_category_id) {
                    setContentSeries((prevList) => [...prevList, createdSeries]);
                } else {
                    console.error('API response is missing required fields:', response.data);
                }
            } else {s
                console.error('Failed to add series:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding series:', error);
        }
    };
    

    const updateSeries = async (id, updatedSeries) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/v1/content/update_series/${id}`, updatedSeries, { withCredentials: true });
            if (response.data.success) {
                setContentSeries((prevList) =>
                    prevList.map((series) => (series._id === id ? response.data.data : series))
                );
            } else {
                console.error('Failed to update series');
            }
        } catch (error) {
            console.error('Error updating series:', error);
        }
    };

    const deleteSeries = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/content/delete_series/${id}`, { withCredentials: true });
            if (response.data.success) {
                setContentSeries((prevList) => prevList.filter((series) => series._id !== id));
            } else {
                console.error('Failed to delete series');
            }
        } catch (error) {
            console.error('Error deleting series:', error);
        }
    };

    return (
        <ContentContext.Provider value={{ contentSeries, addSeries, updateSeries, deleteSeries, selectedCategory, setSelectedCategory }}>
            {children}
        </ContentContext.Provider>
    );
};
