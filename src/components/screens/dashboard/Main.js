import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  OfficeBuildingIcon,
  TruckIcon
} from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GetAllReferralsAdmin,
  GetAllReferrals,
} from "./../../../helpers/apis/Referral";
import { GetAdminCompanies, GetAllAdmins } from "./../../../helpers/apis/Admin";
import { GetAllDrivers } from "./../../../helpers/apis/Driver";
import { GetAllCompanies } from "./../../../helpers/apis/Company";

const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Main = () => {
  const [driver, setDrivers] = useState([]);
  const [admin, setAdmins] = useState([]);
  const [companies, setCompanies] = useState("");
  const [ended, setEnded] = useState("");
  const rol = useSelector((state) => state.auth.user.role);
  const id = useSelector((state) => state.auth.user.id);
  class myReferral {
    constructor(
      Company,
      Driver,
      status,
      dateIssue,
      transportLine,
      referralNumber,
      address,
      executive,
      Client,
      flag,
      id
    ) {
      this.Company = Company;
      this.Driver = Driver;
      this.status = status;
      this.dateIssue = dateIssue;
      this.transportLine = transportLine;
      this.referralNumber = referralNumber;
      this.address = address;
      this.executive = executive;
      this.Client = Client;
      this.flag = flag;
      this.id = id;
    }
  }
  let cards;
  useEffect(() => {
    const request = async () => {
      let pending = 0;
      let ended = 0;
      if (rol == 1) {
        const response = await GetAllReferrals();
        if (response.statusCode == 200) {
          response.data.forEach(async (item) => {
            if (item.status == 0) {
              pending++;
            } else {
              ended++;
            }
          });
          setEnded(ended);
        }
        const responseDriver = await GetAllDrivers();
        if (responseDriver.statusCode == 200) {
          const filterDrivers = responseDriver.data.filter(
            (x) => x.User.active === 1
          );
          setDrivers(filterDrivers);
          const responseAdmin = await GetAllAdmins();
          if (responseAdmin.statusCode == 200) {
            const filterAdmins = responseAdmin.data.filter(
              (x) => x.User.active === 1
            );
            setAdmins(filterAdmins);
          }
        }
      } else if (rol == 3) {
        const responseDriver = await GetAllDrivers();
        if (responseDriver.statusCode == 200) {
          const filterDrivers = responseDriver.data.filter(
            (x) => x.User.active === 1
          );
          setDrivers(filterDrivers);
        } 
        const responseCompany = await GetAllCompanies();
        if (responseCompany.statusCode == 200) {
          const filterCompany = responseCompany.data.filter(
            (x) => x.active === 1
          );
          setCompanies(filterCompany);
        }
      }
    };
    request();
  }, []);
  if (rol == 1) {
    cards = [
      {
        name: "Terminales registradas",
        href: "/dashboard/administrators",
        icon: OfficeBuildingIcon,
        amount: `${admin?.length}`,
      },
      {
        name: "Conductores registrados",
        href: "/dashboard/drivers",
        icon: UsersIcon,
        amount: `${driver?.length}`,
      },
    //   {
    //     name: "Pasajeros registrados",
    //     href: "/dashboard/referrals",
    //     icon: UsersIcon,
    //     amount: `${ended}`,
    //   },
    ];
  } else {
    cards = [
      {
        name: "Conductores registrados",
        href: "/dashboard/drivers",
        icon: UsersIcon,
        amount: `${driver?.length}`,
      },
      {
        name: "Unidades registradas",
        href: "/dashboard/companies",
        icon: TruckIcon,
        amount: `${companies?.length}`,
      },
    ];
  }
  return (
    <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
      {/* Page header */}
      <div className="mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Resumen
          </h2>
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            {cards.map((card) => (
              <div
                key={card.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <card.icon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {card.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">
                            {card.amount}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a
                      href={card.href}
                      className="font-medium text-cyan-700 hover:text-cyan-900"
                    >
                      Ver todo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
