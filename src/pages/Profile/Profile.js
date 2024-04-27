import React, { useState, useEffect } from 'react';
import './Profile.css';
import EditableUserProfile from './components/EditableUserProfile';
import UserProfile from './components/UserProfile';

function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function randomName() {
    return "Set Your Name";
}

function Profile() {
    const now = new Date(Date.now());
    const defaultBirthday = new Date(now.getTime() + 86400000);

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(() => {
        const storedName = localStorage.getItem('name');
        return storedName ? storedName : randomName();
    });

    const [month, setMonth] = useState(() => {
        const storedMonth = parseInt(localStorage.getItem('month'));
        return !isNaN(storedMonth) ? storedMonth : defaultBirthday.getMonth();
    });

    const [day, setDay] = useState(() => {
        const storedDay = parseInt(localStorage.getItem('day'));
        return !isNaN(storedDay) ? storedDay : defaultBirthday.getDate();
    });

    const [color, setColor] = useState(randomColor());
    const [sessionCount, setSessionCount] = useState(() => {
        const storedSessionCount = localStorage.getItem("sessionCount");
        return storedSessionCount ? parseInt(storedSessionCount) : 0;
    });

    const stored = { name, month, day, color };
    const isBirthdayToday = now.getMonth() === month && now.getDate() === day;

    useEffect(() => {
        localStorage.setItem('name', name);
    }, [name]);

    useEffect(() => {
        localStorage.setItem('month', month);
    }, [month]);

    useEffect(() => {
        localStorage.setItem('day', day);
    }, [day]);

    useEffect(() => {
        // Update session count when it changes
        localStorage.setItem("sessionCount", sessionCount.toString());
    }, [sessionCount]);

    function handleEditComplete(result) {
        if (result != null) {
            setName(result.name);
            setMonth(result.month);
            setDay(result.day);
            setColor(result.color);
        }
        setEditMode(false);
    }

    return (
        <div className="container">
            <div className="App">
                {
                    editMode
                        ? <>
                            <h1>My Profile</h1>
                            <EditableUserProfile
                                stored={stored}
                                editCompleteCallback={handleEditComplete}
                            />
                        </>
                        : <>
                            {
                                isBirthdayToday
                                    ? <div className="birthday">Happy Birthday!</div>
                                    : <h1>My Profile</h1>
                            }
                                          <div>Total Sessions: {sessionCount}</div>
                            <UserProfile
                                stored={stored}
                                startEditCallback={() => setEditMode(true)}
                            />
                        </>
                }
                

            </div>
        </div>
    );
}

export default Profile;