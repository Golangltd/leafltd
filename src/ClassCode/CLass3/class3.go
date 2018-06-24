package main



// 布尔型
var b bool = true
// 数字类型
var idata int =  0
var fdata float32  = 0.022

uint8
无符号 8 位整型 (0 到 255)

uint16
无符号 16 位整型 (0 到 65535)

uint32
无符号 32 位整型 (0 到 4294967295)

uint64
无符号 64 位整型 (0 到 18446744073709551615)

int8
有符号 8 位整型 (-128 到 127)

int16
有符号 16 位整型 (-32768 到 32767)

int32
有符号 32 位整型 (-2147483648 到 2147483647)

int64
有符号 64 位整型 (-9223372036854775808 到 9223372036854775807)

float32
IEEE-754 32位浮点型数

float64
IEEE-754 64位浮点型数

complex64
32 位实数和虚数

complex128
64 位实数和虚数

byte
类似 uint8

rune
类似 int32

uint
32 或 64 位

int
与 uint 一样大小

uintptr
无符号整型，用于存放一个指针

// 字符串类型
// 字符串就是一串固定长度的字符连接起来的字符序列。Go的字符串是由单个字节连接起来的。
// Go语言的字符串的字节使用UTF-8编码标识Unicode文本。

 var strdata string = "www.Golang.Ltd"

 // 派生类型:
包括：
(a) 指针类型（Pointer）
(b) 数组类型
(c) 结构化类型(struct)
(d) Channel 类型
(e) 函数类型
(f) 切片类型
(g) 接口类型（interface）
(h) Map 类型