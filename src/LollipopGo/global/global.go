package global

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
