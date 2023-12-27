import React from "react";

const ClothTable = ({ clothes, headers, onCancel }) => {

    return (
        <div>
            <button className="btn btn-danger" onClick = { onCancel }>Vissza a főoldalra</button>
            <table className="table">
                <thead>
                    <tr>
                        {clothes && headers && headers.map(header => (
                            <th>{header}</th>
                        ))}
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {clothes && headers && clothes.map((cloth, index) => (
                        <tr>
                            <th>{index+1}</th>
                            {cloth && Object.values(cloth).map((element, elementIndex) => (
                                <td key={elementIndex}>
                                    {element.length > 100 ? 
                                        <div>Kep</div> : <div>{element}</div>
                                    }
                                </td>
                            ))}
                            <td>
                                <button className="btn btn-danger">Módosítás</button>
                                <button className="btn btn-danger" style={{marginLeft: "5px"}}>Törlés</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClothTable;
