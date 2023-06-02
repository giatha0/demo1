import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import _ from 'lodash';
import { FcPlus } from 'react-icons/fc';
import { putUpdateProfile } from "../../services/apiService";
import { toast } from 'react-toastify';


const UserInfor = (props) => {
    const { show, setShow } = props;

    const account = useSelector(state => state.user.account)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email);
            setUsername(account.username);
            setRole(account.role);
            setImage("");
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`);
            }
        }
    }, [account]);

    const handleClose = () => {
        setShow(false);
        setUsername("");
        setImage("");
        setPreviewImage("");
    };

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("");
        }

    }

    const handleProfile = async () => {

        let data = await putUpdateProfile(username, image);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }

    }



    return (
        <>
            <form className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}

                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        disabled
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        value={role}
                        onChange={(event) => setRole(event.target.role)}
                        disabled
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label label-upload" htmlFor="labelUpload">
                        <FcPlus />
                        Upload image
                    </label>
                    <input
                        type="file"
                        id="labelUpload"
                        onChange={(event) => handleUploadImage(event)}
                        hidden
                    />
                </div>
                <div className='col-md-12 img-preview'>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        <span>Image</span>
                    }
                </div>
            </form>

            <div className='mt-3'>
                <button
                    className='btn btn-warning'
                    onClick={() => handleProfile()}
                >
                    Update
                </button>
            </div >

        </>
    )
}

export default UserInfor;