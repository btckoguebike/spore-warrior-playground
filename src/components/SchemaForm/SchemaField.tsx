import { invoke } from '@/utils/common';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, NumberInput, NumberInputField, Switch } from '@chakra-ui/react';

import { useFormContext } from 'react-hook-form';
import { ZodFirstPartyTypeKind, ZodObject, ZodType } from 'zod';
import { SelectResource } from './SelectResource';

export type SchemaFieldProps = {
  fieldName: string;
  schema: ZodType;
};

export function SchemaField({ fieldName, schema }: SchemaFieldProps) {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const meta = schema.meta;
  //   TODO： 支持meta input
  // @ts-ignore
  const typeName = schema._def.typeName as ZodFirstPartyTypeKind;
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodObject:
      return invoke(() => {
        const objSchema = schema as ZodObject<any>;
        const tip = [meta?.label, meta?.description].filter((v) => Boolean(v)).join(': ');
        const parentKey = fieldName ? `${fieldName}.` : '';
        return (
          <FormControl as="fieldset">
            {tip && <FormLabel as="legend"> {tip}</FormLabel>}
            {Object.entries(objSchema.shape).map(([key, type]) => {
              const subFieldName = parentKey + key;
              return <SchemaField fieldName={subFieldName} key={subFieldName} schema={type as ZodType} />;
            })}
          </FormControl>
        );
      });
    case ZodFirstPartyTypeKind.ZodNumber:
    case ZodFirstPartyTypeKind.ZodString:
    case ZodFirstPartyTypeKind.ZodBoolean:
      return invoke(() => {
        const error = errors[fieldName];
        return (
          <FormControl isInvalid={Boolean(error)}>
            <FormLabel htmlFor={fieldName}>{meta?.label}</FormLabel>
            {invoke(() => {
              const fieldReg = register(fieldName, {});
              switch (typeName) {
                case ZodFirstPartyTypeKind.ZodNumber:
                  return (
                    <NumberInput {...fieldReg} onChange={(v) => setValue(fieldName, v, { shouldDirty: true, shouldValidate: true, shouldTouch: true })}>
                      <NumberInputField />
                    </NumberInput>
                  );
                case ZodFirstPartyTypeKind.ZodString:
                  return <Input {...fieldReg} />;
                case ZodFirstPartyTypeKind.ZodBoolean:
                  return <Switch {...fieldReg} />;
              }
            })}
            {meta?.description && <FormHelperText>{meta.description}</FormHelperText>}
            <FormErrorMessage>{error && error.message}</FormErrorMessage>
          </FormControl>
        );
      });
    case ZodFirstPartyTypeKind.ZodArray:
      return invoke(() => {
        const { input, inputArg } = meta || {};
        const fieldReg = register(fieldName, {});

        return (
          <SelectResource
            {...inputArg}
            value={getValues(fieldName)}
            onChange={(v) => {
              console.log(fieldName, v);
              setValue(fieldName, v, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              });
            }}
            selectMode="multiple"
          />
        );
      });
    default:
      return <div>unkown zod type {typeName}</div>;
  }
}