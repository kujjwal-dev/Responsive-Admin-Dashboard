import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

export default function FirstList() {
    const [open, setOpen] = React.useState(true);
    const [main_category_name, setMain_category_name] = React.useState([]);
    const [isError, setIsError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000); //to load some data after some seconds
    }, []);


    async function get_main_category() {
        try {
            const main_category = await axios.get('http://localhost:3001/api/v1/category/get_main_category', {
                withCredentials: true,
            });
            console.log("main category", main_category)
            setMain_category_name(main_category?.data?.data);
        } catch (error) {
            setIsError(error.message);
        }
    }

    useEffect(() => {
        get_main_category();
    }, []);


    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Main Category
                    </ListSubheader>
                }
            >
                {loading ? <div><BeatLoader color="#475be8" /></div> : main_category_name?.map((data, index) => (
                    <ListItemButton key={index}>
                        <ListItemText>{data?.main_category}</ListItemText>
                    </ListItemButton>
                ))}
            </List>
        </>
    );
}