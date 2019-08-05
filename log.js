var myLog = {
    fso: new ActiveXObject("Scripting.FileSystemObject"),
    printLog: function (text) {
        var f1,
            absolutePath = window.location.href,
            curPath = absolutePath.substr(absolutePath.lastIndexOf("///") + 3, absolutePath.lastIndexOf("/")).split("/"),
            time = "[" + this.getTime() + "]:";

        curPath.pop();
        filePath = curPath.join("\\") + "\\" + this.getDate() + "-log.txt";
        // alert(filePath);

        try {

            if (!this.fso.FileExists(filePath)) {
                f1 = this.fso.CreateTextFile(filePath, false);
            } else {
                f1 = this.fso.OpenTextFile(filePath, 8, true);
            }

            f1.WriteLine(time + text);
            f1.Close();
        } catch (e) {
            alert(e.message);
            // 	alert('请开启IE写日志权限！');
        }

    },
    /** 返回当前时间*/
    getTime: function () {
        var date = new Date();
        return date.getFullYear() +
            "-" + this.FmTimeNum(date.getMonth() + 1) +
            "-" + this.FmTimeNum(date.getDate()) +
            " " + this.FmTimeNum(date.getHours()) +
            ":" + this.FmTimeNum(date.getMinutes()) +
            ":" + this.FmTimeNum(date.getSeconds()) +
            "." + this.FmTimeNum(date.getMilliseconds());
    },

    getTime2: function () {
        var date = new Date();
        return date.getFullYear() +
            "-" + ('0' + (date.getMonth() + 1)).slice(-2) +
            "-" + date.getDate().slice(-2) +
            " " + date.getHours().slice(-2) +
            ":" + date.getMinutes().slice(-2) +
            ":" + date.getSeconds().slice(-2) +
            "." + date.getMilliseconds().slice(-2);
    },
    /** 返回当前日期 */
    getDate: function () {
        var date = new Date();
        return date.getFullYear() +
            "-" + this.FmTimeNum(date.getMonth() + 1) +
            "-" + this.FmTimeNum(date.getDate());
    },
    /** 格式化时间数值（个位数补全加0显示）*/
    FmTimeNum: function (num) {
        return (num < 10 ? "0" : "") + num;
    }

};