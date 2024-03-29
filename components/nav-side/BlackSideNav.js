import React, { useState } from 'react'
import Link from 'next/link'

import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsFillImageFill,
  BsReverseLayoutTextSidebarReverse,
  BsPerson
} from 'react-icons/bs'
import {
  AiFillEnvironment,
  AiOutlineBarChart,
  AiOutlineFileText,
  AiOutlineMail,
  AiOutlineSetting,
  AiOutlineLogout
} from 'react-icons/ai'
import { RiDashboardFill } from 'react-icons/ri'

import { Menus } from '../../data/menu'

function BlackSideNav() {
  const [open, setOpen] = useState(true)
  const [submenuOpen, setSubmenuOpen] = useState(false)

  return (
    <div className={`min-h-screen h-full bg-dark-purple p-5 pt-8 ${open ? 'w-72' : 'w-20'} duration-300 relative`}>
      {/* arrow */}
      <BsArrowLeftShort
        className={`bg-white text-dark-purple text-3xl rounded-full absolute top-9 -right-3 border border-dark-purple cursor-pointer
        ${!open && 'rotate-180'}`}
        onClick={() => setOpen(!open)}
      />
      {/* top */}
      <div className="inline-flex">
        <AiFillEnvironment
          className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2
          ${open && 'rotate-[360deg]'} duration-500`}
        />
        <h1 className={`text-white origin-left font-medium text-2xl ${!open && 'scale-0'}`}>Tailwind</h1>
      </div>
      {/* search */}
      <div className={`flex items-center rounded-md bg-light-white mt-6 ${!open ? 'px-2.5' : 'px-4'} py-2`}>
        <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && 'mr-2'}`} />
        <input
          type={'search'}
          placeholder="Search"
          className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && 'hidden'}`}
        />
      </div>

      {/* menu */}
      <ul className={`pt-2`}>
        {Menus.map((menu, index) => (
          <div key={index}>
            <Link href={`${menu.href !== undefined ? menu.href : '#'}`}>
              <a>
                <li
                  key={`menu-${index}`}
                  className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white
                    rounded-md ${menu.spacing ? ' mt-9' : ' mt-2'}`}
                >
                  <span className={`text-2xl block float-left`}>{menu.icon ? menu.icon : <RiDashboardFill />}</span>
                  <span className={`text-base font-medium flex-1 ${!open && 'hidden'}`}>{menu.title}</span>
                  {menu.submenu && open && (
                    <BsChevronDown
                      className={`${submenuOpen && 'rotate-180'}`}
                      onClick={() => {
                        setSubmenuOpen(!submenuOpen)
                      }}
                    />
                  )}
                </li>
              </a>
            </Link>

            {/* submenu */}
            {menu.submenu && submenuOpen && open && (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <Link href={`${submenuItem.href}`} key={`submenu-${index}`}>
                    <a>
                      <li
                        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5
                  hover:bg-light-white rounded-md`}
                      >
                        {submenuItem.title}
                      </li>
                    </a>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default BlackSideNav
