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
            title: '性别',
            dataIndex: 'sex',
            hideInSearch: true,
            render: (text) => {
                return ["女", "男"][text]
            }

        },
        {
            title: '年龄',
            dataIndex: 'age',
            hideInSearch: true,
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
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
            dataIndex: 'age',
            hideInSearch: true,
            render: (parms, parm) => {
                return (<div>
                    <Button type='link' href={`/patientDetail?id=${parm.id}`}>详情</Button>
                    <Button type='link' href={`/addPatient?id=${parm.id}`}>编辑</Button>
                    <Button type='link' href={`/addRecipe?patientId=${parm.id}`}>快速开方</Button>
                </div>)
            }
        },
    ];

    const [params, setParams] = useState({ current: 1, pageSize: 20 });

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
            params={params}
            onParamsChange={setParams}
            columns={columns}
            search={{
                labelWidth: 'auto',
            }}
            rowKey={(record, index) => `${record.id}-${index}`}
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