package XModule

import "FenDZ/glog-master"

type SModule interface {
	Load() bool
	Reload()
	Destroy()
}

type SModuleMgr []SModule

//NewSmoduleMgr ...
func NewSmoduleMgr(num int)  SModuleMgr {
	return make([]SModule,num)
}

type SModuleGetter struct {
	mgr *SModuleMgr // NOTE: mgr is the address of root and will not be changed after hotfix
	id  int
}

func (g SModuleGetter) Get() SModule {
	return (*g.mgr)[g.id]
}

// Register ...
func (mgr *SModuleMgr) Register(id int, m SModule) SModuleGetter {
	(*mgr)[id] = m
	return SModuleGetter{mgr: mgr, id: id}
}

// Getter ...
func (mgr *SModuleMgr) Getter(id int) SModuleGetter {
	return SModuleGetter{mgr: mgr, id: id}
}

// Load ...
func (mgr *SModuleMgr) Load() bool {
	for n, m := range *mgr {
		if m != nil && !m.Load() {
			glog.Error("data module [%d] load failed", n)
			return false
		}
	}

	return true
}

// Destroy ...
func (mgr *SModuleMgr) Destroy() {
	for n, m := range *mgr {
		glog.Error("data module [%d] destroy", n)
		m.Destroy()
	}
}

// Reload ...
func (mgr *SModuleMgr) Reload(id int) bool {
	if (*mgr)[id] == nil {
		glog.Error("Reload not regist id:", id)
		return false
	}
	(*mgr)[id].Reload()
	return true
}