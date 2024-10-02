"use client";
import { Layout, Menu } from 'antd';

export default function Top() {
    const { Header } = Layout;

    return <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={[
                {
                    label: (<a href='/standardRecipe'>��׼����</a>),
                    key: 'standardRecipe'
                }, {
                    label: (<a href='/patient'>����</a>),
                    key: 'patient'
                }, {
                    label: (<a href='/recipe'>����</a>),
                    key: 'recipe'
                }

            ]}
            style={{ flex: 1, minWidth: 0 }}
        />
    </Header>
}