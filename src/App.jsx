import { useState } from 'react';
import { Disclosure } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid'
import { Button, Select, Form } from 'antd';
import Layout from './layout/layout'
import './App.css'
import { InputNumber } from 'antd';
import Service from './service/service';
import { useEffect } from 'react';
import imageBackground from './assets/images/image1.jpeg'
import createOrder from './assets/svg/create_order.svg'
import pay from './assets/svg/pay.svg'
import ship from './assets/svg/ship.svg'

function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([]);
  const [dataDelivery, setDataDelivery] = useState([]);
  const [originalData, setOriginalData] = useState([]);
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

  const getProvinceAndDistrictAndSubDistrict = async () => {
    try {
      const response = await Service.getProvinceAndDistrictAndSubDistrict();
      return response;
    } catch (error) {
      console.error(error);
    }
  };

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
        height: ""
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
      data.push({
        from: from,
        to: to,
        parcel: parcel,
      });
      const response = await Service.getDeliveryService(data);
      setDataDelivery(response);
      setOriginalData(response);
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
        if (isServiceFee50) valid = valid && item.price < 50;
        if (isServiceFee100) valid = valid && item.price >= 50 && item.price <= 100;
        if (isServiceFee150) valid = valid && item.price > 100 && item.price <= 150;
        if (isServiceFeeMore150) valid = valid && item.price > 150;
        if (isPickupPointIn) valid = valid && item.parcel_pickup_point === 'เข้ารับหน้าบ้าน';
        if (isPickupPointOut) valid = valid && item.parcel_pickup_point === 'ส่งด้วยตนเอง';
        if (isDeliveryTime1) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime <= 1;
        }
        if (isDeliveryTime2) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime > 1 && deliveryTime <= 3;
        }
        if (isDeliveryTime3) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime > 3 && deliveryTime <= 5;
        }
        if (isDeliveryTime4) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime > 5 && deliveryTime <= 7;
        }
        if (isDeliveryTime5) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime > 7 && deliveryTime <= 14;
        }
        if (isDeliveryTime6) {
          const deliveryTime = parseInt(item.delivery_time.split('-')[0], 10);
          valid = valid && deliveryTime > 14;
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
  }, []);

  useEffect(() => {
  }, [dataDelivery]);

  useEffect(() => {
    fitlerData();
  }, [isServiceFee50, isServiceFee100, isServiceFee150, isServiceFeeMore150, isPickupPointIn, isPickupPointOut, isDeliveryTime1, isDeliveryTime2, isDeliveryTime3, isDeliveryTime4, isDeliveryTime5, isDeliveryTime6]);

  return (
    <>
      <Layout>
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
            className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageBackground})` }}
          >
            <div className='card bg-white w-10/12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10
             rounded-xl shadow-lg
             xs:w-11/12 xs:p-4 xs:top-1/2 xs:left-1/2 xs:transform xs--translate-x-1/2 xs--translate-y-1/2
            '>
              <div className='flex items-center'>
                <h3 className='text-2xl text-black font-light mb-4 mr-2'>ค้นหาและเปรียบเทียบขนส่งที่ดีที่สุด </h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-[#d81d19]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div className="flex p-4 xs:p-0 col-span-2">
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
                <div className="flex p-4 xs:p-0 col-span-2">
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
                <div className="flex p-4 xs:p-0 col-span-2 md:col-span-1">
                  <Form.Item
                    name="width"
                    className='w-full'
                    rules={[{ required: true, message: 'กรุณากรอกความกว้าง' }]}
                  >
                    <InputNumber type="text" className="w-full p-1 sm:p-0 border border-gray-300 rounded-md font-kanit" placeholder="กว้าง" />
                  </Form.Item>
                </div>
                <div className="flex p-4 xs:p-0 col-span-2 md:col-span-1">
                  <Form.Item
                    name="long"
                    className='w-full'
                    rules={[{ required: true, message: 'กรุณากรอกยาว' }]}
                  >
                    <InputNumber type="text" className="w-full p-1 xs:p-0 border border-gray-300 rounded-md font-kanit" placeholder="ยาว" />
                  </Form.Item>
                </div>
                <div className="flex p-4 xs:p-0 col-span-2 md:col-span-1">
                  <Form.Item
                    name="height"
                    className='w-full'
                    rules={[{ required: true, message: 'กรุณากรอกสูง' }]}
                  >
                    <InputNumber type="text" className="w-full p-1 xs:p-0 border border-gray-300 rounded-md font-kanit" placeholder="สูง" />
                  </Form.Item>
                </div>
                <div className="flex p-4 xs:p-0 col-span-2 md:col-span-1">
                  <Form.Item
                    name="weight"
                    className='w-full'
                    rules={[{ required: true, message: 'กรุณากรอกน้ำหนัก' }]}
                  >
                    <InputNumber type="text" className="w-full p-1 xs:p-0 border border-gray-300 rounded-md font-kanit" placeholder="น้ำหนัก(กรัม)" />
                  </Form.Item>
                </div>
              </div>
              <div className="flex justify-center mt-4 xs:mt-1">
                <Button type="primary" htmlType="submit" className="font-kanit bg-primary hover:bg-secondary text-white font-normal focus:outline-none focus:shadow-outline"
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
                                      <span className="label-text text-lg">เข้ารับหน้าบ้าน</span>
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
                                      <span className="label-text text-lg">1 วัน</span>
                                    </label>
                                    <label className="cursor-pointer flex items-center pb-2">
                                      <input type="checkbox"
                                        className="checkbox checkbox-sm mr-4"
                                        value={isDeliveryTime2}
                                        onChange={(e) => {
                                          setIsDeliveryTime2(e.target.checked);

                                        }}
                                      />
                                      <span className="label-text text-lg">2 - 3 วัน</span>
                                    </label>
                                    <label className="cursor-pointer flex items-center pb-2">
                                      <input type="checkbox"
                                        className="checkbox checkbox-sm mr-4"
                                        value={isDeliveryTime3}
                                        onChange={(e) => {
                                          setIsDeliveryTime3(e.target.checked);

                                        }}
                                      />
                                      <span className="label-text text-lg">4 - 5 วัน</span>
                                    </label>
                                    <label className="cursor-pointer flex items-center pb-2">
                                      <input type="checkbox"
                                        className="checkbox checkbox-sm mr-4"
                                        value={isDeliveryTime4}
                                        onChange={(e) => {
                                          setIsDeliveryTime4(e.target.checked);

                                        }}
                                      />
                                      <span className="label-text text-lg">6 - 7 วัน</span>
                                    </label>
                                    <label className="cursor-pointer flex items-center pb-2">
                                      <input type="checkbox"
                                        className="checkbox checkbox-sm mr-4"
                                        value={isDeliveryTime5}
                                        onChange={(e) => {
                                          setIsDeliveryTime5(e.target.checked);

                                        }}
                                      />
                                      <span className="label-text text-lg">8 - 14 วัน</span>
                                    </label>
                                    <label className="cursor-pointer flex items-center pb-2">
                                      <input type="checkbox"
                                        className="checkbox checkbox-sm mr-4"
                                        value={isDeliveryTime6}
                                        onChange={(e) => {
                                          setIsDeliveryTime6(e.target.checked);

                                        }}
                                      />
                                      <span className="label-text text-lg">15 วัน ขึ้นไป</span>
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
                        dataDelivery ? dataDelivery?.map((element, index) => (
                          // eslint-disable-next-line react/jsx-key
                          <div className="card bg-white border border-gray-200 w-full mb-4">
                            <div className="card-body">
                              <div className="overflow-x-auto">
                                <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
                                  <div className='col-span-1'>
                                    <div className='flex justify-center items-center'>
                                      <img src={element.img_url} className=' w-[132px] h-[60px] max-w-full object-contain ' />
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
                                      element.delivery_time
                                    }</h5>
                                  </div>
                                  <div className='col-span-1 flex flex-col justify-center items-center'>
                                    <h3 className='text-xl text-black font-medium'>จุดรับส่งพัสดุ</h3>
                                    <h5 className='text-md text-black font-light'>{
                                      element.parcel_pickup_point
                                    }</h5>
                                  </div>
                                  <div className='col-span-1 flex flex-col justify-center items-center'>
                                    <h3 className='text-xl text-black font-medium'>ค่าบริการ</h3>
                                    <h5 className='text-md text-black font-light'>{
                                      element.price + ' บาท'
                                    }</h5>
                                  </div>
                                  <div className='col-span-1 flex flex-col justify-center items-center'>
                                    <Button type="primary" className="font-kanit bg-primary hover:bg-secondary text-white font-normal focus:outline-none focus:shadow-outline" 
                                      onClick={() => {
                                        window.open('https://www.bsgroupth.com/', '_blank');
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
      </Layout>
    </>
  );
}
export default App
