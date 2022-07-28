import { useState, useEffect, Suspense, lazy } from 'react'

import { FaHome } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectAppState } from '../../features/appController/AppSlice';

import ReactApexChart from 'react-apexcharts'
import { Link } from 'react-router-dom';
import PageHolder from '../../components/page/PageHolder'
import PageHeader from '../../components/page/PageHeader'
import PageBody from '../../components/page/PageBody'

import DashboardPreviewRowSkeleton from '../../components/skeleton/DashboardPreviewRowSkeleton'
import PieChartSkeleton from '../../components/skeleton/PieChartSkeleton'
import GraphSkeleton from '../../components/skeleton/GraphSkeleton'
import { makeExpensesGraph, makeIncomesGraph, makePieChart } from '../../features/appfunctions'
import '../../styles/Home.css'

const DashboardPreviewRow = lazy(() => import('../../components/dashboard/DashboardPreviewRow'))

function Home() {

  const { budgets, expenses, tasks, notes, incomes } = useSelector(selectAppState)


  // const budgets_ = user?.userProfile && user?.userProfile.budgets
  // const expenses_ = user?.userProfile && user?.userProfile.expenses
  // const tasks_ = user?.userProfile && user?.userProfile.todos
  // const notes_ = user?.userProfile && user?.userProfile.notes

  const [state, setState] = useState(null)
  const [expensesState, setExpensesState] = useState(null)
  const [incomesState, setIncomesState] = useState(null)

  const incomesLength = [...[].concat(...incomes.map(category => category.incomeSources.map(source => source.incomeAmount)))].length


  useEffect(() => {

    setState(makePieChart(incomesLength, budgets.length, expenses.length, tasks.length, notes.length))

    setExpensesState(makeExpensesGraph(expenses))

    setIncomesState(makeIncomesGraph(incomes))

  }, [budgets, expenses, tasks, notes, incomes, incomesLength])

  return (


    <PageHolder noScrollTop>
      <PageHeader page_title="Dashboard" icon={<FaHome />} />

      <PageBody>

        <div className="common-card p-2 my-4">
          <h3 className="ms-4"> Quick view </h3>
          <div className="d-flex justify-content-center my-4">
            <Suspense fallback={<PieChartSkeleton />}>
              {
                state && <ReactApexChart options={state.options} series={state.series} type="donut" width={380} />
              }
            </Suspense>

          </div>
        </div>

        <div className="common-card p-2 my-4 w-100 overflow-hidde">
          <h3 className="ms-4">Income track </h3>
          <div className="w-100 overflow p-2" style={{ overflowX: 'auto' }}>
            <Suspense fallback={<GraphSkeleton />}>
              {expensesState && <ReactApexChart options={incomesState.options} series={incomesState.series} type="line" style={{ width: '500px', maxWidth: '10000px' }} width={incomes.length * 60} height="300" />}
            </Suspense>
          </div>
        </div>

        <div className="common-card p-2 my-4 w-100 overflow-hidden">
          <div>
            <h3 className="ms-4">Daily expenses track </h3>
          </div>

          <div className="d-flex justify-content-between common-card-1 p-3">

            Some date pickers here
          </div>

          <div className="w-100 overflow" style={{ overflowX: 'auto', width: '100%' }}>
            <Suspense fallback={<GraphSkeleton />}>
              {expensesState &&
                <ReactApexChart options={expensesState.options} series={expensesState.series} type="bar" width="100%" height="350" />
              }
            </Suspense>
          </div>
        </div>

        <div>

          <Suspense fallback={<DashboardPreviewRowSkeleton />}>
            <DashboardPreviewRow link_to="budgets" type="budgets" title="Budgets" inputs_={budgets.slice(0, 5)} >
              <div className="m sized-preview">
                <div className="common-card-1 p-2 m-2 alert-primar">
                  {notes.length - 6 > 0 ? <p> <Link to='/budgets/'> +{budgets.length - 6} more budgets </Link> </p> : <p> <Link to='/budgets/'> No more budgets recorded </Link> </p>}
                </div>
              </div>
            </DashboardPreviewRow>
          </Suspense>

          <Suspense fallback={<DashboardPreviewRowSkeleton />}>
            <DashboardPreviewRow link_to="expenses" title="Expenses" type="expenses" expenses={expenses.slice(0, 5)} >
              <div className="m sized-preview">
                <div className="common-card-1 p-2 m-2 alert-primar">
                  {notes.length - 6 > 0 ? <p> <Link to='/expenses/'> +{expenses.length - 6} more daily expenses </Link> </p> : <p> <Link to='/expenses/'> No more daily expenses captured </Link> </p>}
                </div>
              </div>
            </DashboardPreviewRow>
          </Suspense>

          <Suspense fallback={<DashboardPreviewRowSkeleton />}>
            <DashboardPreviewRow link_to="tasks" title="TASKS" type="tasks" inputs_={tasks.slice(0, 5)} >
              <div className="m sized-preview">
                <div className="common-card-1 p-2 m-2 alert-primar">
                  {tasks.length - 6 > 0 ? <p> <Link to='/tasks/'> +{tasks.length - 6} more tasks </Link> </p> : <p> <Link to='/tasks/'> No more tasks </Link> </p>}
                </div>
              </div>
            </DashboardPreviewRow>
          </Suspense>

          <Suspense fallback={<DashboardPreviewRowSkeleton />}>
            <DashboardPreviewRow link_to="notes" title="Notes" type="notes" inputs_={notes.slice(0, 5)} >
              <div className="m sized-preview">
                <div className="common-card-1 p-2 m-2 alert-primar">
                  {notes.length - 6 > 0 ? <p> <Link to='/notes/'> +{notes.length - 6} more notes </Link> </p> : <p> <Link to='/notes/'> No more notes </Link> </p>}
                </div>
              </div>
            </DashboardPreviewRow>
          </Suspense>

        </div>

      </PageBody>

    </PageHolder>

  )
}

export default Home
