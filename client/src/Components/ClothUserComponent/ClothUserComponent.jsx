import React, { useEffect, useState } from "react";
import {
    ClothCardImage,
    ClothCard,
    StyledDiv,
    ClothCardContainer
} from "../../Styles/Cloth.Styled";
import Pagination from "../Pagination";
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ClothUserComponent = ({ elements, audiences, url }) => {
    const { page } = useParams();
    const [filteredElements, setFilteredElements] = useState(elements?? elements);
    const [recordPerPage, setRecordPerPage] = useState((window.innerHeight >= 1200) ? 12 : 8);
    const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage});
    const maxPriceFilter = 30000;
    const [brands, setBrands] = useState([]);
    const [audienceChecked, setAudienceChecked] = useState();
    const [brandChecked, setBrandChecked] = useState();
    const [priceFilter, setPriceFilter] = useState([1, maxPriceFilter]);

    const getBrandsFunctionForFilter = () => {
        const uniqueBrands = [...new Set(elements.map(element => element.brand))];
        setBrands(uniqueBrands);
    };

    useEffect(() => {
        const handleResize = () => {
            setRecordPerPage((window.innerHeight >= 1200) ? 12 : 8);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerHeight]);

    useEffect(() => {
        getBrandsFunctionForFilter();
    }, [elements]);

    const handlePriceChange = (values) => {
        setPriceFilter(values);
    };

    const handleAudienceCheckBoxChange = (incomingAudience, checked) => {
        if (checked) {
            setAudienceChecked(incomingAudience);
        } else {
            setAudienceChecked();
        }
    };
    
    const handleBrandCheckBoxChange = (incomingBrand, checked) => {
        if (checked) {
            setBrandChecked(incomingBrand);
        } else {
            setBrandChecked();
        }
    };

    useEffect(() => {
        if (audienceChecked && audienceChecked.length > 0 && brandChecked && brandChecked.length > 0) {
            const newFilteredElements = elements.filter(
                (element) =>
                    element.audience === audienceChecked &&
                    element.brand === brandChecked &&
                    element.price >= priceFilter[0] &&
                    element.price <= priceFilter[1]
            );
            setFilteredElements(newFilteredElements);
        } else if (audienceChecked && audienceChecked.length > 0 && !brandChecked) {
            const newFilteredElements = elements.filter(
                (element) =>
                    element.audience === audienceChecked &&
                    element.price >= priceFilter[0] &&
                    element.price <= priceFilter[1]
            );
            setFilteredElements(newFilteredElements);
        } else if (!audienceChecked && brandChecked && brandChecked.length > 0) {
            const newFilteredElements = elements.filter(
                (element) =>
                    element.brand === brandChecked &&
                    element.price >= priceFilter[0] &&
                    element.price <= priceFilter[1]
            );
            setFilteredElements(newFilteredElements);
        } else {
            const newFilteredElements = elements.filter(
                (element) => element.price >= priceFilter[0] && element.price <= priceFilter[1]
            );
            setFilteredElements(newFilteredElements);
        }
    }, [audienceChecked, brandChecked, priceFilter]);

    const splitPrice = (number) => {
        const price = number.toString();

        if (price.length > 3) {
            const formattedPrice = price.split("").reverse().map((digit, index) => {
                return (index > 0 && index % 3 === 0) ? digit + '.' : digit;
            }).reverse().join('');
            return formattedPrice + ' Ft.-';
        }
        return price + ' Ft.-';
    };

    return (
        <section className="d-flex">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '220px', minHeight: "95vh" }}>
                <div href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <span className="fs-5">Ace & Jumbo Poker</span>
                 </div>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li>
                        <p className="d-inline-flex gap-1">
                            <button className="btn text-white" type="button">
                                Szürési lehetőségek
                            </button>
                        </p>
                        <div className="collapsed" id="collapse">
                            <div className="card card-body">
                                <label className="form-label text-black">Tipus:</label>
                                {audiences && audiences.map((audience, index) => (
                                    <div className="form-check form-switch text-black" key={index}>
                                        <input 
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`flexSwitchCheckDefault_${index}`}
                                            onChange={(event) => handleAudienceCheckBoxChange(audience, event.target.checked)}
                                            checked={audienceChecked === audience}/>
                                        <label className="form-check-label" htmlFor={`flexSwitchCheckDefault_${index}`}>{audience}</label>
                                    </div>
                                ))}
                                <hr/>
                                <div>
                                    <label htmlFor="price-range" className="form-label text-black">Ár: <br/>{priceFilter[0]} - {priceFilter[1]}</label>
                                    <Slider
                                        range
                                        min={1}
                                        max={maxPriceFilter}
                                        defaultValue={[1, maxPriceFilter]}
                                        value={priceFilter}
                                        onChange={handlePriceChange}/>
                                </div>
                                <div>
                                    <label className="form-label text-black">Márka:</label>
                                    {brands && brands.map((brand, index) => (
                                        <div className="form-check form-switch text-black" key={index}>
                                        <input 
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`flexSwitchCheckDefault_${index}`}
                                            onChange={(event) => handleBrandCheckBoxChange(brand, event.target.checked)}
                                            checked={brandChecked === brand}/>
                                        <label className="form-check-label" htmlFor={`flexSwitchCheckDefault_${index}`}>{brand}</label>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <hr />
                <hr />
            </div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    {filteredElements && filteredElements.slice(paginationSlice.first, paginationSlice.second).map((element, index) => (
                        <ClothCardContainer key={`${index}-${page}-${element.id}-${recordPerPage}-${audienceChecked}`}>
                            <ClothCard
                                className="card text-black"
                                style={{ animationDelay: `${index * 0.2}s` }}>
                                <StyledDiv>
                                <ClothCardImage
                                    src={element.image}
                                    className="card-img-top"
                                    alt={element.name}
                                    />
                                <div className="card-body pb 5">
                                    <div className="text-center">
                                        <h5 className="card-title">{element.audience} {element.name}</h5>
                                        <p className="text-muted mb-4">{element.brand}</p>
                                    </div>
                                    <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                        <span className="ms-auto mb-2" style={{marginTop: "-15px"}}>{splitPrice(element.price)}</span>
                                    </div>
                                </div>
                                </StyledDiv>
                            </ClothCard>
                        </ClothCardContainer>
                    ))}
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            elementCount = {filteredElements.length}
                            url = { url }
                            page = { page }
                            recordPerPage = { recordPerPage }
                            setPaginationSlice = { setPaginationSlice }
                            nextButtonDisable = {filteredElements.slice(paginationSlice.first, paginationSlice.second).length}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClothUserComponent;