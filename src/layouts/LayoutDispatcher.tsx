import { ComponentType } from 'react';
import { Outlet, ScrollRestoration, useMatches } from 'react-router-dom';

export type LayoutDispatcherProps = {
  matchIndex?: number;
  layouts: Record<string, ComponentType>;
  defaultLayout?: string;
};

export type DefineLayout =
  | null
  | string
  | {
      name: string;
      props: Record<string, unknown>;
    };

export function LayoutDispatcher({ matchIndex = 1, layouts = {}, defaultLayout = 'default' }: LayoutDispatcherProps) {
  const matches = useMatches();
  const match = matches[matchIndex];
  const layout: DefineLayout | undefined = (match?.data as any)?.layout;

  if (layout === null) {
    return (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    );
  } else {
    const layoutName = typeof layout === 'string' ? layout : layout?.name ?? defaultLayout;
    const LayoutComponent = layouts[layoutName];
    if (typeof LayoutComponent !== 'function') {
      throw new Error(`did not find layout ${layoutName}.`);
    }
    const layoutProps = ((layout as any) || {}).props || {};
    return (
      <>
        <LayoutComponent {...layoutProps}>
          <Outlet />
        </LayoutComponent>
        <ScrollRestoration />
      </>
    );
  }
}
