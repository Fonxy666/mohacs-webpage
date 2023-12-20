import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const App = () => {

    const router = createBrowserRouter([
        {
        path: "/",
        element: <div>Hello world!</div>
        },
    ]);

    return (
        <React.StrictMode>
        <RouterProvider router={router}/>
        </React.StrictMode>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
