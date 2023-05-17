import React from "react";

class ReadStudents extends React.Component {
  state = { dataKeys: [] };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.StudentsStore;
    console.log(contract);
    // let drizzle know we want to watch the `getAllStudents` method
    const dataKey = contract.methods["getAllStudents"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKeys: [dataKey] });
  }

  render() {
    // get the contract state from drizzleState
    const { StudentsStore } = this.props.drizzleState.contracts;

    // using the saved `dataKeys`, get the variables we're interested in
    const allStudents = StudentsStore.getAllStudents[this.state.dataKeys[0]];

    // if the data hasn't loaded yet, display a loading indicator
    if (!allStudents || !allStudents.value) {
      return <p>Loading...</p>;
    }

    // otherwise, display a list of all students
    return (
      <div>
        <h2>All Students</h2>
        <ul>
          {allStudents.value[0].map((universityID, index) => (
            <li key={index}>
              University ID: {universityID}<br />
              Name: {allStudents.value[1][index]}<br />
              Program: {allStudents.value[2][index]}<br />
              Submission Year: {allStudents.value[3][index]}<br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ReadStudents;