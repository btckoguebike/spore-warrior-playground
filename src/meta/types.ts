import { strEnum } from '@/utils/typeUtil';

export const ResourceType = strEnum(['card', 'action', 'enemy', 'loot', 'system', 'warrior']);
export type ResourceType = keyof typeof ResourceType;
