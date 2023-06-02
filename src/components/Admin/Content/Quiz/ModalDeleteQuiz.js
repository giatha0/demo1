import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props;
    const { t } = useTranslation();

    const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async () => {

        let data = await deleteQuizForAdmin(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.quiz.modal.confirm-qz')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('admin.quiz.modal.delete-qz')}
                    <b>
                        {dataDelete && dataDelete.id ? dataDelete.id : ""}
                    </b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.quiz.modal.cancel')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                        {t('admin.quiz.modal.confirm')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default ModalDeleteQuiz;