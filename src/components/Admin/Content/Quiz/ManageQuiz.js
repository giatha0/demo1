import './ManageQuiz.scss';
import { useState } from 'react';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { useTranslation } from "react-i18next";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [listQuiz, setListQuiz] = useState([]);
    const { t } = useTranslation();

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }
        let res = await postCreateNewQuiz(description, name, type?.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('');
            setDescription('');
            setImage(null);
            await props.fetchQuiz();
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">

            <Tabs
                defaultActiveKey="quiz-manage"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="quiz-manage" title={t('admin.quiz.manage')}>
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">{t('admin.quiz.add')}</legend>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Your quiz name'
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label >{t('admin.quiz.name')}</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='description'
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label>{t('admin.quiz.des')}</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder={"Quiz type...."}
                                />
                            </div>
                            <div className='more-actions form-group'>
                                <label className='mb-1'> {t('admin.quiz.upload')}</label>
                                <input
                                    type='file'
                                    className='form-control'
                                    onChange={(event) => handleChangeFile(event)}
                                />
                            </div>
                            <div className='mt-3'>
                                <button
                                    onClick={() => handleSubmitQuiz()}
                                    className='btn btn-warning'>{t('admin.quiz.save')}</button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail">
                        <TableQuiz
                            options={options}

                        />
                    </div>
                </Tab>
                <Tab eventKey="quiz-update" title={t('admin.quiz.update')}>
                    <QuizQA />
                </Tab>
                <Tab eventKey="assign-user" title={t('admin.quiz.assign-u')}>
                    <AssignQuiz />
                </Tab>
            </Tabs>

        </div>
    )
}

export default ManageQuiz;