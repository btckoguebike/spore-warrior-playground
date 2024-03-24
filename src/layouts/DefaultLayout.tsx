import { ReactNode } from 'react';

export type CommonLayoutProps = {
  children: ReactNode;
};

export function DefaultLayout({ children }: CommonLayoutProps) {
  return <div>{children}</div>;
}
