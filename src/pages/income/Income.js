import { useState, useEffect, forwardRef, useRef } from 'react'
import '../../styles/Income.css'
import { IoCashOutline, IoLogoUsd, IoBookmarkOutline, IoLogoWebComponent, IoChevronForwardOutline, IoCheckmarkCircleOutline, IoStatsChartOutline, IoCloseOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5';
import { IconButton, makeStyles } from '@material-ui/core';

import { Outlet } from 'react-router';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

import Collapse from '@mui/material/Collapse'
import { selectAppState } from '../../features/appController/AppSlice';
import { LoaderComponent } from '../../components/LoaderLabel';
import PageBody from '../../components/page/PageBody';
import PageHeader from '../../components/page/PageHeader';
import PageHolder from '../../components/page/PageHolder';
import { CardHeader } from '../../components/MotionButton';


const nf = new Intl.NumberFormat('en-US')

const IncomeCategoryComponent = forwardRef(({ title, tag_line }, ref) => {
  return (
    <div ref={ref} className="d-flex align-items-cnter flex-column">
      <h6 className="p-0 my-auto">
        <strong>{title}</strong>
      </h6>
      {
        tag_line && (
          <div className="d-flex align-items-center justify-content-end">

            <div className="p-0 m-0 d-flex align-items-center justify-content-end">{tag_line}</div>
          </div>
        )
      }
    </div>
  )
})

const IncomeCategory = forwardRef(({ category, category_total }, ref) => {
  const [sub_categories, setSub_categories] = useState(category.incomeSources)
  const [sub_category_count, setSub_category_count] = useState(0)
  const [total, setTotal] = useState(0)
  const [sources, setSources] = useState([])

  const [moreVisible, setMorevisible] = useState(false)

  const scrollHere = useRef(null);

  const headers = [
    { field: 'id', type: 'number', headerName: 'ID', width: '70', allignment: 'left', flex: 0.4 },
    { field: 'source', type: 'string', headerName: 'Source', width: '150', allignment: 'center', flex: 1 },
    { field: 'date', type: 'string', headerName: 'Date', width: '150', allignment: 'center', flex: 1 },
    { field: 'percentage', type: 'number', headerName: 'Percentage', width: '100', allignment: 'center', flex: 1 },
    { field: 'amount', type: 'number', headerName: 'Amount', width: '100', allignment: 'center', flex: 1 },
  ]

  useEffect(() => {
    setSub_categories(category.incomeSources)
    let t = 0;
    category.incomeSources.map(source => {
      t = t + parseFloat(source.incomeAmount)
    })
    setTotal(t)

    sub_categories.map((sub_category, index) => {
      let i = index + 1
      setSources(prev => [...prev, { id: i, source: sub_category.incomeSource, date: sub_category.dateReceived, percentage: `${((sub_category.incomeAmount / t) * 100).toFixed(1)}%`, amount: sub_category.incomeAmount }])
    })

    setSub_category_count(sub_categories.length);

  }, [category])

  const handleMore = () => {

    setMorevisible(current => !current)
    window.scrollTo({ top: scrollHere?.current?.offsetTop, behavior: 'smooth' });
  }

  return (
    <div>
      <div ref={ref} className="common-card p-2 my-2 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-between h-100">
          <div className="d-flex align-items-center h-100">
            <IconButton color='secondary'>
              <IoLogoWebComponent />
            </IconButton>
          </div>
          <IncomeCategoryComponent title={category.categoryName} tag_line={`${((total / category_total) * 100).toFixed(1)}% of income`} />
        </div>
        <div className="d-flex">
          <IncomeCategoryComponent title={`KES ${nf.format(total)}`} tag_line={
            <div className="d-flex align-items-center justify-content-end">
              <IoStatsChartOutline color='secondary' className="me-2" />
              {sub_category_count}</div>} />

          <div className="d-flex align-items-center h-100 ms-2">
            <IconButton color='secondary' onClick={e => handleMore()}>
              {
                moreVisible ? <IoCloseOutline /> : <IoChevronForwardOutline />
              }
            </IconButton>
          </div>
        </div>
      </div>


      <Collapse in={moreVisible}>

        <div className="common-card-1">
          <div className="p-2">
            <CardHeader title={category.categoryName} />
          </div>
          <div className="p-2">

            {
              sources && sources.length === 0 && <ZeroComponent title="No sources found under this category" />
            }
            {
              sources && sources.length > 0 && (
                <DataGrid showColumnRightBorder={false} showCellRightBorder={false} columns={headers} rows={sources} pageSize={5} rowHeight={42} className="border-0 border-none common-card overflow-none" autoHeight checkboxSelection />
              )
            }

          </div>
          {/* <div ref={scrollHere}></div> */}
        </div>
      </Collapse>

    </div>
  )
})

const IncomeBudget = forwardRef(({ budget }, ref) => {

  return (
    <div ref={ref} className="common-card p-2 my-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center h-100">
          <IconButton>
            <IoCheckmarkCircleOutline />
          </IconButton>
        </div>
        <IncomeCategoryComponent title={budget.title} tag_line={`${budget?.creationDate}`} />
      </div>
      <div className="d-flex">
        <IncomeCategoryComponent title={`KES ${nf.format(budget.budgeted)}`} />
        <div className="d-flex align-items-center h-100 ms-2">
          <NavLink to={`/budgets/${budget.id}/${budget.creationDate}-to-${budget.dueDate}`}>
            <IconButton color='secondary'>
              <IoChevronForwardOutline />
            </IconButton>
          </NavLink>
        </div>
      </div>
    </div>
  )
})


const IncomeExpense = forwardRef(({ expense }, ref) => {

  return (
    <div ref={ref} className="common-card p-2 my-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center h-100">
          <IconButton>
            <IoLogoUsd />
          </IconButton>
        </div>
        <IncomeCategoryComponent title={expense.date} />
      </div>
      <div className="d-flex">
        <IncomeCategoryComponent title={`KES ${nf.format(expense.expenseTotal)}`} />
        <div className="d-flex align-items-center h-100 ms-2">
          <NavLink to={`/expenses/${expense.id}/${expense.date}`}>
            <IconButton color='secondary'>
              <IoChevronForwardOutline />
            </IconButton>
          </NavLink>
        </div>
      </div>
    </div>
  )
})

const ZeroComponent = forwardRef(({ title }, ref) => {
  return (
    <div ref={ref} className="p-5 m-5">
      <h4 className="text-center">{title}</h4>
    </div>
  )
})


const BalancePreviewComponent = forwardRef(({ balance }, ref) => {

  const style = makeStyles({
    root: {

    },
    active: {
      border: '1px solid #f16334',
    }
  });

  return (
    <div className="col-md-4 my-2">
      <div ref={ref} className={`common-card-1 p-2 p-md-3 bal-prev`}>
        <h5 style={{ opacity: 0.8, fontWeight: 400 }}>{balance.title}</h5>

        <div>
          <h4>KES {balance.amount}</h4>
          <div className="d-flex justify-content-center">
            <IconButton>
              {balance.icon}
            </IconButton>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <IoEllipsisHorizontalOutline />
        </div>
      </div>
    </div>
  )
}
)

const Income = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('1');
  const app = useSelector(selectAppState)

  const budgets_ = app?.budgets !== undefined ? app?.budgets : []
  const expenses_ = app?.expenses !== undefined ? app?.expenses : []
  const _incomes_ = app.incomes !== undefined ? app.incomes : []

  const [incomes, setIncomes] = useState(null)
  const [budgets, setBudgets] = useState(null)
  const [expenses, setExpenses] = useState(null)

  const [incomesTotal, setIncomesTotal] = useState(0)
  const [budgetsTotal, setBudgetsTotal] = useState(0)
  const [expensesTotal, setExpensesTotal] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(() => {

    let _expenses_ = 0, incomes_ = 0, budgets_total = 0;

    setIncomes(app.incomes);
    setBudgets(app.budgets);
    setExpenses(app.expenses);

    app.incomes.map(income => {
      income.incomeSources.map(source => {
        if (source.incomeAmount && source.incomeAmount !== '' && source.incomeAmount !== null) {
          incomes_ += parseFloat(source.incomeAmount)
        }
      })
    })
    setIncomesTotal(incomes_.toFixed(2))

    app.expenses.map(expense => {
      _expenses_ += parseFloat(expense.expenseTotal)
    })
    setExpensesTotal(_expenses_.toFixed(2))

    app.budgets.map(budget => {
      budgets_total += parseFloat(budget.budgeted)
    }
    )
    setBudgetsTotal(budgets_total.toFixed(2))

  }, [budgets_, _incomes_, expenses_])


  return (
    <div ref={ref}>
      <PageHolder>
        <PageHeader page_title="Income" link_to="add-income" icon={<IoCashOutline />} />

        <PageBody>
          {
            loading &&
            <LoaderComponent />
          }

          <div className="common-card p-2 my-3">
            <div className="row">

              <BalancePreviewComponent balance={
                { title: 'Incomes', amount: nf.format(incomesTotal), icon: <IoCashOutline size={24} /> }
              } />

              <BalancePreviewComponent balance={
                { title: 'Budgets', amount: nf.format(budgetsTotal), icon: <IoBookmarkOutline size={24} /> }
              } />

              <BalancePreviewComponent balance={
                { title: 'Expenses', amount: nf.format(expensesTotal), icon: <IoLogoUsd size={24} /> }
              } />



            </div>
          </div>


          <div className="my-3 common-card">

            <Box sx={{ width: '100%', typography: 'body1' }}>

              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label={`Incomes ${incomes && incomes.length}`} value="1" />
                    <Tab label={`Budgets ${budgets && budgets.length}`} value="2" />
                    <Tab label={`Expenses ${expenses_ && expenses_.length}`} value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1" className="p-2">
                  {/* Incomes Tab */}
                  {
                    incomes && incomes.length === 0 && <ZeroComponent title="No incomes found" />
                  }
                  {
                    incomes && incomes.map((incomeCategory, index) => (
                      <IncomeCategory key={index} category={incomeCategory} category_total={incomesTotal} sub_category_count="20" />
                    ))
                  }


                </TabPanel>
                <TabPanel value="2" className="p-2">
                  {/* Budgets Tab */}
                  {
                    budgets && budgets.length === 0 && <ZeroComponent title="No budgets found" />
                  }
                  {
                    budgets && budgets.map((budget, index) => (
                      <IncomeBudget key={budget.id} budget={budget} />
                    ))
                  }

                </TabPanel>

                <TabPanel value="3" className="p-2">
                  {/* Expenses Tab */}
                  {
                    expenses && expenses.length === 0 && <ZeroComponent title="No expenses found" />
                  }
                  {
                    expenses && expenses.map((expense, index) => (
                      <IncomeExpense key={index} expense={expense} />
                    ))
                  }


                </TabPanel>

              </TabContext>

            </Box>

          </div>

        </PageBody>
        <Outlet />
      </PageHolder>
    </div>
  )
})

export default Income
