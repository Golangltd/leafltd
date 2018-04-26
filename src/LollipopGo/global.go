package main

import (
	"FenDZ/go-concurrentMap-master"

	"FenDZ/code.google.com/p/go.net/websocket"
)

var M *concurrent.ConcurrentMap // 并发安全的map

// 在线玩家的数据的结构体
type OnlineUser struct {
	Connection *websocket.Conn           // 链接的信息
	StrMD5     string                    // 用的UID标示
	MapSafe    *concurrent.ConcurrentMap // 并发安全的map
}

// 存储链接
func SaveConn(Conn *websocket.Conn, Uid string) {

	onlineUser := &OnlineUser{
		Connection: Conn, // 链接的数据信息== 广播的数据的信息，广播给用户的数据；所有的链接的数据的信息
		MapSafe:    M,    // 并发安全的map
	}

}

// 存储链接
func (this *OnlineUser) SaveConn(Conn *websocket.Conn, Uid string) {

	// 保存在线的玩家的数据信息
	onlineUser := &OnlineUser{
		Connection: Conn, // 链接的数据信息
		StrMD5:     Uid,  // MD5数据
		MapSafe:    this.MapSafe,
	}
	// 赋值操作数据
	this.MapSafe.Put(code+"|connect", onlineUser)
}
