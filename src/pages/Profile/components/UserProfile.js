import Group from './Group';
import { months, calcButtonTextColor } from '../tools';
import SettingsContext from './SettingsContext'; // Import SettingsContext
import React, { useContext, useEffect, useState } from 'react';
import "./UserProfile.css";

export default function EditableUserProfile({
    stored,
    startEditCallback
}) {
    const { sessionCount, setSessionCount } = useContext(SettingsContext); // Access sessionCount from SettingsContext

    const buttonStyle = {
        backgroundColor: stored.color,
        color: calcButtonTextColor(stored.color)
    };

    const h2Style = {
        color: 'black', // Change color to your desired color
    };

    useEffect(() => {
        // Update session count in local storage when it changes
        localStorage.setItem("sessionCount", sessionCount.toString());
    }, [sessionCount]);

    // Initialize session count from localStorage on component mount
    useEffect(() => {
        const storedSessionCount = localStorage.getItem("sessionCount");
        if (storedSessionCount) {
            setSessionCount(parseInt(storedSessionCount));
        }
    }, [setSessionCount]);

    return (
        <div>
            <Group>
                <h2 style={h2Style}>Name:</h2> {stored.name}
            </Group>
            <Group>
                <h2 style={h2Style}>Birthday:</h2> {months.getShortName(stored.month)} {stored.day}
            </Group>

            {/* Add some margin or padding to create space */}
            <Group style={{ marginTop: '20px' }}>
                <button
                    style={buttonStyle}
                    onClick={startEditCallback}
                >Edit</button>
            </Group>
        </div>
    );
}