import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd'

const { Panel } = Collapse;

function CheckBox({ list, handleFielters }) {
    const [checked, setChecked] = useState([])

    const handleToggle = value => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        handleFielters(newChecked)
    }

    const renderCheckboxLists = () => list && list.map((value, index) => (
        <Checkbox
            onChange={() => handleToggle(value._id)}
            checked={checked.indexOf(value._id) === -1 ? false : true}
            key={index}
        >
            <span>{value.name}</span>
        </Checkbox>
    ))

    return (
        <div>
            <Collapse>
                <Panel header="This is panel header1" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox
