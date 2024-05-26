/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Button, Select, Form } from 'antd';
import { InputNumber, Input, Steps, Radio } from 'antd';
import { useEffect } from 'react';
import imageBackground from '../assets/images/bgImage.png'
import createOrder from '../assets/svg/create_order.svg'
import mockImage from '../assets/images/logo150x150.png'
import RatingComponent from '../component/RatingComponent'
import pay from '../assets/svg/pay.svg'
import ship from '../assets/svg/ship.svg'
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';

const { TextArea } = Input;

function CheckPackagePage() {

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenSystem, setIsOpenSystem] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const description = 'This is a description.';

    const onSubmit = async (values) => {
        try {
            setIsOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleOk = () => { };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


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
                            className="relative w-full h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageBackground})` }}
                        >
                            <div className='card bg-white w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10
               rounded-xl shadow-lg
               xs:w-10/12 xs:p-4 xs:top-1/2 xs:left-1/2 xs:transform xs--translate-x-1/2 xs--translate-y-1/2
              '>
                                <div className='flex items-center'>
                                    <h3 className='text-2xl text-black font-light mb-4 mr-2'>ค้นหาหมายเลขพัสดุ </h3>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-4 text-[#d81d19]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                    </svg>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex p-4 xs:p-0 col-span-1">
                                        <Form.Item
                                            name="address_origin"
                                            className='w-full'
                                            rules={[{ required: true, message: 'กรุณากรอกอหมายเลขพัสดุ' }]}
                                        >
                                            <Input type="text" className="w-full  font-kanit" placeholder="หมายเลขพัสดุ" />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-4 xs:mt-1">
                                    <Button type="primary" htmlType="submit" className="font-kanit bg-primary hover:bg-secondary text-white font-normal focus:outline-none focus:shadow-outline"
                                    >
                                        ตรวจสอบสถานะเลขพัสดุ
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {
                            isOpen ? (
                                <div className='flex flex-col pl-10 pr-10'>
                                    <div className='flex justify-center items-center pt-4 pb-4'>
                                        <h1 className='text-4xl text-black font-medium'>สถานะพัสดุ</h1>
                                    </div>
                                    <div className='pb-4'>
                                        <div className='grid grid-cols-1'>
                                            <div className=' col-span-1 flex justify-center'>
                                                <div className='p-4 w-7/12 '>
                                                    <div className='p-4 bg-white rounded-md border border-gray-400 shadow-sm '>
                                                        <div className='flex justify-start'>
                                                            <h5 className='text-2xl text-black font-medium'>รายละเอียดขนส่ง</h5>
                                                        </div>
                                                        <hr className='border border-gray-400 mt-4 mb-4' />
                                                        <div className=' grid grid-cols-3 items-center gap-4 '>
                                                            <div className=' col-span-1 ' >
                                                                <div className='flex justify-center'>
                                                                    <img src={mockImage} className='w-32 h-32' />
                                                                </div>
                                                            </div>
                                                            <div className=' col-span-1 flex flex-col'>
                                                                <div className='flex justify-between'>
                                                                    <h1 className='text-sm text-black font-normal'>หมายเลขพัสดุ : 123456789</h1>
                                                                    <h1 className='text-sm text-black font-normal'>วันที่ส่ง : 01/01/2564</h1>
                                                                </div>
                                                                <div className='flex justify-between'>
                                                                    <h1 className='text-sm text-black font-normal'>ชื่อผู้รับ : นาย สมชาย ใจดี</h1>
                                                                    <h1 className='text-sm text-black font-normal'>เบอร์โทร : 0812345678</h1>
                                                                </div>
                                                                <div className='flex justify-between'>
                                                                    <h1 className='text-sm text-black font-normal'>ที่อยู่ : 123 หมู่ 1 ต.บ้านใหม่ อ.เมือง จ.เชียงใหม่ 50000</h1>
                                                                </div>
                                                            </div>
                                                            <div className='col-span-1 flex justify-center'>
                                                                <Button type="primary" className="font-kanit bg-primary hover:bg-secondary text-white font-normal focus:outline-none focus:shadow-outline"
                                                                    onClick={() => setIsModalOpen(true)}
                                                                >
                                                                    ประเมิณความพึงพอใจ
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pb-4'>
                                        <div className='grid grid-cols-1'>
                                            <div className=' col-span-1 flex justify-center'>
                                                <div className='p-4 w-7/12 '>
                                                    <div className='p-4 bg-white rounded-md border border-gray-400 shadow-sm '>
                                                        <div className='flex justify-start'>
                                                            <h5 className='text-2xl text-black font-medium'>สถานะ : กำลังจัดส่ง</h5>
                                                        </div>
                                                        <hr className='border border-gray-400 mt-4 mb-4' />
                                                        <div className='flex justify-center'>
                                                            <Steps
                                                                direction="vertical"
                                                                size="small"
                                                                current={1}
                                                                items={[
                                                                    {
                                                                        title: 'Finished',
                                                                        description,
                                                                    },
                                                                    {
                                                                        title: 'In Progress',
                                                                        description,
                                                                    },
                                                                    {
                                                                        title: 'Waiting',
                                                                        description,
                                                                    },
                                                                ]}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
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
                        <Modal title="ประเมิณความพึงพอใจ" className='font-kanit ' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800} >
                            <div className='pb-4'>
                                <div className='grid grid-cols-1'>
                                    <div className=' col-span-1'>
                                        <div className='p-4'>
                                            <div className='p-4 bg-white rounded-md border border-gray-400 shadow-sm '>
                                                <div className='flex justify-start'>
                                                    <h5 className='text-2xl text-black font-medium font-kanit '>รายละเอียดขนส่ง</h5>
                                                </div>
                                                <hr className='border border-gray-400 mt-4 mb-4' />
                                                <div className=' grid grid-cols-2 items-center gap-4 '>
                                                    <div className=' col-span-1 ' >
                                                        <div className='flex justify-center'>
                                                            <img src={mockImage} className='w-32 h-32' />
                                                        </div>
                                                    </div>
                                                    <div className=' col-span-1 flex flex-col'>
                                                        <div className='flex justify-between'>
                                                            <h1 className='text-sm text-black font-normal'>หมายเลขพัสดุ : 123456789</h1>
                                                            <h1 className='text-sm text-black font-normal'>วันที่ส่ง : 01/01/2564</h1>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <h1 className='text-sm text-black font-normal'>ชื่อผู้รับ : นาย สมชาย ใจดี</h1>
                                                            <h1 className='text-sm text-black font-normal'>เบอร์โทร : 0812345678</h1>
                                                        </div>
                                                        <div className='flex justify-between'>
                                                            <h1 className='text-sm text-black font-normal'>ที่อยู่ : 123 หมู่ 1 ต.บ้านใหม่ อ.เมือง จ.เชียงใหม่ 50000</h1>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pb-4'>
                                <div className='grid grid-cols-1'>
                                    <div className=' col-span-1'>
                                        <div className='p-4'>
                                            <div className='p-4 bg-white rounded-md border border-gray-400 shadow-sm '>
                                                <div className='flex justify-start'>
                                                    <h5 className='text-2xl text-black font-medium font-kanit '>ประเมิณความพึงพอใจ</h5>
                                                </div>
                                                <hr className='border border-gray-400 mt-4 mb-4' />
                                                <div className='flex justify-center'>
                                                    <Form.Item
                                                        name="rating"
                                                        className='w-full'
                                                        rules={[{ required: true, message: 'กรุณาให้คะแนน' }]}
                                                    >
                                                       <RatingComponent />
                                                    </Form.Item>
                                                </div>
                                                <div className='flex justify-center'>
                                                    <Form.Item
                                                        name="comment"
                                                        className='w-full'
                                                        rules={[{ required: true, message: 'กรุณาใส่ความคิดเห็น' }]}
                                                    >
                                                        <TextArea rows={4} type="text" className="w-full  font-kanit" placeholder="ความคิดเห็น" />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
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
export default CheckPackagePage
