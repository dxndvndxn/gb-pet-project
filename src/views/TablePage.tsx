import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// TODO Не понятно, что должен возвращать компонент, если этот компонент используется для роутинга
function TablePage (): any {
    const { login, isAuth } = useSelector((state: RootState) => state.authReducer)

    return (
        <>
            <h1>
                Username: { login }
            </h1>
            <h1>
                Status auth: { JSON.stringify(isAuth) }
            </h1>
        </>
    )
}

export default TablePage
