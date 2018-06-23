package xutil

import (
	"time"
	"strconv"
	"FenDZ/glog-master"
	"runtime"
	"syscall"
	"unsafe"
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
	fps int
	exit bool
	pidFile string
	tickTotal int64
	FeameTime time.Duration
	FeameTimeTotal time.Duration
}

func (this *Application)Init()bool{
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
			this.FeameTime = time.Duration(time.Now().UnixNano()-nowtime)
			this.FeameTimeTotal+=this.FeameTime
			if this.FeameTime >t && nowtime/int64(time.Millisecond)%1000<=50{
				glog.Warning(" FPS 高于 50 ")
			}
			lasttime = nowtime
			this.tickTotal++
		}
	}
}

func lockOsThread() {
	runtime.LockOSThread()
}

func setConsoleTitle() {
	kernel32, err := syscall.LoadLibrary("Kernel32.dll")
	defer syscall.FreeLibrary(kernel32)
	if err != nil {
		return
	}
	setConsole, err := syscall.GetProcAddress(syscall.Handle(kernel32), "SetConsoleTitleA")
	if err != nil {
		return
	}

	str := "Svn Version "
	// str += xutil.SVNVersion
	ptr, e := syscall.BytePtrFromString(str)
	if e != nil {
		return
	}

	_, _, _ = syscall.Syscall(uintptr(setConsole), 1, uintptr(unsafe.Pointer(ptr)), 0, 0)
}