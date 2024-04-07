import { ResourceType } from '@/meta/types';
import { Dexie, Table } from 'dexie';
import { ResourceCard } from './resources/ResourceCard';
import { ResourceTypeObjectTypeMap } from './resources';
import { get, isNil } from 'lodash-es';

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

export const getSetting = async <T>(name: 'global_resource_id', defaultValue: T) => {
  const setting = await commonDb.setting.get(name);
  if (!setting) {
    await commonDb.setting.add({
      name,
      value: defaultValue as string,
    });
    return defaultValue;
  }
  return setting.value as T;
};

export const setSetting = async (name: string, value: number | string) => {
  return commonDb.setting.update(name, {
    name: name,
    value: value,
  });
};

export const getGlobalResourceId = async () => {
  return getSetting('global_resource_id', 1e3);
};

export const increaseResourceId = async () => {
  const id = await getGlobalResourceId();
  const _id = id + 1;
  await commonDb.setting.update('global_resource_id', {
    name: 'global_resource_id',
    value: _id,
  });
  return _id;
};
