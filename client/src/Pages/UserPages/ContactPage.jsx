import React, { useState, useEffect  } from 'react';
import { ContactDivContainer, MapContainer, CardContainer, DescriptionContainer, StyledText } from "../../Styles/Contact.Styled";
import Navbar from "../../Components/Navbar";
import Footer from '../../Components/Footer';

const Contact = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    const telephoneContent = windowWidth <= 380 ?
    (
        <>
        Telephone: <br/>+(06-20)-222-3333
        </>
    ) : (
        'Telephone: +(06-20)-222-3333'
    );


    return (
        <div>
            <Navbar/>
            <ContactDivContainer>
                <CardContainer className="card">
                    <div className="card-body">
                        <DescriptionContainer>
                            <StyledText>Jumbo poker</StyledText>
                            <StyledText>E-mail: example@example.com</StyledText>
                            <StyledText>{telephoneContent}</StyledText>
                        </DescriptionContainer>
                        <MapContainer
                            id="AcePoker"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2757.9487590318513!2d20.18545!3d46.2711226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4744629e0c8ea50d%3A0xd6b87073d1234939!2sSzeged%2C%20Kankalin%20u.%206%2C%206753!5e0!3m2!1shu!2shu!4v1703070636019!5m2!1shu!2shu"/>
                    </div>
                </CardContainer>
                <CardContainer className="card">
                    <div className="card-body">
                        <DescriptionContainer>
                            <StyledText>Ace poker</StyledText>
                            <StyledText>E-mail: example@example.com</StyledText>
                            <StyledText>{telephoneContent}</StyledText>
                        </DescriptionContainer>
                        <MapContainer
                            id="JumboPoker"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2757.9445623492516!2d20.1853055!3d46.27120599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4744629e0d22b0af%3A0x4ec199749e0a5fda!2sSzeged%2C%20Kankalin%20u.%208%2C%206753!5e0!3m2!1shu!2shu!4v1703071587144!5m2!1shu!2shu"/>
                    </div>
                </CardContainer>
            </ContactDivContainer>
            <Footer/>
        </div>
    );
};

export default Contact;
