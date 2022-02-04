const makePieChart = (incomes, budgets, expenses, tasks, notes) => {

  return {

    series: [incomes, budgets, expenses, tasks, notes],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: ['incomes', 'Budgets', 'Expenses', 'Tasks', 'Notes'],
      dataLabels: {
        enabled: false
      },
      theme: {
        monochrome: {
          enabled: false
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            show: false
          }
        }
      }],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      }
    },


  }
}

const makeExpensesGraph = (expenses) => {
  return {

    series: [{
      name: 'Expenses',
      data: [...expenses.map(expense => expense.expenseTotal)]
    }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        width: expenses.length * 100,
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          },
          autoSelected: "zoom"
        }
      },

      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: 30,
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        title: {
          text: 'Daily track'
        },
        categories: [...expenses.map(expense => expense.date)],
      },
      yaxis: {
        title: {
          text: 'KES',
          align: 'left'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "KES " + val + ""
          }
        }
      }
    },


  }
}

const makeIncomesGraph = (incomes) => {
  return {

    series: [
      {
        name: 'Amount',
        data: [...[].concat(...incomes.map(category => category.incomeSources.map(source => source.incomeAmount)))]
      }
    ],

    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },

      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      // colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      labels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },

      xaxis: {
        categories: [...[].concat(...incomes.map(category => category.incomeSources.map(source => source.incomeSource.split(' '))))],
        // category.categoryName + ' - ' + source.incomeSource)))],
        title: {
          // text: 'Source'
        },
        labels: {
          rotate: 0
        }
      },
      yaxis: {
        title: {
          text: 'Amount'
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    },


  }
}

export { makePieChart, makeExpensesGraph, makeIncomesGraph }