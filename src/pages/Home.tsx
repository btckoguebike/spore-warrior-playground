import { Box } from '@chakra-ui/react';

export type HomeProps = {};

export function loader() {
  return {
    layout: 'default',
  };
}

export function Home(props: HomeProps) {
  return (
    <Box mt={100} textAlign="center">
      Welcome to Game playground.
    </Box>
  );
}
