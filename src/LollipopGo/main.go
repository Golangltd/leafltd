package main

import (
	"FenDZ/glog-master"
	"FenDZ/go-concurrentMap-master"
	"LollipopGo/conf"
	"LollipopGo/game"
	"LollipopGo/gate"
	"LollipopGo/global"
	"LollipopGo/login"
	"flag"
	_ "time"

	_ "github.com/dop251/goja" // JS 解析器
	"github.com/name5566/leaf"
	lconf "github.com/name5566/leaf/conf"
)

func init() {
	glog.Info("Entry init")
	// 初始化 日志系统
	flag.Set("alsologtostderr", "true") // 日志写入文件的同时，输出到stderr
	flag.Set("log_dir", "./log")        // 日志文件保存目录
	flag.Set("v", "3")                  // 配置V输出的等级。
	flag.Parse()
	// 初始化并发安全map
	global.M = concurrent.NewConcurrentMap()

	return
}

func main() {

	// 加载配置
	lconf.LogLevel = conf.Server.LogLevel
	lconf.LogPath = conf.Server.LogPath
	lconf.LogFlag = conf.LogFlag
	lconf.ConsolePort = conf.Server.ConsolePort
	lconf.ProfilePath = conf.Server.ProfilePath

	// 注册模块
	// 为什么要开始的时候注册全部模块？
	leaf.Run(
		game.Module,
		gate.Module, // conf是配置网关的：8888端口
		login.Module,
	)
	
}
