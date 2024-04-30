import { useState, useEffect } from 'react';
import Group from './Group';
import { months } from '../tools';

function renderMonthOptions() {
    return months.getMonths().map((m, i) => {
        return <option
            key={i}
            value={i}
        >
            {m.shortName}
        </option>
    });
}

function bound(value, floor, ceil) {
    return Math.min(ceil, Math.max(value, floor));
}

export default function EditableUserProfile({
    stored,
    editCompleteCallback
}) {

    console.log("Edit User Profile");

    const [name, setName] = useState(stored.name);
    const [month, setMonth] = useState(stored.month);
    const [day, setDay] = useState(stored.day);
    const [color, setColor] = useState(stored.color);

    const maxDay = months.getMaxDays(month);

    function handleCancelClicked() {
        editCompleteCallback(null);
    }

    function handleSaveClicked() {
        console.log("Saved");
        editCompleteCallback({ name, month, day, color });
    }

    useEffect(() => {
        setDay(bound(day, 1, maxDay));
    }, [month]);



    const h2Style = {
        color: 'black', // Change color to your desired color
    };

    return <>
        <Group>
            <h2 style={h2Style}>Name:</h2>
            <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </Group>
        <Group>
            <h2 style={h2Style}>Birthday:</h2>

            <select
                value={month}
                onChange={e => setMonth(bound(e.target.value, 0, 11))}
            >
                {renderMonthOptions()}
            </select>
            <input
                type='number'
                value={day}
                onChange={e => setDay(bound(e.target.value, 1, maxDay))}
                style={{ width: "50px" }}
            />
        </Group>
        <Group>
    <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleSaveClicked}>Save</button>
    <button style={{ backgroundColor: 'white', color: 'black' }} onClick={handleCancelClicked}>Cancel</button>
    {/* Ensure the color of the Cancel button is black */}
</Group>
    </>
}