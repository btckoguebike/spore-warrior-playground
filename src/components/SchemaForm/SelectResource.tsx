import { ResourceType } from '@/meta/types';
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ResourceTable } from '../ResourceTable';
import React from 'react';

export type SelectResourceProps = {
  value: string | string[];
  onChange: (string: string | string[]) => void;
  selectMode: 'single' | 'multiple';
  type: ResourceType;
};

export const SelectResource = React.forwardRef((props: SelectResourceProps, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { value, type } = props;

  return (
    <>
      <InputGroup>
        <Input value={Array.isArray(value) ? value.join(',') : value}></Input>
        <InputRightAddon>
          <Button onClick={onOpen}>选择 {type}</Button>
        </InputRightAddon>
      </InputGroup>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent css={{ width: '1200px' }}>
          <ModalHeader>选择 {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ResourceTable {...props} resource={type} />
          </ModalBody>
          <ModalFooter>
            {/* TODO，确定才回填原来的值 */}
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              确定
            </Button>
            <Button variant="ghost" onClick={onClose}>
              取消
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
