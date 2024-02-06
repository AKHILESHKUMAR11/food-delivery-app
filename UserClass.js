import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "dummy",
        location: "default",
      },
    };
    // console.log(" child constructor");
  }

  async componentDidMount() {
    //console.log(" child component did mount");
    //api call
    const data = await fetch("https://api.github.com/users/AKHILESHKUMAR11");
    const json = await data.json();
    this.setState({
      userInfo: json,
    });
    console.log(json);
  }

  componentDidUpdate() {
    console.log(" component Did Update called");
  }
  componentWillUpdate() {
    console.log(" component will Update called");
  }

  render() {
    //console.log(" child render");
    const { name, location, avatar_url } = this.state.userInfo;
    return (
      <div classname="User-card">
        <img src={avatar_url} />
        <h2>Name: {name} </h2>
        <h3> Location: {location}</h3>
        <h4> Contact: 7061221177</h4>
      </div>
    );
  }
}
export default UserClass;
