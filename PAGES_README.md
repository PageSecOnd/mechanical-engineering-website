# 机械工程网站页面说明

本项目包含以下专用页面模板：

## 页面列表

### 1. 时间轴页面 (timeline.html)
- **文件路径**: `template/dafeult/timeline.html`
- **样式文件**: `skin/css/timeline.css`
- **JavaScript**: `skin/js/timeline.js`
- **功能**: 展示公司发展历程和重要节点
- **特性**: 
  - 垂直时间轴设计
  - 左右交替布局
  - 滚动显示动画
  - 响应式设计

### 2. 视频展示页面 (video.html)
- **文件路径**: `template/dafeult/video.html`
- **功能**: 展示产品视频和介绍
- **特性**:
  - 视频缩略图网格布局
  - 弹窗播放功能
  - 响应式设计
  - 视频信息展示

### 3. 资料下载页面 (download.html) ⭐ 新增
- **文件路径**: `template/dafeult/download.html`
- **样式文件**: `skin/css/download.css` ⭐ 新创建
- **功能**: 提供技术文档和资料下载
- **特性**:
  - 网格布局展示下载项
  - 文件类型图标识别
  - 下载统计功能
  - 文件信息展示 (大小、类型、下载次数)
  - 悬停动画效果
  - 响应式设计

## 样式特点

所有页面都采用统一的设计风格：
- 渐变色主题 (#ff7e5f 到 #feb47b)
- 统一的 Banner 和面包屑导航
- 卡片式内容布局
- 悬停动画效果
- 完全响应式设计

## 使用说明

### 在 PBootCMS 中使用

1. 确保在后台内容管理中配置相应的扩展字段：
   - 时间轴页面：`ext_year` (年份), `ico` (图标)
   - 视频页面：`video_url` (视频地址), `thumb` (缩略图)
   - 下载页面：`file_size` (文件大小), `file_type` (文件类型), `download_count` (下载次数)

2. 在栏目管理中设置对应的模板文件

3. 发布内容时填写相应的扩展字段

## 测试

可以通过 `test-pages.html` 文件预览页面效果和样式。

## 技术要求

- 现代浏览器支持 (支持 CSS Grid 和 Flexbox)
- jQuery 3.6.0+
- PBootCMS 框架