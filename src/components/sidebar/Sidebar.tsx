import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { selectSidebarStatus, setSidebarOff } from '../../redux/sidebarSlice'
import './Sidebar.scss'

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarOn = useAppSelector(selectSidebarStatus);

  return (
    <aside className={`sidebar ${isSidebarOn ? 'hide-sidebar' : ""}`}>
      <button type = "button" className='sidebar-hide-btn' onClick={() => dispatch(setSidebarOff())}>
        <i className='fas fa-times'></i>
      </button>
      <div className='sidebar-cnt'>
        <div className='cat-title fs-17 text-uppercase fw-6 ls-1h'>All Categories</div>
        <ul className='cat-list'>
          <li>
            <Link to = '' className='cat-list-link text-capitalize'>category here</Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}