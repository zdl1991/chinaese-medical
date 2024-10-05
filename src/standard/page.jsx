"use client";
import { useState } from 'react';
import { Button } from 'antd';
import { ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { unEscapeHtml } from '../utils.jsx'

export default function Home() {
  const [params, setParams] = useState({ current: 1, pageSize: 20 });

  const columns = [
    {
      title: '标准方剂',
      dataIndex: 'name',
    },
    {
      title: '方剂描述',
      dataIndex: 'standard_describe',
      hideInSearch: true,
      minWidth: '200px',
      copyable: true,
      ellipsis: true,
      tooltip: '内容过长会自动收缩',
    },
    {
      title: '注解',
      dataIndex: 'remark',
      hideInSearch: true,
      ellipsis: true,
      minWidth: '250px',
      height: '40px',
      tooltip: '内容过长会自动收缩',
      render: (e, item) => (
        <div
          style={{ height: '22px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', wordBreak: 'keep-all' }}
          dangerouslySetInnerHTML={{ __html: item.remark ? unEscapeHtml(item.remark) : '--' }}
        />)
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'showTime',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (e, item) => (<div>
        <Button type='link' href={`/standardDetail?id=${item.id}`}>详情</Button>
        <Button type='link' href={`/addStandard?id=${item.id}`}>编辑</Button>
      </div>)
    },
  ];

  const fetchData = async (params) => {
    const { current, pageSize } = params;
    let _url = `/api/standard/getList?current=${current}&pageSize=${pageSize}`
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
          href='/addStandard'
          type="primary"
        >
          新建
        </Button>
      ]}
    />
  );
}