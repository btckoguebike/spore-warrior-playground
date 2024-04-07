import { ResourceType } from '@/meta/types';
import { ZodObject, z } from 'zod';
import { useLiveQuery } from 'dexie-react-hooks';
import { resourceDb } from '@/models/db';
import { ResourceSchemas } from '@/models/resources';

export type ResourceTableProps = {
  resource: ResourceType;
  select?: 'single' | 'multiple';
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onAddAction?: () => void;
  onEditAction?: (data: ZodObject<Record<string, any>>) => void;
};

export function ResourceTable({ resource }: ResourceTableProps) {
  const schema = ResourceSchemas[resource];

  const data = useLiveQuery(() => {
    return resourceDb[resource].toArray();
  }, [resource]);
  console.log(data);
  return <div>{resource}</div>;
}
