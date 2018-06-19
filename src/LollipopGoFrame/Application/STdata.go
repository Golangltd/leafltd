package Application

import (
	"time"
	"strconv"
)

// 版本
var (
	MarjoVersion string
	MinorVersion string
	PatchVersion string
)

// 接口数据
type App interface {
	Run(f func(int64))
}

// 实现接口的结构
type Application struct {
	fps int
}

// 帧同步函数
func (this *Application)Run(f func(int64))  {
	t:=time.Duration(int64(time.Millisecond)*int64(1000))/20
	lasttime :=time.Now().UnixNano()
	var nowtime int64
	ticker:=time.NewTicker(t)
	defer  ticker.Stop()
mainLoop:
	for{
		select {
		case <- ticker.C:
			if false{
				break mainLoop
			}
			nowtime=time.Now().UnixNano()
			dt:=nowtime -lasttime
			f(dt)
		}
	}
}

// 设置fps
func (this *Application)SetFps(needFps int) *Application {
	if needFps <=0 || needFps >1000{
		needFps = 1000
	}
	this.fps = needFps
	return this
}

// 设置版本
func (this *Application)SetVersion(major,minor,patch int) *Application {
	MarjoVersion = strconv.Itoa(major)
	MinorVersion = strconv.Itoa(minor)
	PatchVersion = strconv.Itoa(patch)
	return this
}