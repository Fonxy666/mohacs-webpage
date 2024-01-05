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
import NewsUploadPage from "./Pages/AdminPages/NewsUploadPage";
import AcePokerModifyPage from "./Pages/AdminPages/AcePokerModifyPage";
import JumboPokerModifyPage from "./Pages/AdminPages/JumboPokerModifyPage";
import NewsModifyPage from "./Pages/AdminPages/NewsModifyPage";
import AcePokerChangeDataPage from "./Pages/AdminPages/AcePokerChangeDataPage";
import JumboPokerChangeDataPage from "./Pages/AdminPages/JumboPokerChangeDataPage";
import NewsPokerChangeDataPage from "./Pages/AdminPages/NewsChangeDataPage";
import AcePokerPage from "./Pages/UserPages/AcePokerPage";

const App = () => {
    const date = new Date();
    const currentDate = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
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
            path: "/ace-poker",
            element: <AcePokerPage/>
        },
        {
            path: `/${currentDate}/admin-panel`,
            element: <AdminPage/>
        },
        {
            path: `/${currentDate}/admin-panel/ace-poker/upload`,
            element: <AcePokerUploadPage/>
        },
        {
            path: `/${currentDate}/admin-panel/jumbo-poker/upload`,
            element: <JumboPokerUploadPage/>
        },
        {
            path: `/${currentDate}/admin-panel/new/upload`,
            element: <NewsUploadPage/>
        },
        {
            path: `/${currentDate}/admin-panel/ace-poker/modification`,
            element: <AcePokerModifyPage/>
        },
        {
            path: `/${currentDate}/admin-panel/jumbo-poker/modification`,
            element: <JumboPokerModifyPage/>
        },
        {
            path: `/${currentDate}/admin-panel/new/modification`,
            element: <NewsModifyPage/>
        },
        {
            path: `/${currentDate}/admin-panel/ace-poker/modification/:id`,
            element: <AcePokerChangeDataPage/>
        },
        {
            path: `/${currentDate}/admin-panel/jumbo-poker/modification/:id`,
            element: <JumboPokerChangeDataPage/>
        },
        {
            path: `/${currentDate}/admin-panel/new/modification/:id`,
            element: <NewsPokerChangeDataPage/>
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
