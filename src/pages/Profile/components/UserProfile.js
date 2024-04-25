//import { useState } from 'react';
import Group from './Group';
import { months, calcButtonTextColor } from '../tools';
import SettingsContext from './SettingsContext'; // Import SettingsContext
import React, { useContext } from 'react';
import "./UserProfile.css";



export default function EditableUserProfile({
    stored,
    startEditCallback
}) {

    console.log()

    const buttonStyle = {
        backgroundColor: stored.color,
        color: calcButtonTextColor(stored.color)
    };
    const { sessionCount } = useContext(SettingsContext); // Get session count from context

    const h2Style = {
        color: 'black', // Change color to your desired color
    };
    return <div>
        <Group>
            <h2 style={h2Style}>Name:</h2> {stored.name}
        </Group>
        <Group>
            <h2 style={h2Style}>Birthday:</h2> {months.getShortName(stored.month)} {stored.day}
        </Group>

        <Group>
            <h2 style={h2Style}>Total sessions:</h2> {sessionCount}
        </Group>

        <Group>
            <h2 style={h2Style}>Total hours:</h2> {sessionCount}
        </Group>

        <Group>
            <button
                style={buttonStyle}
                onClick={startEditCallback}
            >Edit</button>
        </Group>
    </div>
}