import React from 'react';
import MainPage from "./views/MainPage";
import TablePage from "./views/TablePage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
        <Layout>
            <Header>
                <div className='logo'>
                    Pet project
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={ <MainPage /> } />
                        <Route path='tables' element={ <TablePage /> }/>
                    </Routes>
                </BrowserRouter>
            </Content>
        </Layout>
    </div>
  );
}

export default App;
