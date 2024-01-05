import React from "react";
import {
    Container,
    ClothCard,
    ClothCardImage,
    ClothCardContent,
    ClothCardText,
} from "../../Styles/Cloth.Styled";

const ClothUserComponent = ({ elements }) => { 
    return (
        <Container>
            {elements && elements.map(element => (
                <ClothCard key={element._id}>
                    <ClothCardImage src={element.image} alt={element.name} />
                    <ClothCardContent>
                        <ClothCardText>Nev: {element.name}</ClothCardText>
                        <ClothCardText>Marka: {element.brand}</ClothCardText>
                        <ClothCardText>Ar: {element.price}</ClothCardText>
                        <ClothCardText>Tipus: {element.audience}</ClothCardText>
                    </ClothCardContent>
                </ClothCard>
            ))}
        </Container>
    );
};

export default ClothUserComponent;