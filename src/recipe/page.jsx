"use client";
import { useState } from 'react';
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';


export default function Home() {
    const [params, setParams] = useState({ current: 1, pageSize: 20 });

    const columns = [
        {
            title: '患者名称',
            dataIndex: 'patient_name',
            ellipsis: true,
        },
        {
            title: '开方时间',
            dataIndex: 'create_time',
            key: 'showTime',
            valueType: 'date',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: '开方时间',
            dataIndex: 'create_time',
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
            title: '主诉',
            dataIndex: 'narrative',
            hideInSearch: true,
            minWidth: '200px',
            ellipsis: true,
            tooltip: '内容过长会自动收缩',
        },
        {
            title: '诊断',
            dataIndex: 'diagnosis',
            hideInSearch: true,
            minWidth: '200px',
            ellipsis: true,
            tooltip: '内容过长会自动收缩',
        },
        {
            title: '处方',
            dataIndex: 'recipe_content',
            hideInSearch: true,
            minWidth: '200px',
            ellipsis: true,
            tooltip: '内容过长会自动收缩',
        },
        {
            title: '贴数（贴）',
            dataIndex: 'num',
            hideInSearch: true,
            with: '20px'
        },

        {
            title: '操作',
            hideInSearch: true,
            render: (e, item) => (<div>
                <Button type='link' href={`/recipeDetail?id=${item.id}`}>详情</Button>
                <Button type='link' href={`/addRecipe?id=${item.id}`}>编辑</Button>
            </div>)
        },
    ];

    const fetchData = async (params) => {
        const { current, pageSize, sorter } = params;
        let _url = `/api/recipe/getList?current=${current}&pageSize=${pageSize}&sorter=${sorter}`
        !!params.name ? _url = `${_url}&name=${params.name}` : _url
        const response = await fetch(_url);
        const data = await response.json();
        return {
            data: data.table,
            total: data.total,
            success: true,
        };
    };
    return (
        <ProTable
            request={fetchData}
            params={params}
            //onParamsChange={setParams}
            columns={columns}
            search={{
                labelWidth: 'auto',
            }}
            rowKey={(record, index) => `${record.id}-${index}`}
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />}
                    href='/addRecipe'
                    type="primary"
                >
                    新建
                </Button>
            ]}
        />

    );
}