import React from 'react'
import { Collapse, Checkbox } from 'antd'

const { Panel } = Collapse;

function CheckBox({ list }) {
    const renderCheckboxLists = () => list && list.map((value, index) => (
        <Checkbox onChange key={index}>
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
