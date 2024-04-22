import { z } from 'zod';

const ArgSchema = z.union([
  z.object({
    number: z.number().setMeta({
      description: '固定数值参数',
    }),
  }),
  z.object({
    random: z
      .object({
        min: z.number().setMeta({
          description: '最小值',
        }),
        max: z.number().setMeta({
          description: '最大值',
        }),
      })
      .setMeta({
        description: '随机数值参数',
      }),
  }),
]);

export const ResourceSystemSchema = z.object({
  id: z.number().setMeta({
    noForm: true,
    description: '全局唯一 SYSTEM ID',
  }),
  system_id: z.number().min(0).max(28).setMeta({
    label: '系统函数 ID',
    description: '游戏引擎中预设的系统函数 ID，0 到 28 取值，详情后面讲',
  }),
  target_type: z.number().min(0).max(4).setMeta({
    label: '目标类型 ID',
    description: '目标类型 ID，0 到 4 取值，详情后面讲',
  }),
  // args: z.array(ArgSchema).setMeta({
  //   description: '参数列表',
  // }),
  args: z
    .string()
    .refine(
      (data) => {
        try {
          return Array.isArray(JSON.parse(data));
        } catch (e) {
          return false;
        }
      },
      {
        message: '需要为 json 数组',
      },
    )
    .setMeta({
      label: '效果参数',
      description: '这里暂时先使用代码进行编辑',
    }),
  duration: z
    .object({
      trigger: z.number().min(0).max(38).setMeta({
        label: '监听触发的 LOG ID',
        description: '监听触发的 LOG ID，0 到 38 取值，详情后面讲',
      }),
      count: z.number().setMeta({
        label: '剩余可触发次数',
        description: '剩余可触发次数，归零后 SYSTEM 消失',
      }),
    })
    .optional()
    .setMeta({
      description: '标记是瞬间施放还是延迟触发施放',
    }),
});
console.log(ResourceSystemSchema);

export type ResourceSystem = z.infer<typeof ResourceSystemSchema>;
