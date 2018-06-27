package dbif

import (
	"database/sql"
	"fmt"
	"FenDZ/glog-master"
	//	"runtime"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// 链接池的最大链接数量
const MAX_POOL_SIZE int = 100

// 全局数据库变量
var MySQLPool chan *sql.DB

// 获取数据链接
func GetMySQL() *sql.DB {
	// 获取链接
	conn := getMySQL()
	// 压入队列
	putMySQL(conn)
	return conn
}

//存储指针函数
func putMySQL(conn *sql.DB) {
	defer func() { // 必须要先声明defer，否则不能捕获到panic异常
		if err := recover(); err != nil {
			strerr := fmt.Sprintf("%s", err)
			glog.Info("清除奖券定时器：", strerr)
		}
	}()
	if MySQLPool == nil {
		MySQLPool = make(chan *sql.DB, MAX_POOL_SIZE)
	}
	if len(MySQLPool) == MAX_POOL_SIZE {
		conn.Close()
		return
	}
	MySQLPool <- conn
}

// 数据更新====----
func RegNewUserForWeiXinTiWD(name, headurl, neirong, readingNum, collectionNum, commentNum string) int64 {
	glog.Info("RegNewUserForWeiXinTiWD")

	//时间戳到具体显示的转化
	iLastLoginTime := time.Now().Unix()

	// 该用户名可以被注册时把数据插入到数据库中
	strSql := "INSERT INTO t_XWDData(name,headurl,neirong,readingNum,collectionNum,commentNum,time) VALUES(?, ?, ?, ?, ?, ?, ?)"
	stmt, err := GetMySQL().Prepare(strSql)
	if err != nil {
		glog.Info("插入数据库错误：", err.Error())
		return 0
	}
	var res sql.Result
	res, err = stmt.Exec(name, headurl, neirong, readingNum, collectionNum, commentNum, iLastLoginTime)
	if err != nil {
		glog.Info(err.Error())
		return 0
	}
	var iAffectNum int64
	iAffectNum, err = res.RowsAffected()
	if err != nil {
		glog.Info(err.Error())
		return 0
	}
	if iAffectNum != 1 {
		glog.Info(err.Error())
		return 0
	}

	return 0
}
