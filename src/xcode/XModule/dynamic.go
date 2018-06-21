package XModule

import (
	"time"
	"strings"
	"reflect"
	"FenDZ/glog-master"
)

type DModule interface {
	Init(selfGetter DModuleGetter)bool
	Destroy()
	Run(delta int64)
}

type implDModule struct {
	module DModule
	tickUseTime time.Duration
	tickTimeTotal time.Duration
	moduleName string
}

type DModuleMgr [] implDModule

type DModuleGetter struct {
	mgr *DModuleMgr
	id int
}

// NewDmodule ... ...
func NewDmodule(num int) DModuleMgr {
	return make([]implDModule,num)
}

// Get ... ...
func (g *DModuleGetter)Get() DModule {
	return (*g.mgr)[g.id].module
}

//Register ... ...
func  (mgr *DModuleMgr)Register(id int,m DModule) DModuleGetter {
	  (*mgr)[id].module = m
	  mName := strings.Replace(reflect.TypeOf(m).String(),"*","_",-1)
	  mName = "module"+ strings.Replace(mName,".","_",-1)
	  mName = strings.ToLower(mName)
	 (*mgr)[id].moduleName = mName
	 return mgr.Getter(id)
}

// Getter ... ...
func (mgr *DModuleMgr)Getter(id int) DModuleGetter {
	return DModuleGetter{mgr:mgr,id:id}
}

// Init ... ...
func (mgr *DModuleMgr)Init(id int) bool {
	
	if id<0||id >=len(*mgr){
		return false
	}
	if !(*mgr)[id].module.Init(mgr.Getter(id)){
		return false
	}
	return true
}

// moduleRunOnce ... ...
func moduleRunOnce(m *implDModule, delta int64) {
	if m.module != nil {
		nowTime := time.Now()
		m.module.Run(delta)
		m.tickUseTime = time.Now().Sub(nowTime)
		m.tickTimeTotal += m.tickUseTime
		if m.tickUseTime > 40*time.Millisecond &&
			nowTime.UnixNano()/int64(time.Millisecond)%1000 <= 50 {
				glog.Warning("module %s run time:%d", m.moduleName, m.tickUseTime)
		}
	}
}

// Run ...
func (mgr *DModuleMgr) Run(id int, delta int64) {
	if id < 0 || id >= len(*mgr) {
		return
	}
	m := &(*mgr)[id]
	moduleRunOnce(m, delta)
}

// RunAll ...
func (mgr *DModuleMgr) RunAll(delta int64) {
	for i := 0; i < len(*mgr); i++ {
		m := &(*mgr)[i]
		moduleRunOnce(m, delta)
	}
}