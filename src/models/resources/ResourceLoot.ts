import { z } from 'zod';

const GoldSchema = z.object({
  min: z.number().setMeta({
    description: '最小金币数',
  }),
  max: z.number().setMeta({
    description: '最大金币数',
  }),
});

const ScoreSchema = z.object({
  min: z.number().setMeta({
    description: '最小分数',
  }),
  max: z.number().setMeta({
    description: '最大分数',
  }),
});

const ItemPoolSchema = z.object({
  size: z.number().setMeta({
    description: '选择数量',
  }),
  item_pool: z.array(z.number()).setMeta({
    description: '物品池',
  }),
});

export const ResourceLootSchema = z.object({
  id: z.number().setMeta({
    noForm: true,
    description: '全局唯一 LOOT ID',
  }),
  gold: GoldSchema.setMeta({
    description: '随机金币奖励范围',
  }),
  score: ScoreSchema.setMeta({
    description: '随机分数奖励范围',
  }),
  card_pool: ItemPoolSchema.setMeta({
    description: '卡牌奖励池',
  }),
  props_pool: ItemPoolSchema.setMeta({
    description: '道具奖励池',
  }),
  equipment_pool: ItemPoolSchema.setMeta({
    description: '装备奖励池',
  }),
});

export type ResourceLoot = z.infer<typeof ResourceLootSchema>;
