import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table';


export default function Registrants() {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ data, setData ] = useState([]);
    const [ state ] = useState({
        columns: [
          { title: 'First Name', field: 'firstname' },
          { title: 'Last Name', field: 'lastname' },
          { title: 'E-mail', field: 'email' },
          { title: 'Location', field: 'location' },
          { title: 'T-Shirt Size', field: 'tshirtsize' },
          { title: 'Security Interests', field: 'interests' }
        ]
	});

    useEffect(() => {
        fetch('http://localhost:8080/registrants')
        .then(res => res.json())
        .then((d) => {
			setData(transformData(d))
			setIsLoading(false)
        })
    })

    const transformData = (rows) => {
		return rows.map(x=>{
			let interestJson = x.interests;
			let jsonStr = JSON.parse(interestJson);
			//TODO: figure out this hacky thing
			let interestArr =  jsonStr.slice(1,-1).slice(1,-1).split('","')
			const t = { ...x, interests: interestArr }
			return t;
		});
    };
    return (
		<div>
			{isLoading && <p>Wait I'm loading registrants for you</p>}
        	<MaterialTable
				title="Registered Attendees"
				columns={state.columns}
				data={data}
	  		/>
		</div>
	);
}