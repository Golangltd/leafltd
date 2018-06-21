package msg

import (
"LollipopGo/msg/protocolfile"

"github.com/name5566/leaf/network"
"github.com/name5566/leaf/network/json"
)

var Processorbak network.Processor

// 使用默认的 JSON 消息处理器（默认还提供了 protobuf 消息处理器）
var Processor = json.NewProcessor()

// 消息注册
func init() {
	Processor.Register(&Protocol.UserLogin{})
	Processor.Register(&Protocol.UserRegister{})
	Processor.Register(&Protocol.ChooseRole{})
}
