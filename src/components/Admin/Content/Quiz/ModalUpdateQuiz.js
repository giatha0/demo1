import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash';
import { useTranslation } from "react-i18next";

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, options } = props;
    // const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const { t } = useTranslation();

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            //update state
            setId(dataUpdate.id)
            setDescription(dataUpdate.description);
            setName(dataUpdate.name);
            setType(dataUpdate.difficulty);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }

        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        props.resetUpdateData();
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/Description is required');
            return;
        }

        let data = await putUpdateQuizForAdmin(dataUpdate.id, name, type, description, image);
        console.log(">> Component res1: ", data)
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
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.quiz.modal.update')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">{t('admin.quiz.modal.id')}</label>
                            <input
                                type="id"
                                className="form-control"
                                value={id}
                                disabled
                                onChange={(event) => setId(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.quiz.modal.name')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.quiz.modal.des')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6" >
                            <label className="form-label">{t('admin.quiz.modal.diff')}</label>
                            <select
                                className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}
                            // options={options}
                            >
                                <option>{t('admin.quiz.modal.easy')}</option>
                                <option>{t('admin.quiz.modal.medium')}</option>
                                <option>{t('admin.quiz.modal.hard')}</option>
                            </select>

                        </div>
                        <div className='col-md-12'>
                            <label className='from-label label-upload' htmlFor='labelUpload'>
                                <FcPlus />
                                {t('admin.quiz.modal.upload')}
                            </label>
                            <input
                                type='file'
                                id='labelUpload' hidden
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('admin.quiz.modal.preview')}</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.quiz.modal.close')}
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        {t('admin.quiz.modal.save')}
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUpdateQuiz;