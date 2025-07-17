import React from 'react';

type Props = {
    className?: string;
};

export default function LiveWireIcon({ className = '' }: Props) {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            enableBackground="new 0 0 512 512"
            className={`${className}`}
        >
            <path
                fill="currentcolor"
                d="M381.6,334.8c-24.7,0-27.7,33.6-45.2,44.6v52c0,17.6,14.2,31.8,31.8,31.8c17.6,0,31.8-14.2,31.8-31.8v-88.6
        C395,338.1,389.2,334.8,381.6,334.8z"
            />
            <path
                fill="currentcolor"
                d="M263.2,334.8c-25.5,0-27.8,35.8-46.9,45.7v96.2c0,19.5,15.8,35.3,35.3,35.3s35.3-15.8,35.3-35.3V349.1
        C280.9,341.1,273.9,334.8,263.2,334.8z"
            />
            <path
                fill="currentcolor"
                d="M144.8,334.8c-22.9,0-27.1,28.9-41.6,41.9l0,38c0,17.6,14.2,31.8,31.8,31.8c17.6,0,31.8-14.2,31.8-31.8v-67.9
        C161.2,339.9,154.5,334.8,144.8,334.8z"
            />
            <path
                id="Body-Copy-4"
                fill="currentcolor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M458.9,340.2c-8.3,12.6-14.7,28.2-31.7,28.2
		c-28.6,0-30.1-44-58.7-44c-28.6,0-27,44-55.6,44c-28.6,0-30.1-44-58.7-44s-27,44-55.6,44s-30.1-44-58.7-44s-27,44-55.6,44
		c-9,0-15.3-4.4-20.6-10.3c-20.4-35.6-32.2-77.2-32.2-121.8C31.6,105.8,132.4,0,256.7,0s225.1,105.8,225.1,236.2
		C481.8,273.5,473.6,308.8,458.9,340.2z"
            />
            <path
                id="Oval"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="#FFFFFF"
                d="M244.6,295.1c78.3,0,111.2-45.4,111.2-109.9
		S306.1,61.4,244.6,61.4s-111.2,59.4-111.2,123.9S166.4,295.1,244.6,295.1z"
            />
            <ellipse
                id="Oval_1_"
                fill="currentcolor"
                fillRule="evenodd"
                clipRule="evenodd"
                cx="214.7"
                cy="142.9"
                rx="41.7"
                ry="46"
            />
            <ellipse
                id="Oval_2_"
                fillRule="evenodd"
                clipRule="evenodd"
                fill="#FFFFFF"
                cx="207.8"
                cy="132.2"
                rx="20.9"
                ry="21.3"
            />
        </svg>
    );
}
