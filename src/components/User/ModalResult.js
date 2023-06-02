import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';


const ModalResult = (props) => {
    const { show, setShow, dataModalResult, handleShowAnswer } = props;
    const handleClose = () => setShow(false);
    const { t } = useTranslation();

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('user.modalresult.result')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {t('user.modalresult.qs')}<b> {dataModalResult.countTotal} </b>
                    </div>
                    <div>
                        {t('user.modalresult.as')}<b> {dataModalResult.countCorrect} </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleClose();
                            props.handleShowAnswer();
                        }
                        }

                    >
                        {t('user.modalresult.show-as')}
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        {t('user.modalresult.close')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalResult;