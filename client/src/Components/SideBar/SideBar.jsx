import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SideBar = ({ audiences, brands, audienceChecked, handleAudienceCheckBoxChange, priceFilter, handlePriceInputChange, maxPriceFilter, handlePriceChange, handleBrandCheckBoxChange, brandChecked }) => {
    
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '220px', minHeight: "95vh" }}>
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
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
                            <div className="overflow-auto" style={{ maxHeight: '100px' }}>
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
                            </div>
                            <hr/>
                            <div>
                                <label htmlFor="min-price" className="form-label text-black">Min Ár:</label>
                                <input
                                    type="numeric"
                                    id="min-price"
                                    className={`form-control`}
                                    value={priceFilter[0]}
                                    onChange={(e) => handlePriceInputChange('min', e.target.value)}/>
                                <label htmlFor="max-price" className="form-label text-black">Max Ár:</label>
                                <input
                                    type="numeric"
                                    id="max-price"
                                    className="form-control"
                                    value={priceFilter[1]}
                                    onChange={(e) => handlePriceInputChange('max', e.target.value)}/>
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
                                <div className="overflow-auto" style={{ maxHeight: '100px' }}>
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
                    </div>
                </li>
            </ul>
            <hr />
            <hr />
        </div>
    )
}

export default SideBar;