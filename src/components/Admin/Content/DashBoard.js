import './DashBoard.scss';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverview } from '../../../services/apiService';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";

const DashBoard = (props) => {

    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchDataOverview();
    }, [])

    const fetchDataOverview = async () => {
        let rs = await getOverview();
        if (rs && rs.EC === 0) {
            setDataOverview(rs.DT);
            //process data chart
            let Qz = 0, Qs = 0, As = 0;
            Qz = rs.DT.others.countQuiz ?? 0;
            Qs = rs.DT.others.countQuestions ?? 0;
            As = rs.DT.others.countAnswers ?? 0;

            const data = [
                {
                    "name": "Quizzes",
                    "Qz": Qz
                },
                {
                    "name": "Questions",
                    "Qs": Qs
                },
                {
                    "name": "Answers",
                    "As": As
                }
            ];
            setDataChart(data);
        }

    }


    console.log('check data: ', dataOverview)
    return (
        <div className="dashboard-container">
            <div className='title'>
                {t('admin.db.dashboard')}
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>{t('admin.db.t-user')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users
                                && dataOverview.users.total ?
                                <>{dataOverview.users.total}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.db.t-qz')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.db.t-qs')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuestions ?
                                <>{dataOverview.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.db.t-as')}</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#fcb12a" />
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div>
    )
}

export default DashBoard;