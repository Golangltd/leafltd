package main

// 声明变量的一般形式是使用 var 关键字：
// var identifier type

// 第一种，指定变量类型，声明后若不赋值，使用默认值。
//var v_name v_type
//v_name = value
var b bool = false
// 第二种，根据值自行判定变量类型。
// var v_name = value
var idata = 1
// 第三种，省略var, 注意 :=左侧的变量不应该是已经声明过的，否则会导致编译错误。
// v_name := value

var a int = 10
var b1 = 10
//c:=10

//类型相同多个变量, 非全局变量
// var vname1, vname2, vname3 type
var i1 ,i2 ,i3 int
// vname1, vname2, vname3 = v1, v2, v3
// var vname1, vname2, vname3 = v1, v2, v3
// vname1, vname2, vname3 := v1, v2, v3

// 这种因式分解关键字的写法一般用于声明全局变量
//var (
//	vname1 v_type1
//	vname2 v_type2
//)

// 值类型和引用类型
// i = j // 内存中将j的值经行了拷贝