##GIT  

添加远程仓库:   

    git remote add origin git@github.com:1765080897@qq.com/javascript-.git  
推送   
 
    git push -u origin master  
报错

```
To github.com:5312/javascript-.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'git@github.com:5312/javascript-.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

```
>原因是GitHub 中README.md 文件不在本地代码目录中  
可以通过如下命令合并代码
一,

    ! 不推荐使用git pull --rebase origin master   
解决 

解决方法二,
```
git push -u origin master -f 以及 git push origin master
```

```
LX@LX-PC MINGW64 /d/HTML/JS (master)
$ git push -u JS master
To github.com:5312/JS
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'git@github.com:5312/JS'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

LX@LX-PC MINGW64 /d/HTML/JS (master)
$ git push -u JS master -f
Counting objects: 75, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (69/69), done.
Writing objects: 100% (75/75), 210.99 KiB | 0 bytes/s, done.
Total 75 (delta 20), reused 0 (delta 0)
remote: Resolving deltas: 100% (20/20), done.
To github.com:5312/JS
 + 42bc03f...713c29f master -> master (forced update)
Branch master set up to track remote branch master from JS.

```
测试git连接情况  

    ssh -T git@github.com