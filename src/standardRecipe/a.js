// import React, { useState } from 'react';
// import type { FormProps } from 'antd';
// import { Button, Form, Input } from 'antd';
// import { ProTable } from '@ant-design/pro-components';

// export default function Home() {
  
//     type FieldType = {
//         standname?: string;
//         password?: string;
//       };
      
//       const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//         console.log('Success:', values);
//       };
      
//       const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//       };
//       const columns = [
//         {
//           title: '姓名',
//           dataIndex: 'name',
//         },
//         {
//           title: '年龄',
//           dataIndex: 'age',
//           sorter: true,
//         },
//         {
//           title: '地址',
//           dataIndex: 'address',
//         },
//       ];
//       const [params, setParams] = useState({ current: 1, pageSize: 20 });

//   const fetchData = async (params: any) => {
//     const { current, pageSize, sorter } = params;
//     const response = await fetch(`/api/data?current=${current}&pageSize=${pageSize}&sorter=${sorter}`);
//     const data = await response.json();
//     return {
//       data: data.list,
//       total: data.total,
//       success: true,
//     };
//   };
//   return (<main>
//     test
//     <Form>
//     {/* <Form.Item
//       label="标准方剂"
//       name="standname"
//     >
//       <Input />
//     </Form.Item> */}
//     {/* <Form.Item></Form.Item> */}
//     <div>
//     <span>标准方剂</span><Input />
//     </div>
//     <div>
//     <span>篇章</span><Input />
//     </div>
    
//     <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form>

//     <ProTable
//       request={fetchData}
//       params={params}
//       onParamsChange={setParams}
//       columns={columns}
//     />
//     {/* <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     //initialValues={{ remember: true }}
//     //onFinish={onFinish}
//     //onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item<FieldType>
//       label="标准方剂"
//       name="standname"
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item<FieldType>
//       label="篇章"
//       name="password"
//     >
//       <Input />
//     </Form.Item>


//     <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form> */}
//   </main>
//   );
// }