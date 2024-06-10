/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import { Button, Select, Form, Checkbox, Spin } from 'antd';
import Layout from '../layout/layout'
import { InputNumber } from 'antd';
import Service from '../service/service';
import { useEffect } from 'react';
import imageBackground from '../assets/images/bgImage.png'
import createOrder from '../assets/svg/create_order.svg'
import pay from '../assets/svg/pay.svg'
import ship from '../assets/svg/ship.svg'
import { useLocation } from 'react-router-dom';
import NotiAfterConfirm from '../Notification/NotiAfterConfirm';

function HomrPage() {

  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([]);
  const [dataDelivery, setDataDelivery] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [parcelBoxSize, setParcelBoxSize] = useState([]);
  const [isOpenSystem, setIsOpenSystem] = useState(true);
  const [isServiceFee50, setIsServiceFee50] = useState(false);
  const [isServiceFee100, setIsServiceFee100] = useState(false);
  const [isServiceFee150, setIsServiceFee150] = useState(false);
  const [isServiceFeeMore150, setIsServiceFeeMore150] = useState(false);
  const [isPickupPointIn, setIsPickupPointIn] = useState(false);
  const [isPickupPointOut, setIsPickupPointOut] = useState(false);
  const [isDeliveryTime1, setIsDeliveryTime1] = useState(false);
  const [isDeliveryTime2, setIsDeliveryTime2] = useState(false);
  const [isDeliveryTime3, setIsDeliveryTime3] = useState(false);
  const [isDeliveryTime4, setIsDeliveryTime4] = useState(false);
  const [isDeliveryTime5, setIsDeliveryTime5] = useState(false);
  const [isDeliveryTime6, setIsDeliveryTime6] = useState(false);
  const [isParcelBoxSize, setIsParcelBoxSize] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();


  const getProvinceAndDistrictAndSubDistrict = async () => {
    try {
      const response = await Service.getProvinceAndDistrictAndSubDistrict();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const getParcelBoxSize = async () => {
    try {
      const response = await Service.getParcelBoxSize();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit = async (values) => {
    try {
      const from = {
        district: "",
        postcode: "",
        province: "",
        sub_district: "",
      };
      const to = {
        district: "",
        postcode: "",
        province: "",
        sub_district: "",
      };
      const parcel = {
        weight: "",
        width: "",
        length: "",
        height: "",
        id: ""
      };
      let data = [];
      const address_origin = values.address_origin.split(" ");
      const address_destination = values.address_destination.split(" ");
      from.province = address_origin[0];
      from.district = address_origin[1];
      from.sub_district = address_origin[2];
      from.postcode = address_origin[3];
      to.province = address_destination[0];
      to.district = address_destination[1];
      to.sub_district = address_destination[2];
      to.postcode = address_destination[3];
      parcel.weight = values.weight;
      parcel.width = values.width;
      parcel.length = values.long;
      parcel.height = values.height;
      parcel.id = values.boxSizeId
      data.push({
        from: from,
        to: to,
        parcel: parcel,
      });
      const response = await Service.getDeliveryService(data);
      if (response.status === 200) {
        const sortedData = response.data.sort((a, b) => a.rate - b.rate);
        setDataDelivery(sortedData);
        setOriginalData(sortedData);
        NotiAfterConfirm('success', 'สำเร็จ', 'ค้นหาข้อมูลสำเร็จ');
        setIsLoading(false);
      } else {
        NotiAfterConfirm('error', 'เกิดข้อผิดพลาด', 'ค้นหาข้อมูลไม่สำเร็จ');
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const fitlerData = () => {

    if (!dataDelivery) {
      fetchOriginalData();
      return;
    }

    let filteredData = dataDelivery;
    if (isServiceFee50 || isServiceFee100 || isServiceFee150 || isServiceFeeMore150 || isPickupPointIn || isPickupPointOut || isDeliveryTime1 || isDeliveryTime2 || isDeliveryTime3 || isDeliveryTime4 || isDeliveryTime5 || isDeliveryTime6) {
      filteredData = dataDelivery.filter(item => {
        let valid = true;
        if (isServiceFee50) valid = valid && item.rate < 50;
        if (isServiceFee100) valid = valid && item.rate >= 50 && item.rate <= 100;
        if (isServiceFee150) valid = valid && item.rate > 100 && item.rate <= 150;
        if (isServiceFeeMore150) valid = valid && item.rate > 150;
        if (isPickupPointIn) valid = valid && item.parcel_pickup_point === 'เข้ารับที่หน้าบ้าน';
        if (isPickupPointOut) valid = valid && item.parcel_pickup_point === 'ส่งด้วยตนเอง';
        if (isDeliveryTime1) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime <= 1 && deliveryTime <= 4;
        }
        if (isDeliveryTime2) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime <= 2 && deliveryTime <= 5;
        }
        return valid;
      });
      if (filteredData.length === 0) {
        setDataDelivery(null);
      } else {
        setDataDelivery(filteredData);
      }
    } else {
      fetchOriginalData();
    }
  }

  const fetchOriginalData = async () => {
    setDataDelivery(originalData);
  };

  useEffect(() => {
    getProvinceAndDistrictAndSubDistrict().then((response) => {
      setData(response);
    });
    getParcelBoxSize().then((response) => {
      setParcelBoxSize(response);
    });
  }, []);

  useEffect(() => {
  }, [dataDelivery]);

  useEffect(() => {
    fitlerData();
  }, [isServiceFee50, isServiceFee100, isServiceFee150, isServiceFeeMore150, isPickupPointIn, isPickupPointOut, isDeliveryTime1, isDeliveryTime2, isDeliveryTime3, isDeliveryTime4, isDeliveryTime5, isDeliveryTime6]);

  return (
    <>
      {
        isOpenSystem ? (
          <Form
            name="basic"
            className=' font-kanit '
            initialValues={{ remember: true }}
            onFinish={(values) => {
              onSubmit(values)
              setIsOpen(true)
            }}
            onFinishFailed={(errorInfo) => {
              console.log('Failed:', errorInfo);
            }}
          >
            <div
              className="relative w-full h-[100vh] md:h-[70vh] lg:h-[90vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${imageBackground})` }}
            >
              <div className='card bg-white w-full md:w-[55%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 md:p-10
               rounded-xl shadow-lg'>
                <div className='flex items-center'>
                  <h3 className='text-2xl text-black font-light mb-4 mr-2'>ค้นหาและเปรียบเทียบขนส่งที่ดีที่สุด </h3>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-[#d81d19]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  <div className="flex col-span-2">
                    <Form.Item
                      name="address_origin"
                      className='w-full'
                      rules={[{ required: true, message: 'กรุณากรอกอำเภอต้นทาง' }]}
                    >
                      <Select className="w-full p-2 xs:p-0 rounded-md h-14 xs:h-10 font-kanit"
                        name="address_origin"
                        showSearch
                        placeholder="ค้นหาที่อยู่ต้นทาง"
                      >
                        {data?.map((province) => (
                          <Select.Option key={province.id} value={province.name}>
                            {province.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  <div className="flex col-span-2">
                    <Form.Item
                      name="address_destination"
                      className='w-full'
                      rules={[{ required: true, message: 'กรุณากรอกอำเภอปลายทาง' }]}
                    >
                      <Select className="w-full p-2 xs:p-0 rounded-md h-14 xs:h-10 font-kanit"
                        name="address_destination"
                        showSearch
                        placeholder="ค้นหาที่อยู่ปลายทาง"
                      >
                        {data?.map((province) => (
                          <Select.Option key={province.id} value={province.name}>
                            {province.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  {
                    isParcelBoxSize && (
                      <div className="flex flex-col mb-0 col-span-2 md:col-span-2">
                        <Form.Item
                          name="width"
                          className='w-full'
                          rules={[{ required: true, message: 'กรุณากรอกความกว้าง' }]}
                        >
                          <InputNumber type="text" className="w-full p-1 sm:p-0 border border-gray-300 rounded-md font-kanit" placeholder="กว้าง" />
                        </Form.Item>
                        <Form.Item
                          name="isParcelBoxSize"
                          className='w-full'
                        >
                          <Checkbox className="text-black font-kanit"
                            onChange={(e) => {
                              setIsParcelBoxSize(e.target.checked)
                            }}
                            checked={isParcelBoxSize}
                          >
                            ต้องการเลือกขนาดกล่องพัสดุ
                          </Checkbox>
                        </Form.Item>
                      </div>
                    )
                  }
                  {
                    !isParcelBoxSize && (
                      <>
                        <div className="flex flex-col mb-0 col-span-2 md:col-span-1">
                          <Form.Item
                            name="width"
                            className='w-full'
                            rules={[{ required: true, message: 'กรุณากรอกความกว้าง' }]}
                          >
                            <InputNumber type="text" className="w-full p-1 sm:p-0 border border-gray-300 rounded-md font-kanit" placeholder="กว้าง" />
                          </Form.Item>
                          <Form.Item
                            name="isParcelBoxSize"
                            className='w-full'
                          >
                            <Checkbox className="text-black font-kanit"
                              onChange={(e) => {
                                setIsParcelBoxSize(e.target.checked)
                              }}
                              checked={isParcelBoxSize}
                            >
                              ต้องการเลือกขนาดกล่องพัสดุ
                            </Checkbox>
                          </Form.Item>
                        </div>
                        <div className="flex col-span-2 md:col-span-1">
                          <Form.Item
                            name="long"
                            className='w-full'
                            rules={[{ required: true, message: 'กรุณากรอกยาว' }]}
                          >
                            <InputNumber type="text" className="w-full p-1 xs:p-0 border border-gray-300 rounded-md font-kanit" placeholder="ยาว" />
                          </Form.Item>
                        </div>
                        <div className="flex col-span-2 md:col-span-1">
                          <Form.Item
                            name="height"
                            className='w-full'
                            rules={[{ required: true, message: 'กรุณากรอกสูง' }]}
                          >
                            <InputNumber type="text" className="w-full p-1 xs:p-0 border border-gray-300 rounded-md font-kanit" placeholder="สูง" />
                          </Form.Item>
                        </div>
                      </>
                    )
                  }
                  <div className={isParcelBoxSize ? "flex 4 col-span-2 md:col-span-2" : "flex  col-span-2 md:col-span-1"}>
                    <Form.Item
                      name="weight"
                      className='w-full'
                      rules={[{ required: true, message: 'กรุณากรอกน้ำหนัก' }]}
                    >
                      <InputNumber type="text" className="w-full p-1 xs:p-0 border border-gray-300 rounded-md font-kanit" placeholder="น้ำหนัก(กิโลกรัม)" />
                    </Form.Item>
                  </div>
                </div>
                <div className="flex justify-center mt-2 md:mt-4">
                  <Button type="primary" htmlType="submit" className="font-kanit bg-primary hover:!bg-[#e95e5f] text-white font-normal focus:outline-none focus:shadow-outline"
                  >
                    ตรวจสอบราคา
                  </Button>
                </div>
              </div>
            </div>
            {
              isOpen ? (
                <div className='flex flex-col pl-10 pr-10'>
                  <div className='flex justify-start items-center pt-4 pb-4'>
                    <h1 className='text-xl text-black font-medium'>รายการขนส่งทั้งหมด </h1>
                  </div>
                  <div className='pb-4'>
                    <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
                      <div className='col-span-1'>
                        <div className="w-full">
                          <div className="mx-auto w-full max-w-md rounded-2xl p-2 border border-gray-200">
                            <Disclosure>
                              {({ open }) => (
                                <>
                                  <Disclosure.Button
                                    className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-md font-medium text-black hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary ">
                                    <span className='label-text text-xl' >ค่าบริการ</span>
                                    <PlusIcon className={`${open ? 'hidden' : ''
                                      } h-5 w-5 text-black`}

                                    />
                                    <MinusIcon className={`${open ? ''
                                      : 'hidden'} h-5 w-5 text-black`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 border-t-2 border-gray-200">
                                    <div className="form-control">
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          onChange={(e) => {
                                            setIsServiceFee50(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">น้อยกว่า 50 บาท</span>
                                      </label>
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          onChange={(e) => {
                                            setIsServiceFee100(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">50 บาท - 100 บาท</span>
                                      </label>
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          onChange={(e) => {
                                            setIsServiceFee150(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">101 บาท - 150 บาท</span>
                                      </label>
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          onChange={(e) => {
                                            setIsServiceFeeMore150(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">มากกว่า 150 บาท</span>
                                      </label>
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2 border-t-2 border-gray-200">
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-md font-medium text-black hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary ">
                                    <span className='label-text text-xl' >จุดรับพัสดุ</span>
                                    <PlusIcon className={`${open ? 'hidden' : ''
                                      } h-5 w-5 text-black`}
                                    />
                                    <MinusIcon className={`${open ? ''
                                      : 'hidden'} h-5 w-5 text-black`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 border-t-2 border-gray-200">
                                    <div className="form-control">
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          value={isPickupPointIn}
                                          onChange={(e) => {
                                            setIsPickupPointIn(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">เข้ารับที่หน้าบ้าน</span>
                                      </label>
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          value={isPickupPointOut}
                                          onChange={(e) => {
                                            setIsPickupPointOut(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">ส่งด้วยตนเอง</span>
                                      </label>
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2 border-t-2 border-gray-200">
                              {({ open }) => (
                                <>
                                  <Disclosure.Button className="flex w-full justify-between rounded-lg bg-white px-4 py-2 text-left text-md font-medium text-black hover:bg-primary-200 focus:outline-none focus-visible:ring focus-visible:ring-primary ">
                                    <span className='label-text text-xl' >ระยะเวลาจัดส่ง</span>
                                    <PlusIcon className={`${open ? 'hidden' : ''
                                      } h-5 w-5 text-black`}

                                    />
                                    <MinusIcon className={`${open ? ''
                                      : 'hidden'} h-5 w-5 text-black`}
                                    />
                                  </Disclosure.Button>
                                  <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500 border-t-2 border-gray-200">
                                    <div className="form-control">
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          value={isDeliveryTime1}
                                          onChange={(e) => {
                                            setIsDeliveryTime1(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">1 - 4 วัน</span>
                                      </label>
                                      <label className="cursor-pointer flex items-center pb-2">
                                        <input type="checkbox"
                                          className="checkbox checkbox-sm mr-4"
                                          value={isDeliveryTime2}
                                          onChange={(e) => {
                                            setIsDeliveryTime2(e.target.checked);

                                          }}
                                        />
                                        <span className="label-text text-lg">2 - 5 วัน</span>
                                      </label>
                                    </div>
                                  </Disclosure.Panel>
                                </>
                              )}
                            </Disclosure>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-3 '>
                        {
                          isLoading ? (
                            <div className='flex justify-center items-center'>
                              <Spin />
                            </div>
                          ) : (
                            Array.isArray(dataDelivery) ? dataDelivery.map((element, index) => (
                              // eslint-disable-next-line react/jsx-key
                              <div className="card bg-white border border-gray-200 w-full mb-4">
                                 {index === 0 && (
                                    <div className=' w-36 border rounded-tl-lg rounded-br-lg border-gray-200 bg-red-500'>
                                      <h3 className='ml-1 text-xl text-white font-medium'>แนะนำสำหรับคุณ</h3>
                                    </div>
                                  )}
                                <div className="card-body">
                                  <div className="overflow-x-auto">
                                    <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
                                      <div className='col-span-1'>
                                        <div className='flex justify-center items-center'>
                                          <img src={element?.img_url} className=' w-[132px] h-[60px] max-w-full object-contain ' />
                                        </div>
                                      </div>
                                      <div className='col-span-1 flex flex-col justify-center items-center '>
                                        <h3 className='text-xl text-black font-medium'>เงื่อนไขการขนส่ง</h3>
                                        <h5 className='text-md text-black font-light'>ขั้นต่ำ 1 ชิ้น</h5>
                                      </div>
                                      <div className='col-span-1 flex flex-col justify-center items-center'>
                                        <div className='flex items-center justify-center'>
                                          <h3 className='text-xl text-black font-medium'>ระยะเวลาส่ง</h3>
                                          <div className="tooltip" data-tip="ระยะเวลาจัดส่งขึ้นอยู่กับสถานที่จัดส่งและสถานที่ปลายทาง">
                                            <div className='ml-2'>
                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                        <h5 className='text-md text-black font-light'>{
                                          element?.delivery_time
                                        }</h5>
                                      </div>
                                      <div className='col-span-1 flex flex-col justify-center items-center'>
                                        <h3 className='text-xl text-black font-medium'>จุดรับส่งพัสดุ</h3>
                                        <h5 className='text-md text-black font-light'>
                                          {element.parcel_pickup_point}
                                          {/* เข้ารับที่หน้าบ้าน */}
                                        </h5>
                                      </div>
                                      <div className='col-span-1 flex flex-col justify-center items-center'>
                                        <h3 className='text-xl text-black font-medium'>ค่าบริการ</h3>
                                        <h5 className='text-md text-black font-light'>{
                                          element?.rate + ' บาท'
                                        }</h5>
                                      </div>
                                      <div className='col-span-1 flex flex-col justify-center items-center'>
                                        <Button type="primary" className="font-kanit bg-primary hover:bg-secondary text-white font-normal focus:outline-none focus:shadow-outline"
                                          onClick={() => {
                                            window.open('https://www.bsgroupth.com/register-for-bs-booking', '_blank');
                                          }}
                                        >
                                          ใช้บริการ
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                              : (
                                <div className='flex justify-center items-center'>
                                  <h1 className='text-2xl text-black font-medium'>ไม่พบข้อมูล</h1>
                                </div>
                              )
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col' >
                  <div className='flex justify-center items-center pt-4 pb-4'>
                    <h1 className='text-4xl text-black font-medium'>ส่งพัสดุกับ BS EXPRESS ง่ายมากเพียง 3 ขั้นตอน</h1>
                  </div>
                  <div className='pb-4'>
                    <div className='flex justify-center items-center'>
                      <div className='flex flex-col items-center'>
                        <img src={createOrder} className='w-32 h-32' />
                        <h1 className='text-xl text-black font-medium'>ค้นหาขนส่ง</h1>
                      </div>
                      <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                      <div className='flex flex-col items-center'>
                        <img src={pay} className='w-32 h-32' />
                        <h1 className='text-xl text-black font-medium'>เปรียบเทียบราคา</h1>
                      </div>
                      <div className='flex flex-col items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                      <div className='flex flex-col items-center'>
                        <img src={ship} className='w-32 h-32' />
                        <h1 className='text-xl text-black font-medium'>ส่งพัสดุ</h1>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          </Form>
        ) : (
          <div className="hero min-h-screen font-kanit" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  ระบบกำลังปิดปรับปรุง
                </h1>
                <p className="mb-5">
                  ขออภัยในความไม่สะดวก ระบบกำลังปิดปรับปรุง กรุณาลองใหม่ในภายหลัง
                </p>
                <button className="btn btn-primary">
                  ลองใหม่ในภายหลัง
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
export default HomrPage
