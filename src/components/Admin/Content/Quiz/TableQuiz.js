import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ManageQuiz from "./ManageQuiz";
import { useTranslation } from "react-i18next";

const TableQuiz = (props) => {
    const { options } = props;
    const [listQuiz, setListQuiz] = useState([]);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        // setDataDelete({});
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }

    }

    const handleClickBtnDeleteQuiz = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
        console.log('check quiz', quiz)
    }

    const handleClickBtnUpdateQuiz = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }
    return (
        <>
            <div>{t('admin.table-qz.list')}</div>
            <table className="table table-bordered table-hover table-striped my-2">
                <thead>
                    <tr>
                        <th>{t('admin.table-qz.id')}</th>
                        <th>{t('admin.table-qz.name')}</th>
                        <th>{t('admin.table-qz.des')}</th>
                        <th>{t('admin.table-qz.type')}</th>
                        <th>{t('admin.table-qz.action')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleClickBtnUpdateQuiz(item)}
                                    >
                                        {t('admin.table-qz.edit')}
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleClickBtnDeleteQuiz(item)}
                                    >
                                        {t('admin.table-qz.delete')}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                resetUpdateData={resetUpdateData}
                options={options}
            />
        </>
    )
}

export default TableQuiz;
