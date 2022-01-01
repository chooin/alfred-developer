import alfy from 'alfy';
import pinyin from 'pinyin';

const items = [
  {
    title: '火车车次',
    rule: /^[GCDZTSPKXLY1-9]\d{1,4}$/,
    examples: ['G1868', 'D102', 'D9', 'Z5', 'Z24', 'Z17'],
  },
  {
    title: '手机机身码（IMEI）',
    rule: /^\d{15,17}$/,
    examples: ['123456789012345', '1234567890123456', '12345678901234567'],
  },
  {
    title: '必须带端口号的网址（或 ip）',
    rule: /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/,
    examples: [
      'https://www.qq.com:8080',
      '127.0.0.1:5050',
      'baidu.com:8001',
      'http://192.168.1.1:9090',
    ],
    counterExamples: ['192.168.1.1', 'https://www.jd.com'],
  },

  {
    title: '网址（url,支持端口和"?+参数"和"#+参数）',
    rule: /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-\(\)]*[\w@?^=%&/~+#-\(\)])?$/,
    examples: [
      'www.qq.com',
      'https://baidu.com',
      'http://baidu.com',
      'https://www.amap.com/search?id=BV10060895&city=420111&geoobj=113.207951%7C29.992557%7C115.785782%7C31.204369&query_type=IDQ&query=%E5%85%89%E8%B0%B7%E5%B9%BF%E5%9C%BA(%E5%9C%B0%E9%93%81%E7%AB%99)&zoom=10.15',
      '360.com:8080/vue/#/a=1&b=2',
    ],
    counterExamples: ['....'],
  },
  {
    title: '统一社会信用代码',
    rule: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
    examples: ['91230184MA1BUFLT44', '92371000MA3MXH0E3W'],
  },
  {
    title: '统一社会信用代码（宽松匹配）（15 位/18 位/20 位数字/字母）',
    rule: /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/,
    examples: ['91110108772551611J', '911101085923662400'],
  },
  {
    title: '迅雷链接',
    rule: /^thunderx?:\/\/[a-zA-Z\d]+=$/,
    examples: [
      'thunder://QUEsICdtYWduZXQ6P3h0PXVybjpidGloOjBCQTE0RTUxRkUwNjU1RjE0Qzc4NjE4RjY4NDY0QjZFNTEyNjcyOUMnWlo=',
    ],
  },
  {
    title: 'ed2k链接(宽松匹配)',
    rule: /^ed2k:\/\/\|file\|.+\|\/$/,
    examples: [
      'ed2k://|file|%E5%AF%84%E7%94%9F%E8%99%AB.PARASITE.2019.HD-1080p.X264.AAC-UUMp4(ED2000.COM).mp4|2501554832|C0B93E0879C6071CBED732C20CE577A3|h=5HTKZPQFYRKORN52I3M7GQ4QQCIHFIBV|/',
    ],
  },
  {
    title: '磁力链接（宽松匹配）',
    rule: /^magnet:\?xt=urn:btih:[0-9a-fA-F]{40,}.*$/,
    examples: ['magnet:?xt=urn:btih:40A89A6F4FB1498A98087109D012A9A851FBE0FC'],
  },
  {
    title: '子网掩码',
    rule: /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
    examples: ['255.255.255.0', '255.224.0.0'],
  },
  {
    title: 'linux "隐藏文件"路径',
    rule: /^\/(?:[^/]+\/)*\.[^/]*/,
    examples: ['/usr/ad/.dd', '/root/.gitignore', '/.gitignore'],
  },
  {
    title: 'linux 文件夹路径',
    rule: /^\/(?:[^/]+\/)*$/,
    examples: ['/usr/ad/dd/', '/', '/root/'],
  },
  {
    title: 'linux 文件路径',
    rule: /^\/(?:[^/]+\/)*[^/]+$/,
    examples: ['/root/b.ts', '/root/abc'],
  },
  {
    title: 'window "文件夹"路径',
    rule: /^[a-zA-Z]:\\(?:\w+\\?)*$/,
    examples: ['C:\\Users\\Administrator\\Desktop', 'e:\\m\\'],
  },
  {
    title: 'window 下"文件"路径',
    rule: /^[a-zA-Z]:\\(?:\w+\\)*\w+\.\w+$/,
    examples: [
      'C:\\Users\\Administrator\\Desktop\\qq.link',
      'e:\\m\\vscode.exe',
    ],
  },
  {
    title: '股票代码（A 股）',
    rule: /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/,
    examples: ['sz000858', 'SZ002136', 'sz300675', 'SH600600', 'sh601155'],
  },
  {
    title:
      '大于等于 0, 小于等于 150, 支持小数位出现 5, 如 145.5, 用于判断考卷分数',
    rule: /^150$|^(?:\d|[1-9]\d|1[0-4]\d)(?:\.5)?$/,
    examples: [150, 100.5],
  },
  {
    title: 'html 注释',
    rule: /<!--[\s\S]*?-->/g,
    examples: [
      '<!--<div class="_bubble"></div>--><div>chenguzhen87</div><div class="_bubble"></div>-->',
    ],
  },
  {
    title: 'md5 格式（32 位）',
    rule: /^([a-f\d]{32}|[A-F\d]{32})$/,
    examples: ['21fe181c5bfc16306a6828c1f7b762e8'],
  },
  {
    title: 'GUID/UUID',
    rule: /^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i,
    examples: [
      'e155518c-ca1b-443c-9be9-fe90fdab7345',
      '41E3DAF5-6E37-4BCC-9F8E-0D9521E2AA8D',
      '00000000-0000-0000-0000-000000000000',
    ],
  },
  {
    title: '版本号（version）格式必须为 X.Y.Z',
    rule: /^\d+(?:\.\d+){2}$/,
    examples: ['16.3.10'],
  },
  {
    title: '视频（video）链接地址（视频格式可按需增删）',
    rule: /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i,
    examples: ['http://www.abc.com/video/wc.avi'],
  },
  {
    title: '图片（image）链接地址（图片格式可按需增删）',
    rule: /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i,
    examples: ['https://www.abc.com/logo.png', 'http://www.abc.com/logo.png'],
  },
  {
    title: '24 小时制时间（HH:mm:ss）',
    rule: /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/,
    examples: ['23:34:55'],
  },
  {
    title: '12 小时制时间（hh:mm:ss）',
    rule: /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/,
    examples: ['11:34:55'],
    counterExamples: ['23:34:55'],
  },
  {
    title: 'base64 格式',
    rule: /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i,
    examples: ['data:image/gif;base64,word=='],
  },
  {
    title: '数字/货币金额（支持负数、千分位分隔符）',
    rule: /^-?\d+(,\d{3})*(\.\d{1,2})?$/,
    examples: [100, -0.99, 3, 234.32, -1, 900, 235.09, '12,345,678.90'],
  },
  {
    title: '数字/货币金额 (只支持正数、不支持校验千分位分隔符)',
    rule: /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/,
    examples: [0.99, 8.99, 666],
  },
  {
    title:
      '银行卡号（10 到 30 位, 覆盖对公/私账户, 参考[微信支付](https://pay.weixin.qq.com/wiki/doc/api/xiaowei.php?chapter=22_1)）',
    rule: /^[1-9]\d{9,29}$/,
    examples: [6234567890, 6222026006705354217],
  },
  {
    title: '中文姓名',
    rule: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
    examples: ['葛二蛋', '凯文·杜兰特', '德克·维尔纳·诺维茨基'],
  },
  {
    title: '英文姓名',
    rule: /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/,
    examples: ['James', 'Kevin Wayne Durant', 'Dirk Nowitzki'],
  },
  {
    title: '车牌号（新能源）',
    rule: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z](?:((\d{5}[A-HJK])|([A-HJK][A-HJ-NP-Z0-9][0-9]{4}))|[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳])$/,
    examples: ['京AD92035', '甘G23459F', '京AA92035'],
  },
  {
    title: '车牌号（非新能源）',
    rule: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]$/,
    examples: ['京A00599', '黑D23908'],
  },
  {
    title: '车牌号（新能源+非新能源）',
    rule: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/,
    examples: ['京A12345D', '京A00599', '京AD92035', '甘G23459F', '京AA92035'],
    counterExamples: ['宁AD1234555555', '浙苏H6F681'],
  },
  {
    title:
      '手机号（mobile phone）中国（严谨）, 根据工信部 2019 年最新公布的手机号段',
    rule: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    examples: ['008618311006933', '+8617888829981', '19119255642'],
  },
  {
    title:
      '手机号（mobile phone）中国（宽松）, 只要是 13,14,15,16,17,18,19 开头即可',
    rule: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    examples: ['008618311006933', '+8617888829981', '19119255642'],
  },
  {
    title:
      '手机号（mobile phone）中国（最宽松）, 只要是 1 开头即可, 如果你的手机号是用来接收短信, 优先建议选择这一条',
    rule: /^(?:(?:\+|00)86)?1\d{10}$/,
    examples: ['008618311006933', '+8617888829981', '19119255642'],
  },
  {
    title: 'date（日期）',
    rule: /^\d{1,4}(-)(1[0-2]|0?[1-9])\1(0?[1-9]|[1-2]\d|30|31)$/,
    examples: ['1990-12-12', '1-1-1', '0000-1-1'],
    counterExamples: ['2020-00-01'],
  },
  {
    title: '座机（tel phone）电话（国内），如: 0341-86091234',
    rule: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
    examples: ['0936-4211235', '89076543', '010-12345678-1234'],
  },
  {
    title: '身份证号（1 代，15 位数字）',
    rule: /^[1-9]\d{7}(?:0\d|10|11|12)(?:0[1-9]|[1-2][\d]|30|31)\d{3}$/,
    examples: ['123456991010193'],
  },
  {
    title: '身份证号（2 代，18 位数字），最后一位是校验位,可能为数字或字符 X',
    rule: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    examples: ['12345619991205131x'],
  },
  {
    title: '身份证号, 支持 1/2 代（15 位/18 位数字）',
    rule: /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
    examples: ['622223199912051311', '12345619991205131x', '123456991010193'],
  },
  {
    title: '护照（包含香港、澳门）',
    rule: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,
    examples: ['s28233515', '141234567', '159203084', 'MA1234567', 'K25345719'],
  },
  {
    title: '帐号是否合法(字母开头，允许 5-16 字节，允许字母数字下划线组合',
    rule: /^[a-zA-Z]\w{4,15}$/,
    examples: ['justin', 'justin1989', 'justin_666'],
  },
  {
    title: '中文/汉字',
    // rule: /^[\u4E00-\u9FA5]+$/,
    rule: /^(?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])+$/,
    examples: ['正则', '前端'],
  },
  {
    title: '小数',
    rule: /^\d+\.\d+$/,
    examples: ['0.0', '0.09'],
  },
  {
    title: '数字',
    rule: /^\d{1,}$/,
    examples: [12345678],
  },
  {
    title: 'html 标签（宽松匹配）',
    rule: /<(\w+)[^>]*>(.*?<\/\1>)?/,
    examples: ['<div id="app"> 2333 </div>', '<input type="text">', '<br>'],
  },
  {
    title: 'qq 号格式正确',
    rule: /^[1-9][0-9]{4,10}$/,
    examples: [903013545, 9020304],
  },
  {
    title: '数字和字母组成',
    rule: /^[A-Za-z0-9]+$/,
    examples: ['james666', 'haha233hi'],
  },
  {
    title: '英文字母',
    rule: /^[a-zA-Z]+$/,
    examples: ['Russel'],
  },
  {
    title: '小写英文字母组成',
    rule: /^[a-z]+$/,
    examples: ['russel'],
  },
  {
    title: '大写英文字母',
    rule: /^[A-Z]+$/,
    examples: ['ABC', 'KD'],
  },
  {
    title:
      '密码强度校验，最少 6 位，包括至少1个大写字母，1 个小写字母，1 个数字，1 个特殊字符',
    rule: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
    examples: ['Kd@curry666'],
  },
  {
    title: '用户名校验，4到16位（字母，数字，下划线，减号）',
    rule: /^[a-zA-Z0-9_-]{4,16}$/,
    examples: ['xiaohua_qq'],
  },
  {
    title: 'ip-v4[: 端口 ]',
    rule: /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/,
    examples: ['172.16.0.0', '172.16.0.0:8080', '127.0.0.0', '127.0.0.0:998'],
  },
  {
    title: 'ip-v6[: 端口 ]',
    rule: /^(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))|\[(?:(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/i,
    examples: [
      '2031:0000:130f:0000:0000:09c0:876a:130b',
      '[2031:0000:130f:0000:0000:09c0:876a:130b]:8080',
    ],
  },
  {
    title: '16 进制颜色',
    rule: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    examples: ['#f00', '#F90', '#000', '#fe9de8'],
  },
  {
    title: '微信号（x），6 至 20 位，以字母开头，字母，数字，减号，下划线',
    rule: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
    examples: ['github666', 'kd_-666'],
  },
  {
    title: '邮政编码（中国）',
    rule: /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/,
    examples: ['734500', '100101'],
  },
  {
    title: '中文和数字',
    rule: /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/,
    examples: ['哈哈哈', '你好6啊'],
  },
  {
    title: '不能包含字母',
    rule: /^[^A-Za-z]*$/,
    examples: ['你好6啊', '@¥()！'],
  },
  {
    title: 'java 包名',
    rule: /^([a-zA-Z_]\w*)+([.][a-zA-Z_]\w*)+$/,
    examples: ['com.bbb.name'],
  },
  {
    title: 'mac 地址',
    rule: /^((([a-f0-9]{2}:){5})|(([a-f0-9]{2}-){5}))[a-f0-9]{2}$/i,
    examples: ['38:f9:d3:4b:f5:51', '00-0C-29-CA-E4-66'],
  },
  {
    title: '匹配连续重复的字符',
    rule: /(.)\1+/,
    examples: ['我我我', '112233', '11234'],
  },
  {
    title: '数字和英文字母组成，并且同时含有数字和英文字母',
    rule: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
    examples: ['我a我1我', 'a对1'],
  },
  {
    title: '香港身份证 ',
    rule: /^[a-zA-Z]\d{6}\([\dA]\)$/,
    examples: ['K034169(1)'],
  },
  {
    title: '澳门身份证 ',
    rule: /^[1|5|7]\d{6}[(\d)]{3}$/,
    examples: ['5686611(1)'],
  },
  {
    title: '台湾身份证 ',
    rule: /^[a-zA-Z][0-9]{9}$/,
    examples: ['U193683453'],
  },
  {
    title: '正整数，不包含 0',
    rule: /^\+?[1-9]\d*$/,
    examples: [1231],
  },
  {
    title: '负整数，不包含 0',
    rule: /^-[1-9]\d*$/,
    examples: [-1231],
  },
  {
    title: 'integer(整数)',
    rule: /^-?[0-9]\d*$/,
    examples: [-1231, 123],
  },
  {
    title: 'float（浮点数）',
    rule: /^(-?\d+)(\.\d+)?$/,
    examples: [1.5],
  },
  {
    title: 'email',
    rule: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  },
]
  .map(({ title, rule }) => ({
    title,
    subtitle: rule.toString(),
    arg: rule.toString(),
  }))
  .filter(item => {
    const input = pinyin(alfy.input.toLowerCase().trim(), {
      style: pinyin.STYLE_NORMAL,
    }).join('');
    const title = pinyin(item.title.toLowerCase().trim(), {
      style: pinyin.STYLE_NORMAL,
    }).join('');
    return title.indexOf(input) > -1;
  });

alfy.output(items);
