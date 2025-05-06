'use client';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

type UserScoreProps = {
    value: number;
    width?: number;
    height?: number;
};

export default function UserScore({ value, width = 48, height = 48 }: UserScoreProps) {
    const percentage = parseInt((value * 10).toFixed(0));

    return (
        <div style={{ width: width, height: height }}>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the "completed progress"
                    path: {
                        // Path color
                        stroke: parseInt((value * 10).toFixed(0)) >= 70 ? '#17C964' : parseInt((value * 10).toFixed(0)) >= 40 ? '#F5A524' : '#C20E4D',
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        // transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the circle behind the path, i.e. the "total progress"
                    trail: {
                        // Trail color
                        stroke: '#d6d6d6',
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Rotate the trail
                        transform: 'rotate(0.25turn)',
                        transformOrigin: 'center center',
                    },
                    // Customize the text
                    text: {
                        // Text color
                        fill: parseInt((value * 10).toFixed(0)) >= 70 ? '#17C964' : parseInt((value * 10).toFixed(0)) >= 40 ? '#F5A524' : '#C20E4D',
                        // Text size
                        fontSize: '24px',
                        fontWeight: 600,
                    },
                    // Customize background - only used when the `background` prop is true
                    background: {
                        fill: '#3e98c7',
                    },
                }}
            />
        </div>
    );
}
