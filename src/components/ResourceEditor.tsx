import { ResourceType } from '@/meta/types';
import { ResourceSchemas } from '@/models/resources';
import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { SchemaForm } from './SchemaForm';
import { getGlobalResourceId, increaseResourceId, resourceDb } from '@/models/db';
import { useAsyncFn } from 'react-use';
import { useEffect, useRef } from 'react';

export type ResourceEditorProps = {
  resourceType: ResourceType;
  data?: Record<string, unknown>;
  onUpdate?: (data: any, edit: boolean) => void;
  onClose?: () => void;
};

export function ResourceEditor({ data, onClose, resourceType, onUpdate }: ResourceEditorProps) {
  const schema = ResourceSchemas[resourceType];
  const isEdit = Boolean(data);

  const addingCopyData = useRef<Record<string, unknown>>();
  const [globalIdState, updateGlobalId] = useAsyncFn(() => {
    return getGlobalResourceId();
  }, []);

  useEffect(() => {
    updateGlobalId();
  }, [updateGlobalId]);

  const onSubmit = async (formData: any) => {
    if (isEdit) {
      await resourceDb[resourceType].update(formData.id, formData);
    } else {
      await resourceDb[resourceType].add(formData);
      addingCopyData.current = formData;
      await increaseResourceId();
      updateGlobalId();
    }
    onUpdate?.(formData, isEdit);
  };

  const initialFormData = data ? data : globalIdState.value !== undefined ? { ...addingCopyData.current, id: globalIdState.value } : undefined;
  console.log(initialFormData);
  return (
    <div>
      <Flex borderBottom="1px solid black" width="100%" justifyContent="space-between" alignItems="center" height={16}>
        <Box>
          {isEdit ? '编辑' : '新增'} {resourceType}
        </Box>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Flex>
      <Box py={4}>{initialFormData && <SchemaForm key={(initialFormData.id as string) ?? 'new'} data={initialFormData} onSubmit={onSubmit} schema={schema}></SchemaForm>}</Box>
    </div>
  );
}
