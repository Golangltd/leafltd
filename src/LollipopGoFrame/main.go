package main

import (
	"FenDZ/glog-master"
	"xcode/xutil"
	"fmt"
	"LollipopGoFrame/root"
)

var FPS  = 20

func main()  {
	glog.Info("Fream Server data!!!")
	app:=xutil.GApp
	app.SetFps(FPS).SetPidFile("LollipopGo.pid").SetVersion(1,0,1)
	if !app.Init(doInitModule){
		return
	}
	setConsoleTitle()
	app.Run(InitRun)  // 运行 所有的module的 Run的函数的
	app.Distroy()
}

// 初始化所有module的大小
func doInitModule(i int64) {
	root.DModule.Init(root.DLollipopGoPlayer)
}

func InitRun(i int64)  {
   fmt.Println("---- 帧同步服务器 -----",i)
   // 执行 Run()函数
   root.DModule.Run(root.DLollipopGoPlayer,i)
}

