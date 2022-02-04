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

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import SingleDetails from '../../components/SingleDetail'
import { CardHeader } from '../../components/MotionButton';


const nf = new Intl.NumberFormat('en-US')

const IncomeCategory = forwardRef(({ category, category_total }, ref) => {
  const [sub_categories, setSub_categories] = useState(category.incomeSources)
  const [sub_category_count, setSub_category_count] = useState(0)
  const [total, setTotal] = useState(0)
  const [sources, setSources] = useState([])

  useEffect(() => {
    setSub_categories(category.incomeSources)
    let t = 0;
    category.incomeSources.map(source => {
      t = t + parseFloat(source.incomeAmount)
    })
    setTotal(t)

    const subcategories = []

    sub_categories.map((sub_category, index) => {
      let i = index + 1
      subcategories.push({ id: i, source: sub_category.incomeSource, date: sub_category.dateReceived, percentage: `${((sub_category.incomeAmount / t) * 100).toFixed(1)}%`, amount: sub_category.incomeAmount })

    })
    setSources(subcategories)

    setSub_category_count(sub_categories.length);

  }, [])



  return (
    <div className='my-3'>

      <div className='common-card p-2 px-md-4'>
        <CardHeader title={category.categoryName} />
        {/* <SingleDetails title="Category Name" value={category.categoryName} /> */}
        <SingleDetails title="Category Total" value={`KES ${nf.format(total)}`} />
        <SingleDetails title="Category Percentage" value={`${((total / category_total) * 100).toFixed(1)}%`} />
        <SingleDetails title="Total subcategories" value={sub_category_count} />

        <IncomeCategoryTable incomeItems={sources} />

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
  const app = useSelector(selectAppState)

  const budgets = app.budgets
  const expenses = app.expenses
  const incomes = app.incomes

  const [incomesTotal, setIncomesTotal] = useState(0)
  const [budgetsTotal, setBudgetsTotal] = useState(0)
  const [expensesTotal, setExpensesTotal] = useState(0)


  useEffect(() => {

    let _expenses_ = 0, incomes_ = 0, budgets_total = 0;

    incomes.map(income => {
      return income.incomeSources.map(source => {
        if (source.incomeAmount && source.incomeAmount !== '' && source.incomeAmount !== null) {
          incomes_ += parseFloat(source.incomeAmount)
        }
      })

    })
    setIncomesTotal(incomes_.toFixed(2))

    expenses.map(expense => {
      return _expenses_ += parseFloat(expense.expenseTotal)
    })
    setExpensesTotal(_expenses_.toFixed(2))

    budgets.map(budget => {
      return budgets_total += parseFloat(budget.budgeted)
    }
    )

    setBudgetsTotal(budgets_total.toFixed(2))

  }, [budgets, incomes, expenses])


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


          <div className="my-3 common-card p-2">

            {
              incomes && incomes.length === 0 && <ZeroComponent title="No incomes found" />
            }

            {
              incomes && incomes.map((incomeCategory, index) => (
                <IncomeCategory key={index} category={incomeCategory} category_total={incomesTotal} />
              ))
            }

          </div>

        </PageBody>
        <Outlet />
      </PageHolder>
    </div>
  )
})

const IncomeCategoryTable = ({ incomeItems }) => {

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    // return [
    //   padTo2Digits(date.getDate()),
    //   padTo2Digits(date.getMonth() + 1),
    //   date.getFullYear(),
    // ].join('/');

    return `${padTo2Digits(date.getDate())}, ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
  }

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="income table">
        <TableHead>
          <TableRow>
            <TableCell >ID</TableCell>
            <TableCell >Source</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Time</TableCell>
            <TableCell >Percentage</TableCell>
            <TableCell >Amount</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {
            incomeItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>{formatDate(new Date(item.date))}</TableCell>
                <TableCell>{new Date(item.date).toLocaleTimeString()}</TableCell>
                <TableCell>{item.percentage}</TableCell>
                <TableCell><strong>{nf.format(item.amount)}</strong></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Income
