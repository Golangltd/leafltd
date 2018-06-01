package main

import (
	"FenDZ/go-entitas-master" // ECS的基础架构方式
	"fmt"
)

func init() {
	fmt.Println("init ECS")
	// 创建一个实体
	e := entitas.NewEntity(0)
	// 创建一个组件
	c1 := entitas.NewComponentA(1)
	c2 := entitas.NewComponentB(1.0)
	// 组件的类型
	types := []entitas.ComponentType{c1.Type(), c2.Type()}
	fmt.Println(types[0])
	// 加入组件
	e.AddComponent(c1)
	return
}

func main() {
	return
}
