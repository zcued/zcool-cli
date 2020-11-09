# zcli

一个简单的模版生成器。

## 使用

下载一个模版到指定目录。

```sh
$ npx zcli [template] <project>
```

## 可用模版

获取可用模版。

```sh
$ npx zcli ls
```

## 例子

使用 zcued 中的模版。默认 `zcued/template-${name}`。

```sh
$ npx zcli manager demo
```

使用具体的仓库。`${owner}/${name}`。

```sh
$ npx zcli zcued/template-manager demo
```

使用具体的分支。默认使用 `main`。

```sh
$ npx zcli manager#main demo
```

使用 http 链接下载 zip。

```sh
$ npx zcli https://github.com/zcued/template-manager/archive/main.zip demo
```

使用本地模版。

```sh
$ npx zcli ./manager demo
```
