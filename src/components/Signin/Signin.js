import React from 'react';

  class Signin extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        signInEmail: '',
        signInPassword: ''
      }
    }

    onEmailChange = (event) => {
      this.setState({signInEmail: event.target.value})
    }

     onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () =>{
      //console.log(this.state);
     // fetch('http://localhost:3000/signin', {
      fetch('https://blooming-fjord-39123.herokuapp.com/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.signInEmail,
          password: this.state.signInPassword
        })
      })
        .then(response => response.json())
        .then(user => {
          if(user.id){
            this.props.loadUser(user);
            this.props.onRouteChange('home');
          }
        })
   
    }

    render(){
        //console.log('check', imageUrl);
      const {onRouteChange} = this.props;
  return(
   <article className="br3 ba b--white-30 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
     <main className="pa4 gray-80">
      <div className="measure">
       <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f1 fw6 ph0 mh0 light-gray">Sign In</legend>
         <div className="mt3">
          <label className="db fw6 lh-copy f6 light-gray" htmlFor="email-address">Email</label>
          <input 
          className="pa2 input-reset ba bg-transparent hover-bg-mid-gray hover-white w-100" 
          type="email" name="email-address"  
          id="email-address"
          onChange={this.onEmailChange}
          />
        </div>
        <div className="mv3">
        <label className="db fw6 lh-copy f6 light-gray" htmlFor="password">Password</label>
        <input 
        className="b pa2 input-reset ba bg-transparent hover-bg-mid-gray hover-white w-100" 
        type="password" 
        name="password"  
        id="password"
        onChange={this.onPasswordChange}
        />
        </div>
       </fieldset>
       <div className="">
        <input
            // onClick={onRouteChange('home')}
            // onClick={()=> onRouteChange('home')}
             onClick={this.onSubmitSignIn}
             className="white b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
             type="submit" 
             value="Sign in"/>
       </div>
      <div className="lh-copy mt3">
    {/*we are gonna run onRouteChange func. when it gets rendered!! o yüzden ()=>onRouteChange(..) diye yazdık!! supeer!*/}
      <p onClick={()=>onRouteChange('register')} className="f6 link dim light-gray db pointer">Register</p>  
      </div>
     </div>
    </main>
  </article>
  ); //return
    }//render

}

export default Signin;