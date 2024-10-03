"use client";
import { useState, useEffect, useRef } from 'react';
import { ProForm, ProFormText, ProFormRadio } from '@ant-design/pro-components';
import { Button, Modal, Input, Radio, Space, message } from 'antd';
import "./add.scss"
const { Search, TextArea } = Input;

export default function StandardtModal({ open, setIsOpen, changeForm }) {
    const [standardList, setStandardList] = useState([]);
    const [standard, setStandard] = useState({});

    useEffect(()=>{
        if(!!open)fetchList('')
    }, [open])

    const handleStandardOk = () => {
        changeForm(standard)
        handleStandardCancel()
    }
    const handleStandardCancel = () => {
        setIsOpen(false);
        setStandard({})
    }

    const fetchList = async (name) => {
        try {
            const response = await fetch(`/api/standard/getList?name=${name || ''}`, { method: "GET" });
            if (response.ok) {
                const data = await response.json();
                setStandardList(data.table)
                setIsOpen(true);
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
                onSearch={fetchList}
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