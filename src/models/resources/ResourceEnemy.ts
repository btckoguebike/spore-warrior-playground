import { z } from 'zod';

export const ResourceEnemySchema = z.object({
  id: z.number().setMeta({
    description: '全局唯一 ResourceEnemy ID',
  }),
  rank: z.number().min(0).max(2).setMeta({
    label: '怪物级别',
    description: '怪物级别，前端展示用，0 到 2 取值',
  }),
  hp: z.number().min(0).setMeta({
    label: '初始血量',
    description: '初始血量',
  }),
  armor: z.number().min(0).setMeta({
    label: '初始护甲',
    description: '初始护甲',
  }),
  shield: z.number().min(0).setMeta({
    label: '初始护盾',
    description: '初始护盾',
  }),
  attack: z.number().min(0).setMeta({
    label: '初始攻击力',
    description: '初始攻击力',
  }),
  attack_weak: z.number().min(0).setMeta({
    label: '初始攻击削弱比例',
    description: '初始攻击削弱比例',
  }),
  defense: z.number().min(0).setMeta({
    label: '初始防御力',
    description: '初始防御力',
  }),
  defense_weak: z.number().min(0).setMeta({
    label: '初始防御削弱比例',
    description: '初始防御削弱比例',
  }),
  loot_pool: z.array(z.number()).setMeta({
    description: '全局唯一 LOOT ID 列表',
    input: 'resource',
  }),
  action_strategy: z
    .object({
      random: z.boolean().setMeta({
        label: '动作选择随机性',
        description: '动作选择是否随机',
      }),
      action_pool: z.array(z.number()).setMeta({
        noForm: true,
        description: '全局唯一 ACTION ID 列表',
      }),
    })
    .setMeta({
      description: '动作策略',
    }),
});

export type ResourceEnemy = z.infer<typeof ResourceEnemySchema>;
