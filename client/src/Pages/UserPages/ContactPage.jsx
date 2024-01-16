import React, { useState, useEffect  } from 'react';
import { ContactDivContainer, MapContainer, CardContainer, DescriptionContainer, StyledText } from "../../Styles/Contact.Styled";
import Navbar from "../../Components/Navbar";
import Footer from '../../Components/Footer';

const Contact = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const telephoneNumber = 

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
      }, []);

    const telephoneStyle = (number) => {
        return windowWidth <= 380 ? (
            <>
                Telefon: <br/>{number}
            </>
        ) : (
            `Telefon: ${number}`
        );
    }


    return (
        <div>
            <Navbar/>
            <ContactDivContainer>
                <CardContainer className="card">
                    <div className="card-body">
                        <DescriptionContainer>
                            <StyledText>Jumbó póker</StyledText>
                            <StyledText>E-mail: posztjozsef@vipmail.hu</StyledText>
                            <StyledText>{telephoneStyle("+(06-30)-247-6579")}</StyledText>
                        </DescriptionContainer>
                        <MapContainer
                            id="AcePoker"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2772.04368651778!2d18.686278400000003!3d45.990356999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4742d6b2bfe17f1d%3A0x5800fbf1a5be61aa!2zTW9ow6FjcywgU3phYmFkc8OhZyB1LiA0MiwgNzcwMA!5e0!3m2!1shu!2shu!4v1705324709983!5m2!1shu!2shu"/>
                    </div>
                </CardContainer>
                <CardContainer className="card">
                    <div className="card-body">
                        <DescriptionContainer>
                            <StyledText>Ász póker</StyledText>
                            <StyledText>E-mail: posztjozsef@vipmail.hu</StyledText>
                            <StyledText>{telephoneStyle("+(06-30)-288-7792")}</StyledText>
                        </DescriptionContainer>
                        <MapContainer
                            id="JumboPoker"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2772.0357983685894!2d18.684704600000003!3d45.9905145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4742d6b2b59866e7%3A0x1b5344f098ca4cd3!2zTW9ow6FjcywgRMOzenNhIEd5w7ZyZ3kgdS4gMTAsIDc3MDA!5e0!3m2!1shu!2shu!4v1705327281975!5m2!1shu!2shu"/>
                    </div>
                </CardContainer>
            </ContactDivContainer>
            <Footer/>
        </div>
    );
};

export default Contact;
