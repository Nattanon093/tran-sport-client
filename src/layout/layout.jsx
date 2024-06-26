// import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types';
import logo from '../assets/images/logo150x150.png'

const navigation = [
    { name: 'เข้าสู่เว็บไซต์', href: 'https://www.bsgroupth.com/', current: false },
    { name: 'เช็คสถานะพัสดุ', href: 'http://bsxpress.co/Master/Trackno', current: false },
    // { name: 'เช็คสถานะพัสดุ', href: 'check-package', current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }) {
    return (
        <>
            <div className="min-h-full font-kanit font-light ">
                <Disclosure as="nav" className=" bg-white ">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <a href="/">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className=" max-h-16  max-w-16 "
                                                    src={logo}
                                                    alt="Your Company"
                                                />
                                            </div>
                                        </a>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) => (
                                                    item.name === 'เข้าสู่เว็บไซต์' ?
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            target="_blank"
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-red-500 text-white'
                                                                    : ' text-red-500 hover:bg-red-400 hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium font-kanit'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </a>
                                                        : item.name === 'เช็คสถานะพัสดุ' ? <a
                                                            key={item.name}
                                                            href={item.href}
                                                            target="_blank"
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-red-500 text-white'
                                                                    : ' text-red-500 hover:bg-red-400 hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium font-kanit'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </a>
                                                            : <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-red-500 text-white'
                                                                        : ' text-red-500 hover:bg-red-400 hover:text-white',
                                                                    'rounded-md px-3 py-2 text-sm font-medium font-kanit'
                                                                )}
                                                                aria-current={item.current ? 'page' : undefined}
                                                            >
                                                                {item.name}
                                                            </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">

                                            {/* Profile dropdown */}
                                            {/* <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <a
                                                                        href={item.href}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu> */}
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-red-500 text-white' : 'text-red-500 hover:bg-red-400 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                                {/* <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                        </div>
                                        <button
                                            type="button"
                                            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </div> */}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
                {/* <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header> */}
                <main className=" bg-white min-h-screen">
                    <div className="mx-auto">{children}</div>
                </main>
                <footer className="bg-primary ">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <p className="text-center text-white">© บริษัท บีเอส เอ็กซ์เพรส 2020 จำกัด BS EXPRESS 2020 CO., LTD..</p>
                    </div>
                </footer>
            </div>
        </>
    )
}
Layout.propTypes = {
    children: PropTypes.node.isRequired,
};