import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationIcon, MapIcon, EyeIcon, XCircleIcon, SwitchHorizontalIcon } from '@heroicons/react/outline';
import { SearchIcon, RefreshIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../component/Pagination';
import { GetAllReferralsAdmin, GetAllReferrals, DeleteReferral } from './../../../../helpers/apis/Referral';
import { GetAdminCompanies } from './../../../../helpers/apis/Admin';
import { GetAllCompanies } from './../../../../helpers/apis/Company';
import { GetAllDrivers } from './../../../../helpers/apis/Driver';
import { GetAllClients } from './../../../../helpers/apis/Client';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import { ReferralSearch as SearchData } from './../../../../actions/globalActions';

const Referrals = () => {
    const [referral, setReferral] = useState([]);
    const [referrals, setReferrals] = useState([]);
    const [tempReferrals, setTempReferrals] = useState([]);
    const [referralId, setReferralId] = useState([]);
    const [filterCompany, setCompany] = useState([]);
    const [filterClient, setClient] = useState([]);
    const [filterDriver, setDriver] = useState([]);
    const [company, setFilterCompany] = useState('TODOS');
    const [client, setFilterClient] = useState('TODOS');
    const [driver, setFilterDriver] = useState('TODOS');
    const [filterStatus, setStatus] = useState('PENDIENTE');
    const [filterDate, setFilterDate] = useState('TODOS');
    const [date, setDate] = useState();
    const [dateEnd, setDateEnd] = useState();
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const cancelButtonRef = useRef(null);
    const dispatch = useDispatch();
    const rol = useSelector(state => state.auth.user.role);
    const id = useSelector(state => state.auth.user.id);
    const search = useSelector(state => state.global.search_data);
    let filterReferrals = [];
    let arrayReferralsDate = [];

    class myReferral {
        constructor(Company, Driver, status, dateIssue, transportLine, referralNumber, address, executive, Client, flag, id, createdAt, updatedAt) {
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
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    };

    useEffect(() => {
        const request = async () => {
            if (rol == 1) {
                const response = await GetAllReferrals();
                if (response.data.length > 0) {
                    if (search !== null) {
                        filterReferrals = response.data;
                        await SearchHistory(search.driver, search.client, search.company, search.date_type, search.status);
                        setFilterDriver(search.driver);
                        setFilterCompany(search.company);
                        setFilterClient(search.client);
                        setDate(search.date);
                        setDateEnd(search.dateEnd);
                        setFilterDate(search.date_type);
                        setStatus(search.status);
                        setReferrals(response.data);
                        setTempReferrals(response.data);
                        setCurrentPage(search.currentPage)
                    } else {
                        setReferrals(response.data);
                        setTempReferrals(response.data);
                        const result = response.data.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                        setReferral(result);
                    }
                }
                const driver = await GetAllDrivers()
                if (driver.data.length > 0) {
                    setDriver(driver.data);
                }
                const client = await GetAllClients()
                if (client.data.length > 0) {
                    setClient(client.data);
                }
                const company = await GetAllCompanies()
                if (company.data.length > 0) {
                    setCompany(company.data);
                }
            } else if (rol == 3) {
                const response = await GetAdminCompanies(id)
                if (response.data != null) {
                    setCompany(response.data);
                }
                if (response.data != null && response.data.length > 0) {
                    let arrayReferrals = []
                    if (response.data != null) {
                        for (let i = 0; i < response.data.length; i++) {
                            const companies = await GetAllReferralsAdmin(response.data[i].CompanyId)
                            companies.data.forEach(c => {
                                if (companies.statusCode == 200 && c) {
                                    const ref = new myReferral(c.Company, c.Driver, c.status, c.dateIssue, c.transportLine, c.referralNumber, c.address, c.executive, c.Client, c.flag, c.id, c.createdAt, c.updatedAt)
                                    arrayReferrals.push(ref);
                                }
                            });
                        }
                        if (search !== null) {
                            filterReferrals = arrayReferrals
                            await SearchHistory(search.driver, search.client, search.company, search.date_type, search.status);
                            setFilterDriver(search.driver);
                            setFilterCompany(search.company);
                            setFilterClient(search.client);
                            setDate(search.date);
                            setDateEnd(search.dateEnd);
                            setFilterDate(search.date_type);
                            setStatus(search.status);
                            setCurrentPage(search.currentPage)
                            setReferrals(arrayReferrals);
                            setTempReferrals(arrayReferrals);
                        } else {
                            const result = arrayReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                            setTempReferrals(arrayReferrals);
                            setReferrals(arrayReferrals);
                            setReferral(result);
                        }
                    }
                }
                const driver = await GetAllDrivers()
                if (driver.data.length > 0) {
                    setDriver(driver.data);
                }
                const client = await GetAllClients()
                if (client.data.length > 0) {
                    setClient(client.data);
                }
            }
        }
        request();
    }, []);

    const Filter = (text) => {
        setCurrentPage(1);
        const result = referrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(text) || item.Client.fullname.includes(text) || item.Client.codeClient.includes(text) || item.Driver.username.includes(text) || item.transportLine.includes(text) || item.referralNumber.includes(text) || item.executive.includes(text) || item.Company.fullname.includes(text) || item.Company.companyNumber.includes(text) || item.executive.includes(text) || item.dateIssue.includes(text));
        if (result) {
            if (filterStatus != "TODOS") {
                const state = result.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(filterStatus));
                setReferral(state);
            }
            else {
                setReferral(result);
            }
        }
    };

    const Search = async (text1, text2, text3, text4, text5) => {
        filterReferrals = tempReferrals;
        const obj = {
            search: 1,
            driver: text1,
            client: text2,
            company: text3,
            date_type: text4,
            date: date,
            dateEnd: dateEnd,
            status: text5,
            currentPage: currentPage
        }
        setCurrentPage(1);
        dispatch(SearchData(obj))
        if (text1 != "TODOS") {
            const result = filterReferrals.filter(item => item.Driver.username.includes(text1));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals);
            }
        }

        if (text2 != "TODOS") {
            const result = filterReferrals.filter(item => item.Client.fullname.includes(text2));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals);
            }
        }

        if (text3 != "TODOS") {
            const result = filterReferrals.filter(item => item.Company.fullname.includes(text3));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals);
            }
        }

        switch (text4) {
            case "FECHA DE LA REMISION":
                filterReferrals.forEach(e => {
                    let dateReferral = new Date(e.createdAt);
                    dateReferral.setHours(0);
                    dateReferral.setMinutes(0);
                    dateReferral.setSeconds(0);
                    dateReferral.setMilliseconds(0);
                    let dateBegin = new Date(date);
                    dateBegin.setHours(0);
                    dateBegin.setMinutes(0);
                    dateBegin.setSeconds(0);
                    dateBegin.setMilliseconds(0);
                    let dateEnding = new Date(dateEnd);
                    dateEnding.setHours(0);
                    dateEnding.setMinutes(0);
                    dateEnding.setSeconds(0);
                    dateEnding.setMilliseconds(0);
                    if (dateBegin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnding.getTime()) {
                        arrayReferralsDate.push(e);
                    }
                });
                setReferral(arrayReferralsDate);
                setReferrals(arrayReferralsDate);
                setFilterDate(filterDate);
                setDate(date);
                setDateEnd(dateEnd);
                break;
            case "FECHA PROGRAMADA DE ENTREGA":
                filterReferrals.forEach(e => {
                    let dateReferral = new Date(e.dateIssue);
                    dateReferral.setHours(0);
                    dateReferral.setMinutes(0);
                    dateReferral.setSeconds(0);
                    dateReferral.setMilliseconds(0);
                    let dateBegin = new Date(date);
                    dateBegin.setHours(0);
                    dateBegin.setMinutes(0);
                    dateBegin.setSeconds(0);
                    dateBegin.setMilliseconds(0);
                    let dateEnding = new Date(dateEnd);
                    dateEnding.setHours(0);
                    dateEnding.setMinutes(0);
                    dateEnding.setSeconds(0);
                    dateEnding.setMilliseconds(0);
                    if (dateBegin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnding.getTime()) {
                        arrayReferralsDate.push(e);
                    }
                });
                setReferral(arrayReferralsDate);
                setReferrals(arrayReferralsDate);
                setFilterDate(filterDate);
                setDate(date);
                setDateEnd(dateEnd);

                break;
            case "FECHA REAL DE ENTREGA":
                filterReferrals.forEach(e => {
                    let dateReferral = new Date(e.updatedAt);
                    dateReferral.setHours(0);
                    dateReferral.setMinutes(0);
                    dateReferral.setSeconds(0);
                    dateReferral.setMilliseconds(0);
                    let dateBegin = new Date(date);
                    dateBegin.setHours(0);
                    dateBegin.setMinutes(0);
                    dateBegin.setSeconds(0);
                    dateBegin.setMilliseconds(0);
                    let dateEnding = new Date(dateEnd);
                    dateEnding.setHours(0);
                    dateEnding.setMinutes(0);
                    dateEnding.setSeconds(0);
                    dateEnding.setMilliseconds(0);
                    if (dateBegin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnding.getTime() && e.status == 1) {
                        arrayReferralsDate.push(e);
                    }
                });
                setReferral(arrayReferralsDate);
                setReferrals(arrayReferralsDate);
                setFilterDate(filterDate);
                setDate(date);
                setDateEnd(dateEnd);
                break;
            default:
                break;
        }

        if (text5 != "TODOS") {
            if (text5 == "PENDIENTE") {
                const result = filterReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(text5));
                if (result) {
                    setReferral(result);
                    setReferrals(filterReferrals)
                }
            }
        } else {
            setReferral(filterReferrals);
            setReferral(filterReferrals);
        }

        if (text5 == 'FINALIZADA' && text1 !== 'TODOS' || text2 !== 'TODOS' || text3 !== 'TODOS' || text4 !== 'TODOS') {
            const result = filterReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(text5));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals)
                setFilterDate("TODOS");
                setDate('');
                setDateEnd('');
            }
        }

        if (text5 == 'FINALIZADA' && text1 !== 'TODOS' || text2 !== 'TODOS' || text3 !== 'TODOS' || text4 !== 'TODOS') {
            setReferral(filterReferrals);
        }

        if (text5 == 'FINALIZADA' && text1 == 'TODOS' && text2 == 'TODOS' && text3 == 'TODOS' && text4 == 'TODOS') {
            let dateEnd = new Date();
            dateEnd.setHours(0);
            dateEnd.setMinutes(0);
            dateEnd.setSeconds(0);
            dateEnd.setMilliseconds(0);
            let dateBegin = new Date();
            dateBegin.setHours(0);
            dateBegin.setMinutes(0);
            dateBegin.setSeconds(0);
            dateBegin.setMilliseconds(0);
            dateBegin = dateBegin.setMonth(dateBegin.getMonth() - 3);
            filterReferrals.forEach(e => {
                let dateReferral = new Date(e.updatedAt);
                dateReferral.setHours(0);
                dateReferral.setMinutes(0);
                dateReferral.setSeconds(0);
                dateReferral.setMilliseconds(0);
                let dateBeginin = new Date(dateBegin);
                dateBeginin.setHours(0);
                dateBeginin.setMinutes(0);
                dateBeginin.setSeconds(0);
                dateBeginin.setMilliseconds(0);
                let dateEnding = new Date(dateEnd);
                dateEnding.setHours(0);
                dateEnding.setMinutes(0);
                dateEnding.setSeconds(0);
                dateEnding.setMilliseconds(0);
                if (dateBeginin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnd.getTime() && e.status == 1) {
                    arrayReferralsDate.push(e);
                }
            });
            setReferral(arrayReferralsDate);
            setFilterDate("FECHA REAL DE ENTREGA");
            setDate(moment(dateBegin).format("YYYY-MM-DD"));
            setDateEnd(moment(dateEnd).format("YYYY-MM-DD"));
            setStatus('FINALIZADA');
        }
    };

    const SearchHistory = async (text1, text2, text3, text4, text5) => {
        const obj = {
            search: 1,
            driver: text1,
            client: text2,
            company: text3,
            date_type: text4,
            date: date,
            dateEnd: dateEnd,
            status: text5,
            currentPage: search.currentPage
        }
        dispatch(SearchData(obj))
        if (text1 != "TODOS") {
            const result = filterReferrals.filter(item => item.Driver.username.includes(text1));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals);
            }
        }
        if (text2 != "TODOS") {
            const result = filterReferrals.filter(item => item.Client.fullname.includes(text2));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals);
            }

        }
        if (text3 != "TODOS") {
            const result = filterReferrals.filter(item => item.Company.fullname.includes(text3));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals);
            }
        }
        switch (text4) {
            case "FECHA DE LA REMISION":
                filterReferrals.forEach(e => {
                    let dateReferral = new Date(e.createdAt);
                    dateReferral.setHours(0);
                    dateReferral.setMinutes(0);
                    dateReferral.setSeconds(0);
                    dateReferral.setMilliseconds(0);
                    let dateBegin = new Date(search.date);
                    dateBegin.setHours(0);
                    dateBegin.setMinutes(0);
                    dateBegin.setSeconds(0);
                    dateBegin.setMilliseconds(0);
                    let dateEnding = new Date(search.dateEnd);
                    dateEnding.setHours(0);
                    dateEnding.setMinutes(0);
                    dateEnding.setSeconds(0);
                    dateEnding.setMilliseconds(0);
                    if (dateBegin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnding.getTime()) {
                        arrayReferralsDate.push(e);
                    }
                });
                setReferral(arrayReferralsDate);
                setReferrals(filterReferrals);
                break;
            case "FECHA PROGRAMADA DE ENTREGA":
                filterReferrals.forEach(e => {
                    let dateReferral = new Date(e.dateIssue);
                    dateReferral.setHours(0);
                    dateReferral.setMinutes(0);
                    dateReferral.setSeconds(0);
                    dateReferral.setMilliseconds(0);
                    let dateBegin = new Date(search.date);
                    dateBegin.setHours(0);
                    dateBegin.setMinutes(0);
                    dateBegin.setSeconds(0);
                    dateBegin.setMilliseconds(0);
                    let dateEnding = new Date(search.dateEnd);
                    dateEnding.setHours(0);
                    dateEnding.setMinutes(0);
                    dateEnding.setSeconds(0);
                    dateEnding.setMilliseconds(0);
                    if (dateBegin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnding.getTime()) {
                        arrayReferralsDate.push(e);
                    }
                });
                setReferral(arrayReferralsDate);
                setReferrals(filterReferrals);
                break;
            case "FECHA REAL DE ENTREGA":
                filterReferrals.forEach(e => {
                    let dateReferral = new Date(e.updatedAt);
                    dateReferral.setHours(0);
                    dateReferral.setMinutes(0);
                    dateReferral.setSeconds(0);
                    dateReferral.setMilliseconds(0);
                    let dateBegin = new Date(search.date);
                    dateBegin.setHours(0);
                    dateBegin.setMinutes(0);
                    dateBegin.setSeconds(0);
                    dateBegin.setMilliseconds(0);
                    let dateEnding = new Date(search.dateEnd);
                    dateEnding.setHours(0);
                    dateEnding.setMinutes(0);
                    dateEnding.setSeconds(0);
                    dateEnding.setMilliseconds(0);
                    if (dateBegin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnding.getTime() && e.status == 1) {
                        arrayReferralsDate.push(e);
                    }
                });
                setReferral(arrayReferralsDate);
                setReferrals(arrayReferralsDate);

                break;
            default:
                break;
        }
        if (text5 != "TODOS") {
            if (text5 == "PENDIENTE") {
                const result = filterReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(text5));
                if (result) {
                    setReferral(result);
                    setReferrals(result);
                    setFilterDate("TODOS");
                    setDate('');
                    setDateEnd('');
                }
            }
        }
        if (text5 == 'FINALIZADA' && text1 !== 'TODOS' || text2 !== 'TODOS' || text3 !== 'TODOS' || text4 !== 'TODOS') {
            const result = filterReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes(text5));
            if (result) {
                filterReferrals = result;
                setReferral(filterReferrals);
                setReferrals(filterReferrals);
                setFilterDate("TODOS");
                setDate('');
                setDateEnd('');
            }
        }

        if (text1 == 'TODOS' && text2 == 'TODOS' && text3 == 'TODOS' && text4 == 'TODOS' && text5 == 'FINALIZADA') {
            let dateEnd = new Date();
            dateEnd.setHours(0);
            dateEnd.setMinutes(0);
            dateEnd.setSeconds(0);
            dateEnd.setMilliseconds(0);
            let dateBegin = new Date();
            dateBegin.setHours(0);
            dateBegin.setMinutes(0);
            dateBegin.setSeconds(0);
            dateBegin.setMilliseconds(0);
            dateBegin = dateBegin.setMonth(dateBegin.getMonth() - 3);

            filterReferrals.forEach(e => {
                let dateReferral = new Date(e.updatedAt);
                dateReferral.setHours(0);
                dateReferral.setMinutes(0);
                dateReferral.setSeconds(0);
                dateReferral.setMilliseconds(0);
                let dateBeginin = new Date(dateBegin);
                dateBeginin.setHours(0);
                dateBeginin.setMinutes(0);
                dateBeginin.setSeconds(0);
                dateBeginin.setMilliseconds(0);
                let dateEnding = new Date(dateEnd);
                dateEnding.setHours(0);
                dateEnding.setMinutes(0);
                dateEnding.setSeconds(0);
                dateEnding.setMilliseconds(0);
                if (dateBeginin.getTime() <= dateReferral.getTime() && dateReferral.getTime() <= dateEnd.getTime() && e.status == 1) {
                    arrayReferralsDate.push(e);
                }
            });
            setReferral(arrayReferralsDate);
            setReferrals(arrayReferralsDate);
            setFilterDate("FECHA REAL DE ENTREGA");
            setDate(moment(dateBegin).format("YYYY-MM-DD"));
            setDateEnd(moment(dateEnd).format("YYYY-MM-DD"))
        }
        if (text5 == 'TODOS' && text1 !== 'TODOS' || text2 !== 'TODOS' || text3 !== 'TODOS' || text4 !== 'TODOS') {
            setReferral(filterReferrals);
            setReferrals(filterReferrals);
        }

    };

    const Refresh = async () => {
        dispatch(SearchData(null))
        const request = async () => {
            if (rol == 1) {
                const response = await GetAllReferrals();
                if (response.data.length > 0) {
                    setReferrals(response.data);
                    const result = response.data.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                    setReferral(result);
                }
            } else if (rol == 3) {
                const response = await GetAdminCompanies(id)
                if (response.data != null) {
                    setCompany(response.data);
                }
                if (response.data != null && response.data.length > 0) {
                    let arrayReferrals = []
                    if (response.data != null) {
                        for (let i = 0; i < response.data.length; i++) {
                            const companies = await GetAllReferralsAdmin(response.data[i].CompanyId)
                            companies.data.forEach(c => {
                                if (companies.statusCode == 200 && c) {
                                    const ref = new myReferral(c.Company, c.Driver, c.status, c.dateIssue, c.transportLine, c.referralNumber, c.address, c.executive, c.Client, c.flag, c.id, c.createdAt, c.updatedAt)
                                    arrayReferrals.push(ref);
                                }
                            });
                        }
                        const result = arrayReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                        setReferrals(arrayReferrals);
                        setReferral(result);
                    }
                }
            }
        }
        request();
        setFilterCompany('TODOS');
        setFilterClient('TODOS');
        setFilterDriver('TODOS');
        setFilterDate("TODOS");
        setStatus("PENDIENTE");
        setDate('');
        setDateEnd('');
    };

    const Delete = async () => {
        const response = await DeleteReferral(referralId)
        if (response.statusCode == 200) {
            const request = async () => {
                if (rol == 1) {
                    const response = await GetAllReferrals();
                    if (response.data != null) {
                        setReferrals(response.data);
                        const result = response.data.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                        setReferral(result);
                    }
                    const driver = await GetAllDrivers()
                    if (driver.data.length > 0) {
                        setDriver(driver.data);
                    }
                    const client = await GetAllClients()
                    if (client.data.length > 0) {
                        setClient(client.data);
                    }
                    const company = await GetAllCompanies()
                    if (company.data.length > 0) {
                        setCompany(company.data);
                    }
                    setOpen(false);
                } else if (rol == 3) {
                    const response = await GetAdminCompanies(id)
                    setCompany(response.data);
                    if (response.data != null) {
                        let arrayReferrals = []
                        for (let i = 0; i < response.data.length; i++) {
                            const companies = await GetAllReferralsAdmin(response.data[i].CompanyId)
                            companies.data.forEach(c => {
                                if (companies.statusCode == 200 && c) {
                                    const ref = new myReferral(c.Company, c.Driver, c.status, c.dateIssue, c.transportLine, c.referralNumber, c.address, c.executive, c.Client, c.flag, c.id)
                                    arrayReferrals.push(ref);
                                }
                            });
                        }
                        const result = arrayReferrals.filter(item => (item.status == 0 ? "PENDIENTE" : "FINALIZADA").includes("PENDIENTE"));
                        setReferrals(arrayReferrals);
                        setReferral(result);
                        setOpen(false);
                    }
                    const driver = await GetAllDrivers()
                    if (driver.data.length > 0) {
                        setDriver(driver.data);
                    }
                    const client = await GetAllClients()
                    if (client.data.length > 0) {
                        setClient(client.data);
                    }

                }
            };
            request();
        }

    };

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = referral.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        if(search != null){
            search.currentPage = pageNumber;
        }   
    };

    return (
        <>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                {/* Page header */}
                <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
                        <div className="ml-4 mt-2">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Remisiones</h3>
                        </div>
                        <div className="ml-4 mt-2 flex-shrink-0">
                            <Link
                                to="/dashboard/referrals/new"
                                type="button"
                                className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Nueva
                            </Link>
                        </div>
                    </div>
                </div>

                <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
                    Remisiones registradas
                </h2>
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="flex-1 flex justify-center lg:ml-6 lg:justify-start">
                                        <div className="max-w-lg w-full lg:max-w-xs">
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Buscar en los resultados
                                                <label htmlFor="search" className="sr-only">
                                                    Busqueda
                                                </label>
                                                <div className="relative text-gray-400 focus-within:text-gray-500">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                                    </div>
                                                    <input
                                                        id="search"
                                                        className="block w-full bg-white py-2 pl-10 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 focus:placeholder-gray-500 sm:text-sm"
                                                        placeholder="Buscar"
                                                        onChange={(e) => { Filter(e.target.value.toUpperCase()) }}
                                                        type="search"
                                                        name="search"
                                                    />
                                                </div>
                                            </p>
                                        </div>
                                        <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Filtrar por Fechas
                                                <select
                                                    value={filterDate}
                                                    id="type_date"
                                                    name="type_date"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={async (e) => { await setFilterDate(e.target.value); }}
                                                >
                                                    <option value="TODOS">TODOS</option>
                                                    <option value="FECHA DE LA REMISION">FECHA DE LA REMISION </option>
                                                    <option value="FECHA PROGRAMADA DE ENTREGA">FECHA PROGRAMADA DE ENTREGA</option>
                                                    <option value="FECHA REAL DE ENTREGA">FECHA REAL DE ENTREGA</option>

                                                </select>
                                            </p>
                                        </div>
                                        <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Fecha inicial
                                                <input
                                                    value={date}
                                                    id="date"
                                                    name="date"
                                                    type="date"
                                                    onChange={async (e) => { await setDate(e.target.value); }}
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </p>
                                        </div>
                                        <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Fecha final
                                                <input
                                                    value={dateEnd}
                                                    id="date"
                                                    name="date"
                                                    type="date"
                                                    onChange={async (e) => { await setDateEnd(e.target.value) }}
                                                    className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="flex-1 flex justify-center lg:ml-6 lg:justify-start" >
                                        <div className="max-w-lg w-full lg:max-w-xs" >
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Filtrar por conductor
                                                <select
                                                    value={driver}
                                                    id="driver"
                                                    name="driver"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e) => { setFilterDriver(e.target.value) }}
                                                >
                                                    <option value="TODOS">TODOS</option>
                                                    {filterDriver.map((driver) => (
                                                        <option value={driver.User.username}> {driver.User.username}</option>
                                                    ))}
                                                </select>
                                            </p>
                                        </div>
                                        <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Filtrar por cliente
                                                <select
                                                    value={client}
                                                    id="client"
                                                    name="client"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e) => { setFilterClient(e.target.value) }}
                                                >
                                                    <option value="TODOS">TODOS</option>
                                                    {filterClient.map((client) => (
                                                        <option value={client.fullname}> {client.codeClient + "-" + client.fullname}</option>
                                                    ))}
                                                </select>
                                            </p>
                                        </div>
                                        <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Filtrar por sucursal
                                                <select
                                                    value={company}
                                                    id="company"
                                                    name="company"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e) => { setFilterCompany(e.target.value) }}
                                                >
                                                    <option value="TODOS">TODOS</option>
                                                    {filterCompany.map((company) => (
                                                        <option value={rol == 3 ? company.Company.fullname : company.fullname}> {rol == 3 ? company.Company.companyNumber + "-" + company.Company.fullname : company.companyNumber + "-" + company.fullname}</option>
                                                    ))}
                                                </select>
                                            </p>
                                        </div>
                                        <div className="max-w-lg w-full lg:max-w-xs" style={{ marginLeft: 10 }}>
                                            <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                Filtrar por estado
                                                <select
                                                    value={filterStatus}
                                                    id="status"
                                                    name="status"
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                    onChange={(e) => { setStatus(e.target.value) }}
                                                >
                                                    <option value="TODOS">TODOS</option>
                                                    <option value="PENDIENTE" selected={true}>PENDIENTE</option>
                                                    <option value="FINALIZADA">FINALIZADA</option>
                                                </select>
                                            </p>
                                        </div>
                                    </div>
                                    <br /><br />
                                    <div className="-ml-4 -mt-2 flex items-center justify-end flex-wrap sm:flex-nowrap">
                                        <button
                                            style={{ marginRight: 5 }}
                                            type="button"
                                            onClick={() => { Search(driver, client, company, filterDate, filterStatus) }}
                                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            <SearchIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={() => { Refresh() }}
                                            style={{ marginRight: 5 }}
                                            type="button"
                                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            <RefreshIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <br />
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        <span className="sr-only">Edit</span>
                                                        Acciones
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Número de remisión
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Conductor
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"

                                                    >
                                                        Cliente
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"

                                                    >
                                                        Sucursal
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Estado
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPosts.map((person, personIdx) => (
                                                    <tr key={person.id} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                        <td style={{ padding: 10 }} className="whitespace-nowrap">
                                                            <div className="relative flex flex-wrap items-center justify-center lg:center">
                                                                <Link to={`/dashboard/referrals/${person.id}`} className="text-indigo-600 hover:text-indigo-900"><EyeIcon className="h-6 w-6" aria-hidden="true" data-tip="Consultar" />
                                                                    <ReactTooltip />
                                                                </Link>
                                                                <Link to={`/dashboard/automatic/map/${person.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                                    <MapIcon className="h-6 w-6" aria-hidden="true" data-tip="Ubicar" />
                                                                    <ReactTooltip />
                                                                </Link>
                                                                <Link
                                                                    to={`/dashboard/referrals/switch/${person.id}`}
                                                                    hidden={person.status == 0 ? false : true}
                                                                    className="text-gray-600 hover:text-gray-900"><SwitchHorizontalIcon className="h-6 w-6" aria-hidden="true" data-tip="Cambiar conductor" />
                                                                    <ReactTooltip />
                                                                </Link>
                                                                <Link
                                                                    hidden={person.status == 0 ? false : true}
                                                                    onClick={() => { setReferralId(person.id); setOpen(true) }}
                                                                    className="text-gray-600 hover:text-gray-900"><XCircleIcon className="h-6 w-6" aria-hidden="true" data-tip="Eliminar" />
                                                                    <ReactTooltip />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{person.referralNumber}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.Driver.username}</td>
                                                        <td style={{ width: 50 }} className="px-6 py-4  text-sm text-gray-500">{person.Client.codeClient + "-" + person.Client.fullname}</td>
                                                        <td style={{ width: 50 }} className="px-6 py-4  text-sm text-gray-500">{person.Company.companyNumber + "-" + person.Company.fullname}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.status == 0 ? "PENDIENTE" : "FINALIZADA"}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <Pagination
                                            currentPage={currentPage}
                                            postsPerPage={postsPerPage}
                                            totalPosts={referral.length}
                                            indexLast={indexOfLastPost}
                                            indexFirst={indexOfFirstPost}
                                            paginate={paginate}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Transition.Root show={open} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    open={open}
                    onClose={setOpen}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Eliminar remisión
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Esta seguro que desea eliminar la remisión?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                                        onClick={Delete}
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}

export default Referrals;