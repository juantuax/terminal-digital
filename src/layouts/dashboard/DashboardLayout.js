import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import DashboardRouter from "./DashboardRouter";
import { Dialog, Menu, Transition, Disclosure } from "@headlessui/react";
import {
  ChartBarIcon,
  OfficeBuildingIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  UserGroupIcon,
  TruckIcon,
  XIcon,
  LogoutIcon,
  MenuAlt2Icon,
  DocumentTextIcon,
} from "@heroicons/react/outline";
import Logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "./../../actions/authActions";
import { ReferralSearch as SearchData } from "./../../actions/globalActions";
import { Switch } from "@headlessui/react";
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const DashboardLayout = () => {
  const [enabled, setEnabled] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const rol = useSelector((state) => state.auth.user.role);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();
  let navigation;

  const logout = async (e, token) => {
    e.preventDefault();
    await dispatch(Logout(token));
  };

  const search = (e) => {
    e.preventDefault();
    dispatch(SearchData(null));
    history.push("/dashboard/referrals");
  };

  switch (rol) {
    case 1:
      navigation = [
        { name: "Inicio", href: "/dashboard", icon: HomeIcon, current: true },
        {
          name: "Catálogos",
          current: false,
          children: [
            {
              name: "Super administradores",
              href: "/dashboard/roots",
              icon: UsersIcon,
              current: false,
            },
            // { name: 'Administradores', href: '/dashboard/administrators', icon: UsersIcon, current: false },
            {
              name: "Terminales",
              href: "/dashboard/administrators",
              icon: OfficeBuildingIcon,
              current: false,
            },
            {
              name: "Conductores",
              href: "/dashboard/drivers",
              icon: TruckIcon,
              current: false,
            },
            {
              name: "Colectores",
              href: "/dashboard/helpers",
              icon: TruckIcon,
              current: false,
            },
            // { name: 'Clientes', href: '/dashboard/clients', icon: UserGroupIcon, current: false },
            {
              name: "Cuentas bancarias",
              href: "/dashboard/bank-accounts",
              icon: UserGroupIcon,
              current: false,
            },
            {
              name: "Pagos",
              href: "/dashboard/payments",
              icon: UserGroupIcon,
              current: false,
            },
            {
              name: "Sesiones",
              href: "/dashboard/sessions",
              icon: UserGroupIcon,
              current: false,
            },
          ],
        },
        // { name: 'Remisiones', href: '/dashboard/referrals', icon: FolderIcon, current: false },
        // { name: 'Términos y condiciones', href: '/dashboard/terms', icon: DocumentTextIcon, current: false },
        // { name: 'Reportes', href: '#', icon: ChartBarIcon, current: false },
        { name: "Cerrar sesión", href: "#", icon: LogoutIcon, current: false },
      ];
      break;
    case 3:
      navigation = [
        { name: "Inicio", href: "/dashboard", icon: HomeIcon, current: true },
        {
          name: "Catálogos",
          current: false,
          children: [
            {
              name: "Conductores",
              href: "/dashboard/drivers",
              icon: UserGroupIcon,
              current: false,
            },
            {
              name: "Unidades",
              href: "/dashboard/companies",
              icon: TruckIcon,
              current: false,
            },
            {
              name: "Colectores",
              href: "/dashboard/helpers",
              icon: TruckIcon,
              current: false,
            },
            {
              name: "Pagos",
              href: "/dashboard/payments",
              icon: UserGroupIcon,
              current: false,
            },
            // { name: 'Versiones de términos', href: '/dashboard/version', icon: UserGroupIcon, current: false }
          ],
        },
        { name: "Perfil", href: "/dashboard/profile", icon: UsersIcon, current: false },
        // { name: 'Remisiones', href: '/dashboard/referrals', icon: FolderIcon, current: false },
        // { name: 'Términos y condiciones', href: '/dashboard/terms', icon: DocumentTextIcon, current: false },
        // { name: 'Reportes', href: '#', icon: ChartBarIcon, current: false },
        { name: "Cerrar sesión", href: "#", icon: LogoutIcon, current: false },
      ];
      break;
    default:
      navigation = [
        { name: "Inicio", href: "/dashboard/", icon: HomeIcon, current: true },
        {
          name: "Remisiones",
          href: "/dashboard/referrals",
          icon: FolderIcon,
          current: false,
        },
        { name: "Cerrar sesión", href: "#", icon: LogoutIcon, current: false },
      ];
      break;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-40 md:hidden"
          open={sidebarOpen}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Cerrar menú</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="pl-16 flex-shrink-0 flex items-center px-4">
                <img className="h-5/6 w-4/6" src={Logo} alt="Workflow" />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {/* {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            onClick={item.name == "Cerrar sesión" ? (e) => { logout(e, token) } : ''}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                            )}   >
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                    'mr-4 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </a>
                                    ))} */}

                  {navigation.map((item) =>
                    !item.children ? (
                      <div key={item.name}>
                        <a
                          href={item.href}
                          onClick={
                            item.name === "Remisiones"
                              ? (e) => {
                                  search(e);
                                }
                              : item.name === "Cerrar sesión"
                              ? (e) => {
                                  logout(e, token);
                                }
                              : ""
                          }
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </div>
                    ) : (
                      <Disclosure
                        as="div"
                        key={item.name}
                        className="space-y-1"
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
                              )}
                            >
                              <svg
                                className={classNames(
                                  open
                                    ? "text-gray-400 rotate-90"
                                    : "text-gray-300",
                                  "mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6L14 10L6 14V6Z"
                                  fill="currentColor"
                                />
                              </svg>
                              {item.name}
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {item.children.map((subItem) => (
                                <a
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                                >
                                  {subItem.name}
                                </a>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center  flex-shrink-0 pl-8 bg-gray-900">
              <img className="h-5/6 w-5/6" src={Logo} alt="Workflow" />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        onClick={
                          item.name === "Remisiones"
                            ? (e) => {
                                search(e);
                              }
                            : item.name === "Cerrar sesión"
                            ? (e) => {
                                logout(e, token);
                              }
                            : ""
                        }
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </div>
                  ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <svg
                              className={classNames(
                                open
                                  ? "text-gray-400 rotate-90"
                                  : "text-gray-300",
                                "mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150"
                              )}
                              viewBox="0 0 20 20"
                              aria-hidden="true"
                            >
                              <path
                                d="M6 6L14 10L6 14V6Z"
                                fill="currentColor"
                              />
                            </svg>
                            {item.name}
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow justify-end"> 
        { rol == 3 && (
        <Switch.Group
                          as="div"
                          className="mt-1 sm:mt-0 sm:col-span-1 p-4 ml"
                        >
                          <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={classNames(
                              enabled ? "bg-indigo-600" : "bg-gray-200",
                              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            )}
                          >
                            <span className="sr-only">Use setting</span>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                enabled ? "translate-x-5" : "translate-x-0",
                                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                              )}
                            />
                          </Switch>
                        </Switch.Group>)}
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <DashboardRouter />
      </div>
    </div>
  );
};

export default DashboardLayout;
