package gamedata

import (
	"FenDZ/glog-master"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB
var err error

func init1() {
	StrConnection := "root" + ":" + "ruilide2016" + "@tcp(" + "127.0.0.1" + ":3306)/" + "gl_RuiliDe"
	db, err = sql.Open("mysql", StrConnection)
	checkError(err)
	db.SetMaxOpenConns(2000)
	db.SetMaxIdleConns(1000)
	err = db.Ping()
	checkError(err)
}

func checkError(err error) {
	if err != nil {
		glog.Info("db error: %s", err)
		panic(err)
	}
}

//// 链接池的最大链接数量
//const MAX_POOL_SIZE int = 200

//// 全局数据库变量
//var MySQLPool chan *sql.DB

//// 获取数据链接
//func getMySQL() *sql.DB {
//	// 获取链接
//	conn := GetMySQL1()
//	// 压入队列
//	putMySQL(conn)
//	return conn
//}

//// 获取数据链接
//func GetMySQL() *sql.DB {
//	// 获取链接
//	conn := GetMySQL1()
//	// 压入队列
//	putMySQL(conn)
//	return conn
//}

//// 获取链接指针函数
//func GetMySQL1() *sql.DB {
//	if MySQLPool == nil {
//		MySQLPool = make(chan *sql.DB, MAX_POOL_SIZE)
//	}
//	if len(MySQLPool) == 0 {
//		go func() {
//			for i := 0; i < MAX_POOL_SIZE/2; i++ {
//				mysql := new(sql.DB)
//				var err error
//				var StrConnection = ""
//				//if Log_Eio.BTest == true {
//				// 测试
//				StrConnection = "root" + ":" + "ruilide2016" + "@tcp(" + "127.0.0.1" + ":3306)/" + "gl_RuiliDe"
//				//StrConnection = "root" + ":" + "123456" + "@tcp(" + "127.0.0.1" + ":3306)/" + "gl_RuiliDe"
//				//}
//				mysql, err = sql.Open("mysql", StrConnection)
//				if err != nil {
//					glog.Info("Connect Fail!")
//					continue
//				}
//				putMySQL(mysql)
//			}
//		}()
//	}
//	return <-MySQLPool
//}

////存储指针函数
//func putMySQL(conn *sql.DB) {
//	if MySQLPool == nil {
//		MySQLPool = make(chan *sql.DB, MAX_POOL_SIZE)
//	}
//	if len(MySQLPool) == MAX_POOL_SIZE {
//		conn.Close()
//		return
//	}
//	MySQLPool <- conn
//}
