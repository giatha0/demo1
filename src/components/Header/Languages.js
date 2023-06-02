import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';


const Languages = () => {
    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }

    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? 'Việt Nam' : 'English'} id="basic-nav-dropdown2" className='languages'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}> {t('languages.en')} </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')} > {t('languages.vi')} </NavDropdown.Item>
            </NavDropdown >
        </>
    )
}

export default Languages;