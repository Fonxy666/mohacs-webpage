import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import NewsPage from "./Pages/NewsPage";
import AdminPage from "./Pages/AdminPage";

import { RouterDiv } from "./Styles/Indexjs.Styled";
import Contact from "./Pages/ContactPage";
import AcePokerUploadPage from "./Pages/AcePokerUploadPage";
import JumboPokerUploadPage from "./Pages/JumboPokerUploadPage";
import InformationUploadPage from "./Pages/InformationUploadPage";

const App = () => {
    const date = new Date();
    const router = createBrowserRouter([
        {
            path: "/",
            element: <NewsPage/>
        },
        {
            path: "/contact",
            element: <Contact/>
        },
        {
            path: `/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel`,
            element: <AdminPage/>
        },
        {
            path: `/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel/ace-poker/upload`,
            element: <AcePokerUploadPage/>
        },
        {
            path: `/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel/jumbo-poker/upload`,
            element: <JumboPokerUploadPage/>
        },
        {
            path: `/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel/information/upload`,
            element: <InformationUploadPage/>
        }
    ]);

    return (
        <React.StrictMode>
            <RouterDiv>
                <RouterProvider router={router}/>
            </RouterDiv>
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

reportWebVitals();
