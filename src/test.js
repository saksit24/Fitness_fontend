class First extends React.Component {
    constructor (props){
      super(props);
  
    }
  
    render() {
       const data =[{"name":"test1"},{"name":"test2"}];
      const listItems = data.map((d) => <li key={d.name}>{d.name}</li>;
  
      return (
        <div>
        hello
        </div>
      );
    }
  } 