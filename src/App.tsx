import React from 'react';
import MainPage from "./pages/MainPage";
import TablePage from "./pages/TablePage";
import Header from "./components/Header/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Layout } from 'antd';
import './styles/global.scss'
import RouteGuard from "./components/RoutesGuard/RouteGuard";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";

const { Content } = Layout;

function App() {
  const { isAuth } = useSelector((state: RootState) => state.authReducer)

    return (
    <div className="App">
        <BrowserRouter>
            <Layout>
                <Header />
                <Content className="container">
                        <Routes>
                            <Route path='/' element={
                                <RouteGuard authStatus={ !isAuth } whereNavigate={ 'tables' }>
                                    <MainPage />
                                </RouteGuard>
                            }/>

                            <Route path='tables' element={
                                <RouteGuard authStatus={ isAuth } whereNavigate={ '/' }>
                                    <TablePage />
                                </RouteGuard>
                            }/>

                            {/*<Route path='tables' element={ <RouteGuard authStatus={ isAuth } whereNavigate={ '/' } /> }>*/}
                            {/*    <Route path='tables' element={ <TablePage /> } />*/}
                            {/*</Route>*/}
                        </Routes>
                </Content>
            </Layout>
        </BrowserRouter>
    </div>
  );
}

export default App;
