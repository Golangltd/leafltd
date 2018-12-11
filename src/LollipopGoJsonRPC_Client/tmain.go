package main

import (
	"fmt"
	"net/rpc/jsonrpc"
	"os"
)

type Args struct {
	A, B int
}

type quo struct {
	Quo, Rem int
}

func main() {
	service := "127.0.0.1:1234"
	client, err := jsonrpc.Dial("tcp", service)
	if err != nil {
		fmt.Println("dial error:", err)
		os.Exit(1)
	}

	args := Args{1, 2}
	var reply int
	err = client.Call("Arith.Muliply", args, &reply)
	if err != nil {
		fmt.Println("Arith.Muliply call error:", err)
		os.Exit(1)
	}
	fmt.Println("the arith.mutiply is :", reply)
	var quto quo
	err = client.Call("Arith.Divide", args, &quto)
	if err != nil {
		fmt.Println("Arith.Divide call error:", err)
		os.Exit(1)
	}
	fmt.Println("the arith.devide is :", quto.Quo, quto.Rem)

}
