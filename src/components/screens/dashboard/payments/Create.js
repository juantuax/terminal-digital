import React, { useState, Fragment, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, ExclamationIcon } from "@heroicons/react/outline";
import { GetAllBankAccounts } from "./../../../../helpers/apis/BankAccount";
import { useSelector } from "react-redux";
import { GetAllAdmins } from "../../../../helpers/apis/Admin";
import { CreatePayment } from "../../../../helpers/apis/Payment";
import { Switch } from "@headlessui/react";
import {
  UploadFile,
  GetOneImage,
  RemoveImage,
} from "./../../../../helpers/apis/File";
import { APP_SETTINGS } from "./../../../../helpers/utils/Constants";
import Preview from "./../../../../assets/no-image.jpg";
const Create = () => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigation = useHistory();
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [bankAccount, setBankAccount] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [ownerRuc, setOwnerRuc] = useState("");
  const [enabled, setEnabled] = useState("");
  const [msgE, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [image, setImage] = useState("");
  const [imager, setRemove] = useState("");
  const rol = useSelector((state) => state.auth.user.role);
  const id = useSelector((state) => state.auth.user.id);
  const images = useRef();
  const Phone = (e) => {
    if (e.charCode < 48 || e.charCode > 57) {
      e.preventDefault();
    }
  };
  const ImagePreview = () => {
    let preview = URL.createObjectURL(images.current.files[0]);
    setImage(preview);
  };
  const uploadFile = async (file) => {
    const response = await UploadFile(file);
    return response;
  };
  const save = async (e) => {
    e.preventDefault();
    if (ownerRuc == "" || ownerName == "") {
      setEmpty(true);
    } else {
      let path = "";
      if (imager != "") {
        if (image !== APP_SETTINGS.IMG_URL + imager) {
          if (images.current.files[0] != null) {
            const filePath = await uploadFile(images.current.files[0]);
            if (filePath.statusCode === 200) {
              path = filePath.data;
            }
          }
          let obj = { path: imager.slice(1, imager.lenght) };
          const remove = await RemoveImage(obj);
        }
      } else { 
        if(!enabled)
        if (image !== APP_SETTINGS.IMG_URL + imager) {
          if (images.current.files[0] != null) {
            const filePath = await uploadFile(images.current.files[0]);
            if (filePath.statusCode === 200) {
              path = filePath.data;
            }
          }
        }
      }
      let object;
      if (rol == 1 && !enabled) {
        object = {
          bank: name,
          ref: number,
          fullname: ownerName,
          dni: ownerRuc,
          amount: amount,
          type: 1,
          status: 1,
          terminal: admin,
          account: bankAccount,
          date: date,
          photo: path,
        };
      } else if (rol == 1 && enabled) {
        object = {
          fullname: ownerName,
          dni: ownerRuc,
          amount: amount,
          type: 2,
          status: 1,
          terminal: admin,
          date: date,
        };
      } else if (rol == 3 && enabled) {
        object = {
          fullname: ownerName,
          dni: ownerRuc,
          amount: amount,
          type: 2,
          status: 0,
          terminal: id,
          date: date,
        };
      } else if (rol == 3 && !enabled) {
        object = {
          bank: name,
          ref: number,
          fullname: ownerName,
          dni: ownerRuc,
          amount: amount,
          type: 1,
          status: 0,
          terminal: id,
          account: bankAccount,
          date: date,
          photo: path,
        };
      }
      const response = await CreatePayment(object);
      if (response.statusCode == 200) {
        setOk(true);
      } else if (response.statusCode == 409) {
        await setMessage(
          "El número de pago ya se encuentra registrado a otra pago"
        );
        setError(true);
      } else {
        await setMessage(
          "Ocurrió un error al intentar guardar la pago, contacte al soporte técnico"
        );
        setError(true);
      }
    }
  };
  useEffect(() => {
    if (rol == 1) {
      const request = async () => {
        const response = await GetAllBankAccounts();
        if (response.data.length > 0) {
          let arrayBanks = [];
          response.data.forEach((d) => {
            arrayBanks.push(d);
          });
          setBankAccounts(arrayBanks);
          setBankAccount(arrayBanks[0].id);
        }
        const responseAdmin = await GetAllAdmins();
        if (responseAdmin.data.length > 0) {
          let arrayAdmins = [];
          responseAdmin.data.forEach((c) => {
            if (c.User.active == 1) {
              arrayAdmins.push(c);
            }
          });
          setAdmins(arrayAdmins);
          setAdmin(arrayAdmins[0].UserId);
        }
      };
      request();
    } else {
      const request = async () => {
        const response = await GetAllBankAccounts();
        if (response.data.length > 0) {
          let arrayBanks = [];
          response.data.forEach((d) => {
            arrayBanks.push(d);
          });
          setBankAccounts(arrayBanks);
          setBankAccount(arrayBanks[0].id);
        }
      };
      request();
    }
  }, []);

  return (
    <>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form
                  className="space-y-8 divide-y divide-gray-200"
                  onSubmit={save}
                >
                  <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div>
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Nuevo Pago
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Rellena la información para crear un nuevo pago
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Información del pago
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          Ingresa los datos del pago
                        </p>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="flag"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Efectivo
                        </label>
                        <Switch.Group
                          as="div"
                          className="mt-1 sm:mt-0 sm:col-span-1"
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
                        </Switch.Group>
                      </div>

                      {!enabled ? (
                        <div className="space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="id_number"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Número de referencia
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="id_number"
                                id="id_number"
                                onChange={(e) => {
                                  setNumber(e.target.value.toUpperCase());
                                }}
                                value={number}
                                onKeyPress={(e) => {
                                  Phone(e);
                                }}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="model"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Nombre del banco
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="model"
                                id="model"
                                onChange={(e) => {
                                  setName(e.target.value.toUpperCase());
                                }}
                                value={name}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="model"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Documento de identidad
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="model"
                                id="model"
                                onChange={(e) => {
                                  setOwnerRuc(e.target.value.toUpperCase());
                                }}
                                value={ownerRuc}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="color"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Nombre del titular
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="color"
                                id="color"
                                onChange={(e) => {
                                  setOwnerName(e.target.value.toUpperCase());
                                }}
                                value={ownerName}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="color"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Fecha de emisión
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="date"
                                name="date"
                                id="date"
                                onChange={(e) => {
                                  setDate(e.target.value);
                                }}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="id_number"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Monto
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="id_number"
                                id="id_number"
                                onChange={(e) => {
                                  setAmount(e.target.value);
                                }}
                                value={amount}
                                onKeyPress={(e) => {
                                  Phone(e);
                                }}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="company"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Banco Receptor
                              </label>
                              <div className="mt-1 sm:mt-0 sm:col-span-1">
                                <select
                                  id="company"
                                  name="company"
                                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  onChange={(e) => {
                                    setBankAccount(e.target.value);
                                  }}
                                >
                                  {bankAccounts?.map((bankAccount) => (
                                    <option value={bankAccount?.id}>
                                      {" "}
                                      {bankAccount?.bank_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="photo"
                                className="block text-sm font-medium text-blue-gray-900"
                              >
                                Foto
                              </label>
                              <div className="mt-1 sm:mt-0 sm:col-span-1">
                                <div className="mt-1 flex items-center">
                                  <img
                                    className="inline-block h-12 w-12 rounded-full"
                                    src={image == "" ? Preview : image}
                                  />
                                  <div className="ml-4 flex">
                                    <div className="relative bg-white py-2 px-3 border border-blue-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-blue-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-blue-gray-50 focus-within:ring-blue-500">
                                      <label
                                        htmlFor="user_photo"
                                        className="relative text-sm font-medium text-blue-gray-900 pointer-events-none"
                                      >
                                        <span>Cambiar</span>
                                        <span className="sr-only">
                                          {" "}
                                          user photo
                                        </span>
                                      </label>
                                      <input
                                        id="user_photo"
                                        name="user_photo"
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                        ref={images}
                                        onChange={(e) => {
                                          ImagePreview();
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {rol == 1 && (
                            <div className="space-y-6 sm:space-y-5">
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="company"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Terminal
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-1">
                                  <select
                                    id="company"
                                    name="company"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    onChange={(e) => {
                                      setAdmin(e.target.value);
                                    }}
                                  >
                                    {admins?.map((admin) => (
                                      <option value={admin?.UserId}>
                                        {" "}
                                        {admin?.companyNumber +
                                          "-" +
                                          admin?.fullname}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-6 sm:space-y-5">
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="model"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Documento de identidad
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="model"
                                id="model"
                                onChange={(e) => {
                                  setOwnerRuc(e.target.value.toUpperCase());
                                }}
                                value={ownerRuc}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="color"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Nombre del titular
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="color"
                                id="color"
                                onChange={(e) => {
                                  setOwnerName(e.target.value.toUpperCase());
                                }}
                                value={ownerName}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="color"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Fecha de emisión
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="date"
                                name="date"
                                id="date"
                                onChange={(e) => {
                                  setDate(e.target.value);
                                }}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label
                              htmlFor="id_number"
                              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                            >
                              Monto
                            </label>
                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                              <input
                                type="text"
                                name="id_number"
                                id="id_number"
                                onChange={(e) => {
                                  setAmount(e.target.value);
                                }}
                                value={amount}
                                onKeyPress={(e) => {
                                  Phone(e);
                                }}
                                autoComplete="given-name"
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>
                          {rol == 1 && (
                            <div className="space-y-6 sm:space-y-5">
                              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                  htmlFor="company"
                                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                  Terminal
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-1">
                                  <select
                                    id="company"
                                    name="company"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    onChange={(e) => {
                                      setAdmin(e.target.value);
                                    }}
                                  >
                                    {admins?.map((admin) => (
                                      <option value={admin?.User?.id}>
                                        {" "}
                                        {admin?.companyNumber +
                                          "-" +
                                          admin?.fullname}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          navigation.push("/dashboard/companies");
                        }}
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Volver
                      </button>
                      <button
                        type="submit"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Guardar
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
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={ok}
          onClose={setOk}
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
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
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Guardado exitoso!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        el pago ha sido guardado con éxito
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={async () => {
                      await setOk(false);
                      navigation.push("/dashboard/payments");
                    }}
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
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={error}
          onClose={setError}
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
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
                    <ExclamationIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Error!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{msgE}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={async () => {
                      await setError(false);
                    }}
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
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={empty}
          onClose={setEmpty}
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
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
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
                    <ExclamationIcon
                      className="h-6 w-6 text-yellow-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Espera!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Debes rellenar todos los campos para guardar
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={async () => {
                      await setEmpty(false);
                    }}
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
  );
};

export default Create;
