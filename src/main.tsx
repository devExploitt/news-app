import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Layout } from './layout/Menu/Layout.tsx';
import { PREFIX } from './helpers/API.ts';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const Main = lazy(() => import('./pages/Main/Main.tsx'));
const Article = lazy(() => import('./pages/Article/Article.tsx'));
const FormPage = lazy(() => import('./pages/Form/FormPage.tsx'));
const Subs = lazy(() => import('./pages/Subs/Subs.tsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <Main />
                    </Suspense>
                )
            },
            {
                path: '/subs',
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <Subs />
                    </Suspense>
                )
            },
            {
                path: '/article/:id',
                element: (
                    <Suspense fallback={<>Loading...</>}>
                        <Article />
                    </Suspense>
                ),
                errorElement: <>Пососал</>,
                loader: async ({ params }) => {
                    return defer({
                        data: new Promise((resolve) => {
                            setTimeout(() => {
                                axios
                                    .get(`${PREFIX}/articles/${params.id}`)
                                    .then((data) => resolve(data));
                            }, 100);
                        })
                    });
                }
            },
            {
                path: '/politics',
                element: <ErrorPage />
            },
            {
                path: '/economy',
                element: <ErrorPage />
            },
            {
                path: '/ulyanovsk',
                element: <ErrorPage />
            }
        ]
    },
    {
        path: '/rofloforma',
        element: (
            <Suspense fallback={<>Loading...</>}>
                <FormPage />
            </Suspense>
        )
    },
    {
        path: '*',
        element: <ErrorPage />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
