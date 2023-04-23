### 优势
1. 快速 -> 比普通npm快2倍
2. 高效 -> node_modules中的文件链接自特定的内容寻址存储库（硬链接+软链接）
3. 支持monorepos -> pnpm内置支持单仓多包
4. 严格 -> pnpm默认创建了一个非平铺的node_modules，因此代码无法随意访问

### pnpm作了什么
如果使用pnpm，$\color{#FF0000}{依赖包将被放在一个统一的位置}$ 
1. 如果同一依赖包使用相同的版本，那么磁盘上 $\color{#FF0000}{只有这个依赖包的一份文件}$  
2. 如果你对同一依赖包使用不同的版本，则 $\color{#FF0000}{仅有版本之间不同的文件会被保存起来}$
3. 所有文件都保存在硬盘统一位置
   - 当安装软件包时，其包含的所有文件都会硬链接到此位置，而不会占用额外的磁盘空间
   - 这让你可以在项目之间方便的共享相同版本的依赖包
4. 创建了非扁平的node_modules

### 硬链接、软链接
1. 如何建立硬链接
   ``` c
   window: mklink /H aaa.hard.js aaa.js  (新硬链接文件 源文件)
   mac: ln foo.js foo_hard.js
   ```
2. 如何建立软链接
    ``` c
   window: mklink aaa.soft.js aaa.js  (新软链接文件 源文件)
   mac: ln -s foo.js foo_soft.js
   ```