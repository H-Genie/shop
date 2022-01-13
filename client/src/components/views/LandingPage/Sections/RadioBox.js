import React, { useState } from 'react'
import { Collapse, Radio } from 'antd'

const { Panel } = Collapse;

function RadioBox({ list, handleFielters }) {
    const [value, setValue] = useState(0)

    const renderRadioboxLists = () => list && list.map(value => (
        <Radio value={value._id} key={value._id}>
            <span>{value.name}</span>
        </Radio>
    ))

    const handleChange = e => {
        setValue(e.target.value)
        handleFielters(e.target.value)
    }

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="Price" key="1">
                    <Radio.Group onChange={handleChange} value={value} >
                        {renderRadioboxLists()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBox
