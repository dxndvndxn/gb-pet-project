import { Layout, Menu } from 'antd';
import './index.scss'
const { Header: AntdHeader } = Layout;

function Header () {
    return (
        <AntdHeader>
            <div className='logo'>
                Pet project
            </div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
        </AntdHeader>
    )
}

export default Header
