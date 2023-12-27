import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { RouterDiv } from "./Styles/Indexjs.Styled";
import NewsPage from "./Pages/UserPages/NewsPage";
import Contact from "./Pages/UserPages/ContactPage";
import AdminPage from "./Pages/AdminPages/AdminPage";
import AcePokerUploadPage from "./Pages/AdminPages/AcePokerUploadPage";
import JumboPokerUploadPage from "./Pages/AdminPages/JumboPokerUploadPage";
import InformationUploadPage from "./Pages/AdminPages/InformationUploadPage";
import AcePokerModifyPage from "./Pages/AdminPages/AcePokerModifyPage";
import JumboPokerModifyPage from "./Pages/AdminPages/JumboPokerModifyPage";
import NewsModifyPage from "./Pages/AdminPages/NewsModifyPage";

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
        },
        {
            path: `/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel/ace-poker/modification`,
            element: <AcePokerModifyPage/>
        },
        {
            path: `/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel/jumbo-poker/modification`,
            element: <JumboPokerModifyPage/>
        },
        {
            path: `/${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}/admin-panel/information/modification`,
            element: <NewsModifyPage/>
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
