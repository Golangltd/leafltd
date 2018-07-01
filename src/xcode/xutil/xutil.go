package xutil

import (
	"time"
	"strconv"
	"FenDZ/glog-master"
	"LollipopGoFrame/root"
	"LollipopGoFrame/Logic/player"
	"xcode/XModule"
	"net/http"
	"xcode/xprofile"
)

// 版本
var (
	MarjoVersion string
	MinorVersion string
	PatchVersion string
	GApp = Application{}
)

// 接口数据
type App interface {
	Run(f func(int64))
	Init()bool
	Distroy()
}

// 实现接口的结构
type Application struct {
	exit           bool
	fps            int
	tickTotal      int64
	FrameTime      time.Duration
	FrameTimeTotal time.Duration
	pidFile        string
	profile        *xprofile.Profiler
	httpAddr       string
	httpPort       int
	serveMux       *http.ServeMux
	//pattern        *pat.PatternServeMux
	//http2main      chan *httpCmd
	main2http      chan string
	httpCmds       []string
	InitOKTime     time.Time // 初始化完成计时
	invokeOnMain   chan struct{}
	invokeFunc     func()
}

func (this *Application)Init()bool{
	// NewFolck(this.pidFile)
	data:= XModule.NewDmodule(2)
	data.Register(root.DLollipopGoPlayer,player.NewPlayer())
	flock,err:=NewFolck(this.pidFile)
	if err!=nil{
		glog.Info(err,flock)
	}
	this.profile.Start(this.pidFile)
	return true
}

func (this *Application)Distroy(){
}

// 设置PID file
func (this *Application)SetPidFile(pidFile string) *Application {
	this.pidFile = pidFile
	return this
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
			if this.exit {
				break mainLoop
			}
			nowtime=time.Now().UnixNano()
			dt:=nowtime -lasttime
			f(dt)
			this.FrameTime = time.Duration(time.Now().UnixNano()-nowtime)
			this.FrameTimeTotal+=this.FrameTime
			if this.FrameTime >t && nowtime/int64(time.Millisecond)%1000<=50{
				glog.Warning(" FPS 高于 50 ")
			}
			lasttime = nowtime
			this.tickTotal++
		}
	}
}
