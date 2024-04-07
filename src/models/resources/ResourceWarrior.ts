import { ResourceType } from '@/meta/types';
import { z } from 'zod';

export const ResourceWarriorSchema = z.object({
  id: z.number().setMeta({
    description: '全局唯一 WARRIOR ID',
  }),
  charactor_card: z.number().setMeta({
    description: '角色特殊卡牌',
    input: 'resource',
    inputArg: {
      type: ResourceType.card,
    },
  }),
  hp: z.number().setMeta({
    description: '初始血量',
  }),
  gold: z.number().setMeta({
    description: '初始金钱',
  }),
  power: z.number().setMeta({
    description: '初始战斗能量值',
  }),
  motion: z.number().setMeta({
    description: '角色在地图中的移动距离',
  }),
  view_range: z.number().setMeta({
    description: '角色在地图上的可视范围',
  }),
  armor: z.number().min(0).setMeta({
    description: '角色进入战斗时的初始护甲值',
  }),
  shield: z.number().min(0).setMeta({
    description: '角色进入战斗时的初始护盾值',
  }),
  attack: z.number().min(0).setMeta({
    description: '角色进入战斗时的初始攻击力',
  }),
  attack_weak: z.number().min(0).setMeta({
    description: '角色进入战斗时的初始攻击力削弱百分比',
  }),
  defense: z.number().min(0).setMeta({
    description: '角色进入战斗时的初始防御力',
  }),
  defense_weak: z.number().min(0).setMeta({
    description: '角色进入战斗时的初始防御力削弱百分比',
  }),
  physique: z.number().setMeta({
    description: '角色初始体格（能承载的最大装备和道具重量）',
  }),
  draw_count: z.number().setMeta({
    description: '角色初始抽卡数量',
  }),
  deck_status: z.array(z.number()).setMeta({
    noForm: true,
    description: '角色初始卡组',
  }),
  package_status: z.array(z.number()).setMeta({
    noForm: true,
    description: '角色初始装备道具列表',
  }),
});

export type ResourceWarrior = z.infer<typeof ResourceWarriorSchema>;
