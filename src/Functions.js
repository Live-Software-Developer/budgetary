import { lazy, Suspense } from 'react'
import { IoLogoUsd, IoCreateOutline, IoBookmarkOutline, IoCashOutline } from 'react-icons/io5';
import { FaTasks } from 'react-icons/fa';
import { setBudgets, setExpenses, setIncomes, setNotes, setTasks } from "./features/appController/AppSlice";

 
import { db, query, collection, where, doc, getDoc, getDocs } from "./app/firebaseConfig";

import { login, selectUser } from "./features/user/UserSlice";
import { Routes, Route, useLocation } from 'react-router-dom';
import Signup from './pages/account/Signup';
import Login from './pages/account/Login'
import { AnimatePresence } from 'framer-motion';
import { paths } from "./components/Navigation";
import { useSelector } from 'react-redux';
import AddBudgetReacreated from './components/budgets/AddBudgetReacreated';
import AddNote from './components/notes/AddNote';
import AddIncomeCategory from './components/income/AddIncomeCategory';
import AddExpense from './components/expenses/AddExpense';
import AddTask from './components/tasks/AddTask';
import PageSkeleton from './components/skeleton/PageSkeleton';


const PageNotFound = lazy(() => import('./pages/PageNotFound'));

const quick_actions = [
  {
    title: "Income",
    func_: { target: 'incomes', title: 'Add income', subtitle: 'Add income category and incomes', component: <AddIncomeCategory /> },
    icon: <IoCashOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/income/'
  },
  {
    title: "Budgets",
    func_: { target: 'budgets', title: 'Add budget', subtitle: 'Add a new budget to track', component: <AddBudgetReacreated /> },
    icon: <IoBookmarkOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/budgets/'
  },
  {
    title: "Expenses",
    func_: { target: 'expenses', title: 'Add new expense', subtitle: 'Add a new day\' expenses', component: <AddExpense /> },
    icon: <IoLogoUsd size={18} className="nav-link-icon-sidebar" />,
    to: '/expenses/'
  },
  {
    title: "Tasks",
    func_: { target: 'tasks', title: 'Add a new task', subtitle: 'Add a task to track', component: <AddTask /> },
    icon: <FaTasks size={18} className="nav-link-icon-sidebar" />,
    to: '/tasks/'
  },
  {
    title: "Notes",
    func_: { target: 'notes', title: 'Add a new note', subtitle: 'Keep track of you notes', component: <AddNote /> },
    icon: <IoCreateOutline size={18} className="nav-link-icon-sidebar" />,
    to: '/notes/'
  }
];

class GetterSetter {

  constructor(table, userID, dispatch, collectionSetterFunc) {
    this.table = table;
    this.userID = userID;
    this.dispatch = dispatch;
    this.collectionSetterFunc = collectionSetterFunc;
  }

  getterSetter() {
    const q = query(collection(db, this.table), where('userID', '==', this.userID));
    getDocs(q).then(docsSnapshot => {
      let myDocs = [];
      docsSnapshot.forEach(doc => {
        myDocs.push({
          id: doc.id,
          ...doc.data()
        });
      });
      this.dispatch(this.collectionSetterFunc(myDocs));
    })
  }

}

// class UpdateStore {
//   constructor(table, userID, dispatch, collectionSetterFunc) {
//     this.table = table;
//     this.userID = userID;
//     this.dispatch = dispatch;
//     this.collectionSetterFunc = collectionSetterFunc;
//   }

//   updateStore() {
//     const getterClass = new GetterSetter(this.table, this.userID, this.dispatch, this.collectionSetterFunc);
//     getterClass.getterSetter();
//   }

// }

export const getSingleDoc = (table, docID) => {
  // const q = query(collection(db, table), where('id', '==', docID));
  const doc__ = doc(db, `${table}/${docID}`);
  const doc_ = getDoc(doc__);
  return doc_;
}

const updateStore = (table, userID, dispatch, collectionSetterFunc) => {
  const getterClass = new GetterSetter(table, userID, dispatch, collectionSetterFunc);
  getterClass.getterSetter();
}


const updateNotesInStore = (dispatch, userID) => {
  updateStore('notes', userID, dispatch, setNotes);
}

const updateBudgetsInStore = (dispatch, userID) => {
  updateStore('budgets', userID, dispatch, setBudgets);
}

const updateExpensesInStore = (dispatch, userID) => {
  updateStore('expenses', userID, dispatch, setExpenses);
}

const updateTasksInStore = (dispatch, userID) => {
  updateStore('tasks', userID, dispatch, setTasks);
}


const updateIncomesInStore = (dispatch, userID) => {
  updateStore('incomes', userID, dispatch, setIncomes);
}
 
const updateUserInStore = (dispatch, userAuth) => {
  // const q = query(collection(db, 'users'), where('userID', '==', userAuth.uid));
  const doc_ = doc(db, `users/${userAuth.uid}`);
  getDoc(doc_).then(snapshot => {
    dispatch(login(
      {
        userID: userAuth.uid,
        email: userAuth.email,
        displayName: userAuth.displayName,
        profilePhotoURL: userAuth.photoURL,
        userProfile: snapshot.data(),
      }
    ))
  })
}


function setter_func(userAuth, dispatch) {
  updateUserInStore(dispatch, userAuth);
  updateNotesInStore(dispatch, userAuth.uid);
  updateBudgetsInStore(dispatch, userAuth.uid);
  updateExpensesInStore(dispatch, userAuth.uid);
  updateTasksInStore(dispatch, userAuth.uid);
  updateIncomesInStore(dispatch, userAuth.uid);
}


function MakeAppRoutes() {
  const location = useLocation();
  const user = useSelector(selectUser);
  return (
    <AnimatePresence exitBeforeEnter={true} initial={false} >

      <Routes location={location} key={location.pathname}>

        {
          paths.map((path, index) => {
            return (

              <Route key={index} path={path.path} element={user !== null ? <Suspense fallback={<PageSkeleton />}> {path.component} </Suspense> :
                <Login />} >
                {
                  path.children.map((child, index) => {
                    return (
                      <Route key={index} path={child.path} element={user !== null ? child.component :
                        <Login />} />
                    )
                  }
                  )
                }
              </Route>
            )
          })
        }

        <Route path='/signup/' element={<Signup />} />
        <Route path='/login/' element={<Login />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </AnimatePresence>
  )
}
// makePaths with path and component objects


const holderText = `Nice message to illustrate html input elements h1, h2, h3, p, strong, i, ul, ol, image, a, table, blockquote.
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<p>Paragraph</p>
<strong>Strong</strong>
<i>Italic</i>
<ul>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ul>
<ol>
  <li>List item 1</li>
  <li>List item 2</li>
  <li>List item 3</li>
</ol>
<img src="https://placehold.it/100x100" alt="placeholder" />
<a href="https://www.google.com">Link</a>
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
      <th>Header 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
      <td>Cell 3</td>
    </tr>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
      <td>Cell 3</td>
    </tr>
  </tbody>
</table>
<blockquote>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
</blockquote>`;

const stringReplacer = (str) => {
  // str.replace(/[^a-zA-Z ]/g, "")
  // str.replace(/\s+/g, " ")
  // str.
  // replace all characters in a string with a space
  const st = str
  st.replace(/[^a-zA-Z ]/g, "")

  return str.replace(/[^a-zA-Z ]/g, "").replace(/\s/g, "-");
}

export { quick_actions, setter_func, MakeAppRoutes, updateNotesInStore, holderText, updateBudgetsInStore, updateTasksInStore, updateIncomesInStore, updateExpensesInStore, stringReplacer };