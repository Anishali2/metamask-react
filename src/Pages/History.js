import Table from 'react-bootstrap/Table'

function History() {
  const data = JSON.parse(localStorage.getItem('hash'))
  return (
    <div style={{display:"flex",margin:"0 auto",maxWidth:"80%",marginTop:20}}>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Hash</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {data ? data.map((item,index) => {
          return (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.hash}</td>
              <td>{item.status == 1 ? "Success":"Failed"}</td>
            </tr>
          )
        }
        ) : null}
      </tbody>
    </Table>
    </div>
  );
}

export default History;