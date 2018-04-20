package main

import (
	"encoding/binary"
	"net"
)

func main() {
	conn, err := net.Dial("tcp", "127.0.0.1:8888")
	if err != nil {
		panic(err)
	}

	// Test 消息（JSON 格式）
	// 对应游戏服务器 Test 消息结构体
	data := []byte(`{
        "Test": {
            "Name": "leaf"
        }
    }`)

	// len + data
	m := make([]byte, 2+len(data))

	// 默认使用大端序
	binary.BigEndian.PutUint16(m, uint16(len(data)))

	copy(m[2:], data)

	// 发送消息
	conn.Write(m)

	if true {
		data := []byte(`{
        "UserLogin": {
            "LoginName": "leaf",
			"LoginPW" :"sss"
        }
    }`)

		// len + data
		m := make([]byte, 2+len(data))

		// 默认使用大端序
		binary.BigEndian.PutUint16(m, uint16(len(data)))

		copy(m[2:], data)

		// 发送消息
		conn.Write(m)
	}

}
