import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AudioContent() {

    
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="video table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {filteredVideos.map((row,index) => (
            <TableRow key={index}>
              <TableCell>{row.title}</TableCell>
              <TableCell>
                <a href={row.video_url} target="_blank" rel="noopener noreferrer">
                  {row.video_url}
                </a>
              </TableCell>
            </TableRow>
          ))} */}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
