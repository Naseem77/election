import React, { useEffect, useState } from 'react'
import 
{ BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
from 'recharts';

const BarCharts = (data) => {
    
    // const data = [
    //     {
    //       name: 'Box 1',
    //       Voted: 100,
    //       NotVoted: 2400,
    //       // amt: 2400,
    //     },
    //     {
    //       name: 'Box 2',
    //       Voted: 3000,
    //       NotVoted: 1398,
    //       // amt: 2210,
    //     },
    //     {
    //       name: 'Box 3',
    //       Voted: 2000,
    //       NotVoted: 9800,
    //       // amt: 2290,
    //     },
    //     {
    //       name: 'Box 4',
    //       Voted: 2780,
    //       NotVoted: 3908,
    //       // amt: 2000,
    //     },     
    //   ];

  return (
    <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="notVoted" fill="#d88484" />
                <Bar dataKey="voted" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
  )
}

export default BarCharts