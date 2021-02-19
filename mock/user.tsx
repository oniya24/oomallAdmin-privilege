export default {
  'GET /users/all': (req: any, res: any) => {
    const data = new Array(20)
      .join()
      .split('')
      .map(item => {
        return {
          id: 0,
          userName: 'string',
          name: 'string',
        };
      });
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data);
  },
};
