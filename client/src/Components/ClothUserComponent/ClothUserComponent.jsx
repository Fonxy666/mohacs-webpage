import React from "react";
import { ClothCardImage, ClothCard } from "../../Styles/Cloth.Styled";

const ClothUserComponent = ({ elements }) => {

    const splitPrice = (number) => {
        const price = number.toString();
        if (price > 999) {
          const formattedPrice = price.split("").reverse().map((digit, index) => {
            return (index > 0 && index % 3 === 0) ? digit + '.' : digit;
          }).reverse().join('');
      
          return formattedPrice;
        }
        return price;
    };

    return (
      <section>
        <div className="container py-5">
          <div className="row justify-content-center">
            {elements && elements.map((element, index) => (
              <div key={index} className="col-md-3" style={{margin: "5px"}}>
                <ClothCard 
                    className="card text-black"
                    style={{ animationDelay: `${index * 0.2}s` }}>
                  <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                  <ClothCardImage
                    src={element.image}
                    className="card-img-top"
                    alt={element.name}
                  />
                  <div className="card-body">
                    <div className="text-center">
                      <h5 className="card-title">{element.audience} {element.name}</h5>
                      <p className="text-muted mb-4">{element.brand}</p>
                    </div>
                    <div className="d-flex justify-content-between total font-weight-bold mt-4">
                      <span>Ár</span>
                      <span style={{marginRight: "30px"}}>{splitPrice(element.price)} Ft.-</span>
                    </div>
                  </div>
                </ClothCard>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

export default ClothUserComponent;