package msg

import (
	"server/msg/protocolfile"

	"github.com/name5566/leaf/network"
	"github.com/name5566/leaf/network/json"
)

var Processorbak network.Processor

// 使用默认的 JSON 消息处理器（默认还提供了 protobuf 消息处理器）
var Processor = json.NewProcessor()

func init() {
	Processor.Register(&Protocol.UserLogin{})
}

// 一个结构体定义了一个 JSON 消息的格式
// 消息名为 Test
type Test struct {
	Name string
}

// 用户登陆的协议
type UserLogin struct {
	LoginName string
	LoginPW   string
}
