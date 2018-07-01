package player

import (
	"xcode/XModule"
	"fmt"
)

type StPlayer struct {
	ID int
}

func NewPlayer() *StPlayer  {
	return &StPlayer{
		33,
	}
}

func (this *StPlayer)Init(i XModule.DModuleGetter)bool  {
	fmt.Println("---- StPlayer -----Init",i)
	return false
}

func (this *StPlayer)Run(i int64)  {
	fmt.Println("---- StPlayer -----",i)
	// 接受网络处理
	// 根据具体内容经行分发处理
}

func (this *StPlayer)Destroy()  {

}