import { Form, Input, Button, Checkbox } from 'antd';
import { ADMIN, setAuth, setLogin } from "../store/reducers/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {RootState} from "../store/store";

// TODO Не понятно, что должен возвращать компонент, если этот компонент используется для роутинга
function MainPage (): any {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { login } = useSelector((state: RootState) => state.authReducer)

    const onFinish = (values: any) => {
        const { username } = values

        if (username === ADMIN) {
            dispatch(setAuth(true))
            dispatch(setLogin(username))
            navigate('/tables')
        } else {
            // TODO если логин неправильный
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <h1>
                Main page
            </h1>

            <Form
                name="basic"
                wrapperCol={{ offset: 0, span: 5 }}
                initialValues={{ remember: true, username: login }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 0, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default MainPage
