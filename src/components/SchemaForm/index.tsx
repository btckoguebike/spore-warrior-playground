import { ZodObject } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { SchemaField } from './SchemaField';
import { Box, Button, Flex } from '@chakra-ui/react';

export type SchemaFormProps = {
  schema: ZodObject<any>;
  data?: Record<string, any>;
  onSubmit?: (data: any) => void;
};

export function SchemaForm({ schema, data, onSubmit }: SchemaFormProps) {
  const formInstance = useForm({
    defaultValues: data,
  });
  return (
    <FormProvider {...formInstance}>
      <form
        onSubmit={formInstance.handleSubmit((formData: any) => {
          console.log('schema form', formData);
          onSubmit?.(formData);
        })}
      >
        <SchemaField fieldName="" schema={schema}></SchemaField>
        <Flex gap={4} mt={4}>
          <Button colorScheme="blue" type="submit">
            提交
          </Button>
        </Flex>
      </form>
    </FormProvider>
  );
}
