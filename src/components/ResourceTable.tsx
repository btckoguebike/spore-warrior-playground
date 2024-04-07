import { ResourceType } from '@/meta/types';
import { resourceDb } from '@/models/db';
import { ResourceSchemas } from '@/models/resources';
import { invoke } from '@/utils/common';
import { QuestionIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  Flex,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { useLiveQuery } from 'dexie-react-hooks';
import { get, isNil } from 'lodash-es';
import { Else, If, Then } from 'react-if';

export type ResourceTableProps = {
  resource: ResourceType;
  selectMode?: 'single' | 'multiple';
  value?: number | number[];
  onChange?: (value?: number | number[]) => void;
  onAddAction?: () => void;
  onEditAction?: (data: any) => void;
  rowKey?: string;
};

export function ResourceTable({ resource, selectMode, rowKey = 'id', onAddAction, onEditAction, value: propValue, onChange }: ResourceTableProps) {
  const schema = ResourceSchemas[resource];
  const tableHandler = resourceDb[resource];
  if (!resource || !schema) {
    throw new Error('Resource table not found ' + resource);
  }
  const data = useLiveQuery(async () => {
    const data = await tableHandler.toArray();
    return {
      resource: resource,
      data: data,
    };
  }, [resource]);
  const selecting = Boolean(selectMode);
  const isSingle = selectMode === 'single';
  const canEdit = !selecting;
  const dataList = data?.resource === resource ? data.data : [];
  const selection = Array.isArray(propValue) ? propValue : !isNil(propValue) ? [propValue] : [];

  const toggleSelct = (id: number) => {
    const index = selection.findIndex((d) => d === id);
    if (index > -1) {
      if (isSingle) {
        onChange?.();
      } else {
        onChange?.(selection.splice(index, 1));
      }
    } else {
      if (isSingle) {
        onChange?.(id);
      } else {
        onChange?.(selection.concat([id]));
      }
    }
  };

  const columns = Object.entries(schema.shape);
  if (selecting) {
    columns.unshift(['_select']);
  }
  if (canEdit) {
    columns.push(['_action']);
  }

  return (
    <Flex flexDirection="column" gap={4}>
      {canEdit && (
        <Flex>
          <Button onClick={() => onAddAction?.()}>添加</Button>
        </Flex>
      )}
      <Table>
        <Thead>
          <Tr>
            {columns.map(([key, shape]) => {
              if (key === '_select') {
                return <Th key={key}></Th>;
              }
              if (key === '_action') {
                return <Th key={key}>操作</Th>;
              }
              return (
                <Th key={key}>
                  <Flex gap={2} alignItems="center">
                    <span>{key}</span>
                    {shape.meta?.description && (
                      <Tooltip label={shape.meta.description}>
                        <QuestionIcon />
                      </Tooltip>
                    )}
                  </Flex>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          <If condition={dataList.length}>
            <Then>
              {dataList.map((data) => {
                return (
                  <Tr key={get(data, rowKey)}>
                    {columns.map(([key, shape]) => {
                      if (key === '_select') {
                        const isSelected = selection.includes(data.id);
                        return (
                          <Td key={key}>
                            <Checkbox checked={isSelected} onChange={() => toggleSelct(data.id)} />
                          </Td>
                        );
                      }
                      if (key === '_action') {
                        return (
                          <Td key={key}>
                            <Button onClick={() => onEditAction?.(data)}>编辑</Button>
                            <Popover>
                              <PopoverTrigger>
                                <Button>删除</Button>
                              </PopoverTrigger>
                              <Portal>
                                <PopoverContent>
                                  <PopoverHeader>确认删除?</PopoverHeader>
                                  <PopoverCloseButton />
                                  <PopoverFooter>
                                    <Button
                                      onClick={() => {
                                        tableHandler.delete(data.id);
                                      }}
                                    >
                                      确定
                                    </Button>
                                  </PopoverFooter>
                                </PopoverContent>
                              </Portal>
                            </Popover>
                          </Td>
                        );
                      }
                      // @ts-ignore
                      const value = data[key];
                      return (
                        <Td key={key}>
                          {invoke(() => {
                            switch (typeof value) {
                              case 'object':
                              case 'boolean':
                                return Array.isArray(value) ? value.join(',') : JSON.stringify(value);
                              default:
                                return value;
                            }
                          })}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Then>
            <Else>
              <Tr>
                <Td colSpan={columns.length + 1} textAlign="center">
                  无数据
                </Td>
              </Tr>
            </Else>
          </If>
        </Tbody>
      </Table>
    </Flex>
  );
}
