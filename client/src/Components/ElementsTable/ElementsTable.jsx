import React, { useState } from "react";
import { TableDiv } from "../../Styles/Table.Styled";

const ElementsTable = ({ elements, headers, onCancel, onModification, onDelete }) => {
    const [selectedElement, setSelectedElement] = useState(null);

    const splitDate = (date) => {
        return date.split(".")[0].replaceAll("-", ".").replace("T", "-");
    }

    return (
        <TableDiv>
            <button className="btn btn-danger" onClick={onCancel}>Vissza a főoldalra</button>
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        {elements && headers && headers.map(header => (
                            <th key={header}> {header} </th>
                        ))}
                        <th>Módosítás/Törlés</th>
                    </tr>
                </thead>
                <tbody>
                    {elements && headers && elements.map((element, index) => (
                        <tr key={index + 1}>
                            <th>{index + 1}</th>
                            {element && Object.entries(element).map(([header, value], elementIndex) => (
                                <React.Fragment key={elementIndex}>
                                    <td>{header === 'image' ? 'Kep' : header === 'date' ? splitDate(value) : value}</td>
                                </React.Fragment>
                            ))}
                                <td>
                                    <button className="btn btn-danger" onClick={() => onModification(element._id, element.name)}>Módosítás</button>
                                    <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modal" style={{marginLeft: "5%"}} onClick={() => setSelectedElement(element)}>Törlés</button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Biztosan törlöd?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedElement && selectedElement !== null && selectedElement.name ? (
                                <div>     
                                    <div>Id: {selectedElement._id}</div>
                                    <div>Név: {selectedElement.name}</div>
                                    <div>Ár: {selectedElement.price}</div>
                                    <div>Kép:</div>
                                    <img src={selectedElement.image}/>
                                </div>
                            ) : (
                                selectedElement && (
                                    <div>
                                        <div>Id: {selectedElement._id}</div>
                                        <div>Név: {selectedElement.title}</div>
                                        <div>Üzenet: {selectedElement.message}</div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Nem</button>
                            <button type="button" className="btn btn-primary" onClick={() => onDelete(selectedElement._id, selectedElement.name)} data-bs-dismiss="modal">Igen</button>
                        </div>
                    </div>
                </div>
            </div>
        </TableDiv>
    );
};

export default ElementsTable;