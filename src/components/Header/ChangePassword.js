import { useState } from "react";
import { postChangePassword } from "../../services/apiService";
import { toast } from "react-toastify";
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

const ChangePassword = (props) => {
    const { show, setShow } = props;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleClose = () => {
        setShow(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    console.log(currentPassword, newPassword, confirmPassword);
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do NOT match")
            return;
        }

        let res = await postChangePassword(currentPassword, newPassword);

        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose();
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <form className="row g-3">
                <div className="col-md-4 pass-group">
                    <label className="form-label">Current Password</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                    />
                    {isShowPassword ?
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className="col-md-4 pass-group" >
                    <label className="form-label">New Password</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                    {isShowPassword ?
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className="col-md-4 pass-group" >
                    <label className="form-label">Confirm Password</label>
                    <input
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    {isShowPassword ?
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className='icons-eye'
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>

            </form>
            <div className='mt-3'>
                <button
                    className='btn btn-warning'
                    onClick={() => handleChangePassword()}
                >
                    Change Password
                </button>
            </div >
        </>
    )
}

export default ChangePassword;