package gate

import (
	_ "LollipopGo/game"
	"LollipopGo/login"
	"LollipopGo/msg"
	"LollipopGo/msg/protocolfile"
	_ "fmt"

	_ "github.com/go-redis/redis" // 内存数据库--用于测试
)

func init() {
	msg.Processor.SetRouter(&Protocol.UserLogin{}, login.ChanRPC)
	//msg.Processor.SetRouter(&Protocol.UserRegister{}, game.ChanRPC)
}
