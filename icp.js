import alfy from 'alfy';

const data = await alfy.fetch('https://api.oick.cn/icp/api.php', {
	query: {
		url: alfy.input
	}
})

let items = [
	{
		title: '未备案',
	}
];

if (data.code === '200') {
	items = [
		{
			title: `${data['主办单位名称']}(${data['主办单位性质']})`,
			subtitle: `审核时间: ${data['审核时间']}`,
			arg: `https://icp.chinaz.com/${alfy.input}`
		}
	]
}

alfy.output(items);
