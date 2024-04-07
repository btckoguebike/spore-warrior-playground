import { z } from 'zod';

export const ResourceActionSchema = z.object({
  id: z.number().setMeta({
    description: '全局唯一 ACTION ID',
  }),
  random: z.boolean().setMeta({
    label: '是否随机',
    description: '随机或者顺序选择下方 system 效果',
  }),
  system_pool: z.array(z.number()).setMeta({
    description: '全局唯一 SYSTEM ID 列表',
  }),
});

export type ResourceAction = z.infer<typeof ResourceActionSchema>;
