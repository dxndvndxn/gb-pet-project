import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {Table, Button, Space, Form, InputNumber, Input} from 'antd';
import React, { useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import EditTableExample from "../components/EditTableExample/EditTableExample";

type RowType = {
    key: string,
    name: string,
    time: string,
}

type CellProps = {
    editing: boolean,
    dataIndex: string,
    title: string,
    inputType: 'number' | 'text',
    record: RowType,
    children: React.ReactNode
}

function TablePage () {
    const { login, isAuth } = useSelector((state: RootState) => state.authReducer)
    const [ dataTable, setDataTable ] = useState(Array(3).fill({
        key: 0,
        name: 'Mark',
        time: new Date().toLocaleString('ru-RU'),
    }).map((el, i) => ({...el, key: (++i).toString(), name: `${el.name} ${i}`})))
    const [form] = Form.useForm()

    // Ключ текущей редактируемой строки
    const [editingKey, setEditingKey] = useState('')

    const edit = (record: Partial<RowType> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record })
        setEditingKey(record.key)
    }

    const removeRow = (record: RowType) => {
        const { key } = record
        const filteredDataTable = dataTable.filter(el => el.key !== key)

        setDataTable(filteredDataTable)
    }

    // Header таблицы
    const columns = [
        { title: 'Id', dataIndex: 'key', key: 'key', editable: true, },
        { title: 'Name', dataIndex: 'name', key: 'name', editable: true, },
        { title: 'Time', dataIndex: 'time', key: 'time', editable: true, },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_: any, record: RowType) => (
                <Space size="middle">
                    <Button onClick={() => edit(record)}>
                        <EditOutlined />
                    </Button>
                    <Button type="primary" onClick={() => removeRow(record)} danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ]

    const isEditing = (record: RowType) => record.key === editingKey

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: (record: RowType) => ({
                record,
                inputType: col.dataIndex === 'key' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        }
    })

    const EditableCell = ({ editing, dataIndex, title, inputType, record, children, ...restProps }: CellProps) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={dataIndex}
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${title}!`,
                            },
                        ]}
                    >
                        { inputNode }
                    </Form.Item>
                ) : (
                    children
                )}
            </td>
        );
    }

    return (
        <>
            <h1>
                Username: { login }
            </h1>
            <h1>
                Status auth: { JSON.stringify(isAuth) }
            </h1>

            <Form form={ form } component={ false }>
                <Table
                    columns={ mergedColumns }
                    dataSource={ dataTable }
                    rowClassName="editable-row"
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                />
            </Form>

            <EditTableExample />
        </>
    )
}

export default TablePage
