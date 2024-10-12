"use client";
import { useState } from 'react';
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';

export default function Home() {

    const columns = [
        {
            title: '药品名称',
            dataIndex: 'name',
            ellipsis: true,
        },
        {
            title: '药品id',
            dataIndex: 'id',
            hideInSearch: true,
        },
        {
            title: '药品单价',
            dataIndex: 'price',
            hideInSearch: true,
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
                </div>)
            }
        },
    ];

    const fetchData = async (params) => {
        const { current, pageSize, name = "" } = params;
        //console.log(params)
        const response = await fetch(`/api/patient/getList?name=${name}&current=${current}&pageSize=${pageSize}`, { method: "GET" });
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

    return (
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
                    href='/addPatient'
                    type="primary"
                >
                    新建
                </Button>
            ]}
        />
    );
}