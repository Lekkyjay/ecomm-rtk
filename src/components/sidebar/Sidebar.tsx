import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchAsyncCategories, selectAllCategories } from '../../redux/categorySlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectSidebarStatus, setSidebarOff } from '../../redux/sidebarSlice'
import './Sidebar.scss'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const isSidebarOn = useAppSelector(selectSidebarStatus)
  const categories = useAppSelector(selectAllCategories)

  useEffect(() => {
    dispatch(fetchAsyncCategories())
  }, [dispatch])

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type = "button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
          {
            categories.map((category, idx) => {
              return (
                <li key = {idx} onClick = {() => dispatch(setSidebarOff())}>
                  <Link to = {`category/${category.slug}`} className='cat-list-link text-capitalize'>{category.slug}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </aside>
  )
}
