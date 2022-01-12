import React from 'react';
import MainPage from "./pages/MainPage";
import TablePage from "./pages/TablePage";
import Header from "./components/Header/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout } from 'antd';
const { Content } = Layout;

function App() {
  return (
    <div className="App">
        <Layout>
            <Header />
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
