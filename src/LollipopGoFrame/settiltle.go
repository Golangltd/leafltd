package main

import (
	"runtime"
	"syscall"
	"unsafe"
)

func lockOsThread() {
	runtime.LockOSThread()
}

// 设置标题
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
