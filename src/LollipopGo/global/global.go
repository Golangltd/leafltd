package global

import (
	"FenDZ/go-concurrentMap-master"
)

var M *concurrent.ConcurrentMap // 并发安全的map

// 获取商家的OpenID信息
func Get_MD5_Data(stropenid string) string {
	// 判断数据库存在不
	var StrMD5 = ""
	// 差分key
	strsplit := Strings_Split(stropenid, "|")
	for i := 0; i < len(strsplit); i++ {
		if i == 0 {
		} else if i == 1 {
			StrMD5 = strsplit[i]
		}
	}
	return StrMD5
}
