import { ResourceEditor } from '@/components/ResourceEditor';
import { ResourceTable } from '@/components/ResourceTable';
import { ResourceType } from '@/meta/types';
import { Box, Flex, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';
import { useMap } from 'react-use';

export type ResourcesProps = {};

export function Resources(props: ResourcesProps) {
  const [currentResource, setCurrent] = useState<ResourceType>('card');

  const [editInfo, editInfoAction] = useMap<{
    show: boolean;
    data: undefined | Record<string, unknown>;
  }>({
    show: false,
    data: undefined,
  });
  const showEdit = async (data?: any) => {
    editInfoAction.setAll({
      show: true,
      data: data,
    });
  };
  const hideEdit = () => {
    editInfoAction.setAll({
      show: false,
      data: undefined,
    });
  };

  return (
    <Flex alignItems="stretch" height="100%">
      <Box width={125} flex="none" borderRight="1px solid black">
        <List>
          {Object.keys(ResourceType).map((key) => {
            const currentValue = key as ResourceType;
            return (
              <ListItem
                cursor="pointer"
                textAlign="center"
                whiteSpace="pre"
                p={4}
                key={key}
                onClick={() => {
                  setCurrent(currentValue);
                  hideEdit();
                }}
              >
                {key} {currentResource === currentValue ? ' <==' : ''}
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box flexGrow={1} p={4}>
        <ResourceTable
          onAddAction={() => {
            showEdit();
          }}
          resource={currentResource}
          onEditAction={(d) => showEdit(d)}
        />
      </Box>
      {editInfo.show && (
        <Box p={4} borderLeft="1px solid black" minW={400} width="30%" overflow="auto">
          <ResourceEditor key={(editInfo.data?.id as string) ?? 'new'} data={editInfo.data} resourceType={currentResource} onClose={hideEdit} />
        </Box>
      )}
    </Flex>
  );
}
