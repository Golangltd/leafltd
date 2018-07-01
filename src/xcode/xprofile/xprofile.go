package xprofile

import (
	"os"
	"fmt"
	"runtime/pprof"
	"runtime"
	"runtime/trace"
	"strings"
	"sync/atomic"
	"flag"
	"FenDZ/glog-master"
)

type Profiler struct {
	closer []func()
	memProfileRate int
	status uint32
}

var mode string

func init()  {

	flag.StringVar(&mode,"prof.mode","","profile mode,such as \" " +
		"cpu,mem mutex,block,trace \"")
}


func (p *Profiler) cpuProfile() {
	f, err := os.Create("cpu.pprof")
	if err != nil {
		glog.Info(fmt.Sprintf("pfofile: cound not create cpu pfofile %v", err))
		return
	}
	glog.Info("profile: cpu profiling enabled")
	pprof.StartCPUProfile(f)
	p.closer = append(p.closer, func() {
		pprof.StopCPUProfile()
		f.Close()
		glog.Info("profile: cpu profiling disabled")
	})
}

func (p *Profiler) memProfile() {
	f, err := os.Create("mem.pprof")
	if err != nil {
		glog.Info(fmt.Sprintf("pfofile: cound not create memory pfofile %v", err))
		return
	}
	glog.Info("profile: memory profiling enabled")
	old := runtime.MemProfileRate
	runtime.MemProfileRate = p.memProfileRate
	p.closer = append(p.closer, func() {
		pprof.Lookup("heap").WriteTo(f, 0)
		f.Close()
		runtime.MemProfileRate = old
		glog.Info("profile: memory profiling disabled")
	})
}

func (p *Profiler) mutexProfile() {
	f, err := os.Create("mutex.pprof")
	if err != nil {
		glog.Info(fmt.Sprintf("pfofile: cound not create mutex pfofile %v", err))
		return
	}
	glog.Info("profile: mutex profiling enabled")
	runtime.SetMutexProfileFraction(1)
	p.closer = append(p.closer, func() {
		pprof.Lookup("mutex").WriteTo(f, 0)
		f.Close()
		runtime.SetMutexProfileFraction(0)
		glog.Info("profile: mutex profiling disabled")
	})
}

func (p *Profiler) blockProfile() {
	f, err := os.Create("block.pprof")
	if err != nil {
		glog.Info(fmt.Sprintf("pfofile: cound not create block pfofile %v", err))
		return
	}
	glog.Info("profile: block profiling enabled")
	runtime.SetBlockProfileRate(1)
	p.closer = append(p.closer, func() {
		pprof.Lookup("block").WriteTo(f, 0)
		f.Close()
		runtime.SetBlockProfileRate(0)
		glog.Info("profile: block profiling disabled")
	})
}

func (p *Profiler) traceProfile() {
	f, err := os.Create("trace.out")
	if err != nil {
		glog.Info(fmt.Sprintf("profile: could not create trace output file %v", err))
		return
	}
	trace.Start(f)
	glog.Info("profile: trace enabled")
	p.closer = append(p.closer, func() {
		trace.Stop()
		glog.Info("profile: trace disabled")
	})
}

func (p *Profiler) Start(pmode string) bool {
	if len(pmode) == 0 {
		return false
	}
	mmodes := map[string]func(){
		"cpu":   p.cpuProfile,
		"mem":   p.memProfile,
		"mutex": p.mutexProfile,
		"block": p.blockProfile,
		"trace": p.traceProfile,
	}
	modes := strings.FieldsFunc(pmode, func(r rune) bool {
		return uint32(r) == ','
	})
	for _, m := range modes {
		_, ok := mmodes[m]
		if !ok {
			return false
		}
	}

	if !atomic.CompareAndSwapUint32(&p.status, 0, 1) {
		return false
	}
	p.memProfileRate = 4096

	for _, m := range modes {
		f, ok := mmodes[m]
		if ok {
			f()
		}
	}
	return true
}

// Stop TODO
func (p *Profiler) Stop() {
	if !atomic.CompareAndSwapUint32(&p.status, 1, 0) {
		return
	}
	for _, c := range p.closer {
		c()
	}
}
