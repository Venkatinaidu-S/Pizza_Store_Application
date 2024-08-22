import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate =useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: 'user'
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setStatus }) => {
            try {
                const response = await axios.post('http://localhost:5000/users/login', values);
                if (response.data && response.data.token) {
                    setStatus('success');
                    console.log('Token:', response.data.token); // Print token to console
                    // we can store the token in local storage 
                    // localStorage.setItem('token', response.data.token);
                    localStorage.setItem('username', values.username);
                    alert('logged in successfully');
                    navigate('/');
                } else {
                    setStatus('error');
                }
            } catch (error) {
                setStatus("error");
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="container" style={{ marginTop: 100 }}>
            <main className="form-signin w-50 m-auto">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            placeholder="User Name"
                        />
                        <label htmlFor="username">User Name</label>
                        {formik.touched.username && formik.errors.username && (
                            <div className='text-danger'>{formik.errors.username}</div>
                        )}
                    </div>
                    <div className="form-floating">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            placeholder="Password"
                        />
                        <label htmlFor="password">Password</label>
                        {formik.touched.password && formik.errors.password && (
                            <div className='text-danger'>{formik.errors.password}</div>
                        )}
                    </div>
                    <button
                        className="btn btn-primary w-100 py-2"
                        type="submit"
                        disabled={formik.isSubmitting}
                        style={{ marginTop: 50 }}
                    >
                        Sign in
                    </button>
                    {formik.status === 'success' && (
                        <div className="alert alert-success mt-3">Login successful!</div>
                    )}
                    {formik.status === 'error' && (
                        <div className="alert alert-danger mt-3">Invalid Credentials</div>
                    )}
                </form>
            </main>
            
        </div>
    );
};

export default Login;
