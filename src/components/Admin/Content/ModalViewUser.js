import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash';
import { useTranslation } from "react-i18next";

const ModalViewUser = (props) => {
    const { show, setShow, dataUpdate } = props;
    // const [show, setShow] = useState(false);
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        props.resetUpdateData();
    };

    useEffect(() => {
        console.log('run use efffect');
        if (!_.isEmpty(dataUpdate)) {
            //update state

            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }

        }
    }, [dataUpdate]);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }

    }



    const handleSubmitCreateUser = async () => {
        //validate
        // const isValidEmail = validateEmail(email);

        // if (!isValidEmail) {
        //     toast.error('Invalid Email')
        //     return;
        // }

        // if (!password) {
        //     toast.error('Invalid Password')
        //     return;
        // }

        let data = await putUpdateUser(dataUpdate.id, username, role, image);
        console.log(">> Component res: ", data)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUsers();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    console.log('check render: data update', dataUpdate);
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('admin.modal.view')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.modal.email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('admin.modal.pw')}</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6" >
                            <label className="form-label">{t('admin.modal.username')}</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                disabled
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">{t('admin.modal.role')}</label>
                            <select
                                className="form-select"
                                onChange={(event) => setRole(event.target.value)}
                                value={role}
                                disabled
                            >

                                <option value="USER">{t('admin.modal.user')}</option>
                                <option value="ADMIN">{t('admin.modal.admin')}</option>
                            </select>
                        </div>
                        {/* <div className='col-md-12'>
                            <label className='from-label label-upload' htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
                            </label>
                            <input
                                type='file'
                                id='labelUpload' hidden
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div> */}
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>{t('admin.modal.pewview')}</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('admin.modal.btn-close')}
                    </Button>
                    {/* <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button> */}
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalViewUser;