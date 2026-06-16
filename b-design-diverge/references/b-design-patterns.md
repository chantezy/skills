# B端常见场景 → 组件映射速查

## 数据录入类

| 场景描述 | 推荐组件 | 备注 |
|--------|---------|------|
| 单字段文本输入 | Input 输入框 | 可加前后缀图标 |
| 单字段数值输入 | InputNumber 数字输入框 | 支持步进/范围限制 |
| 从有限选项中选一 | Select / Radio | 选项<5用Radio，多用Select |
| 从有限选项中选多 | Checkbox / Select(multiple) | 选项<8用Checkbox |
| 有层级的选一/多 | TreeSelect / Cascader | 层级≤3用Cascader，更深用TreeSelect |
| 从大量数据中选 | Select(搜索) / Transfer 穿梭框 | 需要预览已选时用Transfer |
| 日期/时间选择 | DatePicker / TimePicker | 范围选择用RangePicker |
| 颜色选择 | ColorPicker | - |
| 富文本内容 | RichTextEditor（第三方） | 推荐Quill/TipTap |
| 多字段简单表单 | Form（单列/双列） | 字段<6单列，多用双列 |
| 复杂分步配置 | Steps + Form（步骤表单） | 流程超过3步考虑步骤表单 |
| 批量录入/编辑 | EditableTable 可编辑表格 | - |
| 开关型配置 | Switch 开关 | 即时生效无需确认 |
| 滑动范围选择 | Slider 滑块 | 适合不精确的范围输入 |
| 文件上传 | Upload 上传 | 注意文件类型/大小校验 |

---

## 数据展示类

| 场景描述 | 推荐组件 | 备注 |
|--------|---------|------|
| 列表数据展示 | Table 表格 | 默认首选，列多时考虑固定列 |
| 大数据量列表 | Table（虚拟滚动） | 超过500行建议虚拟滚动 |
| 有层级的数据 | Tree / Table（树形） | 纯展示用Tree，有操作用TreeTable |
| 卡片式布局 | Card + Grid | 适合非结构化、图文混排 |
| 详情信息展示 | Descriptions 描述列表 | label-value对形式 |
| 数据统计指标 | Statistic 统计数值 | 配合趋势图效果更佳 |
| 时间线/历史记录 | Timeline 时间线 | - |
| 状态/进度 | Badge / Tag / Progress | 根据精确度选择 |
| 图表数据 | Chart（ECharts/AntV） | 折线/柱状/饼图场景各异 |
| 空状态 | Empty 空状态 | 搜索无结果/列表为空 |

---

## 导航结构类

| 场景描述 | 推荐组件 | 备注 |
|--------|---------|------|
| 顶级功能导航 | TopBar + Menu（横向） | 功能模块<8 |
| 多级功能导航 | SideNav + Menu（纵向） | 主流B端中后台方案 |
| 当前位置指引 | Breadcrumb 面包屑 | 层级>2时必须有 |
| 同级内容切换 | Tabs 标签页 | 内容差异大用Tab，小用Segmented |
| 页内章节锚点 | Anchor 锚点 | 长页面内导航 |
| 操作/功能分组 | Collapse 折叠面板 | 内容较多可收起 |
| 弹出式菜单 | Dropdown 下拉菜单 | 次级操作收纳 |

---

## 操作反馈类

| 场景描述 | 推荐组件 | 备注 |
|--------|---------|------|
| 操作成功/失败提示 | Message / Toast | 轻量，自动消失 |
| 重要状态通知 | Alert / Banner | 持续展示，需手动关闭 |
| 危险操作二次确认 | Popconfirm（轻量）/ Modal（重要） | 删除用Popconfirm，批量操作用Modal |
| 复杂信息展示/编辑 | Modal 对话框 | 不离开当前页的操作 |
| 侧边详情/编辑 | Drawer 抽屉 | 内容多、需要对比上下文时 |
| 系统级全局通知 | Notification 通知提醒 | 异步任务完成、消息推送 |
| 加载状态 | Spin / Skeleton / Progress | 区分加载中/骨架屏/进度 |
| 表单字段校验 | Form.Item 内联错误 | 错误提示紧跟字段，不用弹窗 |

---

## 权限与角色相关

| 场景描述 | 推荐方案 |
|--------|---------|
| 无权限操作按钮 | 禁用（disabled）优于隐藏，鼠标悬停提示原因 |
| 无权限页面 | 403空状态页，提示联系管理员 |
| 角色切换 | TopBar用户信息区切换，需刷新菜单 |
| 数据行权限 | 表格操作列按行权限动态显隐 |
