# 本站贡献指南（mdBook）

## 安装 mdBook

前往 [mdBook v0.5.4 Release 页面](https://github.com/rust-lang/mdBook/releases/tag/v0.5.4)，根据操作系统下载对应的预编译二进制文件：

| 操作系统 | 文件名 |
|----------|--------|
| Linux x86_64 | `mdbook-v0.5.4-x86_64-unknown-linux-gnu.tar.gz` |
| macOS Apple Silicon | `mdbook-v0.5.4-aarch64-apple-darwin.tar.gz` |
| macOS Intel | `mdbook-v0.5.4-x86_64-apple-darwin.tar.gz` |
| Windows | `mdbook-v0.5.4-x86_64-pc-windows-msvc.zip` |

解压后将 `mdbook` 可执行文件放到 PATH 中的某个目录，例如 Linux/macOS：

```bash
tar xzf mdbook-v0.5.4-x86_64-unknown-linux-gnu.tar.gz
mv mdbook ~/.local/bin/   # 或 /usr/local/bin/
mdbook --version          # 验证安装
```

## 本地预览与构建

克隆仓库后，在项目根目录执行：

```bash
# 启动本地开发服务器（自动监听文件变化并刷新浏览器）
make serve
# 等价于：mdbook serve --hostname 127.0.0.1 --port 3001

# 仅构建，输出到 public/ 目录
make build
```

浏览器打开 <http://127.0.0.1:3001> 即可预览。

## 添加新章节

mdBook 通过 `src/SUMMARY.md` 管理目录结构，**必须先修改 SUMMARY.md，再创建对应文件**。

### 示例：添加一篇"2025 教学研讨会"笔记

**第一步：在 `src/SUMMARY.md` 中添加条目**

```diff
 - [教学研讨会](./Teaching-Seminar/index.md)
   - [2025-05-28](./Teaching-Seminar/2025-05-28.md)
+  - [2025-10-15](./Teaching-Seminar/2025-10-15.md)
```

缩进表示层级关系，子章节用两个空格缩进。

**第二步：创建对应的 Markdown 文件**

```bash
touch src/Teaching-Seminar/2025-10-15.md
```

文件内容示例：

```markdown
# 2025-10-15 教学研讨会

会议内容……
```

**第三步：本地预览确认**

```bash
make serve
```

`make serve` 运行期间修改文件会自动重新构建，无需重启。

### 添加新的顶层章节

在 SUMMARY.md 中新增一个不缩进的条目，并创建对应目录和文件：

```diff
+- [新章节](./new-section/index.md)
+  - [第一篇](./new-section/first.md)
```

```bash
mkdir src/new-section
touch src/new-section/index.md src/new-section/first.md
```

### 修改 `REAMD.md`

仓库根目录的 `REAMD.md` 文件符号链接到 `src/index.md`，因此请不要直接修改 `REAMD.md`，而是只改动 `src/index.md`。
