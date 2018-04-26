package internal

import (
	"LollipopGo/msg/protocolfile"
	"fmt"
	"reflect"

	"FenDZ/glog-master"

	"github.com/name5566/leaf/gate"
	"github.com/name5566/leaf/log"
)

func init() {
	// 向当前模块（game 模块）注册 Test 消息的消息处理函数 handleTest
	handler(&Protocol.Test{}, handleTest)
}

// 异步处理
func handler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

// 消息处理
func handleTest(args []interface{}) {
	// 收到的 Test 消息
	//	m := args[0].(*Protocol.Test)
	// 消息的发送者
	a := args[1].(gate.Agent)

	onlineUser := &OnlineUser{
		Connection: a, // 链接的数据信息== 广播的数据的信息，广播给用户的数据；所有的链接的数据的信息
		MapSafe:    M, // 并发安全的map
	}

	onlineUser.PullFromClient(args)

}

// 数据分发处理
func (this *OnlineUser) PullFromClient(args []interface{}) {

	defer func() { // 必须要先声明defer，否则不能捕获到panic异常
		if err := recover(); err != nil {
			strerr := fmt.Sprintf("%s", err)
			glog.Info("PullFromClient", strerr)
		}
	}()
	glog.Info("Entry PullFromClient")
	m := args[0].(*Protocol.Test)
	// 输出收到的消息的内容
	log.Debug("hello game %v", m.Name)

	//	// 给发送者回应一个 Test 消息
	//	a.WriteMsg(&Protocol.Test{
	//		Name: "client",
	//	})
	// 高并发处理
	// go this.SyncMessageFun(content)

}
