import React, { useEffect, useState } from "react";
import {
    ClothCardImage,
    ClothCard,
    StyledDiv,
    ClothCardContainer
} from "../../Styles/Cloth.Styled";
import Pagination from "../Pagination";
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from "../SideBar";

const ClothUserComponent = ({ elements, url }) => {
    const navigate = useNavigate();
    const [ audiences, setAudiences] = useState([])
    const { page } = useParams();
    const [filteredElements, setFilteredElements] = useState(elements?? elements);
    const [recordPerPage, setRecordPerPage] = useState((window.innerHeight >= 1200) ? 12 : 8);
    const [paginationSlice, setPaginationSlice] = useState({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage});
    const minPriceFilter = Math.min(...elements.map(element => element.price));
    const maxPriceFilter = Math.max(...elements.map(element => element.price));
    const [brands, setBrands] = useState([]);
    const [audienceChecked, setAudienceChecked] = useState();
    const [brandChecked, setBrandChecked] = useState();
    const [priceFilter, setPriceFilter] = useState([minPriceFilter, maxPriceFilter]);
    const [elementCountInThisPage, setElementCountInThisPage] = useState();
    const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

    useEffect(() => {
        setPaginationSlice({first: Number(page) * recordPerPage - recordPerPage, second: Number(page) * recordPerPage});
        navigate(`/${url}/1`);
    }, [recordPerPage]);

    useEffect(() => {
        setElementCountInThisPage(filteredElements.slice(paginationSlice.first, paginationSlice.second).length);
    }, [filteredElements, paginationSlice]);

    useEffect(() => {
        const handleResize = () => {
            setWindowInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [window.innerWidth]);

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

    useEffect(() => {
        getFilters();
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

    const handlePriceInputChange = (type, value) => {
        const numericValue = Number(value);
        if (type === 'min') {
            setPriceFilter([numericValue, priceFilter[1]]);
        } else if (type === 'max') {
            setPriceFilter([priceFilter[0], numericValue]);
        }
    };
    
    const getFilters = () => {
        const uniqueBrands = [...new Set(elements.map(element => element.brand))];
        const uniqueAudiences = [...new Set(elements.map(element => element.audience))];
        setBrands(uniqueBrands);
        setAudiences(uniqueAudiences);
    };

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
            <SideBar
                audiences = { audiences }
                brands = { brands }
                audienceChecked = {audienceChecked}
                handleAudienceCheckBoxChange = { handleAudienceCheckBoxChange }
                priceFilter = { priceFilter }
                handlePriceInputChange = { handlePriceInputChange }
                maxPriceFilter = { maxPriceFilter }
                handlePriceChange = { handlePriceChange }
                brandChecked = { brandChecked }
                handleBrandCheckBoxChange = { handleBrandCheckBoxChange }/>
            <div className="container py-4">
                <div className="row justify-content-center shadow-lg pt-4">
                    {filteredElements && filteredElements.slice(paginationSlice.first, paginationSlice.second).map((element, index) => (
                        <ClothCardContainer key={`${index}-${page}-${element.id}-${recordPerPage}-${audienceChecked}-${brandChecked}-${priceFilter}`}>
                            <ClothCard
                                className="card text-black shadow-lg bg-body rounded"
                                style={{ animationDelay: `${index * 0.2}s` }}>
                                <StyledDiv>
                                <ClothCardImage
                                    src={element.image}
                                    className="card-img-top"
                                    alt={element.name}/>
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
                    {console.log(window.innerWidth)}
                    <div className="d-flex justify-content-center" style={{marginTop: `${elementCountInThisPage < 5 && window.innerWidth > 1000 ? "390px" : "20px"}`}} >
                        <Pagination
                            allElementCount = {filteredElements.length}
                            url = { url }
                            page = { page }
                            recordPerPage = { recordPerPage }
                            setPaginationSlice = { setPaginationSlice }
                            elementCount = {elementCountInThisPage}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClothUserComponent;