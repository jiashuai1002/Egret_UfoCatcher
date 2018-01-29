/**
 *
 * 日期工具类
 *
 */
class DateUtils {
    /**
     * 检查是否是同一天
     */
    public static checkDay(date1: Date, date2: Date) {
        return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth()
            && date1.getDate() == date2.getDate();
    }

    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式   
    public static convertDate(time: string): string {
        return time.replace(/\-/g, "/");
    }

    public static howLongAgo(d): string {
        d = this.convertDate(d);
        var time = new Date(d).getTime();
        var now = new Date().getTime();
        var diff = now - time;
        var seconds = Math.floor(diff / 1000);
        var minutes = Math.floor(diff / 60000);
        var hours = Math.floor(diff / 3600000)
        var days = Math.floor(diff / (3600000 * 24));
        if (seconds < 60)
            return seconds + "秒前";
        else if (minutes < 60) {
            seconds = Math.floor((diff % 60000) / 1000)
            return minutes + "分" + seconds + "秒前";
        }
        else if (hours < 24) {
            return hours + "小时前";
        }
        else {
            return days + "天前";
        }
    }
	/**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前
     * @return
     *
     */
    public static getFormatBySecond(second: number, type: number = 1): string {
        var str: string = "";
        switch (type) {
            case 0:
                str = this.getFormatBySecond0(second);
                break;
            case 1:
                str = this.getFormatBySecond1(second);
                break;
            case 2:
                str = this.getFormatBySecond2(second);
                break;
            case 3:
                str = this.getFormatBySecond3(second);
                break;
            case 4:
                str = this.getFormatBySecond4(second);
                break;
            case 5:
                str = this.getFormatBySecond5(second);
                break;
        }
        return str;
    }

    //0: 00:00
    private static getFormatBySecond0(t: number = 0): string {
        var minst: number = Math.floor(t / 60);
        var secondt: number = Math.floor(t % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return mins + ":" + sens;
    }

    //1: 00:00:00
    private static getFormatBySecond1(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
        var hours: string;
        if (hourst == 0) {
            hours = "00";
        } else {
            if (hourst < 10)
                hours = "0" + hourst;
            else
                hours = "" + hourst;
        }
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var secondt: number = Math.floor((t - hourst * 3600) % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return hours + ":" + mins + ":" + sens;
    }

    //3: 00:00
    private static getFormatBySecond3(t: number = 0): string {
        var hourst: number = Math.floor(t / 3600);
        var minst: number = Math.floor((t - hourst * 3600) / 60);
        var secondt: number = Math.floor((t - hourst * 3600) % 60);
        var mins: string;
        var sens: string;
        if (minst == 0) {
            mins = "00";
        } else if (minst < 10) {
            mins = "0" + minst;
        } else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        } else if (secondt < 10) {
            sens = "0" + secondt;
        } else {
            sens = "" + secondt;
        }
        return mins + " : " + sens;
    }

    //2:yyyy-mm-dd h:m:s
    private static getFormatBySecond2(time: number): string {
        var date: Date = new Date(time);
        var year: number = date.getFullYear();
        var month: number = date.getMonth() + 1; 	//返回的月份从0-11；
        var day: number = date.getDate();
        var hours: number = date.getHours();
        var minute: number = date.getMinutes();
        var second: number = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;

    }

    //4:xx天前，xx小时前，xx分钟前
    private static getFormatBySecond4(time: number): string {
        var t = Math.floor(time / 3600);
        if (t > 0) {
            if (t > 24) {
                return Math.floor(t / 24) + "天前";
            }
            else {
                return t + "小时前";
            }
        }
        else {
            return Math.floor(time / 60) + "分钟前";
        }
    }

    private static getFormatBySecond5(time: number): string {
        //每个时间单位所对应的秒数
        var oneDay: number = 3600 * 24;
        var oneHourst: number = 3600;
        var oneMinst: number = 60;

        var days = Math.floor(time / oneDay);
        var hourst: number = Math.floor(time % oneDay / oneHourst)
        var minst: number = Math.floor((time - hourst * oneHourst) / oneMinst)  //Math.floor(time % oneDay % oneHourst / oneMinst);
        var secondt: number = Math.floor((time - hourst * oneHourst) % oneMinst) //time;

        var dayss: string = "";
        var hourss: string = ""
        var minss: string = "";
        var secss: string = ""
        if (time > 0) {
            //天
            if (days == 0) {
                dayss = "";
                //小时
                if (hourst == 0) {
                    hourss = "";
                    //分
                    if (minst == 0) {
                        minss = "";
                        if (secondt == 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                        return secss;
                    }
                    else {
                        minss = "" + minst + "分";
                        if (secondt == 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                    }

                    return minss + secss;
                }
                else {
                    hourss = hourst + "小时";
                    if (minst == 0) {
                        minss = "";
                        if (secondt == 0) {
                            secss = "";
                        } else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        } else {
                            secss = "" + secondt + "秒";
                        }

                        return secss

                    } else if (minst < 10) {
                        minss = "0" + minst + "分";
                    } else {
                        minss = "" + minst + "分";
                    }

                    return hourss + minss;

                }
            }
            else {
                dayss = days + "天";
                if (hourst == 0) {
                    hourss = "";
                } else {
                    if (hourst < 10)
                        hourss = "0" + hourst + "小时";
                    else
                        hourss = "" + hourst + "小时";
                    ;
                }
                return dayss + hourss;
            }
        }
        return "";
    }
}
