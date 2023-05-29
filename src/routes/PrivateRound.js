import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRound = (props) => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    // const navigate = useNavigate();
    if (!isAuthenticated) {
        return <Navigate to="/login "></Navigate>
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRound;