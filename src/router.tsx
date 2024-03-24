import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Home, loader } from './pages/Home';
import { Page404 } from './pages/Page404';
import { LayoutDispatcher } from './layouts/LayoutDispatcher';
import { DefaultLayout } from './layouts/DefaultLayout';

interface RouteMetaData {
  layout?: 'default';
}

export type MyRouteObject = RouteObject & {
  meta?: RouteMetaData;
  children?: MyRouteObject[];
};

export const routes: MyRouteObject[] = [
  {
    element: (
      <LayoutDispatcher
        layouts={{
          default: DefaultLayout,
        }}
      ></LayoutDispatcher>
    ),
    children: [
      {
        path: '',
        index: true,
        loader: loader,
        Component: Home,
      },
      {
        path: '*',
        Component: Page404,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
