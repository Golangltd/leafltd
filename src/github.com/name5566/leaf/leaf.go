package leaf

import (
	"os"
	"os/signal"

	"github.com/name5566/leaf/cluster"
	"github.com/name5566/leaf/conf"
	"github.com/name5566/leaf/console"
	"github.com/name5566/leaf/log"
	"github.com/name5566/leaf/module"
)

// 注册和运行模块信息
func Run(mods ...module.Module) {
	// logger
	if conf.LogLevel != "" {
		logger, err := log.New(conf.LogLevel, conf.LogPath, conf.LogFlag)
		if err != nil {
			panic(err)
		}
		log.Export(logger)
		defer logger.Close()
	}

	log.Release("Leaf %v starting up", version)

	// module 模块
	for i := 0; i < len(mods); i++ {
		module.Register(mods[i]) // 注册模块，申请空间
	}
	module.Init()

	// cluster 集群或者线程池配置
	cluster.Init()

	// console 控制台操作
	console.Init()

	// close 关闭
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, os.Kill)
	sig := <-c
	log.Release("Leaf closing down (signal: %v)", sig)
	console.Destroy()
	cluster.Destroy()
	module.Destroy()
}
