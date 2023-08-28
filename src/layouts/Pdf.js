import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { GetOneReferral } from '../helpers/apis/Referral';
import { GetEvidence } from '../helpers/apis/File';
import { APP_SETTINGS } from '../helpers/utils/Constants';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Pdf = () => {
    const { id } = useParams();
    const [referral, setReferral] = useState('');
    const [number, setNumber] = useState('');
    const [client, setClient] = useState('');
    const [delivery, setDelivery] = useState([]);
    const [gallery, setGallery] = useState([]);
    let arrayimage = [];

    useEffect(() => {
        (async () => {
            const response = await GetOneReferral(id);
            if (response.statusCode == 200) {
                setReferral(response.data);
                setNumber(response.data.referralNumber);
                setClient(response.data.Client.fullname);
                const evidence = await GetEvidence(response.data.DeliveryId)
                if (evidence.data.length > 0) {
                    setDelivery(evidence.data);
                    let current = 0;
                    evidence.data.forEach(image => {
                        let images = { src: (APP_SETTINGS.IMG_URL + image.path), pos: current };
                        arrayimage.push(images);
                        current++;
                    });
                    setGallery(arrayimage);
                    window.print();
                } else {
                    window.print();
                }
            }
        })();
    }, []);

    return (
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
                                                Remisión : {number}<br />Cliente : {client}
                                                <br /> {delivery != '' || !delivery ? `Fecha : ${moment(delivery[0].createdAt).format('DD-MM-YYYY')}` : ""}
                                                <br /> {delivery != '' || !delivery ? `Hora : ${moment(delivery[0].createdAt).format('HH:mm')}` : ""}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                                        <div className="space-y-6 sm:space-y-5">
                                            <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                                                {gallery.map((file) => (
                                                    <li key={file.pos} className="relative">
                                                        <img
                                                            src={file.src}
                                                            alt=""
                                                            className={classNames(
                                                                file.current ? '' : 'group-hover:opacity-75',
                                                                'object-cover pointer-events-none'
                                                            )}
                                                        />
                                                    </li>
                                                ))}
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Pdf;