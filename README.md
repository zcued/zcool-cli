# zcool-cli

一个简单的模版生成器。

## 使用

下载一个模版到指定目录。

```sh
$ npx zcool-cli [template] <project>
```

## 可用模版

获取可用模版。

```sh
$ npx zcool-cli ls
```

## 例子

使用 zcued 中的模版。默认 `zcued/template-${name}`。

```sh
$ npx zcool-cli manager demo
```

使用具体的仓库。`${owner}/${name}`。

```sh
$ npx zcool-cli zcued/template-manager demo
```

使用具体的分支。默认使用 `main`。

```sh
$ npx zcool-cli manager#main demo
```

使用 http 链接下载 zip。

```sh
$ npx zcool-cli https://github.com/zcued/template-manager/archive/main.zip demo
```

使用本地模版。

```sh
$ npx zcool-cli ./manager demo
```
