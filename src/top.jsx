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
                    label: (<a href='/standardRecipe'>标准方剂</a>),
                    key: 'standardRecipe'
                }, {
                    label: (<a href='/patient'>患者</a>),
                    key: 'patient'
                }, {
                    label: (<a href='/recipe'>处方</a>),
                    key: 'recipe'
                }

            ]}
            style={{ flex: 1, minWidth: 0 }}
        />
    </Header>
}