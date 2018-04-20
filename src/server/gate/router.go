package gate

import (
	"fmt"
	_ "server/game"
	"server/login"
	"server/msg"
	"server/msg/protocolfile"

	"github.com/go-redis/redis" // 内存数据库--用于测试
)

func init() {
	msg.Processor.SetRouter(&Protocol.UserLogin{}, login.ChanRPC)
	// 测试
	ExampleNewClient()
}

// redis 测试
func ExampleNewClient() {
	client := redis.NewClient(&redis.Options{
		Addr:     "120.24.219.60:6379",
		Password: "ruilide2016", // no password set
		DB:       0,             // use default DB
	})

	pong, err := client.Ping().Result()
	fmt.Println(pong, err)
	// Output: PONG <nil>

	err1 := client.Set("key", "value", 0).Err()
	if err1 != nil {
		panic(err1)
	}

	val, err1 := client.Get("key").Result()
	if err != nil {
		panic(err1)
	}
	fmt.Println("key", val)

	val2, err1 := client.Get("key2").Result()
	if err1 == redis.Nil {
		fmt.Println("key2 does not exist")
	} else if err1 != nil {
		panic(err1)
	} else {
		fmt.Println("key2", val2)
	}
	// Output: key value
	// key2 does not exist
}
