"use client";
import { useState } from 'react';
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

export default function Home() {

    const columns = [
        {
            title: '患者名称',
            dataIndex: 'name',
            ellipsis: true,
        },

        {
            title: '就诊号',
            dataIndex: 'depict',
            hideInSearch: true,
            minWidth: '200px'
        },
        {
            title: '性别',
            dataIndex: 'chapter',
            hideInSearch: true,
        },
        {
            title: '年龄',
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: '联系方式',
            dataIndex: 'remark',
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'showTime',
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateRange',
            hideInTable: true,
            search: {
                transform: (value) => {
                    return {
                        startTime: value[0],
                        endTime: value[1],
                    };
                },
            },
        },
        {
            title: '操作',
            dataIndex: 'age',
            hideInSearch: true,
            render: () => (<div>
                <Button type='link' href='/patientDetail'>详情</Button>
                <Button type='link' href='/addPatient'>编辑</Button>
                <Button type='link'>快速开方</Button>
            </div>)
        },
    ];
    const [params, setParams] = useState({ current: 1, pageSize: 20 });

    const fetchData = async (params) => {
        const { current, pageSize, sorter } = params;
        const response = await fetch(`/api/users?current=${current}&pageSize=${pageSize}&sorter=${sorter}`, { method: "GET" });
        if (response.ok) {
            const data = await response.json();
            console.log('data', data)
            return {
                data: data,
                total: data.length,
                success: true,
            };
        } else {
            throw new Error('Failed to fetch data');
        }
    };

    return (<main>

        <ProTable
            request={fetchData}
            params={params}
            //onParamsChange={setParams}
            columns={columns}
            search={{
                labelWidth: 'auto',
            }}
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    href='/addPatient'
                    type="primary"
                >
                    新建
                </Button>
            ]}
        />

    </main>
    );
}