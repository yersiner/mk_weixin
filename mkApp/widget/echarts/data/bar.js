export let initial = {
  title: {
    text: ''
  },
  tooltip: {
     trigger: 'axis',
     borderColor : "#000",
     backgroundColor:"#D1DDE6",
     textStyle:{
         color : "#fff",
     },
     axisPointer:{
         lineStyle :{
             color:"#38E6FF"
         }
     },
     alwaysShowContent:false
  },
  legend: {
    data: ['收缩压','舒张压','心率','血糖','血氧'],
    selected: {
       '收缩压': true,
       '舒张压': false,
       '心率': false,
       '血糖': false,
       '血氧': false
    }
  },
  xAxis: {
    data: []
  },
  yAxis: {
    axisLabel: {show: false}
  },
  series: [{
    name: '收缩压',
    type: 'line',
  }, {
    name: '舒张压',
    type: 'line',
  }, {
    name: '心率',
    type: 'line',
  }, {
    name: '血糖',
    type: 'line',
  }, {
    name: '血氧',
    type: 'line',
  }]
}

let asyncData = {
  categories: ['衬衫', 'gyf', '雪纺衫ds', '裤子', '高跟鞋', '袜子'],
  data: [15, 10, 26, 30, 70, 50]
}

export let async = {
  xAxis: {
    data: asyncData.categories
  },
  yAxis: {
    axisLabel: {show: true}
  },
  legend: {
    data: ['收缩压','舒张压','心率','血糖','血氧'],
    selected: {
       '收缩压': false,
       '舒张压': false,
       '心率': false,
       '血糖': false,
       '血氧': true
    }
  },
  series: [{
    name: '血氧',
    type: 'line',
    data: asyncData.data
  }]
}
