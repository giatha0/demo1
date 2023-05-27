import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateQuizForAdmin } from '../../../../services/apiService';
import _ from 'lodash';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, options } = props;
    // const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

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
                    <Modal.Title>Update A Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">

                        <div className="col-md-6">
                            <label className="form-label">ID</label>
                            <input
                                type="id"
                                className="form-control"
                                value={id}
                                disabled
                                onChange={(event) => setId(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-md-6" >
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}
                            // options={options}
                            >
                                <option>EASY</option>
                                <option>MEDIUM</option>
                                <option>HARD</option>
                            </select>

                        </div>
                        <div className='col-md-12'>
                            <label className='from-label label-upload' htmlFor='labelUpload'>
                                <FcPlus /> Upload File Image
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
                                <span>Preview Image</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ModalUpdateQuiz;