var log = {
    fso: new ActiveXObject("Scripting.FileSystemObject"),
    printLog: function (text) {
        var f1,
            absolutePath = window.location.href,
            curPath = absolutePath.substr(absolutePath.lastIndexOf("///") + 3, absolutePath.lastIndexOf("/")).split("/"),
            dateAndTime = "[" + this.getTime() + "]:";

        curPath.pop();
        filePath = curPath.join("\\") + "\\" + this.getDate() + "-log.txt";
        // alert(filePath);

        try {

            if (!this.fso.FileExists(filePath)) {
                f1 = this.fso.CreateTextFile(filePath, false);
            } else {
                f1 = this.fso.OpenTextFile(filePath, 8, true);
            }

            f1.WriteLine(dateAndTime + text);
            f1.Close();
        } catch (e) {
            alert(e.message);
            // 	alert('Please authorize IE to write log files');
        }

    },
    /** Get current date and time*/
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
    /** Another way of returing current date and time*/
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
    /** Return date */
    getDate: function () {
        var date = new Date();
        return date.getFullYear() +
            "-" + this.FmTimeNum(date.getMonth() + 1) +
            "-" + this.FmTimeNum(date.getDate());
    },
    /** Format numbers(two digits)*/
    FmTimeNum: function (num) {
        return (num < 10 ? "0" : "") + num;
    }

};