@echo off
echo ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
echo ┃                    git 邱邱代码一键提交                        ┃
echo ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
echo.

echo //======git pull拉取更新文件......
echo.
git pull
git status
echo.

echo -----------------------------------------------------------------
echo.
set /p m=请输入提交注释（输入cmd可进入cmd命令操作）: 
echo.

if "%m%"=="cmd" (
start cmd
exit
)

echo //======执行add . 添加所有文件......
git add .

echo.
echo //======执行commit 提交所有文件......
echo.
git commit -m %m%

echo.
echo -----------------------------------------------------------------
echo.

echo //======执行push 提交到服务器......
echo.
git push

echo.
echo ---------------push结束，查看git状态"git status"-----------------
echo.

git status

echo.
echo -----------------------------------------------------------------
echo 按任意键退出 
pause
exit