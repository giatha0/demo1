import { useTranslation } from "react-i18next";

const TableUser = (props) => {

    const { listUsers } = props;
    const { t } = useTranslation();


    return (
        <>
            <table className="table table-hover table-border">
                <thead>
                    <tr>
                        <th scope="col">{t('admin.modal.table.id')}</th>
                        <th scope="col">{t('admin.modal.table.username')}</th>
                        <th scope="col">{t('admin.modal.table.email')}</th>
                        <th scope="col">{t('admin.modal.table.role')}</th>
                        <th>{t('admin.modal.table.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`table-users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>@{item.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleClickBtnViewUser(item)}
                                        >
                                            {t('admin.modal.table.view')}
                                        </button>

                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >
                                            {t('admin.modal.table.update')}
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            {t('admin.modal.table.delete')}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>{t('admin.modal.table.not-f')}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableUser;