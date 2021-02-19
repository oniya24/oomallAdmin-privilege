export default {
  'GET /addresses': (req: any, res: any) => {
    const data = new Array(20)
      .join()
      .split('')
      .map(item => {
        return {
          id: 0,
          region_id: ['340000', '341500', '341522'],
          detail: '厦大学生公寓',
          consignee: '刘旭',
          mobile: '13850001400',
          isDefault: true,
          gmtCreate: 'string',
          state: 0,
        };
      });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send({
      errno: 0,
      errmsg: 'string',
      data: {
        page: '0',
        pageSize: '20',
        total: '10',
        pages: '1',
        list: data,
      },
    });
  },
};
