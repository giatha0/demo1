import CountDown from "./CountDown";
import { useRef } from 'react';

const RightContent = (props) => {
    const { dataQuiz } = props;
    const refDiv = useRef([]);

    const onTimeUp = () => {
        props.handleFinishQuiz();
    }

    const getClassQuestion = (question) => {
        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return "question selected";
            }
        }
        return "question";
    }

    const handleClickQuestion = (question, index) => {
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === 'question clicked') {
                    item.className = 'question';
                }
            })
        }

        if (question && question.answers.length > 0) {
            let isAnswered = question.answers.find(a => a.isSelected === true);
            if (isAnswered) {
                return;
            }

        }

        props.setIndex(index);
        refDiv.current[index].className = "question clicked"
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&

                    dataQuiz.map((question, index) => {
                        return (
                            <div
                                key={`question-abc-${index}`}
                                className={getClassQuestion(question)}
                                onClick={() => handleClickQuestion(question, index)}
                                ref={element => refDiv.current[index] = element}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }


            </div>
        </>
    )
}

export default RightContent;