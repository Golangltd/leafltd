package main

import "xcode/XModule"

var TestDModule  XModule.DModule

const (
	ECS_INIT =iota
)

type II interface {
	Run()bool
} 

type Golang struct {
	UID II
}

type GGG struct {
	ss int
} 


func (this* Golang)III() II {

	return (this.UID).(GGG)

}