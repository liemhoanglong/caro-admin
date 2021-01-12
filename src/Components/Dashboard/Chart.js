import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

import Title from './Title';
import gameAPI from '../../Util/gameAPI';

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', 0),
];

export default function Chart() {
    const theme = useTheme();
    const [rows, setRows] = useState([]);
    console.log(rows)
    // console.log(data)
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await gameAPI.getAll();
                setRows(countFreq(res.data));
            } catch (error) {
                console.log('Failed to fetch: ', error);
            }
        }
        fetchAll();
    }, [])

    function countFreq(arr) {
        let a = [], b = [], prev;
        for (let i = 0; i < arr.length; i++) {
            if (!arr[i].gamePlay.includes(prev)) {
                a.push(arr[i].gamePlay.slice(0, 10));
                b.push(1);
            } else {
                b[b.length - 1]++;
            }
            prev = arr[i].gamePlay.slice(0, 10);
        }
        console.log([a, b])
        let result=[];
        for(let i = 0; i < a.length; i++){
            result.push(createData(a[i], b[i]))
        }
        console.log(result)
        return result;
    }

    return (
        <React.Fragment>
            <Title>Total room per day</Title>
            <ResponsiveContainer>
                <LineChart
                    data={rows}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Room
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}