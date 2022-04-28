import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../app/api/auth'
import { userLogin } from '../../../app/features/Auth/actions'
import { useNavigate } from 'react-router-dom'

const schema = yup.object({
    email: yup.string().email('Email harus valid').required('Email harus diisi'),
    password: yup.string().min(8, 'Password minimal 8 karakter').required('Password harus diisi')
}).required();

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

export default function Index() {

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(schema)
    });
    const [status, setStatus] = React.useState(statusList.idle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async formData => {
        setStatus(statusList.process);
        const { data } = await loginUser(formData);
        if (data.error) {
            setError('password', { type: 'invalidCredential', message: data.message });
            setStatus(statusList.error)
        } else {
            const { user, token } = data;
            dispatch(userLogin({ user, token }));
            navigate('/');
        }
        setStatus(statusList.success);
    }


    return (
        <>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        <p className='text-gray-800 text-center text-sm mt-5'>Silahkan login ke akun anda untuk melanjutkan</p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-md shadow-sm">
                            <div className='mb-4'>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    type="email"
                                    autoComplete="email"
                                    isinvalid={errors.email}
                                    {...register('email')}
                                    required
                                    className="appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                                <span>{errors.email?.message}</span>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    isinvalid={errors.password}
                                    {...register('password')}
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full p-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                                {errors.password?.message}
                            </div>
                            <div className='mt-3'>
                                <span>Belum Punya akun ? </span>
                                <Link to="/auth/register" className="font-medium text-teal-600 hover:text-teal-500">
                                    Register
                                </Link>

                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center p-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                disabled={status === statusList.process}
                            >
                                {status === statusList.process ? 'Loading...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
