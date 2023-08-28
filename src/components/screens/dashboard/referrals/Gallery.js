import React, { useEffect, useState, Fragment } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/outline';
import { UpdateReferralStatus, GetOneReferral, DownloadPdf, DownloadPdfs } from './../../../../helpers/apis/Referral';
import { GetEvidence } from './../../../../helpers/apis/File';
import { APP_SETTINGS } from './../../../../helpers/utils/Constants';
import moment from 'moment';
import ImgsViewer from "react-images-viewer";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Gallery = (props) => {
    const navigation = useHistory();
    const [referral, setReferral] = useState('');
    const [number, setNumber] = useState('');
    const [client, setClient] = useState('');
    const [date, setDate] = useState('');
    const [delivery, setDelivery] = useState([]);
    const [msgE, setMessage] = useState('');
    const [current, setCurrent] = useState(0);
    const [open, setOpen] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [ok, setOk] = useState(false);
    const [error, setError] = useState(false);
    const [empty, setEmpty] = useState(false);
    let arrayimage = [];

    class myReferral {
        constructor(url) {
            this.url = url;
        }
    };

    const gotoPrevImg = () => {
        if (current == 0) { }
        else {
            setCurrent(current - 1)
        }
    };

    const gotoNextImg = () => {
        if (delivery.length == current) { }
        else {
            setCurrent(current + 1)
        }
    };

    const CloseImgsViewer = () => {
        setOpen(false)
    };

    const generate = async () => {
        navigation.push(`/pdf/${props.id}`)
    };

    useEffect(() => {
        const request = async () => {
            const responseReferral = await GetOneReferral(props.id);
            if (responseReferral.statusCode == 200) {
                setReferral(responseReferral.data);
                setNumber(responseReferral.data.referralNumber);
                setClient(responseReferral.data.Client.fullname);
                const evidence = await GetEvidence(responseReferral.data.DeliveryId)
                if (evidence.data.length > 0) {
                    setDelivery(evidence.data);
                    let current = 0;
                    evidence.data.forEach(image => {
                        let images = { src: (APP_SETTINGS.IMG_URL + image.path), pos: current };
                        arrayimage.push(images);
                        current++;
                    });
                    setGallery(arrayimage);
                }
            }
        };
        request();
    }, []);

    return (
        <>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
                <div className="mt-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <form className="space-y-8 divide-y divide-gray-200" >
                                    <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                                        <div>
                                            <div>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Evidencia</h3>
                                                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                                                    Evidencia de la remisión
                                                </p>
                                                <h3 className="text-lg leading-6 font-medium text-gray-900 flex justify-end">
                                                    Remisión : {number}<br />Cliente : {client} <br /> {delivery != '' || !delivery ? `Fecha : ${moment(delivery[0].createdAt).format('DD-MM-YYYY')}` : ""} <br /> {delivery != '' || !delivery ? `Hora : ${moment(delivery[0].createdAt).format('HH:mm')}` : ""}
                                                </h3>
                                                <button
                                                    onClick={generate}
                                                    type="button"
                                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    Descargar
                                                </button>
                                            </div>
                                        </div>

                                        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                            <div className="space-y-6 sm:space-y-5">
                                                <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                                                    <div>
                                                        <ImgsViewer
                                                            imgs={gallery}
                                                            currImg={current}
                                                            isOpen={open}
                                                            onClickPrev={gotoPrevImg}
                                                            onClickNext={gotoNextImg}
                                                            onClose={CloseImgsViewer}
                                                        />
                                                    </div>
                                                    <ul
                                                        role="list"
                                                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                                                    >
                                                        {gallery.map((file) => (
                                                            <li key={file.pos} className="relative">
                                                                <div
                                                                    onClick={() => { setCurrent(file.pos); setOpen(true) }}
                                                                    className={classNames(
                                                                        false
                                                                            ? 'ring-2 ring-offset-2 ring-indigo-500'
                                                                            : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                                                                        'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden'
                                                                    )}
                                                                >
                                                                    <img

                                                                        src={file.src}
                                                                        alt=""
                                                                        className={classNames(
                                                                            file.current ? '' : 'group-hover:opacity-75',
                                                                            'object-cover pointer-events-none'
                                                                        )}
                                                                    />
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-5">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => {
                                                    navigation.push(`/dashboard/referrals/${props.id}`);
                                                }}
                                                type="button"
                                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Volver
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Transition.Root show={ok} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={ok} onClose={setOk}>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Guardado exitoso!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                La remisión ha sido finalizada con exito.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setOk(false); navigation.push(`/dashboard/referrals/${props.id}`); }}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={error} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={error} onClose={setError}>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Error!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {msgE}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setError(false); }}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
            <Transition.Root show={empty} as={Fragment}>
                <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={empty} onClose={setEmpty}>
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
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                        <ExclamationIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Espera!
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Debe existir evidencia de la  remisión para poder finalizarla
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={async () => { await setEmpty(false); }}
                                    >
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}

export default Gallery;