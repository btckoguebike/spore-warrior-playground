import { z } from 'zod';

export const ResourceCardSchema = z.object({
  id: z.number().setMeta({
    label: '资源id',
  }),
  class: z.number().min(0).max(2).setMeta({
    label: '卡牌类别',
  }),
  name: z.string().setMeta({
    label: '卡牌名称',
  }),
  power_cost: z.number().setMeta({
    label: '能量需求',
    description: '卡牌消耗的能量值',
  }),
  price: z
    .object({
      min: z.number().setMeta({
        label: '最小价格',
      }),
      max: z.number().setMeta({
        label: '最大价格',
      }),
    })
    .setMeta({
      label: '价格范围',
    }),
  system_pool: z.array(z.number()).setMeta({
    input: 'resource',
    inputArg: {
      type: 'system',
    },
  }),
});

export type ResourceCard = z.infer<typeof ResourceCardSchema>;
