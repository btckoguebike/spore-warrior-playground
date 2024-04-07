import { z } from 'zod';
import { ResourceActionSchema } from './ResourceAction';
import { ResourceCardSchema } from './ResourceCard';
import { ResourceEnemySchema } from './ResourceEnemy';
import { ResourceLootSchema } from './ResourceLoot';
import { ResourceSystemSchema } from './ResourceSystem';
import { ResourceWarriorSchema } from './ResourceWarrior';

export const ResourceSchemas = {
  action: ResourceActionSchema,
  card: ResourceCardSchema,
  enemy: ResourceEnemySchema,
  loot: ResourceLootSchema,
  system: ResourceSystemSchema,
  warrior: ResourceWarriorSchema,
};
export type ResourceSchemas = typeof ResourceSchemas;

export type ResourceTypeObjectTypeMap = {
  [key in keyof ResourceSchemas]: z.infer<ResourceSchemas[key]>;
};
