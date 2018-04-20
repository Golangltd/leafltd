package internal

import (
	"reflect"
	"server/msg"

	"github.com/name5566/leaf/gate"
	"github.com/name5566/leaf/log"
)

func init() {
	// 向当前模块（game 模块）注册 Test 消息的消息处理函数 handleTest
	handler(&msg.Test{}, handleTest)
}

// 异步处理
func handler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

// 消息处理
func handleTest(args []interface{}) {
	// 收到的 Test 消息
	m := args[0].(*msg.Test)
	// 消息的发送者
	a := args[1].(gate.Agent)

	// 输出收到的消息的内容
	log.Debug("hello game %v", m.Name)

	// 给发送者回应一个 Test 消息
	a.WriteMsg(&msg.Test{
		Name: "client",
	})
}
