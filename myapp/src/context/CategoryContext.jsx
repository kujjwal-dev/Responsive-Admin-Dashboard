import React, { createContext, useEffect, useState } from 'react'
import Axios from 'axios'

export const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {

    const [mainCategories, setMainCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [series, setSeries] = useState([]);
    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedSeries, setSelectedSeries] = useState(null);
    const [videos, setVideos] = useState([]);

    const getCategories = async () => {
        try {
            //get main categories
            const getMainCategories = await Axios.get('http://localhost:3001/api/v1/category/get_main_category', {
                withCredentials: true,
            });
            console.log("main category", getMainCategories)
            setMainCategories(getMainCategories?.data?.data)


            //get sub categories
            const getSubCategories = await Axios.get('http://localhost:3001/api/v1/category/get_sub_category', {
                withCredentials: true,
            })
            console.log("sub category", getSubCategories)
            setSubCategories(getSubCategories?.data?.data)

            //get series
            const getSeries = await Axios.get('http://localhost:3001/api/v1/category/get_series', {
                withCredentials: true,
            })
            console.log("series", getSeries)
            setSeries(getSeries?.data?.data)
        } catch (error) {
            console.error("Error fetching categories", error)
        }
    };

    useEffect(() => {
        getCategories();

    }, []);

    //get main category by id

    const getMainCategoryById = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:3001/api/v1/category/get_single_main_category/${id}`, {
                withCredentials: true,
            });
            setSelectedMainCategory(response?.data?.data)
            console.log("dtaaaaaaaaaa", response?.data?.data)
        } catch (error) {
            console.error("Error fetching main category", error);
        }
    };

    // add main category 

    const addMainCategory = (newCategory) => {
        setMainCategories(prevMainCategories => [...prevMainCategories, newCategory]);
    };


    // get sub category by id

    const getSubCategoryById = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:3001/api/v1/category/get_single_sub_category/${id}`, {
                withCredentials: true,
            });
            setSelectedSubCategory(response?.data?.data)
        } catch (error) {
            console.error("Error fetching sub category", error);
        }
    };

    // get series by id

    const getSeriesById = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:3001/api/v1/category/get_single_series/${id}`, {
                withCredentials: true,
            });
            setSelectedSeries(response?.data?.data)
            console.log(response?.data?.data);
        } catch (error) {
            console.error("Error fetching series", error);
        }
    };

    // update main category

    const updateMainCategory = async (id, updatedData) => {
        try {
            const updateMainCategory = await Axios.put(`http://localhost:3001/api/v1/category/update_main_category/${id}`, {
                main_category: updatedData
            }, {
                withCredentials: true,
            })
            // update main category in state
            setMainCategories(prevMainCategories => prevMainCategories.map(
                category => category.id === id ? { ...category, ...updatedData } : category
            ));

        } catch (error) {
            console.error('Error updating main category', error)
        }
    };

    //delete main category

    const deleteMainCategory = async (id) => {
        try {
            await Axios.delete(`http://localhost:3001/api/v1/category/delete_main_category/${id}`, {
                withCredentials: true,
            });
            // delete main category in state
            setMainCategories(prevMainCategories => prevMainCategories.filter(
                category => category.id !== id));
        } catch (error) {
            console.error('Error deleting main category', error)
        }
    };

    // update sub category

    const updateSubCategory = async (id, updatedData) => {
        try {
            const updateMainCategory = await Axios.put(`http://localhost:3001/api/v1/category/update_sub_category/${id}`, {
                sub_category: updatedData
            }, {
                withCredentials: true,
            })
            // update sub category in state
            setSubCategories(prevMainCategories => prevMainCategories.map(
                category => category.id === id ? { ...category, ...updatedData } : category
            ));

        } catch (error) {
            console.error('Error updating sub category', error)
        }
    };


    // delete sub category 

    const deleteSubCategory = async (idMain, idSub) => {
        console.log(idMain);
        console.log(idSub);
        try {
            await Axios.delete(`http://localhost:3001/api/v1/category/delete_sub_category/${idMain}/${idSub}`, {
                withCredentials: true,
            });
            // delete sub category in state
            setSubCategories(prevSubCategories => prevSubCategories.filter(
                category => category.idSub !== idSub));
        } catch (error) {
            console.error('Error deleting sub category', error)
        }
    };

    // update series

    const updateSeries = async (id, updatedData) => {
        try {
            const updateMainCategory = await Axios.put(`http://localhost:3001/api/v1/category/update_series/${id}`, {
                series: updatedData
            }, {
                withCredentials: true,
            })
            // update series in state
            setSeries(prevMainCategories => prevMainCategories.map(
                category => category.id === id ? { ...category, ...updatedData } : category
            ));

        } catch (error) {
            console.error('Error updating series', error)
        }
    };

    // delete series

    const deleteSeries = async (id) => {
        try {
            await Axios.delete(`http://localhost:3001/api/v1/category/delete_series/${id}`, {
                withCredentials: true,
            });
            // delete series in state
            setMainCategories(prevSeries => prevSeries.filter(
                category => category.id !== id));
        } catch (error) {
            console.error('Error deleting series', error)
        }
    };

    // get video/audio content 


    const getVideoContent = async () => {
        try {
            const response = await Axios.get('http://localhost:3001/api/v1/video_content/get_video_content', {
                withCredentials: true,
            });
            console.log(response?.data?.data)
            setVideos(response?.data?.data)
        } catch (error) {
            console.error("Error fetching video content", error)
        }
    }

    useEffect(() => {
        if (selectedSeries) {
            getVideoContent();
        }
    }, [])

    // Function to update video/audio content
    const updateVideoContent = async (id, updatedData) => {
        try {
            const response = await Axios.put(`http://localhost:3001/api/v1/video_content/update_video_content/${id}`, updatedData, {
                withCredentials: true,
            });
            setVideos(prevVideos => prevVideos.map(video => video._id === id ? { ...video, ...updatedData } : video));
        } catch (error) {
            console.error('Error updating video content', error);
        }
    };

    // Function to delete video/audio content
    const deleteVideoContent = async (id) => {
        try {
            await Axios.delete(`http://localhost:3001/api/v1/video_content/delete_video_content/${id}`, {
                withCredentials: true,
            });
            setVideos(prevVideos => prevVideos.filter(video => video._id !== id));
        } catch (error) {
            console.error('Error deleting video content', error);
        }
    };

    return (
        <CategoryContext.Provider value={{
            mainCategories, setMainCategories, subCategories, setSubCategories, series, setSeries,
            selectedMainCategory, setSelectedMainCategory, selectedSubCategory, setSelectedSubCategory, selectedSeries, setSelectedSeries,
            getMainCategoryById, getSubCategoryById, getSeriesById,
            updateMainCategory, deleteMainCategory, getCategories,
            updateSubCategory, deleteSubCategory,
            updateSeries, deleteSeries,
            addMainCategory,
            getVideoContent, videos,
            updateVideoContent,deleteVideoContent
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider;

