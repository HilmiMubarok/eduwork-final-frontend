import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerUser } from '../../../app/api/auth'

const schema = yup.object({
    full_name: yup.string().required('Nama Lengkap harus diisi'),
    email: yup.string().email().required('Email harus valid'),
    password: yup.string().min(8, 'Minimal panjang password harus 8 karakter').required('Password Harus diisi'),
    password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Password konfirmasi tidak sama'),
}).required();

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export default function Register() {

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema)
    });
    const [status, setStatus] = useState(statusList.idle);
    const navigate = useNavigate();

    const onSubmit = async formData => {
        setStatus(statusList.process);
        const { data } = await registerUser(formData);
        if (data.error) {
            let fields = Object.keys(data.fields);
            fields.forEach(field => setError(field, { type: 'server', message: data.fields[field]?.properties?.message }));
            setStatus(statusList.error);
            return;
        }
        setStatus(statusList.success);

    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        {status === statusList.success ? <div> Sign up success, please <span onClick={() => navigate('/auth/signin')}>login</span> with your email and password account </div> : null}
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
                        <p className='text-gray-800 text-center text-sm mt-5'>Silahkan register untuk melanjutkan</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-md shadow-sm">
                            <div className='mb-4'>
                                <label htmlFor="full-name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="full-name"
                                    type="text"
                                    isnvalid={errors.fullname}
                                    {...register('full_name')}
                                    required
                                    className="appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-xl focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Full Name"
                                />
                                <p>{errors.full_name?.message}</p>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    isinvalid={errors.email}
                                    {...register('email')}
                                    type="email"
                                    required
                                    className="appearance-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                                <p>{errors.email?.message}</p>
                            </div>
                            <div className='mb-4'>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    isinvalid={errors.password}
                                    {...register('password')}
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                                <p>{errors.password?.message}</p>
                            </div>
                            <div>
                                <label htmlFor="cpassword" className="sr-only">
                                    Konfirmasi Password
                                </label>
                                <input
                                    id="cpassword"
                                    isinvalid={errors.password_confirmation}
                                    {...register('password_confirmation')}
                                    type="password"
                                    required
                                    className="appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-xl focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Konfirmasi Password"
                                />
                                <p>{errors.password_confirmation?.message}</p>
                            </div>
                            <div className='mt-3'>
                                <span>Sudah Punya akun ? </span>
                                <Link to="/auth/login" className="font-medium text-teal-600 hover:text-teal-500">
                                    Login
                                </Link>

                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={status === statusList.process}
                                className="group relative w-full flex justify-center p-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                            >
                                {status === statusList.process ? 'Loading...' : 'Register'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
