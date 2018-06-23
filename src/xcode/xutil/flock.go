package xutil

import (
	"sync"
	"os"
	"strconv"
)

type Flock struct {
	m sync.RWMutex
	f *os.File
}

// NewFolck ...
func NewFolck(fileName string)(*Flock,error)  {
	f,err:=os.OpenFile(fileName,os.O_CREATE|os.O_TRUNC|os.O_RDWR,os.FileMode(0600))
	if err!=nil{
		return nil, err
	}
	f.WriteString(strconv.Itoa(os.Getpid()))
	f.WriteString("\n")
	return &Flock{f:f}, nil
}

func FileClose( f *Flock)  {
	f.f.Close()
	f.f = nil
}