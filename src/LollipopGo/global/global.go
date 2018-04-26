package global

import (
	"FenDZ/go-concurrentMap-master"
)

var M *concurrent.ConcurrentMap // 并发安全的map

//// 存储链接
//func (this *OnlineUser) SaveConn(Conn *gate.Agent, Uid string) {

//	// 保存在线的玩家的数据信息
//	onlineUser := &OnlineUser{
//		Connection: Conn, // 链接的数据信息
//		StrMD5:     Uid,  // MD5数据
//		MapSafe:    this.MapSafe,
//	}
//	// 赋值操作数据
//	this.MapSafe.Put(Uid+"|connect", onlineUser)
//}
