import { ZodType } from 'zod';

type ZodMetaData = {
  // 是否加入dexie索引
  index?: true;

  label?: string;
  description?: string;
  placeholder?: string;

  // 不在表格中展示
  noForm?: boolean;
  // 指定输入类型，不指定的情况下，默认就根据zod type类型来生成field
  input?: 'code' | 'resource';
  inputArg?: Record<string, unknown> | ((data: unknown) => Record<string, any>);
};

// 扩展ZodType原型以添加meta方法
declare module 'zod' {
  interface ZodType {
    setMeta: (metadata: ZodMetaData) => this;
    meta?: ZodMetaData;
  }
}

ZodType.prototype.setMeta = function (this: ZodType, metadata: ZodMetaData) {
  this.meta = metadata;
  return this;
};
