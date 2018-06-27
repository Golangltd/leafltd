package main

import (
	//"log"
	//	"net"
	"fmt"
	"FenDZ/glog-master"
	"net/http"

	//	"golang.org/x/net/context"
	//	"google.golang.org/grpc"
	//	pb "google.golang.org/grpc/examples/helloworld/helloworld"
	//	"google.golang.org/grpc/reflection"
)

// 接受数据处理
func TJWanJiaData(w http.ResponseWriter, req *http.Request) {
	glog.Info("httpTask is running...")
	if req.Method == "GET" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		req.ParseForm()
		// 获取函数
		Protocol, bProtocol := req.Form["Protocol"]
		Protocol2, bProtocol2 := req.Form["Protocol2"]
		glog.Info("httpTask is running...", Protocol, bProtocol, Protocol2, bProtocol2)
		if bProtocol && bProtocol2 {
			// 主协议判断
			if Protocol[0] == "1" {
				switch Protocol2[0] {
				case "2": // 发表吐槽
					{
						strnickName, _ := req.Form["nickName"]
						stravatarUrl, _ := req.Form["avatarUrl"]
						strparam, _ := req.Form["param"]
						glog.Info("strparam", strparam)
						// 发送给 gRPC--server
						WenDaOrTuCao(strnickName[0], stravatarUrl[0], strparam[0], w)
						break
					}
				default:
					fmt.Fprint(w, "server Protocol2 default is Error！！！")
					return
				}
			}
		}
	}
}

// 主函数
func main() {
	http.HandleFunc("/TJData", TJWanJiaData) // 获取统计
	//err := http.ListenAndServe(":7878", nil)
	err := http.ListenAndServeTLS(":7878", "cert.pem", "key.pem", nil)
	if err != nil {
		glog.Info("Entry nil", err.Error())
		return
	}
}
