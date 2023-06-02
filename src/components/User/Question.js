import _ from 'lodash';
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from 'react-i18next';
import { IoIosCloseCircleOutline, IoIosCheckmarkCircleOutline } from 'react-icons/io'


const Question = (props) => {

    const { data, index, isShowAnswer } = props;
    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const { t } = useTranslation();

    if (_.isEmpty(data)) {
        return (<></>)
    }

    const handleHandleCheclbox = (event, aId, qId) => {
        // console.log('check: ', event.target.checked)
        props.handleCheckbox(aId, qId);
    }
    return (
        <>
            {data.image ?
                <div className='q-image'>
                    <img
                        style={{ cursor: 'pointer' }}
                        src={`data:image/jpeg;base64,${data.image}`}
                        onClick={() => setIsPreviewImage(true)}
                    />
                    {isPreviewImage === true &&
                        <Lightbox
                            image={`data:image/jpeg;base64,${data.image}`}
                            title={'Question Image'}
                            onClose={() => setIsPreviewImage(false)}
                        ></Lightbox>

                    }
                </div>
                :
                <div className='q-image'>

                </div>
            }
            <div className="question">{t('user.question.qs')} {index + 1}: {data.questionDescription} ?</div>
            <div className="answer">
                {data.answers && data.answers.length &&
                    data.answers.map((a, index) => {
                        return (
                            <div
                                key={`answer-${index}`}
                                className="a-child">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={a.isSelected}
                                        disabled={props.isSubmitQuiz}
                                        onChange={(event) => handleHandleCheclbox(event, a.id, data.questionId)}
                                    />
                                    <label className="form-check-label">
                                        {a.description}
                                    </label>
                                    {isShowAnswer === true &&

                                        <>
                                            {
                                                a.isSelected === true && a.isCorrect === false
                                                && <IoIosCloseCircleOutline className='incorrect' />
                                            }
                                            {
                                                a.isCorrect === true
                                                && <IoIosCheckmarkCircleOutline className='correct' />
                                            }
                                        </>
                                    }
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;