import React, { Component } from 'react';
import { withFirebase } from './Firebase';

const Signup = () => (
  <div class="row justify-content-center bg-white p-5">
    <p class="display-3">Sign Up</p>
    <SignUpForm />
  </div>
);
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
    return (
      <form onSubmit={this.onSubmit}>
        <div class="row justify-content-center bg-white">
        <input
          name="username"
          class="col-12 my-2"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
          style={{borderTop:'0px', borderLeft:'0px',borderRight:'0px', borderColor:'pink'}}
        />
        <input
          name="email"
          class="col-12 my-2"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
          style={{borderTop:'0px', borderLeft:'0px',borderRight:'0px', borderColor:'pink'}}
        />
        <input
          name="passwordOne"
          class="col-12 my-2"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
          style={{borderTop:'0px', borderLeft:'0px',borderRight:'0px', borderColor:'pink'}}
        />
        <input
          name="passwordTwo"
          class="col-12 my-2"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
          style={{borderTop:'0px', borderLeft:'0px',borderRight:'0px', borderColor:'pink'}}
        />
        <button class="btn btn-primary col-12 my-2" disabled={isInvalid} type="submit">Sign Up</button>
        <button class="btn col-12 my-2 btn-primary" onClick={this.authWithGoogle}>Login with Google</button>
        {error && <p>{error.message}</p>}
        </div>
      </form>
    );
  }
}
const SignUpForm = withFirebase(SignUpFormBase);
export default Signup;
export { SignUpForm };