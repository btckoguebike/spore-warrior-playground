import { z } from 'zod';

export const SettingSchema = z.object({
  currentResourceId: z
    .number()
    .setMeta({
      label: '当前最高全局资源id',
      description: '当添加资源时，会从这个值进行自增',
    })
    .default(1000),
});
