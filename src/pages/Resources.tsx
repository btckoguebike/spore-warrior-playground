import { ResourceEditor } from '@/components/ResourceEditor';
import { ResourceTable } from '@/components/ResourceTable';
import { ResourceType } from '@/meta/types';
import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';

export type ResourcesProps = {};

export function Resources(props: ResourcesProps) {
  const [currentResource, setCurrent] = useState<ResourceType>('card');

  const [showEdit, setShowEdit] = useState(false);

  return (
    <Flex alignItems="stretch" height="100%">
      <Box width={200} borderRight="1px solid black">
        <List>
          {Object.keys(ResourceType).map((key) => {
            const currentValue = key as ResourceType;
            return (
              <ListItem cursor="pointer" textAlign="center" p={4} key={key} onClick={() => setCurrent(currentValue)}>
                {key} {currentResource === currentValue ? ' <==' : ''}
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box flexGrow={1} p={4}>
        <ResourceTable
          onAddAction={() => {
            setShowEdit(true);
          }}
          resource={currentResource}
        />
      </Box>
      {showEdit && (
        <Box p={4} borderLeft="1px solid black">
          <ResourceEditor />
        </Box>
      )}
    </Flex>
  );
}
