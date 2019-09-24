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

    git push --rebase origin master   
解决