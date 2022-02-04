import React, { lazy } from 'react'
import { FaTasks } from 'react-icons/fa';
import { IoBookmarkOutline, IoCalendarOutline, IoCashOutline, IoCreateOutline, IoLogoUsd, IoTrendingUpOutline } from 'react-icons/io5';
import UpdateSingleBudget from '../pages/budgets/UpdateSingleBudget';
import UpdateSingleExpense from '../pages/expenses/UpdateSingleExpense';
import UpdateSingleNote from '../pages/notes/UpdateSingleNote';
import UpdateSingleTask from '../pages/tasks/UpdateSingleTask';

const Home = lazy(() => import('./../pages/home/Home'));
const Budgets = lazy(() => import('./../pages/budgets/Budgets'));
const SingleBudget = lazy(() => import('./../pages/budgets/SingleBudget'));
const Expenses = lazy(() => import('./../pages/expenses/Expenses'));
const SingleExpense = lazy(() => import('./../pages/expenses/SingleExpense'));
const Notes = lazy(() => import('./../pages/notes/Notes'));
const SingleNote = lazy(() => import('./../pages/notes/SingleNote'));
const Income = lazy(() => import('./../pages/income/Income'));
const Tasks = lazy(() => import('./../pages/tasks/Tasks'));
const SingleTask = lazy(() => import('./../pages/tasks/SingleTodo'));
const Scheduler = lazy(() => import('./../pages/scheduler/Scheduler'));

const AddBudget = lazy(() => import('./../pages/budgets/AddBudget'));
const AddExpense_ = lazy(() => import('./../pages/expenses/AddExpense_'));
const AddNote_ = lazy(() => import('./../pages/notes/AddNote_'));
const AddTask_ = lazy(() => import('./../pages/tasks/AddTask_'));
const AddIncome_ = lazy(() => import('./../pages/income/AddIncome_'));

const navigationLinks = [
  {
    title: "Dashboard",
    icon: <IoTrendingUpOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/'
  },
  {
    title: "Income",
    icon: <IoCashOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/income/'
  },
  {
    title: "Budgets",
    icon: <IoBookmarkOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/budgets/'
  },
  {
    title: "Expenses",
    icon: <IoLogoUsd size={18} className="nav-link-icon-sidebar" />,
    to: '/expenses/'
  },
  {
    title: "Tasks",
    icon: <FaTasks size={18} className="nav-link-icon-sidebar" />,
    to: '/tasks/'
  },
  {
    title: "Notes",
    icon: <IoCreateOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/notes/'
  },
  {
    title: "Scheduler",
    icon: <IoCalendarOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/scheduler/'
  }

]


const paths = [
  {
    name: 'Home',
    path: '/',
    component: <Home />,
    children: []
  },
  {
    name: 'Income',
    path: '/income/',
    component: <Income />,
    children: [
      {
        name: 'Add Income',
        path: 'add-income/',
        component: <AddIncome_ />,
      }
    ],
  },
  {
    name: 'Budgets',
    path: '/budgets/',
    component: <Budgets />,
    children: [
      {
        path: 'add-budget/',
        component: <AddBudget />
      },
      {
        path: 'view/:id/:title/',
        component: <SingleBudget />
      },
      {
        path: 'update/:id/:title/',
        component: <UpdateSingleBudget />
      },
    ],
  },
  {
    name: 'Expenses',
    path: "/expenses/",
    component: <Expenses />,
    children: [
      {
        path: 'add-expense/',
        component: <AddExpense_ />
      },
      {
        path: 'view/:id/:title/',
        component: <SingleExpense />
      },

      {
        path: 'update/:id/:title/',
        component: <UpdateSingleExpense />
      },

    ],
  },
  {
    name: 'Tasks',
    path: '/tasks/',
    component: <Tasks />,
    children: [
      {
        path: 'add-task/',
        component: <AddTask_ />
      },
      {
        path: 'view/:id/:title/',
        component: <SingleTask />
      },
      {
        path: 'update/:id/:title/',
        component: <UpdateSingleTask />
      },
    ],
  },
  {
    name: 'Notes',
    path: '/notes/',
    component: <Notes />,
    children: [
      {
        path: 'add-note/',
        component: <AddNote_ />
      },
      {
        path: 'view/:id/:title/',
        component: <SingleNote />
      },
      {
        path: 'update/:id/:title/',
        component: <UpdateSingleNote />
      },
    ],
  },
  {
    name: 'Scheduler',
    path: '/scheduler/',
    component: <Scheduler />,
    children: [],
  }
]


export { navigationLinks, paths }
