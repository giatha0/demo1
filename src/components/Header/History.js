import { useEffect, useState } from "react";
import { getHistory } from "../../services/apiService";
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { useTranslation } from "react-i18next";

const History = (props) => {
    const [listHistory, setListHistory] = useState([]);
    const { t } = useTranslation();
    useEffect(() => {
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            let newData = res.DT.data.map(item => {
                return {
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    name: item?.quizHistory?.name ?? "",
                    id: item.id,
                    date: moment(item.createdAt).utc().format('DD/MM/YY hh:mm:ss A')
                }
            })
            if (newData.length > 7) {
                newData = newData.slice(newData.length - 7, newData.length);
            }
            setListHistory(newData)
        }

    }

    return (
        <>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>{t('header.history.id')}</th>
                        <th>{t('header.history.qz-name')}</th>
                        <th>{t('header.history.total-q')}</th>
                        <th>{t('header.history.total-c')}</th>
                        <th>{t('header.history.date')}</th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory.length > 0 &&
                        listHistory.map((item, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            )
                        })
                    }
                    {listHistory && listHistory.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>{t('header.history.n-found')}</td>
                        </tr>
                    }
                </tbody>
            </Table>

        </>
    )
}

export default History;