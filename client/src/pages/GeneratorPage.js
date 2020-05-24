import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import projectService from 'services/project.service'
import generateService from 'services/generate.service'
import Button from 'common/Button'
import Select from '../components/common/Select'

GeneratorPage.propTypes = {
	id: PropTypes.number,
}

export default function GeneratorPage() {

	const [projects, setProjects] = useState([])
	const [selectedId, setSelectedId] = useState('')
	const [generatedCode, setGeneratedCode] = useState('')

	function handleChange(e){
		let projectId = e.target.value
		console.log(projectId);
		
		setSelectedId(projectId)
	}

	useEffect(() => {
		async function fetchData(){
			let projects = (await projectService.getAllProjects()).map((p) => {
				return {
					name: p.name,
					value: p._id
				}
			})
			console.log(projects);
			setProjects(projects)
		}
		fetchData()
	},[])

	function copyToClipboard(){
		let copyText = document.getElementById("generatedCode");
		copyText.select();
		document.execCommand("copy");
	}

	async function generateCode(projectId){
		let code = await generateService.getGeneratedCode(projectId)
		console.log(code);
		
		setGeneratedCode(code);
		
	}

	return (
		<>
			<div className="card-header">
                <h4>Test Generator!</h4>
			</div>
			<div className="card-body">
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon1">Select Project</span>
					</div>
					<Select options={projects} handleChange={handleChange} selectedIdx={0} />
                	<Button handleClick={() => generateCode(selectedId)} name="Generate" disabled={selectedId.length == 0}/>
					<Button handleClick={copyToClipboard} name="Copy to Clipboard" />
				</div>
				<div className="form-group">
					<textarea className="form-control" id="generatedCode" rows="50"
						value={generatedCode} readOnly
					/>
				</div>
			</div>
		</>
	)
}

