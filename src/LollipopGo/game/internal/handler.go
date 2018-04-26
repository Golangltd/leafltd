package internal

import (
	"LollipopGo/msg/protocolfile"
	"fmt"
	"reflect"

	"FenDZ/glog-master"
	"LollipopGo/global"

	"github.com/name5566/leaf/gate"
	"github.com/name5566/leaf/log"
)

func init() {
	// 向当前模块（game 模块）注册 UserRegister 消息的消息处理函数 handleTest
	handler(&Protocol.UserRegister{}, handleTest)
}

// 异步处理
func handler(m interface{}, h interface{}) {
	skeleton.RegisterChanRPC(reflect.TypeOf(m), h)
}

// 消息处理
func handleTest(args []interface{}) {

	// 消息的发送者
	a := args[1].(gate.Agent)
	// 存储网络链接
	onlineUser := &gate.OnlineUser{
		Connection: a,        // 链接的数据信息== 广播的数据的信息，广播给用户的数据；所有的链接的数据的信息
		MapSafe:    global.M, // 并发安全的map
	}

	PullFromClient(args, onlineUser)

}

// 数据分发处理
func PullFromClient(args []interface{}, onlineUser *gate.OnlineUser) {

	defer func() { // 必须要先声明defer，否则不能捕获到panic异常
		if err := recover(); err != nil {
			strerr := fmt.Sprintf("%s", err)
			glog.Info("PullFromClient", strerr)
		}
	}()
	glog.Info("Entry PullFromClient")
	// 获取数据
	m := args[0].(*Protocol.UserRegister)
	// 输出收到的消息的内容
	log.Debug("hello game %v", m.LoginName)
	// 判断map里·有无

	//if val == nil {
	//--------------------------------------------------------------------------
	// uid存储
	onlineUser.StrMD5 = m.LoginName
	// 解析并存储
	// 赋值操作数据
	onlineUser.MapSafe.Put(m.LoginName+"|connect", onlineUser)
	//--------------------------------------------------------------------------
	//}
	// 发送数据
	onlineUser.Connection.WriteMsg(&Protocol.UserRegister{
		LoginName: "client------------",
	})

	//测试发送广播消息
	for i := 0; i < 10; i++ {
		val, _ := onlineUser.MapSafe.Get(m.LoginName + "|connect")
		val.(interface{}).(*gate.OnlineUser).Connection.WriteMsg(&Protocol.UserRegister{
			LoginName: "++++++++++++++++client------------",
		})
	}

}
