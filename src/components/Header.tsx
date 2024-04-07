import { Box, Container, Flex, LinkBox } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export type HeaderProps = {};

export function Header(props: HeaderProps) {
  return (
    <Box height={50} boxShadow="sm">
      <Container display="flex" alignItems="center" justifyContent="space-between" height="100%">
        <Flex gap={4}>
          <Link to="/resources">资源管理器</Link>
          <Link to="/battle">战斗模拟器</Link>
        </Flex>
      </Container>
    </Box>
  );
}
