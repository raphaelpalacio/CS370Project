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


    return <div>
        <Group>
            <h2>Name:</h2> {stored.name}
        </Group>
        <Group>
            <h2>Birthday:</h2> {months.getShortName(stored.month)} {stored.day}
        </Group>

        <Group>
            <h2>Total sessions:</h2> {sessionCount}
        </Group>

        <Group>
            <h2>Total hours:</h2> {sessionCount}
        </Group>

        <Group>
            <button
                style={buttonStyle}
                onClick={startEditCallback}
            >Edit</button>
        </Group>
    </div>
}