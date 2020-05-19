export const testData = {
  id: 'root',
  ZIndex:'1',
  content:'新建脑图',
  style:{},
  children:[
    {
      id: '2',
      parentId:'root',
      ZIndex:'2',
      content:'22222',
      style:{},
      direction:1,  // 0 左 上  1 右 下 
      children:[
        {
          id: '3',
          parentId:'2',
          ZIndex:'3',
          content:'3333',
          style:{},
          direction:1,
          children:[
            {
              id: '41',
              parentId:'3',
              ZIndex:'3',
              content:'3333',
              style:{},
              direction:1,
              children:[]
            }
          ]
        },
      ]
    },
    {
      id: '4',
      parentId:'root',
      ZIndex:'2',
      content:'22222',
      style:{},
      direction:1,
      children:[
        {
          id: '5',
          parentId:'4',
          ZIndex:'3',
          content:'3333',
          style:{},
          direction:1,
          children:[
            {
            id: '42',
            parentId:'5',
            ZIndex:'3',
            content:'3333',
            style:{},
            direction:1,
            children:[]
          },{
            id: '43',
            parentId:'5',
            ZIndex:'3',
            content:'3333',
            style:{},
            direction:1,
            children:[]
          }]
        },
        {
          id: '6',
          parentId:'4',
          ZIndex:'3',
          content:'3333',
          style:{},
          direction:1,
          children:[]
        },
        {
          id: '7',
          parentId:'4',
          ZIndex:'3',
          content:'3333',
          style:{},
          direction:1,
          children:[]
        },
        {
          id: '8',
          parentId:'4',
          ZIndex:'3',
          content:'3333',
          style:{},
          direction:1,
          children:[]
        }
      ]
    }
  ]
}