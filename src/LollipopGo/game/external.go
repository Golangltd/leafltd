package game

import (
	"LollipopGo/game/internal"
)

var (
	Module  = new(internal.Module)
	ChanRPC = internal.ChanRPC // 不同模块通信
)
