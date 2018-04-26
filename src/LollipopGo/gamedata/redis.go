package gamedata

import (
	_ "fmt"
	"time"

	"github.com/go-redis/redis" // 内存数据库--用于测试
)

var client *redis.Client

func init() {
	client = redis.NewClient(&redis.Options{
		Addr:         "120.24.219.60:6379",
		Password:     "ruilide2016",
		DialTimeout:  10 * time.Second,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		PoolSize:     100,
		PoolTimeout:  30 * time.Second,
	})
	client.FlushDB()

	//	//测试--
	//	for i := 0; i < 10000; i++ {
	//		ExampleNewClient()
	//	}
}

//// redis 测试
//func ExampleNewClient() {

//	//	pong, err := client.Ping().Result()
//	//	fmt.Println(pong, err)
//	// Output: PONG <nil>

//	err1 := client.Set("key", "value", 0).Err()
//	if err1 != nil {
//		panic(err1)
//	}

//	val, err1 := client.Get("key").Result()
//	if err1 != nil {
//		panic(err1)
//	}
//	fmt.Println("key", val)

//	val2, err1 := client.Get("key2").Result()
//	if err1 == redis.Nil {
//		fmt.Println("key2 does not exist")
//	} else if err1 != nil {
//		panic(err1)
//	} else {
//		fmt.Println("key2", val2)
//	}
//	// Output: key value
//	// key2 does not exist
//}
