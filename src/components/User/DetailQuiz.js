import { useEffect, useState } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from "react-i18next";
import Languages from "../Header/Languages";


const DetailQuiz = (props) => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const { t } = useTranslation();

    const [isShowModalResult, setIsShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        // console.log('check res1: ', res);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                // Group the elements of Array based on `id` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    })
                    answers = _.orderBy(answers, ['id'], ['asc'])
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data)
        }
    }


    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleFinishQuiz = async () => {
        // console.log(">>> check data before submit: ", dataQuiz)
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {

                let questionId = question.questionId;
                let userAnswerId = [];

                // todo: userAnswerId
                question.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            // submit api
            let res = await postSubmitQuiz(payload);
            // console.log('check res: >>>', res)
            if (res && res.EC === 0) {
                setDataModalResult({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setIsShowModalResult(true);
            } else {
                alert('something wrongs......')
            }
        }
    }
    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })

            // console.log('b>>>: ', b)
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }
    }

    return (
        <>
            <Breadcrumb className="detail-quiz-h">
                <NavLink to='/' className='breadcrumb-item'>
                    {t('user.detail-quiz.home')}
                </NavLink>
                <NavLink to='/users' className='breadcrumb-item'>
                    {t('user.detail-quiz.user')}
                </NavLink>
                <Breadcrumb.Item active>
                    {t('user.detail-quiz.quiz')}
                </Breadcrumb.Item>
                <div className="language">
                    <Languages />
                </div>


            </Breadcrumb>

            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title">
                        {t('user.detail-quiz.quiz')} {quizId}:{location?.state?.quizTitle}
                    </div>
                    <hr />
                    <div className="q-body">
                        <img />
                    </div>
                    <div className="q-content">
                        <Question
                            index={index}
                            handleCheckbox={handleCheckbox}
                            data={
                                dataQuiz && dataQuiz.length > 0
                                    ?
                                    dataQuiz[index]
                                    :
                                    []
                            }
                        />
                    </div>
                    <div className="footer">
                        <button
                            className="btn btn-secondary"
                            onClick={() => handlePrev()}>{t('user.detail-quiz.prev')}</button>
                        <button
                            className="btn btn-primary"
                            onClick={() => handleNext()}>{t('user.detail-quiz.next')}</button>
                        <button
                            className="btn btn-warning"
                            onClick={() => handleFinishQuiz()}>{t('user.detail-quiz.finish')}</button>
                    </div>
                </div>
                <div className="right-content">
                    <RightContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                    />
                </div>
                <ModalResult
                    show={isShowModalResult}
                    setShow={setIsShowModalResult}
                    dataModalResult={dataModalResult}
                />
            </div>
        </>

    )
}

export default DetailQuiz;