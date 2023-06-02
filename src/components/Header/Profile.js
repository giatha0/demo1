import { Modal } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './Profile.scss';
import UserInfor from "./UserInfor";
import ChangePassword from "./ChangePassword";
import History from "./History";
import { useTranslation } from "react-i18next";


const Profile = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size='xl'
                backdrop="static"
                className="profile"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('header.title-manage')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="home" title="Information" className="userinfor">
                            <UserInfor
                                setShow={setShow}
                                show={show}
                            />
                        </Tab>
                        <Tab eventKey="profile" title="Password" className="changepw">
                            <ChangePassword
                                setShow={setShow}
                                show={show}
                            />
                        </Tab>
                        <Tab eventKey="longer-tab" title="History">
                            <History />
                        </Tab>

                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default Profile;