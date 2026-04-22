# interaction-spec


将 UI 设计稿、原型图、功能模块转化为清晰的交互设计说明文档，结构化为可被机器和研发理解的逻辑表达。

---

## 功能

- 根据页面截图或描述，生成规范的交互说明文档
- 覆盖组件状态、操作行为、异常处理、权限差异、多端适配
- 输出格式统一，可直接交付给研发使用

## 文件结构

```
interaction-spec/
├── SKILL.md                          # Skill 主文件（触发入口 + 撰写规范）
├── README.md                         # 本文件
└── references/
    ├── complete-examples.md          # 完整案例（按钮、表单、列表、弹窗等）
    └── interactive-checklist.md      # 交互说明自查清单（12大维度 + TOP15高频遗漏）
```

## 安装方式

1. 下载本仓库（或 Clone）
2. 打开IDE→ 设置 → Skills
3. 上传 `interaction-spec` 文件夹
4. 上传完成后，在对话中描述你的页面或功能，Claude 会自动触发此 Skill

## 触发关键词

在对话中提到以下内容时会自动触发：

- 交互说明 / 交互文档
- 标注说明 / PRD 交互部分
- 组件行为描述 / 状态说明
- 动效规范 / 操作反馈
- "帮我写下这个页面的说明"

## 输出示例

```markdown
**登录按钮**
- 显示规则：默认置灰不可点击；手机号和验证码均填写后高亮显示
- 点击操作：按钮显示 loading，禁止重复点击
  - 成功：Toast「登录成功」，跳转至首页
  - 失败：Toast 显示错误信息，停留当前页，按钮恢复可点击
```

## 参考文档

- `references/complete-examples.md` — 按钮、输入框、列表、弹窗等组件模板
- `references/interactive-checklist.md` — 交互说明自查规范（12大维度）
