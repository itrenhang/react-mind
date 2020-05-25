export const testData = {
  id: "root",
  ZIndex: "1",
  content: {
    text: "新建脑图"
  },
  expanded:true,
  style: {},
  children: [
    {
      id: "2",
      ZIndex: "2",
      content: {
        text: "新建脑图"
      },
      style: {},
      parentId:'root',
      expanded:true,
      children: [
        {
          id: "3",
          ZIndex: "3",
          content: {
            text: "新建脑图"
          },
          style: {},
          expanded:true,
          parentId:'2',
          children: [
            {
              id: "5",
              ZIndex: "4",
              content: {
                text: "新建脑图"
              },
              style: {},
              expanded:true,
              parentId:'3',
              children: []
            },
            {
              id: "6",
              ZIndex: "4",
              content: {
                text: "新建脑图"
              },
              style: {},
              expanded:true,
              parentId:'3',
              children: []
            }
          ]
        },
        {
          id: "4",
          ZIndex: "3",
          content: {
            text: "新建脑图"
          },
          style: {},
          expanded:true,
          parentId:'2',
          children: []
        }
      ]
    }
  ]
};
