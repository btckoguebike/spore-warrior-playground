import { ResourceType } from '@/meta/types';
import { Dexie, Table } from 'dexie';
import { ResourceCard } from './resources/ResourceCard';
import { ResourceTypeObjectTypeMap } from './resources';

const resourceDbSchema: Record<ResourceType, string> = {
  card: '&id,name',
  system: '&id,system_id',
  action: '&id',
  warrior: '&id',
  loot: '&id',
  enemy: '&id',
};

type DexieWithTable<T extends Record<string, unknown>> = Dexie & {
  [key in keyof T]: Table<T[key]>;
};

export const resourceDb = new Dexie('game_resource') as DexieWithTable<ResourceTypeObjectTypeMap>;

resourceDb.version(1).stores(resourceDbSchema);
resourceDb.open();

export type SettingModel = {
  name: string;
  value: string | number;
};

export const commonDb = new Dexie('app_playground') as DexieWithTable<{
  setting: SettingModel;
}>;
commonDb.version(1).stores({
  setting: '&name, value',
});
commonDb.open();

Dexie.on('storagemutated', (...args) => {
  console.log('Dexie log', ...args);
});
