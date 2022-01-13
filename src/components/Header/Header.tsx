import { Layout, Menu } from 'antd';
import './index.scss'
import { Link } from "react-router-dom";
const { Header: AntdHeader } = Layout;

function Header () {
    return (
        <AntdHeader>
            <Link to='/' className='logo'>
                Pet project
            </Link>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
        </AntdHeader>
    )
}

export default Header
