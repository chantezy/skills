# b-design-diverge

> B端产品设计方案发散与探索 Skill

帮助设计师与 AI 展开设计对话，快速发散 B 端组件/页面的设计方向，输出带示意图和组件库参考的多方案分析，辅助决策落地。

---

## 目录结构

```
b-design-diverge/
├── SKILL.md                        # 核心指令文件（触发入口）
└── references/
    ├── b-design-patterns.md        # B端常见场景 → 组件映射速查
    ├── component-libraries.md      # 主流组件库地址与常用组件直达链接
    ├── output-example.md           # 完整对话输出示例
    └── wireframe-symbols.md        # ASCII/Unicode 示意图符号规范与模板
```

---

## 文件说明

### `SKILL.md`
核心指令，AI 触发后首先加载。包含完整工作流（需求理解 → 方案发散 → 对比决策）、B 端设计原则、对话风格要求，以及 references/ 文件的按需读取索引。

### `references/b-design-patterns.md`
B 端高频场景到组件的映射速查表，覆盖数据录入、数据展示、导航结构、操作反馈、权限管控五大类。当用户描述使用场景但不确定应该用什么组件时加载。

### `references/component-libraries.md`
收录六大主流 B 端组件库（Ant Design、Arco Design、Element Plus、TDesign、Semi Design、Naive UI）的文档首页地址，以及输入、展示、导航、反馈四类常用组件的三库直达链接对照表。推荐组件库参考时加载。

### `references/wireframe-symbols.md`
完整的 ASCII/Unicode 符号速查表（单选、复选、输入框、下拉、表格、树节点、步骤条等），附筛选器、列表页、表单、穿梭框、步骤表单、抽屉六种常用布局模板。需要输出示意图时加载。

### `references/output-example.md`
快速出图模式示例，包含两个场景：1）「订阅组成员选择器」2）「数据看板配置页面」。每个场景直接输出ASCII示意图 + 简化对比表，无冗余文字。

---

## 触发方式

当用户探索设计方案、对比设计思路、生成设计示意图时，AI 会自动加载本 Skill。

在对话中提到以下关键词时触发：

`设计方案` `设计思路` `方案发散` `组件设计` `B端设计` `设计方向` `交互方案` `UI方案` `设计探讨`

也可以直接描述需求，例如：
- "帮我想想这个筛选器怎么设计"
- "这个成员选择组件有几种做法"
- "我要做一个权限配置页面"
- "这个功能有几种设计方案"

---

## 典型对话流程

**设计类需求（出图）**：
```
用户：帮我设计一个权限管理页面

AI：（出图模式）
  1. 输出 2~4 个方案的 ASCII 示意图
  2. 每个方案含优势/劣势
  3. 输出简化对比表
  4. 询问深入方向
```

**咨询类需求（不出图）**：
```
用户：权限管理应该怎么设计

AI：（文字分析模式）
  1. 分析权限管理的核心要素
  2. 给出设计建议和注意事项
  3. 询问是否需要出图看具体方案
```

---

## 覆盖的组件库

| 组件库 | 文档地址 |
|------|---------|
| Ant Design | https://ant-design.antgroup.com/components/overview-cn |
| Arco Design (Vue) | https://arco.design/vue/docs/start |
| Element Plus | https://element.eleme.cn/#/zh-CN/component/installation |
| TDesign (Vue Next) | https://tdesign.tencent.com/vue-next/overview |
| Semi Design | https://semi.design/zh-CN |
| Naive UI | https://www.naiveui.com/zh-CN/os-theme |
