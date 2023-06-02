import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";


const TableUserPaginate = (props) => {


    const { listUsers, pageCount } = props;
    const { t } = useTranslation();

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);
        console.log(`User requested page number ${event.selected}`);
    };

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
                            <td colSpan={'5'}>{t('admin.modal.table.not-f')}</td>
                        </tr>
                    }
                </tbody>
            </table>
            <div className="use-pagination d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>


        </>
    )
}

export default TableUserPaginate;