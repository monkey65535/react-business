# react-business
尝试使用react+redux+react-router4实现一个商城模块  

 - react
 - redux
 - axios
 - react-router-4

## 使用 `babel-plugin-transform-decorators-legacy` 实现使用装饰器的形式使用高阶组件   

  具体配置  

   - 安装 `babel-plugin-transform-decorators-legacy` 
   - 在package.json中进行如下配置

   ```
   "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      "transform-decorators-legacy"
    ]
  },
   ```
 - 使用 `babel-plugin-import` 实现antd的按需加载  

具体配置  
  - 安装 `babel-plugin-import` 
   - 在package.json中进行如下配置  

```
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "import",
        {
          "libraryName": "antd-mobile",
          "style": "css"
        }
      ]
    ]
  },
```

## 配置webpack-dev-server的proxy
由于基于create-react-app实现的脚手架，所以使用如下方法可以很简单的配置proxy 

在`package.json`中添加下面内容

```
"proxy": "http://localhost:9093"
```

## 配置sass

## 配置font-awesome

## 关于使用Axios提交表单信息后台无法接收的问题
在使用Axios提交表单信息的过程中，发现由于使用方法是把表单内容获取之后组成一个对象，然后发送给后端，后端无法接收到正确的数据，返回500错误
解决办法：
使用qs库，将发送的参数进行表单序列化  

[qs库 ： https://www.npmjs.com/package/qs](https://www.npmjs.com/package/qs)

使用方法：
```
import Qs from 'qs';
Axios.post(url,Qs.stringify({data})).then(res=>{});
```