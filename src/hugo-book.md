# Hugo-book

把图片文件（比如 `pic.png`）放到 `src/img` 目录，然后用 `![](./img/pic.png)` 引用它。

在 mdBook 中，图片路径通常相对当前 Markdown 文件计算。

举例来说，当前这个页面：
* 本地预览地址通常为 `http://localhost:3001/hugo-book.html`
* 如果有一个 `src/img/hugo-book.png` 图片文件
* 那么在当前页面里应该使用 `![](./img/hugo-book.png)` 引用

![](./img/hugo-book.png)

官方 hugo-book-demo：<https://hugo-book-demo.netlify.app/>
