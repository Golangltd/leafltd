package main

import (
	"fmt
)

var Gmap map[string]string

func init() {
	Gmap = make(map[string]string)
for i:=0;;i++{
	go func() {
		Gmap["www.Golang.ltd"] = "www.Golang.ltd"
	}
}
}

func main() {
}
