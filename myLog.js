var myJs = {
    TYPE_RUN: 'Run',//日志类型为运行
    TYPE_ERR: 'Err',//日志类型为错误
    WRITE_RUN_FILE: 'run.txt',//运行日志文件
    WRITE_ERR_FILE: 'err.txt',//错误日志文件
    MAX_FILE_SIZE: 100 * 1024 * 1024,//设置单日志最大为100MB
    MAX_FILE_NUM: 10,//日志文件最大数量10个
    LOG_PATH: 'C://Workspace',//日志路径

    ipcc_fso: null,//ActiveXObject对象

    /** 返回当前时间*/
    GetYearMonth: function () {
        var date = new Date();
        return date.getFullYear() +
            "-" + this.FmTimeNum(date.getMonth() + 1) +
            "-" + this.FmTimeNum(date.getDate()) +
            " " + this.FmTimeNum(date.getHours()) +
            ":" + this.FmTimeNum(date.getMinutes()) +
            ":" + this.FmTimeNum(date.getSeconds());
    },
    /** 格式化时间数值（个位数补全加0显示）*/
    FmTimeNum: function (num) {
        return (num < 10 ? "0" : "") + num;
    },
    /** 日志(日志类型, 内容) */
    printLog: function (type, logText) {
        // 日志中记录当前时间
        logText = this.GetYearMonth() +
            " 【" + type + "】 " + logText;
        // 记录日志的文件名称
        var fileName = this.WRITE_RUN_FILE;
        if (type == this.TYPE_ERR) {
            fileName = this.WRITE_ERR_FILE;
        }
        this.writeFile(fileName, logText);// 写入
    },

    /** 写入文件(文件名, 写入内容) */
    writeFile: function (fileName, logText) {
        // 判断或创建日志目录

        if (!this.ipcc_fso.FolderExists(this.LOG_PATH)) {
            this.ipcc_fso.CreateFolder(this.LOG_PATH);
        }
        // 日志文件全路径名称
        var fileAllName = this.LOG_PATH + "//" + fileName,
            newfileStream;
        // 判断日志文件是否存在
        if (!this.ipcc_fso.FileExists(fileAllName)) { //不存在
            // 新建
            newfileStream = this.ipcc_fso.CreateTextFile(fileAllName, true);

        } else {   //存在
            newfileStream = this.ipcc_fso.OpenTextFile(fileAllName);
        }

        try {

            newfileStream.writeLine(logText);
            newfileStream.Close();

        } catch (e) {
            alert(e.message);
        }



    },

    /** 备份文件名(原文件名称, 备份文件名称)*/
    bakFile: function (sourceName, bakName) {
        var sourceAllName = this.LOG_PATH + "//" + sourceName;
        var bakAllName = this.LOG_PATH + "//" + bakName;
        //判断备份文件是否存在
        if (this.ipcc_fso.FileExists(bakAllName)) {
            //获取下一个备份文件
            var nextBakName = this.getNextBakName(bakName);
            var num = nextBakName.substr(nextBakName.length - 2);
            // 备份文件超过最大数量
            if (parseInt(num) >= this.MAX_FILE_NUM) {
                this.ipcc_fso.DeleteFile(bakAllName, true);
            } else {
                this.bakFile(bakName, nextBakName);
            }
        }
        var fileObj = myJs.ipcc_fso.GetFile(sourceAllName);
        fileObj.Name = bakName;
    },

    /** 获取下一个备份文件名(备份文件名称) */
    getNextBakName: function (bakName) {
        var num = bakName.substr(bakName.length - 1);
        var nextBakName = bakName.substr(0, bakName.length - 1) +
            (parseInt(num) + 1);
        return nextBakName;
    },
    /** 记录运行日志(内容) */
    // PrintRunLog: function (logText) {
    //     this.printLog(this.TYPE_RUN, logText);
    // },
    // /** 记录错误日志(内容) */
    // PrintErrLog: function (logText) {
    //     this.printLog(this.TYPE_ERR, logText);
    // }

};

/** 记录运行日志(内容) */
function PrintRunLog(logText) {
    // f1.writeLine("这是您创建的一个文本文档");
    myJs.printLog(this.TYPE_RUN, logText);
}
/** 记录错误日志(内容) */
function PrintErrLog(logText) {
    myJs.printLog(this.TYPE_ERR, logText);
}

(function () {
    try {
        myJs.ipcc_fso =
            new ActiveXObject("Scripting.FileSystemObject");
    } catch (e) {
        alert('请开启IE写日志权限！');
    }
})();
