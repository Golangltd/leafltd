package main

import (
	"FenDZ/glog-master"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/net/context"
	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

// 问答或者吐槽保存
const (
	address     = "localhost:50051"
	defaultName = "world"
)

// 问答或则吐槽
func WenDaOrTuCao(strnickName, stravatarUrl, strdata string, w http.ResponseWriter) {
	glog.Info("strnickName, stravatarUrl, strparam", strnickName, stravatarUrl, strdata)
	// 发送数据奥做
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewGreeterClient(conn)
	name := strnickName + "☢" + stravatarUrl + "☢" + strdata
	if len(os.Args) > 1 {
		name = os.Args[1]
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	r, err := c.SayHello(ctx, &pb.HelloRequest{Name: name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.Message)
	//	fmt.Fprint(w, "Greeting: %s", r.Message)
	fmt.Fprint(w, "1")
	return
}
