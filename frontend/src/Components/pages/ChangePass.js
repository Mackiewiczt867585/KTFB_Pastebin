// import React from "react";
// import "../../App.css";
// import "../Profile.css";
// import {Button, Form} from 'semantic-ui-react';
// import { PASSWORD_CHANGE } from "../../GraphQL/Mutations";
// function EditProfile() {





//   const { onChange, onSubmit, values } = useForm(resetPasswordCallback, {
//     oldPassword: '',
//     Password1: '',
//     Password2: ''
//   });


//   // do zmiany*
//   // const [resetPassword, { loading }] = useMutation(PASSWORD_CHANGE, {
//   //   update(
//   //     _, 
//   //     {
//   //       data: { tokenAuth: userData}
//   //     }
//   //   ) {
//   //       context.login(userData);
//   //       props.history.push('/');
//   //     },
//   //   onError(err){
//   //     setErrors(err.graphQLErrors[0].extensions.exception.errors);
//   //   },
//   //     variables: values
//   // });



//   function resetPasswordCallback() {
//     resetPassword();
//   }






//   return (
//     <div className="login-box">
//       <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
//       <div className='inner-box'>
//         <Form.Input
//           label="oldPassword"
//           placeholder="Old password.."
//           name="oldPassword"
//           type="password"
//           value={values.oldPassword}
//           error={errors.oldPassword ? true : false}
//           onChange={onChange}
//           />
//           </div>
//         <div className='inner-box'>
//         <Form.Input
//           label="Password"
//           placeholder="Password.."
//           name="password1"
//           type="password"
//           value={values.password1}
//           error={errors.password1 ? true : false}
//           onChange={onChange}
//           />
//           </div>
//         <div className='inner-box'>
//         <Form.Input
//           label="Password"
//           placeholder="Password.."
//           name="password2"
//           type="password"
//           value={values.password2}
//           error={errors.password2 ? true : false}
//           onChange={onChange}
//           />
//           </div>
//         <div className='inner-box'>
//         <Button type="submit" primary>
//           Change password
//         </Button>
//         </div>
//         </Form>
//         </div>
//   );
// }

// export default EditProfile;
