"use client";
import { useState } from 'react';
import { Button, Modal, InputNumber } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

export default function Home() {
    const [medical,setMedical] = useState({})
    const [quantity, setQuantity] = useState(0)

    const columns = [
        {
            title: '药品名称',
            dataIndex: 'name',
            ellipsis: true,
        },
        {
            title: '药品单价',
            dataIndex: 'price',
            hideInSearch: true,
        },
        {
            title: '库存',
            dataIndex: 'quantity',
            hideInSearch: true,
            sorter: true,
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
        }, {
            title: '描述',
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: '操作',
            hideInSearch: true,
            render: (parms, parm) => {
                return (<div>
                    <Button type='link' href={`/addMedical?id=${parm.id}`}>编辑</Button>
                    <Button type='link' 
                        onClick={()=>{
                            setMedical({...parm})
                            setQuantity(parm.quantity||0)
                        }}>库存</Button>
                </div>)
            }
        },
    ];

    const fetchData = async (params) => {
        const { current, pageSize, name = "" } = params;
        //console.log(params)
        const response = await fetch(`/api/medical/getList?name=${name}&current=${current}&pageSize=${pageSize}`, { method: "GET" });
        if (response.ok) {
            const data = await response.json();
            //console.log('data', data)
            return {
                data: data.table,
                total: data.total,
                success: true,
            };
        } else {
            throw new Error('Failed to fetch data');
        }
    };

    const handleOk = async (values) => {
        //console.log(values)
        let query = {
            ...medical,
            quantity: quantity
        }
        console.log('query', query)
        try {
            await fetch('/api/medical/updateMedical', {
                method: "POST",
                body: JSON.stringify(query),
                headers: { "Content-Type": "application/json" }
            })
            setMedical({})
            fetchData()
        } catch (err) {
            console.error('Error fetching data:', err);
            setMedical({})
        }
    }
    const handleCancel = ()=>{
        setMedical({})
    }

    return (
        <>
            <ProTable
                request={fetchData}
                columns={columns}
                search={{
                    labelWidth: 'auto',
                }}
                pagination={{
                    pageSize: 10
                }}
                rowKey={(record) => record.id}
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        href='/addMedical'
                        type="primary"
                    >
                        新建
                    </Button>
                ]}
            />
            {
                !!medical.id && 
                <Modal 
                    title="设置库存"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={!!medical.id}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                        <div>{medical.name}</div>
                        <InputNumber min={0} keyboard={quantity} defaultValue={quantity} onChange={num=>setQuantity(num)}/>
                </Modal>
            }
        </>
    );
}