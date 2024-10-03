"use client";
import { useState, useEffect, useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { Button, Modal, Input, Radio, Space, message } from 'antd';
import "./add.scss"
const { Search, TextArea } = Input;

export default function StandardtModal({ open, setIsStandardOpen, changeFormRecipe }) {
    const [standardList, setStandardList] = useState([]);
    const [standard, setStandard] = useState({});

    const handleStandardOk = () => {
        changeFormRecipe(standard)
        handleStandardCancel()
    }
    const handleStandardCancel = () => {
        setIsStandardOpen(false);
        setStandard({})
    }

    const fetchStandardList = async (name) => {
        try {
            const response = await fetch(`/api/standard/getList?name=${name || ''}`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                console.log('data', data)
                setStandardList(data.table)
                setIsStandardOpen(true);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const onStandardRadioChange = (e) => {
        setStandard(e.target.value)
    }

    return (
        <Modal title="选择标准处方" open={open} onOk={handleStandardOk} onCancel={handleStandardCancel}>
            <Search
                placeholder="搜索标准处方"
                allowClear
                onSearch={fetchStandardList}
                style={{
                    width: 200,
                }}
            />
            <div className='radioWrap'>
                <Radio.Group onChange={onStandardRadioChange} value={standard}>
                    <Space direction="vertical">
                        {
                            standardList.map(item => (
                                <Radio value={item} key={item.id}>{item.name} {item.standard_describe}</Radio>
                            ))
                        }
                    </Space>
                </Radio.Group>
            </div>
        </Modal>
    )
}