import { Header } from '@/components/Header';
import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

export type CommonLayoutProps = {
  children?: ReactNode;
};

export function DefaultLayout({ children }: CommonLayoutProps) {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />
      <Box flexGrow={1}>{children}</Box>
    </Flex>
  );
}
