import { RouteObject, createBrowserRouter, redirect } from 'react-router-dom';
import { Home, loader } from './pages/Home';
import { Page404 } from './pages/Page404';
import { LayoutDispatcher } from './layouts/LayoutDispatcher';
import { DefaultLayout } from './layouts/DefaultLayout';
import { Resources } from './pages/Resources';
import { Battle } from './pages/Battle';

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
        Component: Home,
      },
      {
        path: 'resources',
        Component: Resources,
      },
      {
        path: 'battle',
        Component: Battle,
      },
      {
        path: '*',
        Component: Page404,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
