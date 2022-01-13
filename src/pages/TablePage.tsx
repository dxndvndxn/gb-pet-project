import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {Table, Button, Space, Form, InputNumber, Input} from 'antd';
import React, { useState } from "react";
import { EditOutlined } from '@ant-design/icons';

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
    console.log(123)
    const { login, isAuth } = useSelector((state: RootState) => state.authReducer)
    const [ dataTable, setDataTable ] = useState(Array(3).fill({
        key: 0,
        name: 'Mark',
        time: new Date().toLocaleString('ru-RU'),
    }).map((el, i) => ({...el, key: (++i).toString(), name: `${el.name} ${i}`})))
    const [form] = Form.useForm()

    // Ключ текущей редактируемой строки
    const [editingKey, setEditingKey] = useState('')

    // TODO не понятно, что здесь за магия происходит
    const edit = (record: Partial<RowType> & { key: React.Key }) => {
        form.setFieldsValue({ ...record })
        setEditingKey(record.key)
    }

    const removeRow = (record: RowType) => {
        const { key } = record
        const filteredDataTable = dataTable.filter(el => el.key !== key)

        setDataTable(filteredDataTable)
    }

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            // TODO не понятно, что означает конструкция as
            const row = (await form.validateFields()) as RowType

            const newData = [...dataTable]
            const index = newData.findIndex(item => key === item.key)

            if (index > -1) {
                const item = newData[index]
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                })
                setDataTable(newData)
                setEditingKey('')
            } else {
                newData.push(row)
                setDataTable(newData)
                setEditingKey('')
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo)
        }
    };

    // Header таблицы
    const columns = [
        { title: 'Id', dataIndex: 'key', key: 'key', editable: true, },
        { title: 'Name', dataIndex: 'name', key: 'name', editable: true, },
        { title: 'Time', dataIndex: 'time', key: 'time', editable: true, },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_: any, record: RowType) => {
                const editable = isEditing(record)

                return (
                    editable ?
                        <Space size="middle">
                            <Button type="primary" onClick={() => save(record.key)} >
                                Save
                            </Button>
                            <Button type="primary" onClick={() => cancel()} danger>
                                Cancel
                            </Button>
                        </Space>
                        :
                        <Space size="middle">
                            <Button onClick={() => edit(record)}>
                                <EditOutlined />
                            </Button>
                            <Button type="primary" onClick={() => removeRow(record)} danger>
                                Delete
                            </Button>
                        </Space>
                )
            },
        },
    ]

    const isEditing = (record: RowType) => record.key === editingKey

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col
        }

        return {
            ...col,
            onCell: (record: RowType) => {

                return {
                    record,
                    inputType: col.dataIndex === 'key' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: isEditing(record),
                }
            },
        }
    })

    const EditableCell = ({ editing, dataIndex, title, inputType, record, children, ...restProps }: CellProps) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item
                        name={ dataIndex }
                        style={{ margin: 0 }}
                        rules={[
                            {
                                required: true,
                                message: `Please Input ${ title }!`,
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
        </>
    )
}

export default TablePage
